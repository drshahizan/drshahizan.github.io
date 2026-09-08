
const dlg=document.getElementById('posterDialog');
const openPoster=()=>dlg?.showModal();
document.getElementById('openPoster')?.addEventListener('click',openPoster);
document.getElementById('openPoster2')?.addEventListener('click',openPoster);
document.getElementById('closePoster')?.addEventListener('click',()=>dlg?.close());
dlg?.addEventListener('click',e=>{const r=dlg.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dlg.close();});

const toast=document.getElementById('toast');
function clean(el){return el.innerText.replace(/\s+/g,' ').trim();}
async function copyText(t){try{await navigator.clipboard.writeText(t);}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove();}}
function showToast(m='Prompt disalin'){if(!toast)return;toast.textContent=m;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1500);}
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{await copyText(clean(document.getElementById(b.dataset.copy)));showToast();}));
document.querySelectorAll('[data-copy-multi]').forEach(b=>b.addEventListener('click',async()=>{const ids=b.dataset.copyMulti.split(',');await copyText(ids.map(id=>clean(document.getElementById(id))).join('\n\nPROMPT:\n'));showToast('Data + prompt disalin');}));
document.getElementById('buildPrompt')?.addEventListener('click',()=>{
  const parts=[...document.querySelectorAll('.builder input')].map(i=>i.value.trim()).filter(Boolean);
  const out=document.getElementById('builtPrompt');out.hidden=false;out.innerHTML='';
  if(!parts.length){out.textContent='Isi sekurang-kurangnya satu elemen prompt dahulu.';return;}
  const text=parts.join(' '),p=document.createElement('p'),btn=document.createElement('button');p.textContent=text;btn.className='copy-btn';btn.textContent='Salin Prompt Saya';btn.onclick=async()=>{await copyText(text);showToast('Prompt anda disalin');};out.append(p,btn);
});
