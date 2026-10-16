(()=>{'use strict';
const api=window.SLR_CONFIG?.apiUrl||'',Q=window.SLR_SURVEY_QUESTIONS,sections=Q.sections;let person=null,answers={},step=0,locked=false,credential=null;
const $=id=>document.getElementById(id),msg=t=>{$('message').textContent=t||'';};
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sectionQuestions=i=>i===5?(person?.participantType==='Academic Staff'?Q.staff:Q.student):sections[i].questions;
async function post(action,extra={}){if(!api)throw Error('Apps Script API URL is missing in ../assets/config.js');const r=await fetch(api,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action,identityNumber:credential.identityNumber,...extra})});const d=await r.json();if(d.ok===false||d.success===false)throw Error(d.error||d.message||'Request failed');if(action==='slr-survey-verify'&&!d.participant)throw Error('Apps Script verification response is missing participant information. Please check that EntrySurvey.gs is deployed and the slr-survey-verify action is routed in doPost().');if(!d.ok&&d.ok!==undefined)throw Error(d.error||'Request failed');return d}
function draw(){
 const sec=sections[step];$('stepTitle').textContent=`Section ${sec.id} · ${sec.title}`;$('stepNumber').textContent=`${step+1} of ${sections.length}`;$('progressFill').style.width=((step+1)/sections.length*100)+'%';
 const all=sectionQuestions(step),isKnowledge=step===6;
 $('questionArea').innerHTML=(step===0?`<div class="question"><label>Proposed SLR topic or research area (optional)<input id="researchArea" value="${safe(answers.researchArea||'')}" placeholder="Your research topic"></label></div>`:'')+`<div class="survey-question-grid">`+all.map(q=>{
  const value=answers[q.id],choices=q.type==='scale'?['1','2','3','4','5']:q.options;
  const isMulti=q.type==='multi';
  const field=isMulti?`<div class="multi-choice" role="group" aria-label="${safe(q.label)}"><details class="multi-picker"><summary>${Array.isArray(value)&&value.length?`${value.length} selected · ${safe(value.slice(0,2).join(', '))}${value.length>2?'…':''}`:'Select one or more options'}</summary><div class="multi-options">${choices.map(o=>`<label class="option"><input type="checkbox" name="${q.id}" value="${safe(o)}" ${Array.isArray(value)&&value.includes(o)?'checked':''}><span>${safe(o)}</span></label>`).join('')}</div></details></div>`:
  `<select name="${q.id}" aria-label="${safe(q.label)}" required><option value="">Select an answer</option>${choices.map(o=>`<option value="${safe(o)}" ${value===o?'selected':''}>${safe(o)}</option>`).join('')}</select>`;
  return `<div class="question" data-q="${q.id}"><h3>${q.id.toUpperCase()} · ${safe(q.label)} <span class="req">*</span></h3>${field}${q.type==='scale'?'<p class="help">1 = Not confident / not familiar · 5 = Very confident / very familiar</p>':''}</div>`;
 }).join('')+`</div>`+(isKnowledge?'<p class="help">Correct answers and scores will not be shown after submission.</p>':'');
 $('prevBtn').disabled=step===0;$('nextBtn').classList.toggle('hidden',step===sections.length-1);$('submitBtn').classList.toggle('hidden',step!==sections.length-1);
 document.querySelectorAll('.multi-picker input').forEach(input=>input.addEventListener('change',()=>{
  const picker=input.closest('.multi-picker');const selected=[...picker.querySelectorAll('input:checked')];
  if(input.checked&&input.value==='None')selected.filter(x=>x!==input).forEach(x=>x.checked=false);
  else if(input.checked)picker.querySelector('input[value="None"]')?.checked&&(picker.querySelector('input[value="None"]').checked=false);
  const now=[...picker.querySelectorAll('input:checked')].map(x=>x.value);
  picker.querySelector('summary').textContent=now.length?`${now.length} selected · ${now.slice(0,2).join(', ')}${now.length>2?'…':''}`:'Select one or more options';
 }));
}
function collect(){if(step===0)answers.researchArea=$('researchArea')?.value.trim()||'';for(const q of sectionQuestions(step)){const chosen=q.type==='multi'?[...document.querySelectorAll(`input[name="${q.id}"]:checked`)].map(x=>x.value):[];answers[q.id]=q.type==='multi'?chosen:(document.querySelector(`select[name="${q.id}"]`)?.value||'')}}
function validateCurrent(){const missing=sectionQuestions(step).filter(q=>Array.isArray(answers[q.id])?!answers[q.id].length:!answers[q.id]);if(missing.length)throw Error('Please answer all questions in this section before continuing.');}
function validateAll(){for(let i=0;i<sections.length;i++)for(const q of sectionQuestions(i))if(Array.isArray(answers[q.id])?!answers[q.id].length:!answers[q.id])throw Error('Please complete all 28 required questions before final submission.')}
async function saveDraft(){collect();const d=await post('slr-survey-save',{answers});$('surveyStatus').textContent='Draft saved';$('saveInfo').textContent='Draft saved to Google Sheets · '+new Date().toLocaleString();return d}
$('verifyForm').addEventListener('submit',async e=>{e.preventDefault();msg('');const identityNumber=$('identity').value.trim();credential={identityNumber};try{const d=await post('slr-survey-verify');person=d.participant;answers=d.answers||{};locked=d.status==='Submitted';$('personName').textContent=person.fullName;$('personMeta').textContent=`${person.participantType} · Cohort 1 · ${person.researchGroup||''}`;$('verifyLanding').classList.add('hidden');if(locked){$('donePanel').classList.remove('hidden');$('doneName').textContent=person.fullName;return}$('surveyPanel').classList.remove('hidden');$('surveyStatus').textContent=d.status||'Not started';step=Math.max(0,Math.min(6,Number(d.lastCompletedSection||0)));draw()}catch(err){msg(err.message)}});

$('prevBtn').addEventListener('click',()=>{collect();if(step>0)step--;draw();msg('')});
$('nextBtn').addEventListener('click',async()=>{
 const btn=$('nextBtn');if(btn.disabled)return;
 try{
  collect();validateCurrent();
  btn.disabled=true;btn.textContent='Saving…';msg('Saving your answers…');
  await saveDraft();
  step++;draw();msg('');
 }catch(err){msg('Could not save your answers. Please try Next again. '+err.message)}
 finally{btn.disabled=false;btn.textContent='Next →'}
});
$('submitBtn').addEventListener('click',async()=>{try{collect();validateAll();if(!confirm('Final submission cannot be edited. Submit your Entry Survey now?'))return;const d=await post('slr-survey-submit',{answers});$('surveyPanel').classList.add('hidden');$('donePanel').classList.remove('hidden');$('doneName').textContent=person.fullName;msg('')}catch(err){msg(err.message)}});
})();