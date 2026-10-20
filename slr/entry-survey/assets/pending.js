(()=>{'use strict';
const $=id=>document.getElementById(id),api=window.SLR_CONFIG?.apiUrl||'',keyStorage='slr_cohort1_facilitator_key';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let participants=[];
function setMessage(text,kind=''){const el=$('accessMessage');el.textContent=text;el.className='access-message'+(kind?' '+kind:'')}
function showError(text){$('errorMessage').textContent=text;$('pageError').classList.remove('hidden');$('pendingResults').classList.add('hidden')}
function render(){
 const query=$('nameSearch').value.trim().toLowerCase(),status=$('statusFilter').value;
 const list=participants.filter(person=>(status==='all'||person.status===status)&&String(person.fullName||'').toLowerCase().includes(query));
 $('participantRows').innerHTML=list.map(person=>`<tr><td data-label="Participant">${esc(person.fullName)}</td><td data-label="Category">${esc(person.participantType||'Participant')}</td><td data-label="Status"><span class="status-pill ${person.status==='Draft'?'draft':'not-started'}">${person.status==='Draft'?'Draft saved':'Not started'}</span></td><td data-label="Last saved">${person.draftSavedAt?esc(new Date(person.draftSavedAt).toLocaleString()):'—'}</td></tr>`).join('');
 $('emptyList').classList.toggle('hidden',list.length>0);
}
function showData(data){
 if(!data||data.ok!==true||!Array.isArray(data.participants))throw new Error(data?.error||'The survey service returned an unexpected response.');
 participants=data.participants;
 const counts=data.counts||{},total=Number(data.total??participants.length);
 $('pendingKpis').innerHTML=`<article class="pending-kpi"><span>Incomplete participants</span><strong>${total}</strong></article><article class="pending-kpi draft"><span>Draft saved</span><strong>${Number(counts.draft||0)}</strong></article><article class="pending-kpi started"><span>Not started</span><strong>${Number(counts.notStarted||0)}</strong></article>`;
 $('statusText').textContent=`${data.cohort||'Cohort 1'} · Updated ${new Date(data.generatedAt||Date.now()).toLocaleString()}`;
 $('generatedNote').textContent='This list includes registered Cohort 1 participants with a Draft or Not started status. Submitted responses are excluded.';
 $('pendingResults').classList.remove('hidden');$('pageError').classList.add('hidden');render();
}
async function load(key){
 $('loadButton').disabled=true;$('refreshBtn').disabled=true;$('pageError').classList.add('hidden');setMessage('Checking facilitator access…');
 if(!api){setMessage('Survey API is not configured. Check ../assets/config.js.');$('loadButton').disabled=false;$('refreshBtn').disabled=false;return}
 try{
  const response=await fetch(api,{method:'POST',cache:'no-store',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'slr-survey-pending-participants',facilitatorKey:key})});
  if(!response.ok)throw new Error(`Survey service returned HTTP ${response.status}.`);
  const data=await response.json();
  if(!data.ok){if(/key|access/i.test(data.error||'')){sessionStorage.removeItem(keyStorage)}throw new Error(data.error||'The request was not accepted.');}
  sessionStorage.setItem(keyStorage,key);$('accessCard').classList.add('hidden');setMessage('');showData(data);
 }catch(error){setMessage(error.message);showError(`${error.message} Confirm that the latest EntrySurvey.gs has been deployed and the facilitator key is configured.`)}
 finally{$('loadButton').disabled=false;$('refreshBtn').disabled=false}
}
$('accessForm').addEventListener('submit',event=>{event.preventDefault();const key=$('facilitatorKey').value.trim();if(!key){setMessage('Enter the facilitator access key.');return}load(key)});
$('refreshBtn').addEventListener('click',()=>{const key=sessionStorage.getItem(keyStorage);if(key)load(key);else{$('accessCard').classList.remove('hidden');$('pendingResults').classList.add('hidden')}});
$('changeKeyBtn').addEventListener('click',()=>{sessionStorage.removeItem(keyStorage);participants=[];$('pendingResults').classList.add('hidden');$('accessCard').classList.remove('hidden');$('facilitatorKey').value='';setMessage('Enter the replacement facilitator key.');$('facilitatorKey').focus()});
$('retryBtn').addEventListener('click',()=>{const key=sessionStorage.getItem(keyStorage);$('pageError').classList.add('hidden');if(key)load(key);else{$('accessCard').classList.remove('hidden');$('facilitatorKey').focus()}});
$('nameSearch').addEventListener('input',render);$('statusFilter').addEventListener('change',render);
const existingKey=sessionStorage.getItem(keyStorage);if(existingKey)load(existingKey);
})();
