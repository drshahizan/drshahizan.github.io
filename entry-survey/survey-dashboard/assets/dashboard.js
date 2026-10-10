const apiUrl=(window.SCST1133_CONFIG||{}).apiUrl;
const byId=id=>document.getElementById(id);
const safe=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
const menu=document.querySelector('.dashboard-menu');
if(menu&&!menu.querySelector('[href="student-profile.html"]')){
  const insights=menu.querySelector('[href="teaching-insights.html"]');
  const profile=document.createElement('a');profile.href='student-profile.html';profile.textContent='Profile';
  const support=document.createElement('a');support.href='support-needs.html';support.textContent='Support';
  menu.insertBefore(profile,insights);menu.insertBefore(support,insights);
  const current=location.pathname.split('/').pop();menu.querySelectorAll('a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===current));
}

function renderBars(id,items){
  const target=byId(id);if(!target)return;
  if(typeof items==='undefined'){target.innerHTML='<div class="empty-chart">Backend update required. Redeploy the latest Code.gs as a new version.</div>';return;}
  const data=Array.isArray(items)?items:[];
  if(!data.length){target.innerHTML='<div class="empty-chart">Insufficient aggregated data</div>';return;}
  const max=Math.max(...data.map(item=>Number(item.count)||0),1);
  target.innerHTML=data.slice(0,10).map(item=>`<div class="bar-item"><span class="bar-label">${safe(item.label)}</span><span class="bar-track"><i style="width:${Math.max(3,(Number(item.count)||0)/max*100)}%"></i></span><span class="bar-count">${Number(item.count)||0}</span></div>`).join('');
}

function renderSections(items){
  const target=byId('sectionChart');if(!target)return;
  target.innerHTML=(items||[]).map(item=>{const total=Math.max(1,Number(item.registered)||0);const done=Number(item.completed)||0;const pending=Number(item.pending)||0;return `<div class="section-row"><b>Section ${safe(item.section)}</b><div class="stack" title="${done} completed, ${pending} pending"><span class="done" style="width:${done/total*100}%">${done||''}</span><span class="pending" style="width:${pending/total*100}%">${pending||''}</span></div><small>${Number(item.rate)||0}%</small></div>`}).join('');
}

function renderInsights(items){
  const target=byId('insightGrid');if(!target)return;
  target.innerHTML=(items||[]).map(item=>`<article class="insight" data-level="${safe(item.level)}"><span>${safe(item.level)}</span><h3>${safe(item.title)}</h3><p>${safe(item.text)}</p></article>`).join('');
}

function showDashboard(data){
  if(byId('sampleSize'))byId('sampleSize').textContent=Number(data.sampleSize)||0;
  const updated=new Date(data.updatedAt);if(byId('updatedAt'))byId('updatedAt').textContent=Number.isNaN(updated.getTime())?'Updated recently':`Updated ${updated.toLocaleString('en-MY',{dateStyle:'medium',timeStyle:'short'})}`;
  if(byId('registeredCount'))byId('registeredCount').textContent=Number(data.overview?.registered)||0;
  if(byId('completedCount'))byId('completedCount').textContent=Number(data.overview?.completed)||0;
  if(byId('pendingCount'))byId('pendingCount').textContent=Number(data.overview?.pending)||0;
  const rate=Number(data.overview?.completionRate)||0;if(byId('completionRate'))byId('completionRate').textContent=`${rate}%`;if(byId('completionBar'))byId('completionBar').style.width=`${rate}%`;
  renderSections(data.sections);
  const charts={
    preUniversityChart:data.demographics?.preUniversity,computingSubjectChart:data.academic?.computingSubject,programmingChart:data.academic?.programmingExperience,
    osChart:data.computing?.operatingSystem,processorChart:data.computing?.processorBrand,ramChart:data.computing?.ram,storageChart:data.computing?.storageType,computerAgeChart:data.computing?.computerAge,internetTypeChart:data.computing?.internetType,internetReliabilityChart:data.computing?.internetReliability,
    learningStyleChart:data.learning?.learningStyle,independentChart:data.learning?.independentLearning,groupChart:data.learning?.groupComfort,confidenceChart:data.learning?.digitalConfidence,materialsChart:data.learning?.materialPreference,
    githubChart:data.digital?.githubExperience,figmaChart:data.digital?.figmaExperience,aiToolsChart:data.digital?.aiTools,softwareChart:data.digital?.software,
    conceptChart:data.knowledge?.concepts,lifecycleChart:data.knowledge?.lifecycle,pipelineChart:data.knowledge?.pipeline,etlChart:data.knowledge?.etl,governanceChart:data.knowledge?.governanceEthics,
    characterChart:data.profile?.character,interestChart:data.profile?.interests,hobbyChart:data.profile?.hobbies,programmeReasonChart:data.profile?.programmeReasons,careerInterestChart:data.profile?.careerInterests,computingExposureChart:data.profile?.computingExposure,
    supportThemeChart:data.support?.themes,limitationChart:data.support?.limitations
  };
  Object.entries(charts).forEach(([id,items])=>renderBars(id,items));
  renderInsights(data.insights);
  if(byId('additionalResponseCount'))byId('additionalResponseCount').textContent=Number(data.support?.additionalResponses)||0;
  byId('loading').hidden=true;byId('dashboard').hidden=false;
}

function showError(message){byId('loading').hidden=true;byId('errorState').hidden=false;byId('errorMessage').textContent=message;}

async function loadDashboard(){
  if(!apiUrl){showError('The Google Apps Script URL has not been configured.');return;}
  try{
    const response=await fetch(apiUrl,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'survey-dashboard'})});
    const result=await response.json();
    if(!response.ok||result.ok===false)throw new Error(result.error||result.message||'Unable to retrieve dashboard data.');
    showDashboard(result);
  }catch(error){showError(error.message||'Unable to connect to the survey service.');}
}
loadDashboard();
