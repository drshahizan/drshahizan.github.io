document.addEventListener('DOMContentLoaded',()=>{
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.topbar nav a').forEach(a=>{if((a.getAttribute('href')||'').toLowerCase()===page)a.classList.add('active')});
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
    const links=document.createElement('nav');links.className='footer-links';links.innerHTML='<a href="index.html">Utama</a><a href="tentatif.html">Tentatif</a><a href="panduan.html">Panduan</a><a href="panduan-pantas.html">Panduan Pantas</a><a href="modul.html">Modul</a><a href="latihan.html">Latihan</a><a href="latihan-lanjutan.html">Latihan Lanjutan</a><a href="cabaran-7-hari.html">Cabaran 7 Hari</a><a href="prompt-library.html">Prompt</a><a href="bantuan.html">Bantuan</a><a href="ai-tools.html">AI Tools</a>';
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
