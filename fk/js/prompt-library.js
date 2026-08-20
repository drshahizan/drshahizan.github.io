document.addEventListener('DOMContentLoaded',()=>{
  const source=document.getElementById('prompt-data');
  const grid=document.getElementById('prompt-grid');
  const search=document.getElementById('prompt-search');
  const count=document.getElementById('prompt-count');
  const empty=document.getElementById('prompt-empty');
  const filters=[...document.querySelectorAll('.filter')];
  const toast=document.querySelector('.toast');
  if(!source||!grid)return;
  let prompts=[];
  try{prompts=JSON.parse(source.textContent)}catch(error){
    grid.innerHTML='<p class="notice">Data prompt tidak dapat dibaca.</p>';return;
  }
  let active='semua';
  const copy=async text=>{
    try{await navigator.clipboard.writeText(text)}catch(error){
      const area=document.createElement('textarea');area.value=text;document.body.append(area);area.select();document.execCommand('copy');area.remove();
    }
    if(toast){toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1700)}
  };
  const render=()=>{
    const q=(search?.value||'').trim().toLocaleLowerCase('ms');
    const items=prompts.filter(item=>(active==='semua'||item.c===active)&&(`${item.t} ${item.p} ${item.l}`).toLocaleLowerCase('ms').includes(q));
    grid.replaceChildren(...items.map(item=>{
      const card=document.createElement('article');card.className='card prompt-card';
      const label=document.createElement('span');label.className='prompt-label';label.textContent=item.l;
      const title=document.createElement('h3');title.textContent=item.t;
      const body=document.createElement('p');body.className='prompt-text';body.textContent=item.p;
      const button=document.createElement('button');button.className='button copy-prompt';button.type='button';button.textContent='Salin Prompt';button.addEventListener('click',()=>copy(item.p));
      card.append(label,title,body,button);return card;
    }));
    count.textContent=`${items.length} daripada ${prompts.length} prompt dipaparkan`;
    empty.hidden=items.length!==0;
  };
  filters.forEach(button=>button.addEventListener('click',()=>{
    active=button.dataset.filter;
    filters.forEach(item=>{const selected=item===button;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected))});
    render();
  }));
  search?.addEventListener('input',render);
  render();
});
