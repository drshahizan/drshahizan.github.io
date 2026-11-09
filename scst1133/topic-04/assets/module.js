const moduleNav=document.querySelector('.module-nav'),topNav=document.querySelector('.top-nav');
document.querySelector('.menu')?.addEventListener('click',()=>topNav?.classList.toggle('open'));
const pages=[
['index.html','Overview','core'],
['collection-methods.html','Two Families of Methods','collect'],
['interviews.html','Interviews','collect'],
['stories-and-jad.html','Stories and JAD','collect'],
['questionnaires.html','Questionnaires','collect'],
['sampling.html','Sampling','collect'],
['investigation.html','Investigation','collect'],
['observation.html','Observation and STROBE','collect'],
['source-systems.html','Data from Source Systems','collect'],
['design-thinking.html','What Is Design Thinking?','design'],
['empathise-and-define.html','Empathise and Define','design'],
['ideate.html','Ideate','design'],
['prototype-and-test.html','Prototype and Test','design'],
['data-types.html','Types of Data','landscape'],
['data-organisation.html','Data Organisation','landscape'],
['batch-and-real-time.html','Batch and Real-Time Processing','landscape'],
['databases.html','Why Databases?','landscape'],
['case-campus-parking.html','Case: UTM Campus Parking','apply'],
['case-study-task.html','Case-Study Task','apply'],
['activity.html','Learning Activities','apply'],
['quiz.html','Knowledge Check','apply'],
['reflection.html','Reflection','apply'],
['reading-materials.html','Reading Materials','enrichment'],
['videos.html','Videos','enrichment'],
['glossary.html','Glossary','reference']];
const groupLabel={core:'Start here',collect:'Part A · Collect',design:'Part B · Design',landscape:'Part C · Data landscape',apply:'Apply and assess',enrichment:'Professional enrichment',reference:'Reference'};
const current=location.pathname.split('/').pop()||'index.html';
if(moduleNav){let g='';moduleNav.innerHTML=pages.map((p,i)=>{const h=p[2]!==g?(g=p[2],'<p class="nav-group">'+groupLabel[g]+'</p>'):'';return h+'<a href="'+p[0]+'" class="'+(current===p[0]?'active':'')+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+p[1]+'</a>'}).join('')}
const pos=Math.max(1,pages.findIndex(p=>p[0]===current)+1);document.documentElement.style.setProperty('--progress',pos/pages.length*100+'%');
const store={get(k){try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
document.querySelectorAll('[data-store]').forEach(box=>{const key='scst1133-topic04-'+box.dataset.store,inputs=[...box.querySelectorAll('input[type=checkbox]')],out=box.parentElement.querySelector('.tracker-progress');let saved=store.get(key);const update=()=>{if(out)out.textContent=inputs.filter(x=>x.checked).length+' of '+inputs.length+' items completed.'};inputs.forEach((b,i)=>{b.checked=!!saved[i];b.onchange=()=>{saved=inputs.map(x=>x.checked);store.set(key,saved);update()}});update()});
const imgs=[...document.querySelectorAll('.zoomable-image')];
if(imgs.length){const d=document.createElement('dialog');d.className='image-lightbox';d.innerHTML='<button type="button" aria-label="Close image">×</button><img alt="">';document.body.appendChild(d);const open=i=>{d.querySelector('img').src=i.src;d.querySelector('img').alt=i.alt;d.showModal()};imgs.forEach(i=>{i.title='Click to view full size';i.onclick=()=>open(i);i.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}}});d.querySelector('button').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()}}
document.querySelectorAll('.copy-button').forEach(b=>b.addEventListener('click',async()=>{const t=document.getElementById(b.dataset.copyTarget)?.textContent||'';try{await navigator.clipboard.writeText(t);const old=b.textContent;b.textContent='Copied ✓';setTimeout(()=>b.textContent=old,1800)}catch{b.textContent='Select and copy the template below'}}));
const search=document.getElementById('glossary-search');
if(search)search.oninput=()=>{let n=0;document.querySelectorAll('#glossary-table tbody tr').forEach(r=>{const ok=r.textContent.toLowerCase().includes(search.value.toLowerCase());r.hidden=!ok;if(ok)n++});document.getElementById('glossary-empty').hidden=n!==0};
// Sample-size calculator (Kendall & Kendall method)
const calc=document.getElementById('sample-calc');
if(calc){const f=()=>{const p=parseFloat(calc.querySelector('#ss-p').value)/100,i=parseFloat(calc.querySelector('#ss-i').value),z=parseFloat(calc.querySelector('#ss-z').value),o=calc.querySelector('.calc-out');if(!(p>0&&p<1&&i>0&&z>0)){o.innerHTML='<span>Enter a proportion between 0 and 100%, and an interval estimate greater than 0.</span>';return}const sp=i/z,n=p*(1-p)/(sp*sp)+1;o.innerHTML='<span>Standard error of the proportion: σ<sub>p</sub> = i ÷ z = '+i+' ÷ '+z+' = <b>'+sp.toFixed(4)+'</b></span><span>n = p(1 − p) ÷ σ<sub>p</sub>² + 1 = '+p.toFixed(2)+' × '+(1-p).toFixed(2)+' ÷ '+(sp*sp).toFixed(6)+' + 1 = '+n.toFixed(2)+'</span><span>Recommended sample size (round up):</span><strong>'+Math.ceil(n)+'</strong>'};calc.querySelectorAll('input,select').forEach(x=>x.addEventListener('input',f));f()}
// Click-to-sort exercises
document.querySelectorAll('.sorter').forEach(s=>{const items=[...s.querySelectorAll('.sort-item')],score=s.querySelector('.sort-score');const upd=()=>{const done=items.filter(x=>x.classList.contains('correct')||x.classList.contains('incorrect')),ok=items.filter(x=>x.classList.contains('correct'));if(score)score.textContent=ok.length+' correct out of '+done.length+' answered ('+items.length+' items).'};items.forEach(it=>{const fb=it.querySelector('.fb');it.querySelectorAll('button[data-choice]').forEach(b=>b.onclick=()=>{const ok=b.dataset.choice===it.dataset.answer;it.classList.remove('correct','incorrect');it.classList.add(ok?'correct':'incorrect');if(fb)fb.textContent=(ok?'Correct. ':'Not quite. ')+(it.dataset.why||'');upd()})});upd()});
const qf=document.getElementById('topic-quiz');
if(qf){qf.onsubmit=e=>{e.preventDefault();let score=0,answered=0;const qs=[...qf.querySelectorAll('.quiz-question')];qs.forEach(q=>{const p=q.querySelector('input:checked'),f=q.querySelector('.quiz-feedback');q.classList.remove('correct','incorrect');if(!p){f.textContent='Select an answer.';return}answered++;const ok=+p.value===+q.dataset.answer;if(ok){score++;q.classList.add('correct');f.textContent='Correct. '+q.dataset.feedback}else{q.classList.add('incorrect');f.textContent='Review: '+q.dataset.feedback}});const r=document.getElementById('quiz-result');r.hidden=false;const pct=score/qs.length;r.innerHTML='<strong>'+score+' / '+qs.length+'</strong><span>'+(answered<qs.length?'Complete every question for a full result.':pct>=.85?'Excellent understanding.':pct>=.6?'Good progress—review the feedback.':'Revisit Parts A–C and try again.')+'</span>';r.scrollIntoView({behavior:'smooth',block:'center'})};qf.onreset=()=>setTimeout(()=>{qf.querySelectorAll('.quiz-question').forEach(q=>{q.classList.remove('correct','incorrect');q.querySelector('.quiz-feedback').textContent=''});document.getElementById('quiz-result').hidden=true},0)}
