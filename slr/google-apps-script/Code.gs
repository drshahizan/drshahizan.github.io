const SPREADSHEET_ID = '1qpPXgREKy7Pl8iP26SQwzE921n9Yo0XaHEQZ28WVCiE';
const SHEET_NAME = 'Articles';
const PARTICIPANT_SHEET_NAME = 'Participant Registration';
const PARTICIPANT_HEADERS = ['timestamp','registrationId','participantType','fullName','email','identityNumber','phoneNumber','levelOfStudy','currentSemester','supervisorName','researchGroup','programmeDeclaration','registrationStatus'];
const CACHE_SECONDS = 300;
const HEADERS = ['timestamp','participant','email','apaReference','articleTitle','authors','year','journal','volume','issue','pages','doi','url','wos','wosCollection','quartile','scopus','id'];

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || 'articles').toLowerCase();
    const cache = CacheService.getScriptCache();
    const cacheKey = action === 'summary' ? 'slr_summary_v2' : 'slr_articles_v2';
    const cached = cache.get(cacheKey);
    if (cached) return json_(JSON.parse(cached));

    const records = readRecords_();
    const payload = action === 'summary' ? buildSummary_(records) : { records: records, generatedAt: new Date().toISOString() };
    const serialised = JSON.stringify(payload);
    // Apps Script cache entries are size-limited. Summary data is always small;
    // full article data is cached only while it remains within a safe limit.
    if (action === 'summary' || serialised.length < 90000) cache.put(cacheKey, serialised, CACHE_SECONDS);
    return json_(payload);
  } catch (error) {
    return json_({ ok: false, error: error.message, records: [] });
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const item = JSON.parse(e.postData.contents);
    if (String(item.action || '').toLowerCase() === 'participant-registration') {
      return saveParticipant_(item);
    }
    if (!item.participant || !item.apaReference || !item.articleTitle || !item.year || !item.journal) throw new Error('Missing required fields.');

    const sheet = getSheet_();
    const doi = normaliseDoi_(item.doi);
    if (doi && sheet.getLastRow() > 1) {
      const dois = sheet.getRange(2, HEADERS.indexOf('doi') + 1, sheet.getLastRow() - 1, 1).getDisplayValues().flat().map(normaliseDoi_);
      if (dois.includes(doi)) return json_({ ok: false, error: 'Duplicate DOI' });
    }

    item.doi = doi;
    sheet.appendRow(HEADERS.map(h => safe_(item[h])));
    SpreadsheetApp.flush();
    clearCaches_();
    return json_({ ok: true, id: item.id });
  } catch (error) {
    return json_({ ok: false, error: error.message });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}


function saveParticipant_(item) {
  const type = String(item.participantType || '');
  if (!['Postgraduate Student','Academic Staff'].includes(type)) throw new Error('Select a valid participant type.');
  if (!item.fullName || !item.email || !item.identityNumber || !item.phoneNumber || !item.researchGroup) throw new Error('Complete all required participant information.');
  if (type === 'Postgraduate Student' && (!item.levelOfStudy || !item.currentSemester || !item.supervisorName)) throw new Error('Complete all postgraduate study information.');
  if (item.programmeDeclaration !== 'Agreed') throw new Error('Programme participation confirmation is required.');

  const sheet = getParticipantSheet_();
  const email = String(item.email || '').trim().toLowerCase();
  if (sheet.getLastRow() > 1) {
    const emails = sheet.getRange(2, PARTICIPANT_HEADERS.indexOf('email') + 1, sheet.getLastRow() - 1, 1).getDisplayValues().flat().map(v => String(v).trim().toLowerCase());
    if (emails.includes(email)) throw new Error('This email address is already registered for the workshop.');
  }
  const registrationId = nextRegistrationId_(sheet);
  const record = {
    timestamp: item.timestamp || new Date().toISOString(),
    registrationId: registrationId,
    participantType: type,
    fullName: item.fullName,
    email: email,
    identityNumber: item.identityNumber,
    phoneNumber: item.phoneNumber,
    levelOfStudy: type === 'Postgraduate Student' ? item.levelOfStudy : '',
    currentSemester: type === 'Postgraduate Student' ? item.currentSemester : '',
    supervisorName: type === 'Postgraduate Student' ? item.supervisorName : '',
    researchGroup: item.researchGroup,
    programmeDeclaration: 'Agreed',
    registrationStatus: 'Registered'
  };
  sheet.appendRow(PARTICIPANT_HEADERS.map(h => safe_(record[h])));
  SpreadsheetApp.flush();
  return json_({ ok: true, registrationId: registrationId });
}

function getParticipantSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(PARTICIPANT_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(PARTICIPANT_SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(PARTICIPANT_HEADERS);
    sheet.getRange(1, 1, 1, PARTICIPANT_HEADERS.length).setFontWeight('bold').setBackground('#7a1730').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, PARTICIPANT_HEADERS.length);
  }
  return sheet;
}

function nextRegistrationId_(sheet) {
  const seq = Math.max(1, sheet.getLastRow());
  return 'SLR2026-' + String(seq).padStart(4, '0');
}

function setupParticipantRegistration() {
  const sheet = getParticipantSheet_();
  return 'Participant registration sheet ready: ' + sheet.getName();
}

function readRecords_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getDisplayValues();
  return values.filter(row => row.some(Boolean)).map(row => Object.fromEntries(HEADERS.map((h, i) => [h, row[i] || ''])));
}

function buildSummary_(records) {
  const count = (field, value) => records.filter(r => r[field] === value).length;
  const quartiles = {}, years = {}, wosCollections = {};
  ['Q1','Q2','Q3','Q4','Not Available'].forEach(v => quartiles[v] = count('quartile', v));
  ['SCIE','SSCI','ESCI','AHCI','Other'].forEach(v => wosCollections[v] = records.filter(r => r.wos === 'Yes' && r.wosCollection === v).length);
  records.forEach(r => {
    const year = String(r.year || '');
    if (/^(19|20)\d{2}$/.test(year)) years[year] = (years[year] || 0) + 1;
  });

  const latest = records.slice().sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)).slice(0, 5).map(r => ({
    articleTitle: r.articleTitle,
    journal: r.journal,
    year: r.year,
    doi: r.doi,
    url: r.url,
    quartile: r.quartile,
    timestamp: r.timestamp
  }));

  return {
    total: records.length,
    wos: count('wos', 'Yes'),
    scopus: count('scopus', 'Yes'),
    q1: count('quartile', 'Q1'),
    indexing: {
      both: records.filter(r => r.wos === 'Yes' && r.scopus === 'Yes').length,
      wosOnly: records.filter(r => r.wos === 'Yes' && r.scopus !== 'Yes').length,
      scopusOnly: records.filter(r => r.wos !== 'Yes' && r.scopus === 'Yes').length
    },
    quartiles: quartiles,
    years: years,
    wosCollections: wosCollections,
    latest: latest,
    generatedAt: new Date().toISOString()
  };
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#7a1730').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clearCaches_() {
  CacheService.getScriptCache().removeAll(['slr_articles_v2', 'slr_summary_v2']);
}

function normaliseDoi_(value) {
  return String(value || '').trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').replace(/^doi:\s*/i, '').toLowerCase();
}

function safe_(value) {
  const text = String(value == null ? '' : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
