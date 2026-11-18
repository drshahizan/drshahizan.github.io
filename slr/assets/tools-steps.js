(()=>{'use strict';
const data=window.SLR_TOOLS_BY_STEP||[];
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TYPES=[['site','In this site'],['guide','Tool guides'],['template','Templates'],['prompt','Prompt banks'],['external','External sites']];
const TLAB=Object.fromEntries(TYPES);
const tabs=[...document.querySelectorAll('[data-view]')],views={category:$('viewCategory'),steps:$('viewSteps')};
if(!views.steps)return;
let type='',q='';
function show(v,push){tabs.forEach(t=>{const on=t.dataset.view===v;t.setAttribute('aria-selected',on);t.classList.toggle('is-active',on);t.tabIndex=on?0:-1});
  Object.entries(views).forEach(([k,el])=>{el.hidden=k!==v});
  if(push){try{history.replaceState(null,'',v==='steps'?'#by-step':location.pathname+location.search)}catch(e){}}}
tabs.forEach(t=>{t.addEventListener('click',()=>show(t.dataset.view,true));
  t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const i=tabs.indexOf(t),n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];n.focus();show(n.dataset.view,true)}})});
const chip=x=>`<a class="sv-chip t-${x.type}" href="${esc(x.href)}"${x.type==='external'?' target="_blank" rel="noopener noreferrer"':''}${x.type==='template'?' download':''}><span class="sv-dot" aria-hidden="true"></span>${esc(x.name)}${x.type==='external'?' ↗':''}<span class="sr-only"> (${TLAB[x.type]})</span></a>`;
const match=x=>(!type||x.type===type)&&(!q||x.name.toLowerCase().includes(q));
const all=[];data.forEach(st=>{st.steps.forEach(s=>s.items.forEach(x=>all.push(x)));(st.wide||[]).concat(st.other||[]).forEach(x=>all.push(x))});
function renderFilters(){const cnt={};all.forEach(x=>cnt[x.type]=(cnt[x.type]||0)+1);
  $('svTypes').innerHTML=`<button type="button" class="sv-filter${type===''?' is-on':''}" data-type="">All <small>${all.length}</small></button>`+TYPES.filter(([k])=>cnt[k]).map(([k,l])=>`<button type="button" class="sv-filter f-${k}${type===k?' is-on':''}" data-type="${k}"><span class="sv-dot" aria-hidden="true"></span>${l} <small>${cnt[k]}</small></button>`).join('');
  $('svJump').innerHTML=data.map(st=>`<a href="#stage-${st.stage}" class="sv-jump">Stage ${st.stage}</a>`).join('')}
function render(){let shown=0;
  $('svStages').innerHTML=data.map(st=>{
    const steps=st.steps.map(s=>{const its=s.items.filter(match);if((type||q)&&!its.length)return '';shown+=its.length;
      return `<li class="sv-step"><div class="sv-num">${s.n?`<b>${s.n}</b><small>Step</small>`:'<b>+</b><small>After</small>'}</div><div class="sv-body"><h4><a href="${esc(s.href)}">${esc(s.title)}</a></h4><div class="sv-chips">${its.map(chip).join('')||'<span class="sv-none">No tools listed for this step.</span>'}</div></div></li>`}).join('');
    const more=(st.wide||[]).concat(st.other||[]).filter(match);shown+=more.length;
    if((type||q)&&!steps&&!more.length)return '';
    const wide=(st.wide||[]).filter(match),other=(st.other||[]).filter(match);
    return `<section class="sv-stage" id="stage-${st.stage}"><header class="sv-stage-head"><p class="eyebrow">STAGE ${st.stage}</p><h3>${esc(st.title)}</h3><a href="${esc(st.href)}">Stage ${st.stage} overview →</a></header>${steps?`<ol class="sv-steps">${steps}</ol>`:''}${more.length?`<details class="sv-more"${q||type?' open':''}><summary>More for Stage ${st.stage} <small>${more.length} not tied to one step</small></summary>${wide.length?`<p class="sv-more-h">Stage resources</p><div class="sv-chips">${wide.map(chip).join('')}</div>`:''}${other.length?`<p class="sv-more-h">Other tool guides tagged Stage ${st.stage}</p><div class="sv-chips">${other.map(chip).join('')}</div>`:''}</details>`:''}</section>`}).join('')||'<p class="no-tools">Nothing matches. Try another word or choose “All”.</p>';
  $('svCount').textContent=(type||q)?`${shown} match${shown===1?'':'es'}`:`${all.length} links across ${data.reduce((n,s)=>n+s.steps.length,0)} steps`;}
$('svTypes').addEventListener('click',e=>{const b=e.target.closest('[data-type]');if(!b)return;type=b.dataset.type;renderFilters();render()});
$('svSearch').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();render()});
$('svExpand').addEventListener('click',()=>{const d=[...document.querySelectorAll('.sv-more')],open=!d.every(x=>x.open);d.forEach(x=>x.open=open);$('svExpand').textContent=open?'Collapse “More”':'Expand “More”'});
$('svPrint').addEventListener('click',()=>{document.querySelectorAll('.sv-more').forEach(x=>x.open=true);window.print()});
renderFilters();render();
const h=location.hash;if(h==='#by-step'||/^#stage-[1-4]$/.test(h)){show('steps');if(h!=='#by-step')setTimeout(()=>{const t=document.querySelector(h);if(t)t.scrollIntoView()},50)}else show('category');
window.addEventListener('hashchange',()=>{if(location.hash==='#by-step'||/^#stage-[1-4]$/.test(location.hash))show('steps')});
})();
