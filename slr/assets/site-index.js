(()=>{'use strict';
const entries=window.SLR_INDEX_ENTRIES||[];
const categories=[
 ['Start Here','Begin with the workshop overview, programme and participant information.'],
 ['SLR Journey','Follow the four stages from discovery to publication readiness.'],
 ['Stage 1','Define your review, develop questions and build a reproducible search strategy.'],
 ['Stage 2','Manage records, screen studies, document decisions and prepare evidence.'],
 ['Stage 3','Move from extracted evidence to synthesis and a publishable manuscript.'],
 ['Stage 4','Refine the manuscript and prepare it for submission and publication.'],
 ['Learning','Step-by-step learning guides for the systematic review process.'],
 ['Foundations','Core SLR concepts, examples, reporting guidance and templates.'],
 ['Tools','Find a tool guide by purpose or review stage.'],
 ['Resources','Open learning materials, templates, articles and videos.'],
 ['Workspace','Manage the practical records and tasks for your review.'],
 ['Survey','Participant survey and facilitator dashboard.']
];
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalise=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let selectedCategory='',selectedLetter='';
const search=$('indexSearch');
function countFor(category){return entries.filter(e=>e.categories.includes(category)).length}
function renderCategories(){
 const icons={'Start Here':'01','SLR Journey':'02','Stage 1':'S1','Stage 2':'S2','Stage 3':'S3','Stage 4':'S4','Learning':'↗','Foundations':'◇','Tools':'⌘','Resources':'▤','Workspace':'□','Survey':'✓'};
 $('categoryCards').innerHTML=categories.map(([name,description])=>`<button class="index-category" type="button" data-category="${esc(name)}"><span class="category-icon">${icons[name]||'•'}</span><span class="category-copy"><strong>${esc(name)}</strong><small>${esc(description)}</small></span><span class="category-count" aria-label="${countFor(name)} pages">${countFor(name)}</span></button>`).join('');
}
function renderLetters(){
 const counts={};entries.forEach(e=>{const letter=(e.title.trim()[0]||'').toUpperCase();counts[letter]=(counts[letter]||0)+1});
 $('letterIndex').innerHTML='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter=>`<button type="button" data-letter="${letter}" class="${selectedLetter===letter?'active':''}" ${counts[letter]?'':'disabled'} aria-label="Browse pages beginning with ${letter}${counts[letter]?`, ${counts[letter]} pages`:''}">${letter}</button>`).join('');
 $('letterIndex').querySelectorAll('[data-letter]').forEach(button=>button.addEventListener('click',()=>{selectedLetter=button.dataset.letter;selectedCategory='';render();$('indexResults').scrollIntoView({behavior:'smooth',block:'start'})}));
}
function filteredEntries(){
 const q=normalise(search.value.trim());
 return entries.filter(e=>{
  if(selectedCategory&&!e.categories.includes(selectedCategory))return false;
  if(selectedLetter&&(e.title.trim()[0]||'').toUpperCase()!==selectedLetter)return false;
  if(!q)return true;
  return normalise([e.title,e.description,e.href,...e.tags,...e.categories].join(' ')).includes(q);
 }).sort((a,b)=>a.title.localeCompare(b.title));
}
function renderResults(list){
 const hasFilter=!!(search.value.trim()||selectedCategory||selectedLetter);
 $('indexResults').hidden=!hasFilter;
 if(!hasFilter)return;
 const query=search.value.trim();
 $('resultsEyebrow').textContent=selectedCategory?'BROWSE CATEGORY':selectedLetter?'A–Z INDEX':'SEARCH RESULTS';
 $('resultsTitle').textContent=query?`Matches for “${query}”`:selectedCategory||`Pages beginning with ${selectedLetter}`;
 $('resultCount').textContent=`${list.length} ${list.length===1?'page':'pages'}`;
 $('activeFilters').innerHTML=[selectedCategory,selectedLetter?`Starts with ${selectedLetter}`:''].filter(Boolean).map(x=>`<span class="filter-chip">${esc(x)}</span>`).join('');
 if(!list.length){$('resultsGroups').innerHTML='<div class="index-empty">No pages match this search. Try a shorter term or choose another category.</div>';return}
 const groups=new Map();list.forEach(e=>{const label=e.section||e.categories[0]||'Other';if(!groups.has(label))groups.set(label,[]);groups.get(label).push(e)});
 const openAll=!!(query||selectedLetter||groups.size===1);
 $('resultsGroups').innerHTML=[...groups.entries()].map(([label,items])=>`<details class="index-group" ${openAll?'open':''}><summary>${esc(label)}<span>${items.length} ${items.length===1?'page':'pages'}</span></summary><div class="index-entry-list">${items.map(e=>`<a class="index-entry" href="${esc(e.href)}"><span class="index-entry-copy"><strong>${esc(e.title)}</strong><p>${esc(e.description)}</p><span class="entry-tags">${e.categories.filter(c=>c!==label).slice(0,3).map(c=>`<span>${esc(c)}</span>`).join('')}</span></span><span class="entry-arrow" aria-hidden="true">→</span></a>`).join('')}</div></details>`).join('');
}
function render(){renderLetters();renderResults(filteredEntries())}
$('categoryCards').addEventListener('click',e=>{const button=e.target.closest('[data-category]');if(!button)return;selectedCategory=button.dataset.category;selectedLetter='';render();$('indexResults').scrollIntoView({behavior:'smooth',block:'start'})});
search.addEventListener('input',()=>{selectedCategory='';selectedLetter='';render()});
$('clearFilters').addEventListener('click',()=>{search.value='';selectedCategory='';selectedLetter='';render();search.focus()});
document.querySelectorAll('[data-query]').forEach(button=>button.addEventListener('click',()=>{search.value=button.dataset.query;selectedCategory='';selectedLetter='';render();$('indexResults').scrollIntoView({behavior:'smooth',block:'start'})}));
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();search.focus()}});
const menu=document.getElementById('menuButton'),nav=document.getElementById('mainNav');
if(menu&&nav)menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
renderCategories();render();
})();
