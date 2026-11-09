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
['case-studies.html','Case Studies','core'],
['case-uber.html','Required: Uber','core'],
['case-kkm-covid-data.html','Required: KKM COVID-19 Data','core'],
['case-study-activity.html','Case-Study Task','core'],
['activity.html','Learning Activities','core'],
['quiz.html','Knowledge Check','core'],
['reflection.html','Reflection','core'],
['lecture-slides.html','Lecture Slides','lecture'],
['case-phe-excel.html','Public Health England','optional'],
['case-prime-video.html','Prime Video','optional'],
['case-airbnb-airflow.html','Airbnb and Airflow','optional'],
['case-linkedin-kafka.html','LinkedIn and Kafka','optional'],
['case-google-flu-trends.html','Google Flu Trends','optional'],
['original-papers.html','The Papers That Started It','extension'],
['big-data-hype-and-reality.html','Big Data: Hype and Reality','extension'],
['sql-comeback.html','The Comeback of SQL','extension'],
['reading-materials.html','Reading Materials','enrichment'],
['videos.html','Videos and Podcasts','enrichment'],
['glossary.html','Glossary','reference']];
const groupLabel={core:'Required pathway',optional:'Optional case studies',lecture:'Lecture',extension:'Extension pathway',enrichment:'Professional enrichment',reference:'Reference'};
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

// Lecture slide viewer
const sv=document.getElementById('slide-viewer');
if(sv){const total=+sv.dataset.total,img=document.getElementById('slide-image'),sel=document.getElementById('slide-select'),cnt=document.getElementById('slide-count'),thumbs=[...sv.querySelectorAll('.slide-thumb')],titles=[...sel.options].map(o=>o.textContent.replace(/^\d+ · /,''));let cur=1;
const pad=n=>String(n).padStart(2,'0');
const go=(n,push)=>{cur=Math.min(total,Math.max(1,n));img.src='assets/slides/slide-'+pad(cur)+'.webp';img.alt='Slide '+cur+': '+titles[cur-1];sel.value=cur;cnt.textContent=cur+' / '+total;thumbs.forEach(t=>t.classList.toggle('active',+t.dataset.slide===cur));const a=thumbs[cur-1];a&&a.scrollIntoView({block:'nearest',inline:'center'});if(push!==false)history.replaceState(null,'','#slide-'+cur);if(cur<total){const pre=new Image();pre.src='assets/slides/slide-'+pad(cur+1)+'.webp'}};
document.getElementById('slide-prev').onclick=()=>go(cur-1);document.getElementById('slide-next').onclick=()=>go(cur+1);
sel.onchange=()=>go(+sel.value);thumbs.forEach(t=>t.onclick=()=>go(+t.dataset.slide));
document.querySelectorAll('.slide-outline a').forEach(a=>a.onclick=e=>{e.preventDefault();go(+a.dataset.slide);sv.scrollIntoView({behavior:'smooth'})});
document.addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight'||e.key==='PageDown'){go(cur+1);e.preventDefault()}if(e.key==='ArrowLeft'||e.key==='PageUp'){go(cur-1);e.preventDefault()}});
let sx=null;img.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});img.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40)go(cur+(dx<0?1:-1));sx=null});
const fb=document.getElementById('slide-full');if(!sv.requestFullscreen)fb.hidden=true;fb.onclick=()=>document.fullscreenElement?document.exitFullscreen():sv.requestFullscreen();
const fromHash=()=>{const m=location.hash.match(/^#slide-(\d+)/);if(m&&+m[1]!==cur)go(+m[1],false)};window.addEventListener('hashchange',fromHash);const m=location.hash.match(/^#slide-(\d+)/);go(m?+m[1]:1,false)}
