const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
window.addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('done'),350));
const nav=$('.nav-wrap'),progress=$('#progress'),topBtn=$('#toTop');
addEventListener('scroll',()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;nav.classList.toggle('scrolled',y>30);topBtn.classList.toggle('show',y>700);progress.style.width=`${h?y/h*100:0}%`});
topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});
$('.menu-btn').onclick=e=>{const open=$('.nav-links').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open)};
$$('.nav-links a').forEach(a=>a.onclick=()=>$('.nav-links').classList.remove('open'));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));
const counterObserver=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.count;let n=0;const t=setInterval(()=>{n++;el.textContent=n;if(n>=target)clearInterval(t)},70);counterObserver.unobserve(el)}));
$$('[data-count]').forEach(el=>counterObserver.observe(el));
const words=['Idea menjadi visual.','Prompt menjadi cerita.','Kemahiran menjadi kerjaya.'];let wi=0,ci=0,del=false;
setInterval(()=>{const target=words[wi],el=$('#typed');ci+=del?-1:1;el.textContent=target.slice(0,ci);if(ci===target.length){del=true;return}if(ci===0){del=false;wi=(wi+1)%words.length}},75);
$('#themeBtn').onclick=()=>{document.body.classList.toggle('light');const light=document.body.classList.contains('light');$('#themeBtn i').className=light?'fa-solid fa-sun':'fa-solid fa-moon';localStorage.setItem('theme',light?'light':'dark')};
if(localStorage.getItem('theme')==='dark')$('#themeBtn').click();
const steps=[
 {t:'Idea & Perancangan',d:'Tentukan tema, audiens, objektif, mesej utama dan identiti profesional sebelum menghasilkan sebarang visual.',o:'Konsep video, profil watak dan struktur cerita',tip:'Mulakan dengan satu ayat: “Selepas menonton video ini, penilai mesti ingat bahawa saya…”',img:32},
 {t:'Pembangunan Storyboard',d:'Terjemahkan skrip kepada urutan shot. Tetapkan dialog, tindakan, visual, kamera, cahaya, emosi dan audio bagi setiap babak.',o:'Storyboard visual yang boleh terus diterbitkan',tip:'Satu shot, satu mesej. Jika satu shot mempunyai terlalu banyak idea, pecahkannya.',img:33},
 {t:'Master Storyboard',d:'Satukan semua shot menjadi pelan produksi dua minit. Semak aliran cerita, tempo, kesinambungan watak dan jumlah durasi.',o:'Master storyboard 12 shot × kira-kira 10 saat',tip:'Kunci prompt watak, gaya visual dan palet warna sebelum kerja diagihkan.',img:34},
 {t:'Pecahkan kepada Segmen',d:'Bahagikan master storyboard kepada segmen produksi dan agihkan tanggungjawab kepada ahli kumpulan dengan spesifikasi yang sama.',o:'12 tugasan segmen dengan pemilik dan prompt jelas',tip:'Gunakan konvensyen fail S01 hingga S12 supaya proses gabungan lebih pantas.',img:35},
 {t:'Hasilkan Video AI',d:'Jana setiap segmen menggunakan reference image dan prompt terperinci. Pilih variasi terbaik selepas menyemak wajah, tangan, pergerakan dan audio.',o:'Klip video berkualiti bagi setiap segmen',tip:'Jana dua atau tiga variasi bagi shot penting; jangan terus menerima hasil pertama.',img:36},
 {t:'Gabung & Sunting',d:'Susun semua klip mengikut master storyboard, seimbangkan audio, tambah kapsyen, muzik dan transisi, kemudian semak keseluruhan rubrik.',o:'Video resume profesional dua minit',tip:'Tonton sekali tanpa bunyi untuk semak visual, kemudian dengar tanpa melihat untuk semak audio.',img:37}
];
$$('.process-tab').forEach(btn=>btn.onclick=()=>{const i=+btn.dataset.step,s=steps[i];$$('.process-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('#processLabel').textContent=`LANGKAH 0${i+1}`;$('#processTitle').textContent=s.t;$('#processDesc').textContent=s.d;$('#processOutput').textContent=s.o;$('#processTip').textContent=s.tip;$('#processImg').src=`assets/images/slide-${s.img}.jpg`;$('#processPanel').animate([{opacity:.35,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:320})});
let slide=0;const slides=$$('.story-slide'),dots=$('.dots');
slides.forEach((_,i)=>{const b=document.createElement('button');b.ariaLabel=`Slaid ${i+1}`;b.onclick=()=>showSlide(i);dots.append(b)});
function showSlide(i){slide=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===slide));$$('button',dots).forEach((d,n)=>d.classList.toggle('active',n===slide))}
$('.next').onclick=()=>showSlide(slide+1);$('.prev').onclick=()=>showSlide(slide-1);showSlide(0);
$$('.tool-filters button').forEach(btn=>btn.onclick=()=>{$$('.tool-filters button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$$('.tool').forEach(t=>t.classList.toggle('hidden',btn.dataset.filter!=='all'&&t.dataset.cat!==btn.dataset.filter))});
const gallerySlides=[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41],gallery=$('#gallery');
gallerySlides.forEach((n,i)=>{const f=document.createElement('figure');f.innerHTML=`<img loading="lazy" src="assets/images/slide-${n}.jpg" alt="Infografik bengkel AI in Video Resume, slaid ${n}">`;f.onclick=()=>{$('#lightbox img').src=`assets/images/slide-${n}.jpg`;$('#lightbox p').textContent=`Infografik rujukan · Slaid ${n}`;$('#lightbox').showModal()};gallery.append(f)});
$('.close-lightbox').onclick=()=>$('#lightbox').close();$('#lightbox').onclick=e=>{if(e.target===$('#lightbox'))$('#lightbox').close()};
const searchable=[...$$('section[id]')].map(s=>({id:s.id,title:$('h2',s)?.textContent||s.id,text:s.textContent.toLowerCase()}));
$('#searchBtn').onclick=()=>{$('#searchDialog').showModal();setTimeout(()=>$('#searchInput').focus(),100)};
$('.close-dialog').onclick=()=>$('#searchDialog').close();
$('#searchInput').oninput=e=>{const q=e.target.value.trim().toLowerCase();$('#searchResults').innerHTML=q?searchable.filter(x=>x.text.includes(q)).map(x=>`<a href="#${x.id}" onclick="document.querySelector('#searchDialog').close()"><b>${x.title}</b><br><small>Pergi ke bahagian ${x.id}</small></a>`).join('')||'<p>Tiada hasil ditemui.</p>':''};
const panel=$('#assistantPanel');$('#assistantBtn').onclick=()=>{const show=panel.classList.toggle('show');panel.setAttribute('aria-hidden',!show)};$('.assistant-head button').onclick=()=>panel.classList.remove('show');$$('.assistant-body button').forEach(b=>b.onclick=()=>$('#assistantAnswer').textContent=b.dataset.answer);
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
$('#shareBtn').onclick=async()=>{if(navigator.share)await navigator.share({title:document.title,text:'Bengkel & Pertandingan AI in Video Resume',url:location.href});else{await navigator.clipboard.writeText(location.href);toast('Pautan telah disalin.')}};
