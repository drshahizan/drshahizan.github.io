const moduleNav=document.querySelector('.module-nav');
const topNav=document.querySelector('.top-nav');
document.querySelector('.menu')?.addEventListener('click',()=>topNav?.classList.toggle('open'));
const pages=[['index.html','Overview'],['meaning.html','What Is Data Engineering?'],['importance.html','Why It Matters'],['ecosystem.html','The Ecosystem'],['people.html','People and Roles'],['journey.html','Data Journey'],['challenges.html','Challenges'],['activity.html','Activities'],['reflection.html','Reflection']];
const current=location.pathname.split('/').pop()||'index.html';
if(moduleNav){moduleNav.innerHTML='<p>Week 1 Learning Path</p>'+pages.map((p,i)=>`<a href="${p[0]}" class="${current===p[0]?'active':''}"><span>${String(i+1).padStart(2,'0')}</span>${p[1]}</a>`).join('')}
const position=Math.max(1,pages.findIndex(p=>p[0]===current)+1);document.documentElement.style.setProperty('--progress',`${position/pages.length*100}%`);
