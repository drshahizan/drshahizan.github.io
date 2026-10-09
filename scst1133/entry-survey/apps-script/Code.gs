const CONFIG = {
  SPREADSHEET_ID: 'PASTE_GOOGLE_SHEET_ID_HERE',
  STUDENTS_SHEET: 'Students',
  RESPONSES_SHEET: 'Responses',
  PROGRESS_SHEET: 'Progress',
  COURSE: 'SCST1133',
  SEMESTER: '2026/2027-1'
};

function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('SCST1133 Entry Survey')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getBook_() {
  if (!CONFIG.SPREADSHEET_ID || CONFIG.SPREADSHEET_ID.includes('PASTE_')) throw new Error('Spreadsheet ID has not been configured.');
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

function normalizeMatric_(value) {
  return String(value || '').trim().replace(/\s+/g, '').toUpperCase();
}

function findStudent(matric) {
  const key = normalizeMatric_(matric);
  if (!/^A\d{2}CS\d{4}$/.test(key)) return {ok:false,message:'Enter a valid matric number, for example A26CS0014.'};
  const sheet = getBook_().getSheetByName(CONFIG.STUDENTS_SHEET);
  if (!sheet) throw new Error('Students sheet was not found.');
  const values = sheet.getDataRange().getDisplayValues();
  const headers = values.shift().map(h => h.trim());
  const m = headers.indexOf('MatricNumber'), n = headers.indexOf('FullName'), s = headers.indexOf('Section'), p = headers.indexOf('ProgrammeCode');
  const row = values.find(r => normalizeMatric_(r[m]) === key);
  if (!row) return {ok:false,message:'The matric number was not found in Sections 03 or 04.'};
  const submitted = hasSubmitted_(key);
  const saved = getSavedProgress_(key);
  return {ok:true,submitted,student:{matric:key,name:row[n],section:String(row[s]).padStart(2,'0'),programme:row[p]||'SCSTH'},saved};
}

function hasSubmitted_(matric) {
  const sheet = getBook_().getSheetByName(CONFIG.RESPONSES_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return false;
  return sheet.getRange(2,3,sheet.getLastRow()-1,1).getDisplayValues().flat().some(v => normalizeMatric_(v) === matric);
}

function getSavedProgress_(matric) {
  const sheet = getBook_().getSheetByName(CONFIG.PROGRESS_SHEET);
  if (!sheet || sheet.getLastRow() < 2) return null;
  const rows = sheet.getRange(2,1,sheet.getLastRow()-1,4).getValues();
  const row = rows.find(r => normalizeMatric_(r[0]) === matric);
  if (!row) return null;
  try { return {section:Number(row[2]) || 0, answers:JSON.parse(row[3])}; } catch(e) { return null; }
}

function saveProgress(payload) {
  const matric = normalizeMatric_(payload && payload.matric);
  if (!matric) throw new Error('Missing matric number.');
  const sheet = getBook_().getSheetByName(CONFIG.PROGRESS_SHEET);
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const rows = sheet.getLastRow() < 2 ? [] : sheet.getRange(2,1,sheet.getLastRow()-1,1).getDisplayValues().flat();
    const idx = rows.findIndex(v => normalizeMatric_(v) === matric);
    const data = [matric,new Date(),payload.section||0,JSON.stringify(payload.answers||{})];
    if (idx >= 0) sheet.getRange(idx+2,1,1,4).setValues([data]); else sheet.appendRow(data);
    return {ok:true};
  } finally { lock.releaseLock(); }
}

function submitSurvey(payload) {
  const matric = normalizeMatric_(payload && payload.matric);
  const studentResult = findStudent(matric);
  if (!studentResult.ok) throw new Error('Student record was not found.');
  const lock = LockService.getScriptLock(); lock.waitLock(30000);
  try {
    if (hasSubmitted_(matric)) return {ok:false,message:'A response has already been submitted using this matric number.'};
    const book = getBook_();
    const sheet = book.getSheetByName(CONFIG.RESPONSES_SHEET);
    const answers = payload.answers || {};
    const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getDisplayValues()[0];
    const base = {
      ResponseID:`${CONFIG.COURSE}-${CONFIG.SEMESTER}-${matric}`,
      SubmittedAt:new Date(), MatricNumber:matric, FullName:studentResult.student.name,
      Section:studentResult.student.section, ProgrammeCode:studentResult.student.programme
    };
    const record = Object.assign(base, answers);
    sheet.appendRow(headers.map(h => Object.prototype.hasOwnProperty.call(record,h) ? record[h] : ''));
    const progress = book.getSheetByName(CONFIG.PROGRESS_SHEET);
    if (progress && progress.getLastRow() > 1) {
      const rows = progress.getRange(2,1,progress.getLastRow()-1,1).getDisplayValues().flat();
      const idx = rows.findIndex(v => normalizeMatric_(v) === matric);
      if (idx >= 0) progress.deleteRow(idx+2);
    }
    SpreadsheetApp.flush();
    return {ok:true,responseId:base.ResponseID};
  } finally { lock.releaseLock(); }
}

function setupSheets() {
  const book = getBook_();
  const ensure = (name, headers) => {
    let sh = book.getSheetByName(name) || book.insertSheet(name);
    sh.clear(); sh.getRange(1,1,1,headers.length).setValues([headers]);
    sh.setFrozenRows(1); sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#7b1734').setFontColor('#ffffff');
    return sh;
  };
  ensure(CONFIG.STUDENTS_SHEET,['MatricNumber','FullName','Section','ProgrammeCode','Status']);
  ensure(CONFIG.PROGRESS_SHEET,['MatricNumber','SavedAt','SectionIndex','AnswersJSON']);
  ensure(CONFIG.RESPONSES_SHEET,responseHeaders_());
}

function responseHeaders_() {
  return ['ResponseID','SubmittedAt','MatricNumber','FullName','Section','ProgrammeCode','PreferredName','Gender','BirthYear','UTMEmail','MobileNumber','Nationality','Hometown','Accommodation','Personality','ProgrammeReason','CareerInterest','SPMResult','MathGrade','AddMathGrade','EnglishGrade','PreUniversity','Institution','FieldOfStudy','CGPA','ComputingSubject','ComputingDetails','PriorSubjects','Devices','ComputerModel','OperatingSystem','ProcessorBrand','ProcessorFamily','ProcessorModel','RAM','StorageType','StorageCapacity','FreeStorage','GraphicsType','GraphicsModel','ComputerAge','AdminPermission','Facilities','InternetType','InternetReliability','Limitations','LearningActivities','LearningStyle','IndependentLearning','AssignmentHabit','GroupComfort','DigitalConfidence','MaterialPreference','ProgrammingExperience','Languages','DataActivities','Software','GitHubExperience','FigmaExperience','AITools','AIUses','ConceptKnowledge','DataEngineerRole','Lifecycle','StructuredData','SemiStructuredData','Pipeline','ETL','GovernanceEthics','PrivacyIssue','EcosystemDefinition','CLOAbility','TopicInterest','ExpectedGain','ExpectedGrade','ExpectedChallenge','ExpectedInterest','Concerns','SupportNeeded','LecturerHelp','AdditionalInfo'];
}
