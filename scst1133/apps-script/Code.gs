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
      case 'survey-dashboard': result = getSurveyDashboard_(); break;
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
  const directory = {'01':[],'02':[],'03':[],'04':[]};
  values.forEach(row => {
    const section = String(row[index('Section')] || '').padStart(2,'0');
    if (!directory[section]) return;
    const matric = normalizeMatric_(row[index('MatricNumber')]);
    directory[section].push({name:row[index('FullName')],programme:row[index('ProgrammeCode')] || 'SCSTH',github:row[index('GitHub')] || '',linkedin:row[index('LinkedIn')] || '',portfolio:row[index('Portfolio')] || '',survey:submitted[matric]?'Done':'Pending'});
  });
  return {ok:true,students:directory};
}

function getSurveyDashboard_() {
  const book = getBook_();
  const studentsSheet = book.getSheetByName(CONFIG.STUDENTS_SHEET);
  const responsesSheet = book.getSheetByName(CONFIG.RESPONSES_SHEET);
  if (!studentsSheet) throw new Error('Students sheet was not found.');

  const studentValues = studentsSheet.getDataRange().getDisplayValues();
  const studentHeaders = studentValues.shift().map(String);
  const studentIndex = header => studentHeaders.indexOf(header);
  const registeredBySection = {'01':0,'02':0,'03':0,'04':0};
  studentValues.forEach(row => {
    const section = String(row[studentIndex('Section')] || '').padStart(2,'0');
    if (Object.prototype.hasOwnProperty.call(registeredBySection,section)) registeredBySection[section]++;
  });

  if (!responsesSheet || responsesSheet.getLastRow() < 2) {
    return {
      ok:true,updatedAt:new Date().toISOString(),sampleSize:0,
      overview:{registered:sumObject_(registeredBySection),completed:0,pending:sumObject_(registeredBySection),completionRate:0},
      sections:Object.keys(registeredBySection).map(section => ({section:section,registered:registeredBySection[section],completed:0,pending:registeredBySection[section],rate:0})),
      demographics:{},academic:{},computing:{},learning:{},digital:{},knowledge:{},insights:[]
    };
  }

  const responseValues = responsesSheet.getDataRange().getDisplayValues();
  const headers = responseValues.shift().map(header => String(header).trim());
  const index = header => headers.indexOf(header);
  const value = (row,header) => index(header) < 0 ? '' : String(row[index(header)] || '').trim();
  const completedBySection = {'01':0,'02':0,'03':0,'04':0};
  responseValues.forEach(row => {
    const section = String(value(row,'Section')).padStart(2,'0');
    if (Object.prototype.hasOwnProperty.call(completedBySection,section)) completedBySection[section]++;
  });

  const registered = sumObject_(registeredBySection);
  const completed = responseValues.length;
  const sections = Object.keys(registeredBySection).map(section => {
    const sectionCompleted = completedBySection[section];
    const sectionRegistered = registeredBySection[section];
    return {section:section,registered:sectionRegistered,completed:sectionCompleted,pending:Math.max(0,sectionRegistered-sectionCompleted),rate:sectionRegistered?Math.round(sectionCompleted/sectionRegistered*100):0};
  });

  const distribution = header => safeDistribution_(responseValues.map(row => value(row,header)).filter(Boolean),3);
  const multiDistribution = header => safeDistribution_(responseValues.reduce((items,row) => items.concat(value(row,header).split(';').map(item => item.trim()).filter(Boolean)),[]),3);

  const data = {
    ok:true,
    updatedAt:new Date().toISOString(),
    sampleSize:completed,
    overview:{registered:registered,completed:completed,pending:Math.max(0,registered-completed),completionRate:registered?Math.round(completed/registered*100):0},
    sections:sections,
    demographics:{gender:distribution('Gender'),preUniversity:distribution('PreUniversity')},
    academic:{computingSubject:distribution('ComputingSubject'),programmingExperience:distribution('ProgrammingExperience')},
    computing:{operatingSystem:distribution('OperatingSystem'),processorBrand:distribution('ProcessorBrand'),ram:distribution('RAM'),storageType:distribution('StorageType'),storageCapacity:distribution('StorageCapacity'),computerAge:safeDistribution_(responseValues.map(row => value(row,'ComputerAge') || String(row[40] || '').trim()).filter(Boolean),3),internetType:distribution('InternetType'),internetReliability:distribution('InternetReliability')},
    learning:{learningStyle:distribution('LearningStyle'),independentLearning:distribution('IndependentLearning'),assignmentHabit:distribution('AssignmentHabit'),groupComfort:distribution('GroupComfort'),digitalConfidence:distribution('DigitalConfidence'),materialPreference:multiDistribution('MaterialPreference')},
    digital:{githubExperience:distribution('GitHubExperience'),figmaExperience:distribution('FigmaExperience'),aiTools:multiDistribution('AITools'),software:multiDistribution('Software')},
    knowledge:{concepts:multiDistribution('ConceptKnowledge'),lifecycle:distribution('Lifecycle'),pipeline:distribution('Pipeline'),etl:distribution('ETL'),governanceEthics:distribution('GovernanceEthics')},
    profile:{
      character:themeDistribution_(responseValues.map(row => value(row,'Personality')),characterThemes_(),3),
      interests:themeDistribution_(responseValues.map(row => value(row,'Personality')),interestThemes_(),3),
      hobbies:themeDistribution_(responseValues.map(row => value(row,'Personality')),hobbyThemes_(),3),
      programmeReasons:themeDistribution_(responseValues.map(row => value(row,'ProgrammeReason')),programmeReasonThemes_(),3),
      careerInterests:themeDistribution_(responseValues.map(row => value(row,'CareerInterest')),careerInterestThemes_(),3),
      computingExposure:themeDistribution_(responseValues.map(row => value(row,'ComputingDetails')),computingThemes_(),3)
    },
    support:{
      additionalResponses:responseValues.filter(row => value(row,'AdditionalInfo')).length,
      themes:themeDistribution_(responseValues.map(row => value(row,'AdditionalInfo')),supportThemes_(),3),
      limitations:themeDistribution_(responseValues.map(row => value(row,'Limitations')),limitationThemes_(),3)
    }
  };
  data.insights = dashboardInsights_(data);
  return data;
}

function sumObject_(object) {
  return Object.keys(object).reduce((total,key) => total + Number(object[key] || 0),0);
}

function safeDistribution_(values, minimum) {
  const counts = {};
  values.forEach(item => counts[item] = (counts[item] || 0) + 1);
  let suppressed = 0;
  const items = Object.keys(counts).map(label => ({label:label,count:counts[label]})).filter(item => {
    if (item.count < minimum) { suppressed += item.count; return false; }
    return true;
  }).sort((a,b) => b.count-a.count || a.label.localeCompare(b.label));
  if (suppressed) items.push({label:'Other / suppressed',count:suppressed});
  return items;
}

function distributionCount_(items, pattern) {
  return (items || []).reduce((total,item) => pattern.test(item.label) ? total + Number(item.count || 0) : total,0);
}

function themeDistribution_(texts, definitions, minimum) {
  const counts = {};
  definitions.forEach(definition => counts[definition.label] = 0);
  texts.filter(Boolean).forEach(text => {
    definitions.forEach(definition => {
      if (definition.pattern.test(String(text))) counts[definition.label]++;
    });
  });
  let suppressed = 0;
  const results = definitions.map(definition => ({label:definition.label,count:counts[definition.label]})).filter(item => {
    if (item.count > 0 && item.count < minimum) { suppressed += item.count; return false; }
    return item.count >= minimum;
  }).sort((a,b) => b.count-a.count || a.label.localeCompare(b.label));
  if (suppressed) results.push({label:'Other / suppressed',count:suppressed});
  return results;
}

function characterThemes_() {
  return [
    {label:'Reserved or introverted',pattern:/introvert|reserved|not much talk|don.t talk|quiet/i},
    {label:'Sociable and cooperative',pattern:/sociable|social|network|cooperat|helpful|group|friends|others/i},
    {label:'Adaptable and open to new experiences',pattern:/adapt|new thing|new experience|trying|explor|challenge/i},
    {label:'Hardworking and self-improving',pattern:/hardwork|hard-working|improv|best|learn|motivated/i},
    {label:'Curious and reflective',pattern:/curious|wonder|think|behind the scene|how .* work/i},
    {label:'Creative',pattern:/creativ|draw|writing|original character|music/i}
  ];
}

function interestThemes_() {
  return [
    {label:'Technology and computing',pattern:/technology|computer|programming|coding|digital/i},
    {label:'Data, AI and privacy',pattern:/data|artificial intelligence|\bAI\b|privacy/i},
    {label:'Science and mathematics',pattern:/math|physics|astronomy|science/i},
    {label:'Personal development and networking',pattern:/skill|learn|network|connection|event|emcee|protocol/i}
  ];
}

function hobbyThemes_() {
  return [
    {label:'Sports and physical activities',pattern:/badminton|football|basketball|sport|calisthenics/i},
    {label:'Gaming',pattern:/game|gaming/i},
    {label:'Reading and visual stories',pattern:/read|comic|novel|webtoon|anime|drama/i},
    {label:'Chess and strategy',pattern:/chess|strategy/i},
    {label:'Music and creative activities',pattern:/music|draw|creative|writing/i},
    {label:'Travel and exploration',pattern:/travel|explor/i}
  ];
}

function programmeReasonThemes_() {
  return [
    {label:'Interest in data and data engineering',pattern:/data|database|analytics|analyst/i},
    {label:'Interest in technology',pattern:/technology|computer|digital|system/i},
    {label:'Career and job opportunities',pattern:/career|job|opportunit|industry|salary|demand/i},
    {label:'Interest in programming',pattern:/programming|coding|code|software/i},
    {label:'Desire to learn and build skills',pattern:/learn|knowledge|skill|understand|develop/i},
    {label:'Interest in AI',pattern:/artificial intelligence|\bAI\b|machine learning/i},
    {label:'Influence from family or others',pattern:/family|parent|recommend|friend|teacher/i}
  ];
}

function careerInterestThemes_() {
  return [
    {label:'Data Engineer',pattern:/data engineer|data engineering|engineer/i},
    {label:'Data Analyst or Business Intelligence',pattern:/data analyst|analyst|business intelligence|\bBI\b/i},
    {label:'Data Scientist',pattern:/data scientist|data science/i},
    {label:'AI or Machine Learning',pattern:/artificial intelligence|\bAI\b|machine learning/i},
    {label:'Software or System Development',pattern:/software|developer|development|system/i},
    {label:'Still exploring career options',pattern:/not .*decid|undecided|not sure|explor|don.t know/i}
  ];
}

function computingThemes_() {
  return [
    {label:'Formal computer science subject',pattern:/computer science|computing subject/i},
    {label:'Programming fundamentals',pattern:/programming|coding|java|python|language/i},
    {label:'Computer literacy or fundamentals',pattern:/computer literacy|computer fundamental|digital technology|fundamental/i},
    {label:'Database exposure',pattern:/database|sql/i},
    {label:'Limited or no formal background',pattern:/no |not .*related|never|none/i}
  ];
}

function supportThemes_() {
  return [
    {label:'Requests additional academic guidance',pattern:/guid|help|support|low .*knowledge|weak|gap/i},
    {label:'Motivated to improve',pattern:/try .*best|improv|overcom|learn|develop/i},
    {label:'Existing project or practical interest',pattern:/project|working on|development|module/i}
  ];
}

function limitationThemes_() {
  return [
    {label:'Device or software limitation',pattern:/device|computer|laptop|ram|storage|software|install/i},
    {label:'Internet limitation',pattern:/internet|wifi|wi-fi|connection|network/i},
    {label:'Time or workload concern',pattern:/time|schedule|workload|busy/i},
    {label:'No reported limitation',pattern:/none|no limitation|nothing|n\/a/i}
  ];
}

function dashboardInsights_(data) {
  const insights = [];
  const n = data.sampleSize || 1;
  const githubNew = distributionCount_(data.digital.githubExperience,/never used|heard of/i);
  const figmaNew = distributionCount_(data.digital.figmaExperience,/never used|heard of/i);
  const limitedRam = distributionCount_(data.computing.ram,/^(4|8) GB$/i);
  const unstableInternet = distributionCount_(data.computing.internetReliability,/unstable|unreliable/i);
  if (githubNew/n >= .4) insights.push({level:'Support recommended',title:'Begin GitHub with a guided practical',text:'A substantial share of current respondents have little or no GitHub experience.'});
  if (figmaNew/n >= .4) insights.push({level:'Support recommended',title:'Introduce Figma from the fundamentals',text:'Use a step-by-step demonstration before the dashboard design activity.'});
  if (limitedRam/n >= .25) insights.push({level:'Monitor',title:'Prefer lightweight and browser-based tools',text:'Some respondents may have limited memory for demanding local applications.'});
  if (unstableInternet/n >= .25) insights.push({level:'Monitor',title:'Provide downloadable learning materials',text:'Some respondents reported an occasionally unstable Internet connection.'});
  if (!insights.length) insights.push({level:'Current view',title:'Continue monitoring incoming responses',text:'The dashboard will update as more students complete the survey.'});
  return insights;
}
