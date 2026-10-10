const directory={'01':[],'02':[],'03':[],'04':[]};
let activeSection='01';
let loaded=false;
let currentPage=1;
const pageSize=10;
const rows=document.getElementById('studentRows');
const search=document.getElementById('studentSearch');
const empty=document.getElementById('emptyState');
const safe=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
const initials=name=>name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();

function social(value,type){
  if(!value)return '<span class="pending">Pending</span>';
  const href=type==='github'&&!/^https?:/i.test(value)?`https://github.com/${value}`:value;
  const label=type==='github'?'GH':type==='linkedin'?'in':'↗';
  return `<a class="social-link" href="${safe(href)}" target="_blank" rel="noopener" aria-label="Open ${type}">${label}</a>`;
}

function surveyStatus(value){
  const done=String(value||'').toLowerCase()==='done';
  return `<span class="survey-status ${done?'survey-done':'survey-pending'}">${done?'Done':'Pending'}</span>`;
}

function updateCounts(){
  const sections=['01','02','03','04'];
  sections.forEach(section=>document.getElementById(`section${section}Count`).textContent=directory[section].length);
  document.getElementById('totalStudents').textContent=sections.reduce((total,section)=>total+directory[section].length,0);
}

function render(){
  if(!loaded)return;
  const query=search.value.trim().toLowerCase();
  const list=directory[activeSection].filter(item=>!query||String(item.name).toLowerCase().includes(query));
  const totalPages=Math.max(1,Math.ceil(list.length/pageSize));
  currentPage=Math.min(currentPage,totalPages);
  const start=(currentPage-1)*pageSize;
  const visible=list.slice(start,start+pageSize);
  rows.innerHTML=visible.map((item,index)=>`<tr><td>${start+index+1}</td><td><div class="student-name"><span class="avatar">${safe(initials(item.name))}</span><div><b>${safe(item.name)}</b></div></div></td><td>${social(item.github,'github')}</td><td>${social(item.linkedin,'linkedin')}</td><td>${social(item.portfolio,'portfolio')}</td><td>${surveyStatus(item.survey)}</td></tr>`).join('');
  document.getElementById('sectionHeading').textContent=`Section ${activeSection}`;
  document.getElementById('resultCount').textContent=`${list.length} ${list.length===1?'student':'students'}`;
  empty.hidden=list.length!==0;
  document.querySelector('.table-wrap').hidden=list.length===0;
  renderPagination(totalPages,list.length);
}

function renderPagination(totalPages,totalRecords){
  const pagination=document.getElementById('studentPagination');
  if(!totalRecords){pagination.hidden=true;return;}
  pagination.hidden=false;
  const pageButtons=Array.from({length:totalPages},(_,index)=>{const page=index+1;return `<button type="button" class="${page===currentPage?'active':''}" data-page="${page}" aria-label="Page ${page}" aria-current="${page===currentPage?'page':'false'}">${page}</button>`}).join('');
  pagination.innerHTML=`<button type="button" data-page="${currentPage-1}" ${currentPage===1?'disabled':''}>Previous</button>${pageButtons}<span class="page-summary">Page ${currentPage} of ${totalPages}</span><button type="button" data-page="${currentPage+1}" ${currentPage===totalPages?'disabled':''}>Next</button>`;
  pagination.querySelectorAll('button:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{currentPage=Number(button.dataset.page);render();document.querySelector('.directory-panel').scrollIntoView({behavior:'smooth',block:'start'})}));
}

async function loadDirectory(){
  const url=(window.SCST1133_CONFIG||{}).apiUrl;
  if(!url){showLoadError('The Google Sheets service has not been configured.');return;}
  try{
    const response=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'student-directory'})});
    const result=await response.json();
    if(!response.ok||result.ok===false)throw new Error(result.message||result.error||'Unable to retrieve the student list.');
    ['01','02','03','04'].forEach(section=>directory[section]=Array.isArray(result.students?.[section])?result.students[section]:[]);
    loaded=true;updateCounts();render();
  }catch(error){showLoadError(error.message||'Unable to connect to Google Sheets.');}
}

function showLoadError(text){
  loaded=false;rows.innerHTML='';document.querySelector('.table-wrap').hidden=true;document.getElementById('studentPagination').hidden=true;empty.hidden=false;
  empty.innerHTML=`<b>Student data could not be loaded</b><p>${safe(text)} Please reload the page after checking the Apps Script deployment.</p>`;
  document.getElementById('resultCount').textContent='Unavailable';
}

document.querySelectorAll('[data-section]').forEach(button=>button.addEventListener('click',()=>{
  activeSection=button.dataset.section;currentPage=1;
  document.querySelectorAll('[data-section]').forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-selected',selected)});
  render();
}));
search.addEventListener('input',()=>{currentPage=1;render()});
loadDirectory();
