const moduleNav=document.querySelector('.module-nav');
const topNav=document.querySelector('.top-nav');
document.querySelector('.menu')?.addEventListener('click',()=>topNav?.classList.toggle('open'));
const pages=[['index.html','Overview','core'],['github.html','GitHub Fundamentals','core'],['github-markdown.html','Markdown and README','core'],['github-desktop.html','GitHub Desktop','core'],['github-pages.html','GitHub Pages','core'],['figma.html','Figma','core'],['google-stitch.html','Google Stitch','core'],['google-vids.html','Google Vids','core'],['responsible-practice.html','Responsible Practice','core'],['activity.html','Integrated Activity','core'],['quiz.html','Knowledge Check','core'],['submission.html','Submission','core'],['github-student-pack.html','Student Developer Pack','enrichment'],['github-profile-showcase.html','Profile Showcase','enrichment'],['developer-roadmaps.html','Developer Roadmaps','enrichment'],['github-case-studies.html','Case Studies','enrichment'],['further-learning.html','Further Learning','enrichment'],['glossary.html','Glossary','reference']];
const current=location.pathname.split('/').pop()||'index.html';
if(moduleNav){let group='';moduleNav.innerHTML=pages.map((p,i)=>{const heading=p[2]!==group?(group=p[2],'<p class="nav-group">'+(group==='core'?'Required pathway':group==='enrichment'?'Professional enrichment':'Reference')+'</p>'):'';return heading+'<a href="'+p[0]+'" class="'+(current===p[0]?'active':'')+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+p[1]+'</a>'}).join('')}
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

const learningResources={
  'github.html':[
    ['documentation','Read','Hello World','GitHub Docs','10–15 min','Learn repositories, branches, commits and pull requests through the official beginner tutorial.','https://docs.github.com/en/get-started/start-your-journey/hello-world'],
    ['whitepaper','Explore','The State of the Octoverse','GitHub','20–30 min','Examine current evidence about open source, AI and global software-development practice.','https://octoverse.github.com/'],
    ['video','Watch','GitHub for beginners','GitHub YouTube','Choose one video','Watch official demonstrations of repositories, collaboration and the GitHub workflow.','https://www.youtube.com/@GitHub']
  ],
  'github-student-pack.html':[
    ['documentation','Read','GitHub Education for students','GitHub Education','10 min','Review student benefits, eligibility and the learning opportunities available through GitHub Education.','https://education.github.com/students'],
    ['course','Explore','Student Developer Pack','GitHub Education','15–20 min','Explore professional developer tools and learning experiences included in the pack.','https://education.github.com/pack'],
    ['video','Watch','GitHub Education videos','GitHub Education','Choose one video','Watch official student-focused demonstrations and programme updates.','https://www.youtube.com/@GitHubEducation']
  ],
  'github-profile-showcase.html':[
    ['documentation','Read','Managing your profile README','GitHub Docs','10 min','Create a profile README that presents your skills, interests and selected work clearly.','https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme'],
    ['article','Explore','About your profile','GitHub Docs','8–10 min','Review the profile elements that help other people understand your activity and projects.','https://docs.github.com/en/account-and-profile/concepts/personal-account-concepts/about-your-profile'],
    ['video','Watch','Profile README examples','GitHub YouTube','Choose one video','Observe official examples and adapt only the elements relevant to your professional identity.','https://www.youtube.com/@GitHub/search?query=profile%20README']
  ],
  'developer-roadmaps.html':[
    ['article','Read','Developer Roadmaps','roadmap.sh','15–20 min','Use role-based and skill-based roadmaps to identify a realistic next learning goal.','https://roadmap.sh/'],
    ['course','Explore','GitHub Skills','GitHub','30–45 min','Practise GitHub features through guided activities in real repositories.','https://skills.github.com/'],
    ['video','Watch','GitHub learning videos','GitHub YouTube','Choose one video','Select an official tutorial that supports the next skill in your personal roadmap.','https://www.youtube.com/@GitHub']
  ],
  'github-case-studies.html':[
    ['article','Read','GitHub customer stories','GitHub','15–20 min','Investigate how organisations use GitHub for collaboration, automation and secure delivery.','https://github.com/customer-stories'],
    ['whitepaper','Explore','GitHub Resources','GitHub','20–30 min','Select an industry report or whitepaper connected to software delivery or collaboration.','https://resources.github.com/'],
    ['video','Watch','GitHub customer stories','GitHub YouTube','Choose one video','Connect a real organisational example to the practices discussed in Topic 2.','https://www.youtube.com/@GitHub/search?query=customer%20story']
  ],
  'github-markdown.html':[
    ['documentation','Read','Basic writing and formatting syntax','GitHub Docs','15 min','Use headings, lists, links, images, code blocks and other supported Markdown elements.','https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax'],
    ['whitepaper','Explore','GitHub Flavored Markdown specification','GitHub','20–30 min','Consult the formal specification when precise Markdown behaviour matters.','https://github.github.com/gfm/'],
    ['video','Watch','Markdown on GitHub','GitHub YouTube','Choose one video','Follow an official demonstration and improve one README while watching.','https://www.youtube.com/@GitHub/search?query=Markdown']
  ],
  'github-desktop.html':[
    ['documentation','Read','Getting started with GitHub Desktop','GitHub Docs','15–20 min','Learn how to clone, edit, commit, push and synchronise a repository using the desktop application.','https://docs.github.com/en/desktop/overview/getting-started-with-github-desktop'],
    ['article','Explore','Git Handbook','GitHub Resources','20 min','Strengthen your understanding of commits, branches, remotes and distributed version control.','https://docs.github.com/en/get-started/using-git/about-git'],
    ['video','Watch','GitHub Desktop videos','GitHub YouTube','Choose one video','Watch an official workflow demonstration before repeating it in your own repository.','https://www.youtube.com/@GitHub/search?query=GitHub%20Desktop']
  ],
  'github-pages.html':[
    ['documentation','Read','GitHub Pages quickstart','GitHub Docs','10–15 min','Publish a basic website and verify its branch, folder and public URL settings.','https://docs.github.com/en/pages/quickstart'],
    ['article','Explore','Creating a GitHub Pages site','GitHub Docs','15–20 min','Review publishing sources, entry files, themes and deployment considerations.','https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site'],
    ['video','Watch','GitHub Pages videos','GitHub YouTube','Choose one video','Follow a publishing demonstration and compare it with your deployment workflow.','https://www.youtube.com/@GitHub/search?query=GitHub%20Pages']
  ],
  'figma.html':[
    ['course','Read','Figma Design for beginners','Figma Learn','30–45 min','Study frames, Auto Layout, components and prototyping through the official beginner material.','https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners'],
    ['article','Explore','Guide to prototyping in Figma','Figma Help','15–20 min','Connect screens, define interactions and test a realistic user flow.','https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma'],
    ['video','Watch','Figma official videos','Figma YouTube','Choose one video','Watch an official tutorial on Auto Layout, components or prototyping.','https://www.youtube.com/@Figma']
  ],
  'google-stitch.html':[
    ['article','Read','Design UI using AI with Stitch','Google Blog','10 min','Understand how natural-language instructions support interface creation and iteration.','https://blog.google/technology/google-labs/stitch-ai-ui-design/'],
    ['whitepaper','Explore','From idea to app with Stitch','Google Developers Blog','12–15 min','Examine the prompt-to-interface workflow and the transition from design to frontend code.','https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/'],
    ['video','Watch','Google Labs demonstrations','Google Labs YouTube','Choose one video','Watch an official product demonstration before writing and refining your own prompt.','https://www.youtube.com/@GoogleLabs/search?query=Stitch']
  ],
  'google-vids.html':[
    ['article','Read','Google Vids product overview','Google Workspace','10 min','Review AI-assisted creation, recording, editing, collaboration and sharing features.','https://workspace.google.com/products/vids/'],
    ['documentation','Explore','Get started with Google Vids','Google Workspace Learning Center','15–25 min','Use the official learning path to plan, create, edit and share a short technical video.','https://support.google.com/a/users/answer/14731773?hl=en'],
    ['video','Watch','Vids on Vids','Google Workspace YouTube','Choose one video','Watch the official instructional series and apply one production technique.','https://www.youtube.com/@GoogleWorkspace/search?query=Vids%20on%20Vids']
  ],
  'activity.html':[
    ['documentation','Read','About pull requests','GitHub Docs','12–15 min','Review how proposed changes are discussed, checked and merged.','https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests'],
    ['article','Explore','GitHub Projects documentation','GitHub Docs','15–20 min','Organise issues and pull requests using tables, boards and adaptable project views.','https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects'],
    ['video','Watch','Collaboration workflow videos','GitHub YouTube','Choose one video','Observe a branch, pull-request and review workflow before completing the integrated activity.','https://www.youtube.com/@GitHub/search?query=pull%20request']
  ]
};

if(current!=='further-learning.html'&&learningResources[current]){
  const lessonNav=document.querySelector('.lesson-nav');
  const resourceSection=document.createElement('section');
  resourceSection.className='page-resources';
  resourceSection.setAttribute('aria-labelledby','additional-resources-title');
  resourceSection.innerHTML=`<div class="section-title"><span class="resource-logo github">+</span><div><p>Read, explore and watch</p><h3 id="additional-resources-title">Additional learning resources</h3></div></div><div class="resource-grid">${learningResources[current].map(r=>`<article class="resource-card"><span class="resource-type ${r[0]}">${r[1]}</span><h4>${r[2]}</h4><p>${r[5]}</p><div class="resource-meta"><span>${r[3]}</span><span>${r[4]}</span></div><a href="${r[6]}" target="_blank" rel="noopener">Open official resource →</a></article>`).join('')}</div><p class="resource-note">Open external resources in a new tab. Check the interface and publication date because digital tools continue to evolve.</p>`;
  lessonNav?.before(resourceSection);
}

const tracker=document.getElementById('evidence-tracker');if(tracker){const key='scst1133-topic02-evidence';let saved=JSON.parse(localStorage.getItem(key)||'[]');const boxes=[...tracker.querySelectorAll('input')];boxes.forEach((b,i)=>{b.checked=!!saved[i];b.addEventListener('change',()=>{saved=boxes.map(x=>x.checked);localStorage.setItem(key,JSON.stringify(saved));update()})});function update(){const done=boxes.filter(x=>x.checked).length;document.getElementById('tracker-progress').textContent=done+' of '+boxes.length+' evidence items completed.'}update()}
const zoomImages=[...document.querySelectorAll('.zoomable-image')];if(zoomImages.length){const dlg=document.createElement('dialog');dlg.className='image-lightbox';dlg.innerHTML='<button type="button" aria-label="Close full-size image">×</button><img alt="">';document.body.appendChild(dlg);const open=i=>{dlg.querySelector('img').src=i.src;dlg.querySelector('img').alt=i.alt;dlg.showModal()};zoomImages.forEach(i=>{i.title='Click to view full size';i.onclick=()=>open(i);i.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}}});dlg.querySelector('button').onclick=()=>dlg.close();dlg.onclick=e=>{if(e.target===dlg)dlg.close()}}
const search=document.getElementById('glossary-search');if(search)search.addEventListener('input',()=>{let n=0;document.querySelectorAll('#glossary-table tbody tr').forEach(r=>{const ok=r.textContent.toLowerCase().includes(search.value.toLowerCase());r.hidden=!ok;if(ok)n++});document.getElementById('glossary-empty').hidden=n!==0});
const qf=document.getElementById('topic-quiz');if(qf){qf.addEventListener('submit',e=>{e.preventDefault();let score=0,answered=0;const items=[...qf.querySelectorAll('.quiz-question')];items.forEach(q=>{const p=q.querySelector('input:checked'),f=q.querySelector('.quiz-feedback');q.classList.remove('correct','incorrect');if(!p){f.textContent='Select an answer.';return}answered++;const ok=+p.value===+q.dataset.answer;if(ok){score++;q.classList.add('correct');f.textContent='Correct. '+q.dataset.feedback}else{q.classList.add('incorrect');f.textContent='Review: '+q.dataset.feedback}});const r=document.getElementById('quiz-result'),total=+qf.dataset.total;r.hidden=false;r.innerHTML='<strong>'+score+' / '+total+'</strong><span>'+(answered<total?'Complete every question for a full result.':score>=10?'Excellent understanding.':score>=7?'Good progress—review the feedback.':'Review the core pathway and try again.')+'</span>';r.scrollIntoView({behavior:'smooth',block:'center'})});qf.addEventListener('reset',()=>setTimeout(()=>{qf.querySelectorAll('.quiz-question').forEach(q=>{q.classList.remove('correct','incorrect');q.querySelector('.quiz-feedback').textContent='' });document.getElementById('quiz-result').hidden=true},0))}
