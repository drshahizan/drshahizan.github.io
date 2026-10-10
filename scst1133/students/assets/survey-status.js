const statusData=[];
let statusLoaded=false;
let sectionFilter='all';
let completionFilter='all';
let statusPage=1;
const statusPageSize=10;
const statusRows=document.getElementById('statusRows');
const statusSearch=document.getElementById('statusSearch');
const esc=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
const getDone=item=>String(item.survey||'').toLowerCase()==='done';

function updateSummary(){
  const total=statusData.length;
  const done=statusData.filter(getDone).length;
  const pending=total-done;
  const rate=total?Math.round(done/total*100):0;
  document.getElementById('statusTotal').textContent=total;
  document.getElementById('statusDone').textContent=done;
  document.getElementById('statusPending').textContent=pending;
  document.getElementById('statusRate').textContent=`${rate}%`;
  document.getElementById('completionFill').style.width=`${rate}%`;
}

function filteredStudents(){
  const query=statusSearch.value.trim().toLowerCase();
  return statusData.filter(item=>(sectionFilter==='all'||item.section===sectionFilter)&&(completionFilter==='all'||(completionFilter==='done')===getDone(item))&&(!query||String(item.name).toLowerCase().includes(query)));
}

function renderStatus(){
  if(!statusLoaded)return;
  const list=filteredStudents();
  const pages=Math.max(1,Math.ceil(list.length/statusPageSize));
  statusPage=Math.min(statusPage,pages);
  const start=(statusPage-1)*statusPageSize;
  const visible=list.slice(start,start+statusPageSize);
  statusRows.innerHTML=visible.map((item,index)=>{const done=getDone(item);return `<tr><td>${start+index+1}</td><td><b>${esc(item.name)}</b></td><td><span class="section-badge">Section ${esc(item.section)}</span></td><td><span class="survey-state ${done?'done':'pending'}">${done?'Done':'Pending'}</span></td></tr>`}).join('');
  document.getElementById('visibleCount').textContent=`${list.length} ${list.length===1?'student':'students'}`;
  document.getElementById('statusView').textContent=`${sectionFilter==='all'?'All sections':`Section ${sectionFilter}`} · ${completionFilter==='all'?'All statuses':completionFilter==='done'?'Completed':'Pending'}`;
  document.getElementById('statusEmpty').hidden=list.length!==0;
  document.querySelector('.status-table-wrap').hidden=list.length===0;
  renderStatusPagination(pages,list.length);
}

function renderStatusPagination(pages,total){
  const nav=document.getElementById('statusPagination');
  if(!total){nav.hidden=true;return;}
  nav.hidden=false;
  const buttons=Array.from({length:pages},(_,i)=>`<button type="button" class="${i+1===statusPage?'active':''}" data-page="${i+1}">${i+1}</button>`).join('');
  nav.innerHTML=`<button type="button" data-page="${statusPage-1}" ${statusPage===1?'disabled':''}>Previous</button>${buttons}<span class="page-summary">Page ${statusPage} of ${pages}</span><button type="button" data-page="${statusPage+1}" ${statusPage===pages?'disabled':''}>Next</button>`;
  nav.querySelectorAll('button:not(:disabled)').forEach(button=>button.addEventListener('click',()=>{statusPage=Number(button.dataset.page);renderStatus();document.querySelector('.status-panel').scrollIntoView({behavior:'smooth',block:'start'})}));
}

async function loadSurveyStatus(){
  const url=(window.SCST1133_CONFIG||{}).apiUrl;
  if(!url){showStatusError('The Google Sheets service has not been configured.');return;}
  try{
    const response=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'student-directory'})});
    const result=await response.json();
    if(!response.ok||result.ok===false)throw new Error(result.message||result.error||'Unable to retrieve survey status.');
    ['01','02','03','04'].forEach(section=>(Array.isArray(result.students?.[section])?result.students[section]:[]).forEach(student=>statusData.push({...student,section})));
    statusLoaded=true;updateSummary();renderStatus();
  }catch(error){showStatusError(error.message||'Unable to connect to Google Sheets.');}
}

function showStatusError(message){
  document.querySelector('.status-table-wrap').hidden=true;
  document.getElementById('statusPagination').hidden=true;
  const empty=document.getElementById('statusEmpty');empty.hidden=false;empty.innerHTML=`<b>Survey status could not be loaded</b><p>${esc(message)} Please check the Apps Script deployment and reload this page.</p>`;
  document.getElementById('visibleCount').textContent='Unavailable';
}

document.querySelectorAll('[data-section-filter]').forEach(button=>button.addEventListener('click',()=>{sectionFilter=button.dataset.sectionFilter;statusPage=1;document.querySelectorAll('[data-section-filter]').forEach(item=>item.classList.toggle('active',item===button));renderStatus()}));
document.querySelectorAll('[data-status-filter]').forEach(button=>button.addEventListener('click',()=>{completionFilter=button.dataset.statusFilter;statusPage=1;document.querySelectorAll('[data-status-filter]').forEach(item=>item.classList.toggle('active',item===button));renderStatus()}));
statusSearch.addEventListener('input',()=>{statusPage=1;renderStatus()});
loadSurveyStatus();
