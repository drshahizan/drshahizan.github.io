const moduleNav=document.querySelector('.module-nav');
const topNav=document.querySelector('.top-nav');
document.querySelector('.menu')?.addEventListener('click',()=>topNav?.classList.toggle('open'));
const pages=[['index.html','Overview'],['github.html','GitHub'],['github-desktop.html','GitHub Desktop'],['github-pages.html','GitHub Pages'],['github-markdown.html','Markdown'],['figma.html','Figma'],['google-stitch.html','Google Stitch'],['google-vids.html','Google Vids'],['activity.html','Activity'],['submission.html','Submission']];
const current=location.pathname.split('/').pop()||'index.html';
if(moduleNav){moduleNav.innerHTML='<p>Week 2 Learning Path</p>'+pages.map((p,i)=>`<a href="${p[0]}" class="${current===p[0]?'active':''}"><span>${String(i+1).padStart(2,'0')}</span>${p[1]}</a>`).join('')}
const position=Math.max(1,pages.findIndex(p=>p[0]===current)+1);document.documentElement.style.setProperty('--progress',`${position/pages.length*100}%`);
