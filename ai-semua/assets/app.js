document.addEventListener('DOMContentLoaded',()=>{
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const topnav=document.querySelector('.topbar nav');
  if(topnav){
    const old=topnav.querySelector(':scope>div');if(old)old.remove();
    const toggle=document.createElement('button');toggle.className='menu-toggle';toggle.type='button';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','mainMenu');toggle.innerHTML='<span aria-hidden="true">☰</span> Menu';
    const menu=document.createElement('div');menu.className='main-menu';menu.id='mainMenu';menu.innerHTML='<a href="index.html">Utama</a><div class="nav-group"><button type="button" aria-expanded="false">Kursus <span aria-hidden="true">▾</span></button><div class="submenu"><a href="tentatif.html">Tentatif</a><a href="nota.html">Nota Kursus</a><a href="panduan.html">Panduan</a><a href="panduan-pantas.html">Panduan Pantas</a></div></div><div class="nav-group"><button type="button" aria-expanded="false">Pembelajaran <span aria-hidden="true">▾</span></button><div class="submenu"><a href="modul.html">Modul</a><a href="latihan.html">Latihan</a><a href="latihan-lanjutan.html">Latihan Lanjutan</a><a href="cabaran-7-hari.html">Cabaran 7 Hari</a></div></div><a href="prompt-library.html">Prompt</a><a class="pill" href="ai-tools.html">AI Tools</a><a href="bantuan.html">Bantuan</a>';
    topnav.append(toggle,menu);
    menu.querySelectorAll('a').forEach(a=>{if((a.getAttribute('href')||'').toLowerCase()===page){a.classList.add('active');const group=a.closest('.nav-group');if(group)group.classList.add('active')}});
    toggle.onclick=()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));if(!open)menu.querySelectorAll('.nav-group.open').forEach(g=>{g.classList.remove('open');g.querySelector('button').setAttribute('aria-expanded','false')})};
    menu.querySelectorAll('.nav-group>button').forEach(btn=>btn.onclick=e=>{e.stopPropagation();const group=btn.parentElement,open=!group.classList.contains('open');menu.querySelectorAll('.nav-group.open').forEach(g=>{g.classList.remove('open');g.querySelector('button').setAttribute('aria-expanded','false')});group.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open))});
    document.addEventListener('click',e=>{if(!topnav.contains(e.target))menu.querySelectorAll('.nav-group.open').forEach(g=>{g.classList.remove('open');g.querySelector('button').setAttribute('aria-expanded','false')})});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');menu.querySelectorAll('.nav-group.open').forEach(g=>{g.classList.remove('open');g.querySelector('button').setAttribute('aria-expanded','false')});toggle.focus()}});
  }
  document.querySelectorAll('.prompt').forEach(box=>{
    if(box.querySelector('.prompt-toolbar'))return;const promptText=box.textContent.trim();
    const toolbar=document.createElement('div');toolbar.className='prompt-toolbar';const label=document.createElement('span');label.textContent='PROMPT SEDIA GUNA';
    const btn=document.createElement('button');btn.className='copy-btn';btn.type='button';btn.textContent='Salin Prompt';
    btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(promptText);btn.textContent='✓ Sudah disalin';btn.classList.add('copied');setTimeout(()=>{btn.textContent='Salin Prompt';btn.classList.remove('copied')},1800)}catch(e){btn.textContent='Pilih & salin teks'}});
    toolbar.append(label,btn);box.appendChild(toolbar);
  });
  document.querySelectorAll('footer').forEach(footer=>{
    const shell=footer.querySelector('.shell'),badge=footer.querySelector('.visitor-badge');if(!shell||!badge)return;badge.remove();
    const info=document.createElement('div');info.className='footer-brand';info.innerHTML='<span class="footer-mark">AI</span><div><strong>AI untuk Semua</strong><small>Mudah, Praktikal &amp; Berguna</small></div>';
    const links=document.createElement('nav');links.className='footer-links';links.setAttribute('aria-label','Pautan footer');links.innerHTML='<section><b>Kursus</b><a href="index.html">Utama</a><a href="tentatif.html">Tentatif</a><a href="nota.html">Nota Kursus</a><a href="panduan.html">Panduan</a><a href="panduan-pantas.html">Panduan Pantas</a></section><section><b>Pembelajaran</b><a href="modul.html">Modul</a><a href="latihan.html">Latihan</a><a href="latihan-lanjutan.html">Latihan Lanjutan</a><a href="cabaran-7-hari.html">Cabaran 7 Hari</a></section><section><b>Sumber</b><a href="prompt-library.html">Perpustakaan Prompt</a><a href="ai-tools.html">AI Tools</a><a href="bantuan.html">Bantuan</a></section>';
    shell.innerHTML='';shell.append(info,links,badge);const bottom=document.createElement('div');bottom.className='footer-bottom shell';bottom.innerHTML='<span>Fakulti Komputeran, Universiti Teknologi Malaysia</span><span>Belajar AI dengan mudah, selamat dan bermanfaat.</span>';footer.appendChild(bottom);
  });
  const tools=document.createElement('div');tools.className='access-tools';tools.setAttribute('aria-label','Kawalan paparan');tools.innerHTML='<button type="button" data-size="down" aria-label="Kecilkan tulisan">A−</button><button type="button" data-size="up" aria-label="Besarkan tulisan">A+</button><button type="button" data-contrast aria-label="Tukar kontras">◐</button><button type="button" data-top aria-label="Kembali ke atas">↑</button>';
  document.body.appendChild(tools);let size=Number(localStorage.getItem('ai-font-size')||100),contrast=localStorage.getItem('ai-contrast')==='on';
  const apply=()=>{document.documentElement.style.fontSize=size+'%';document.body.classList.toggle('high-contrast',contrast)};apply();
  tools.querySelector('[data-size="up"]').onclick=()=>{size=Math.min(125,size+10);localStorage.setItem('ai-font-size',size);apply()};
  tools.querySelector('[data-size="down"]').onclick=()=>{size=Math.max(90,size-10);localStorage.setItem('ai-font-size',size);apply()};
  tools.querySelector('[data-contrast]').onclick=()=>{contrast=!contrast;localStorage.setItem('ai-contrast',contrast?'on':'off');apply()};
  tools.querySelector('[data-top]').onclick=()=>scrollTo({top:0,behavior:'smooth'});
});
