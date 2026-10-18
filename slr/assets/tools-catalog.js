(()=>{'use strict';
const items=window.SLRToolCatalog||[];
const categories=[
 {name:'Discovery & Databases',description:'Search scholarly databases, explore topics and find relevant papers.'},
 {name:'Review & Evidence Analysis',description:'Read, screen, assess and organise evidence for a systematic review.'},
 {name:'Writing, Citation & Publishing',description:'Manage references, draft and improve manuscripts, and prepare for publication.'},
 {name:'Paper Visualisation',description:'Explore citation links, bibliometric patterns and research landscapes.'},
 {name:'Research Methods, Data & Productivity',description:'Support research methods, data analysis, project work and productivity.'}
];
const byId=id=>document.getElementById(id),esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryHome=byId('categoryHome'),results=byId('toolResults'),categoryCards=byId('categoryCards'),cards=byId('toolCards'),query=byId('toolSearch');
let activeCategory='';
function renderCategories(){categoryCards.innerHTML=categories.map((c,i)=>{const count=items.filter(x=>x.category===c.name).length;return `<button class="collection-card" type="button" data-category="${esc(c.name)}" aria-label="Open ${esc(c.name)}, ${count} tools"><span class="collection-number">${String(i+1).padStart(2,'0')}</span><span class="collection-content"><strong>${esc(c.name)}</strong><small>${count} tools</small><span>${esc(c.description)}</span><em>Explore category →</em></span></button>`}).join('')}
function renderTools(list){cards.innerHTML=list.map(x=>`<article class="catalog-card"><div class="catalog-tags"><span>${esc(x.category)}</span><span>${esc(x.relevance)}</span></div><h3>${esc(x.name)}</h3><p>${esc(x.description)}</p><div class="stage-chips">${x.stageTags.map(t=>`<span>${esc(t)}</span>`).join('')}</div><a class="catalog-open" href="tools/${esc(x.slug)}.html">Open SLR guide →</a></article>`).join('')||'<p class="no-tools">No tools match this search. Try another word or return to all categories.</p>';}
function showResults(){const q=query.value.trim().toLowerCase();const list=items.filter(x=>(!activeCategory||x.category===activeCategory)&&(!q||(x.name+' '+x.category+' '+x.subcategory+' '+x.description+' '+x.stageTags.join(' ')).toLowerCase().includes(q)));const cat=categories.find(c=>c.name===activeCategory);categoryHome.hidden=!!(activeCategory||q);results.hidden=!activeCategory&&!q;byId('resultsTitle').textContent=cat?cat.name:(q?'Search results':'Tools');byId('resultsEyebrow').textContent=cat?'COLLECTION':(q?'ALL CATEGORIES':'TOOLS');byId('resultsDescription').textContent=cat?cat.description:(q?'Matches from all five categories. Select a category card to browse a focused collection.':'');byId('toolCount').textContent=`Showing ${list.length} of ${activeCategory?items.filter(x=>x.category===activeCategory).length:items.length} tools`;renderTools(list);byId('clearSearch').hidden=!q;}
renderCategories();
categoryCards.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;query.value='';showResults();results.scrollIntoView({behavior:'smooth',block:'start'});});
query.addEventListener('input',()=>{activeCategory='';showResults();});
byId('allCategories').addEventListener('click',()=>{activeCategory='';query.value='';showResults();byId('categoryHome').scrollIntoView({behavior:'smooth',block:'start'});});
byId('clearSearch').addEventListener('click',()=>{query.value='';activeCategory='';showResults();query.focus();});
showResults();
})();
