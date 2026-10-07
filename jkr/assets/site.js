const nav=document.querySelector('.nav-links');
if(nav){
  const script=[...document.scripts].find(s=>s.src.includes('/assets/site.js'));
  const root=script?new URL('../',script.src):new URL('./',location.href);
  const item=(path,label)=>`<a href="${new URL(path,root).href}">${label}</a>`;
  nav.innerHTML=`${item('','Utama')}${item('tentatif/','Tentatif')}${item('pembelajaran-ai/','Pembelajaran')}${item('latihan-ai/','Latihan')}${item('bahan-kursus/','Bahan Kursus')}${item('prompt-jkr/','Prompt JKR')}${item('alat-ai/','Alat AI')}${item('projek/','Projek Web')}<details class="nav-more"><summary>Lagi <span aria-hidden="true">⌄</span></summary><div class="nav-more-menu">${item('sumber-ai/','Sumber AI')}${item('dataset/','Dataset')}${item('kajian-kes/','Kajian Kes')}</div></details><a class="nav-search" href="${new URL('carian/',root).href}" aria-label="Carian" title="Carian">⌕</a>`;
  const clean=p=>p.replace(/index\.html$/,'').replace(/\/$/,'');
  const pagePath=clean(location.pathname);
  nav.querySelectorAll('a').forEach(a=>{const linkPath=clean(new URL(a.href,location.href).pathname);if(linkPath===pagePath||(pagePath.includes('/gemini-notebook')&&linkPath.endsWith('/alat-ai')))a.classList.add('active')});
  if(nav.querySelector('.nav-more-menu .active'))nav.querySelector('.nav-more summary')?.classList.add('active');
  const menuButton=document.querySelector('.menu-btn');
  menuButton?.setAttribute('aria-expanded','false');
  menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});
  document.addEventListener('click',e=>document.querySelectorAll('.nav-more[open]').forEach(d=>{if(!d.contains(e.target))d.removeAttribute('open')}));
}
document.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{await navigator.clipboard.writeText(b.parentElement.innerText.replace('Salin','').trim());const old=b.textContent;b.textContent='Disalin';setTimeout(()=>b.textContent=old,1400)}));

// Butang salin seragam untuk kotak prompt statik.
const copyText=async text=>{
  if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(text);
  const area=document.createElement('textarea');
  area.value=text;area.setAttribute('readonly','');area.style.cssText='position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(area);area.select();
  const copied=document.execCommand('copy');area.remove();
  if(!copied)throw new Error('Salinan tidak dibenarkan oleh pelayar');
};
document.querySelectorAll('.copyable-prompt').forEach((box,index)=>{
  if(box.querySelector('.copy-prompt-auto'))return;
  const button=document.createElement('button');
  button.type='button';button.className='copy-prompt-auto';button.textContent='Salin Prompt';
  button.setAttribute('aria-label',`Salin prompt ${index+1}`);
  box.prepend(button);
  button.addEventListener('click',async()=>{
    const clone=box.cloneNode(true);clone.querySelector('.copy-prompt-auto')?.remove();
    try{
      await copyText(clone.innerText.trim());button.textContent='Disalin ✓';button.classList.add('copied');
    }catch{button.textContent='Gagal disalin';}
    setTimeout(()=>{button.textContent='Salin Prompt';button.classList.remove('copied')},1600);
  });
});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;document.querySelectorAll('[data-level]').forEach(c=>c.style.display=f==='semua'||c.dataset.level===f?'block':'none')}));

// Footer konsisten untuk semua halaman portal kursus.
const footer=document.querySelector('footer.footer');
if(footer){
  const script=[...document.scripts].find(s=>s.src.includes('/assets/site.js'));
  const root=script?new URL('../',script.src).href:new URL('./',location.href).href;
  footer.innerHTML=`<div class="container"><div class="footer-grid"><div><div class="footer-brand"><span class="footer-mark">JKR</span><div><h3 style="margin:0">AI untuk Web</h3><small>Kursus Aplikasi AI dalam Tugas Rasmi</small></div></div><p>Portal pembelajaran pembangunan web berbantu AI untuk menghasilkan penyelesaian digital yang praktikal, tersusun dan boleh diterbitkan.</p></div><div><h3>Pembelajaran</h3><a href="${root}modul/">Modul</a><a href="${root}latihan/">Latihan</a><a href="${root}projek/">Projek</a></div><div><h3>Sumber</h3><a href="${root}prompt/">Bank Prompt</a><a href="${root}prompt-builder/">Prompt Builder</a><a href="${root}sumber/">Sumber</a><a href="${root}tentatif/">Tentatif</a></div><div class="footer-event"><h3>Maklumat kursus</h3><strong>Tarikh</strong>8 Oktober 2026 (Khamis)<strong>Tempat</strong>Makmal Komputer Ukur Bahan, Aras 3, Blok B, CREaTE</div></div><div class="footer-bottom"><span>© 2026 Kursus Aplikasi AI dalam Tugas Rasmi · JKR</span><div class="footer-meta"><a class="visitor-badge" href="https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fdrshahizan" target="_blank" rel="noopener noreferrer"><img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fdrshahizan&amp;labelColor=%23697689&amp;countColor=%23555555&amp;style=plastic" alt="Bilangan pelawat laman"></a><button class="back-top" type="button" aria-label="Kembali ke atas">↑</button></div></div></div>`;
  footer.querySelector('.back-top')?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
}
