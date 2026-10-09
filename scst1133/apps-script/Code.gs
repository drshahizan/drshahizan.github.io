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
      case 'student-profile-get': result = getStudentProfile_(request.matric); break;
      case 'student-profile-save': result = saveStudentProfile_(request); break;
      case 'student-directory': result = getStudentDirectory_(); break;
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

function getProfileSheet_() {
  const sheet = getBook_().getSheetByName(CONFIG.STUDENTS_SHEET);
  if (!sheet) throw new Error('Students sheet was not found.');
  const required = ['GitHub','LinkedIn','Portfolio'];
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getDisplayValues()[0];
  required.forEach(header => {
    if (headers.indexOf(header) < 0) {
      sheet.getRange(1,headers.length+1).setValue(header);
      headers.push(header);
    }
  });
  return {sheet:sheet,headers:headers};
}

function studentRow_(matric) {
  const key = normalizeMatric_(matric);
  if (!/^A\d{2}CS\d{4}$/.test(key)) throw new Error('Enter a valid matric number, for example A26CS0014.');
  const profileSheet = getProfileSheet_();
  const values = profileSheet.sheet.getDataRange().getDisplayValues();
  const headers = values.shift().map(String);
  const matricColumn = headers.indexOf('MatricNumber');
  const rowIndex = values.findIndex(row => normalizeMatric_(row[matricColumn]) === key);
  if (rowIndex < 0) throw new Error('The matric number was not found in the registered student list.');
  return {sheet:profileSheet.sheet,headers:headers,row:values[rowIndex],rowNumber:rowIndex+2,matric:key};
}

function getStudentProfile_(matric) {
  const lookup = findStudent_(matric);
  const record = studentRow_(matric);
  const value = header => record.row[record.headers.indexOf(header)] || '';
  return {ok:true,student:lookup.student,profile:{github:value('GitHub'),linkedin:value('LinkedIn'),portfolio:value('Portfolio')}};
}

function validUrl_(value, label) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (!/^https:\/\/[a-z0-9.-]+(?:\/[^\s]*)?$/i.test(text)) throw new Error(label + ' must be a complete https:// URL.');
  return text;
}

function saveStudentProfile_(payload) {
  const record = studentRow_(payload.matric);
  const github = String(payload.github || '').trim().replace(/^https?:\/\/(?:www\.)?github\.com\//i,'').replace(/\/$/,'');
  if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(github)) throw new Error('Enter a valid GitHub ID.');
  const values = {GitHub:github,LinkedIn:validUrl_(payload.linkedin,'LinkedIn URL'),Portfolio:validUrl_(payload.portfolio,'Portfolio URL')};
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    Object.keys(values).forEach(header => record.sheet.getRange(record.rowNumber,record.headers.indexOf(header)+1).setValue(values[header]));
    SpreadsheetApp.flush();
    return {ok:true};
  } finally { lock.releaseLock(); }
}

function getStudentDirectory_() {
  const profileSheet = getProfileSheet_();
  const values = profileSheet.sheet.getDataRange().getDisplayValues();
  const headers = values.shift().map(String);
  const index = header => headers.indexOf(header);
  const responseSheet = getBook_().getSheetByName(CONFIG.RESPONSES_SHEET);
  const submitted = {};
  if (responseSheet && responseSheet.getLastRow() > 1) {
    const responseValues = responseSheet.getDataRange().getDisplayValues();
    const responseHeaders = responseValues.shift().map(String);
    const matricIndex = responseHeaders.indexOf('MatricNumber');
    if (matricIndex >= 0) responseValues.forEach(row => submitted[normalizeMatric_(row[matricIndex])] = true);
  }
  const directory = {'03':[],'04':[]};
  values.forEach(row => {
    const section = String(row[index('Section')] || '').padStart(2,'0');
    if (!directory[section]) return;
    const matric = normalizeMatric_(row[index('MatricNumber')]);
    directory[section].push({name:row[index('FullName')],programme:row[index('ProgrammeCode')] || 'SCSTH',github:row[index('GitHub')] || '',linkedin:row[index('LinkedIn')] || '',portfolio:row[index('Portfolio')] || '',survey:submitted[matric]?'Done':'Pending'});
  });
  return {ok:true,students:directory};
}
