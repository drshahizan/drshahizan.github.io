const CONFIG = {
  SPREADSHEET_ID: '1wLVdXNzBrzxsn7ZKVSe6ifjqAkwG2I3_andD-JBdycc',
  STUDENTS_SHEET: 'Students',
  RESPONSES_SHEET: 'Responses',
  PROGRESS_SHEET: 'Progress',
  COURSE: 'SCST1133',
  SEMESTER: '2026/2027-1'
};

function doGet() {
  return json_({ok:true, service:'SCST1133 Entry Survey API'});
}

function doPost(e) {
  try {
    const request = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    let result;
    switch (request.action) {
      case 'student-lookup': result = findStudent_(request.matric); break;
      case 'save-progress': result = saveProgress_(request); break;
      case 'survey-submit': result = submitSurvey_(request); break;
      default: throw new Error('Invalid API action.');
    }
    return json_(result);
  } catch (error) {
    return json_({ok:false, error:error.message || String(error)});
  }
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getBook_() {
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

function normalizeMatric_(value) {
  return String(value || '').trim().replace(/\s+/g, '').toUpperCase();
}

function findStudent_(matric) {
  const key = normalizeMatric_(matric);
  if (!/^A\d{2}CS\d{4}$/.test(key)) throw new Error('Enter a valid matric number, for example A26CS0014.');
  const sheet = getBook_().getSheetByName(CONFIG.STUDENTS_SHEET);
  if (!sheet) throw new Error('Students sheet was not found.');
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values.shift().map(String);
  const m = headers.indexOf('MatricNumber');
  const n = headers.indexOf('FullName');
  const s = headers.indexOf('Section');
  const p = headers.indexOf('ProgrammeCode');
  if ([m,n,s,p].some(index => index < 0)) throw new Error('The Students sheet headers are incomplete.');
  const row = values.find(item => normalizeMatric_(item[m]) === key);
  if (!row) throw new Error('The matric number was not found in Sections 03 or 04.');
  return {
    ok:true,
    submitted:hasSubmitted_(key),
    student:{matric:key,name:row[n],section:String(row[s]).padStart(2,'0'),programme:row[p] || 'SCSTH'},
    saved:getSavedProgress_(key)
  };
}

function hasSubmitted_(matric) {
  const sheet = getBook_().getSheetByName(CONFIG.RESPONSES_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return false;
  return sheet.getRange(2,3,sheet.getLastRow()-1,1).getDisplayValues().flat()
    .some(value => normalizeMatric_(value) === matric);
}

function getSavedProgress_(matric) {
  const sheet = getBook_().getSheetByName(CONFIG.PROGRESS_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return null;
  const row = sheet.getRange(2,1,sheet.getLastRow()-1,4).getValues()
    .find(item => normalizeMatric_(item[0]) === matric);
  if (!row) return null;
  try { return {section:Number(row[2]) || 0, answers:JSON.parse(row[3] || '{}')}; }
  catch (error) { return null; }
}

function saveProgress_(payload) {
  const matric = normalizeMatric_(payload.matric);
  findStudent_(matric);
  const sheet = getBook_().getSheetByName(CONFIG.PROGRESS_SHEET);
  if (!sheet) throw new Error('Progress sheet was not found.');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const values = sheet.getLastRow() < 2 ? [] : sheet.getRange(2,1,sheet.getLastRow()-1,1).getDisplayValues().flat();
    const index = values.findIndex(value => normalizeMatric_(value) === matric);
    const data = [matric,new Date(),Number(payload.section) || 0,JSON.stringify(payload.answers || {})];
    if (index >= 0) sheet.getRange(index+2,1,1,4).setValues([data]);
    else sheet.appendRow(data);
    return {ok:true};
  } finally {
    lock.releaseLock();
  }
}

function submitSurvey_(payload) {
  const matric = normalizeMatric_(payload.matric);
  const lookup = findStudent_(matric);
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    if (hasSubmitted_(matric)) throw new Error('A response has already been submitted using this matric number.');
    const book = getBook_();
    const sheet = book.getSheetByName(CONFIG.RESPONSES_SHEET);
    if (!sheet) throw new Error('Responses sheet was not found.');
    const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getDisplayValues()[0];
    const responseId = `${CONFIG.COURSE}-${CONFIG.SEMESTER}-${matric}`;
    const record = Object.assign({
      ResponseID:responseId,
      SubmittedAt:new Date(),
      MatricNumber:matric,
      FullName:lookup.student.name,
      Section:lookup.student.section,
      ProgrammeCode:lookup.student.programme
    }, payload.answers || {});
    sheet.appendRow(headers.map(header => Object.prototype.hasOwnProperty.call(record,header) ? record[header] : ''));
    const progress = book.getSheetByName(CONFIG.PROGRESS_SHEET);
    if (progress && progress.getLastRow() > 1) {
      const values = progress.getRange(2,1,progress.getLastRow()-1,1).getDisplayValues().flat();
      const index = values.findIndex(value => normalizeMatric_(value) === matric);
      if (index >= 0) progress.deleteRow(index+2);
    }
    SpreadsheetApp.flush();
    return {ok:true,responseId};
  } finally {
    lock.releaseLock();
  }
}
