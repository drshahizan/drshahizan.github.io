const moduleNav=document.querySelector('.module-nav'),topNav=document.querySelector('.top-nav');
document.querySelector('.menu')?.addEventListener('click',()=>topNav?.classList.toggle('open'));
const pages=[
['index.html','Overview','core'],
['what-is-data-engineering.html','What Is Data Engineering?','core'],
['evolution.html','Evolution of the Field','core'],
['de-and-data-science.html','Data Engineering and Data Science','core'],
['lifecycle-at-a-glance.html','The Lifecycle at a Glance','core'],
['undercurrents.html','The Six Undercurrents','core'],
['skills-and-balancing-act.html','Skills and the Balancing Act','core'],
['technical-toolkit.html','The Technical Toolkit','core'],
['future-of-data-engineering.html','The Future of Data Engineering','core'],
['activity.html','Learning Activities','core'],
['quiz.html','Knowledge Check','core'],
['reflection.html','Reflection','core'],
['original-papers.html','The Papers That Started It','extension'],
['big-data-hype-and-reality.html','Big Data: Hype and Reality','extension'],
['sql-comeback.html','The Comeback of SQL','extension'],
['reading-materials.html','Reading Materials','enrichment'],
['videos.html','Videos and Podcasts','enrichment'],
['glossary.html','Glossary','reference']];
const groupLabel={core:'Required pathway',extension:'Extension pathway',enrichment:'Professional enrichment',reference:'Reference'};
const current=location.pathname.split('/').pop()||'index.html';
if(moduleNav){let g='';moduleNav.innerHTML=pages.map((p,i)=>{const h=p[2]!==g?(g=p[2],'<p class="nav-group">'+groupLabel[g]+'</p>'):'';return h+'<a href="'+p[0]+'" class="'+(current===p[0]?'active':'')+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+p[1]+'</a>'}).join('')}
const pos=Math.max(1,pages.findIndex(p=>p[0]===current)+1);document.documentElement.style.setProperty('--progress',pos/pages.length*100+'%');
const tracker=document.getElementById('evidence-tracker');
if(tracker){const key='scst1133-topic03-evidence',boxes=[...tracker.querySelectorAll('input')];let saved=[];try{saved=JSON.parse(localStorage.getItem(key)||'[]')}catch(e){}const update=()=>{document.getElementById('tracker-progress').textContent=boxes.filter(x=>x.checked).length+' of '+boxes.length+' evidence items completed.'};boxes.forEach((b,i)=>{b.checked=!!saved[i];b.onchange=()=>{saved=boxes.map(x=>x.checked);try{localStorage.setItem(key,JSON.stringify(saved))}catch(e){}update()}});update()}
const imgs=[...document.querySelectorAll('.zoomable-image')];
if(imgs.length){const d=document.createElement('dialog');d.className='image-lightbox';d.innerHTML='<button type="button" aria-label="Close image">×</button><img alt="">';document.body.appendChild(d);const open=i=>{d.querySelector('img').src=i.src;d.querySelector('img').alt=i.alt;d.showModal()};imgs.forEach(i=>{i.title='Click to view full size';i.onclick=()=>open(i);i.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}}});d.querySelector('button').onclick=()=>d.close();d.onclick=e=>{if(e.target===d)d.close()}}
document.querySelectorAll('.copy-button').forEach(b=>b.addEventListener('click',async()=>{const t=document.getElementById(b.dataset.copyTarget)?.textContent||'';try{await navigator.clipboard.writeText(t);const old=b.textContent;b.textContent='Copied ✓';setTimeout(()=>b.textContent=old,1800)}catch{b.textContent='Select and copy the template below'}}));
const search=document.getElementById('glossary-search');
if(search)search.oninput=()=>{let n=0;document.querySelectorAll('#glossary-table tbody tr').forEach(r=>{const ok=r.textContent.toLowerCase().includes(search.value.toLowerCase());r.hidden=!ok;if(ok)n++});document.getElementById('glossary-empty').hidden=n!==0};
const qf=document.getElementById('topic-quiz');
if(qf){qf.onsubmit=e=>{e.preventDefault();let score=0,answered=0;const qs=[...qf.querySelectorAll('.quiz-question')];qs.forEach(q=>{const p=q.querySelector('input:checked'),f=q.querySelector('.quiz-feedback');q.classList.remove('correct','incorrect');if(!p){f.textContent='Select an answer.';return}answered++;const ok=+p.value===+q.dataset.answer;if(ok){score++;q.classList.add('correct');f.textContent='Correct. '+q.dataset.feedback}else{q.classList.add('incorrect');f.textContent='Review: '+q.dataset.feedback}});const r=document.getElementById('quiz-result');r.hidden=false;const pct=score/qs.length;r.innerHTML='<strong>'+score+' / '+qs.length+'</strong><span>'+(answered<qs.length?'Complete every question for a full result.':pct>=.85?'Excellent understanding.':pct>=.6?'Good progress—review the feedback.':'Revisit the required pathway and try again.')+'</span>';r.scrollIntoView({behavior:'smooth',block:'center'})};qf.onreset=()=>setTimeout(()=>{qf.querySelectorAll('.quiz-question').forEach(q=>{q.classList.remove('correct','incorrect');q.querySelector('.quiz-feedback').textContent=''});document.getElementById('quiz-result').hidden=true},0)}
