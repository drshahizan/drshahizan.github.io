const moduleNav=document.querySelector('.module-nav');
const topNav=document.querySelector('.top-nav');
document.querySelector('.menu')?.addEventListener('click',()=>topNav?.classList.toggle('open'));
const pages=[['index.html','Overview'],['github.html','GitHub'],['github-student-pack.html','Student Developer Pack'],['github-profile-showcase.html','Profile Showcase'],['developer-roadmaps.html','Developer Roadmaps'],['github-case-studies.html','Case Studies'],['github-markdown.html','Markdown'],['github-desktop.html','GitHub Desktop'],['github-pages.html','GitHub Pages'],['figma.html','Figma'],['google-stitch.html','Google Stitch'],['google-vids.html','Google Vids'],['further-learning.html','Further Learning'],['activity.html','Activity'],['submission.html','Submission']];
const current=location.pathname.split('/').pop()||'index.html';
if(moduleNav){moduleNav.innerHTML='<p>Topic 2 Learning Path</p>'+pages.map((p,i)=>`<a href="${p[0]}" class="${current===p[0]?'active':''}"><span>${String(i+1).padStart(2,'0')}</span>${p[1]}</a>`).join('')}
const position=Math.max(1,pages.findIndex(p=>p[0]===current)+1);document.documentElement.style.setProperty('--progress',`${position/pages.length*100}%`);

document.querySelectorAll('pre').forEach((block,index)=>{
  const heading=block.closest('section')?.querySelector('h3,h4')?.textContent||'';
  const button=document.createElement('button');
  button.type='button';
  button.className='copy-code';
  button.textContent=/prompt/i.test(heading)?'Copy Prompt':'Copy Code';
  button.setAttribute('aria-label',`${button.textContent} ${index+1}`);
  button.addEventListener('click',async()=>{
    try{
      await navigator.clipboard.writeText(block.innerText);
      const original=button.textContent;
      button.textContent='Copied!';
      button.classList.add('copied');
      setTimeout(()=>{button.textContent=original;button.classList.remove('copied')},1800);
    }catch{
      const range=document.createRange();
      range.selectNodeContents(block);
      const selection=window.getSelection();
      selection.removeAllRanges();selection.addRange(range);
      button.textContent='Select and copy';
    }
  });
  const toolbar=document.createElement('div');
  toolbar.className='copy-toolbar';
  toolbar.appendChild(button);
  block.before(toolbar);
});
