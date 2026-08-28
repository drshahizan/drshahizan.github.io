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
    const links=document.createElement('nav');links.className='footer-links';links.innerHTML='<a href="index.html">Utama</a><a href="modul.html">Modul</a><a href="latihan.html">Latihan</a><a href="prompt-library.html">Prompt</a><a href="ai-tools.html">AI Tools</a>';
    shell.innerHTML='';shell.append(info,links,badge);const bottom=document.createElement('div');bottom.className='footer-bottom shell';bottom.innerHTML='<span>Fakulti Komputeran, Universiti Teknologi Malaysia</span><span>Belajar AI dengan mudah, selamat dan bermanfaat.</span>';footer.appendChild(bottom);
  });
});
