(()=>{
if(window.courseMaterials)return;
const modules=[
 {id:1,title:'Ekosistem Alat Digital Penyelidikan',summary:'Memilih alat yang tepat untuk setiap tugasan penyelidikan.',slides:9,notes:16,slide:'assets/downloads/slaid-modul/modul-1-ekosistem-alat-digital.pdf',note:'assets/downloads/nota-modul/nota-modul-1.pdf',module:'modul/modul-1-ekosistem-digital.html',exercise:'latihan/latihan-modul-1.html'},
 {id:2,title:'Pengurusan Literatur dan Analisis Rujukan',summary:'Mencari, menilai dan mengurus sumber secara sistematik.',slides:17,notes:16,slide:'assets/downloads/slaid-modul/modul-2-pengurusan-literatur.pdf',note:'assets/downloads/nota-modul/nota-modul-2.pdf',module:'modul/modul-2-literatur-rujukan.html',exercise:'latihan/latihan-modul-2.html'},
 {id:3,title:'Analisis Bibliometrik',summary:'Mengubah metadata penerbitan kepada peta pengetahuan.',slides:11,notes:19,slide:'assets/downloads/slaid-modul/modul-3-analisis-bibliometrik.pdf',note:'assets/downloads/nota-modul/nota-modul-3.pdf',module:'modul/modul-3-analisis-bibliometrik.html',exercise:'latihan/latihan-modul-3.html'},
 {id:4,title:'Analisis Data Asas',summary:'Meringkaskan data dan menghasilkan dapatan yang bermakna.',slides:21,notes:22,slide:'assets/downloads/slaid-modul/modul-4-analisis-data-asas.pdf',note:'assets/downloads/nota-modul/nota-modul-4.pdf',module:'modul/modul-4-analisis-data.html',exercise:'latihan/latihan-modul-4.html'},
 {id:5,title:'Analisis Kualitatif Digital',summary:'Menukar transkrip kepada kod, kategori dan tema.',slides:21,notes:23,slide:'assets/downloads/slaid-modul/modul-5-analisis-kualitatif-digital.pdf',note:'assets/downloads/nota-modul/nota-modul-5.pdf',module:'modul/modul-5-analisis-kualitatif.html',exercise:'latihan/latihan-modul-5.html'},
 {id:6,title:'Visualisasi Penyelidikan',summary:'Menyampaikan data melalui paparan yang jelas dan bermakna.',slides:21,notes:23,slide:'assets/downloads/slaid-modul/modul-6-visualisasi-penyelidikan.pdf',note:'assets/downloads/nota-modul/nota-modul-6.pdf',module:'modul/modul-6-visualisasi-penyelidikan.html',exercise:'latihan/latihan-modul-6.html'},
 {id:7,title:'Alat Digital Berasaskan AI untuk Penyelidikan',summary:'Menggunakan AI dengan bukti, semakan manusia dan etika.',slides:21,notes:22,slide:'assets/downloads/slaid-modul/modul-7-alat-digital-ai.pdf',note:'assets/downloads/nota-modul/nota-modul-7.pdf',module:'modul/modul-7-ai-penyelidikan.html',exercise:'latihan/latihan-modul-7.html'}
];
const website=[
 {id:1,title:'Pengenalan Kursus',summary:'Gambaran keseluruhan kursus, aliran kerja dan hasil pembelajaran.',pages:6,file:'assets/downloads/slaid-website/01-pengenalan-kursus.pdf'},
 {id:2,title:'Tujuh Modul Kursus',summary:'Perjalanan pembelajaran daripada ekosistem hingga penggunaan AI.',pages:8,file:'assets/downloads/slaid-website/02-tujuh-modul.pdf'},
 {id:3,title:'Latihan Mengikut Modul',summary:'Struktur 47 latihan hands-on yang disediakan dalam portal.',pages:8,file:'assets/downloads/slaid-website/03-latihan-modul.pdf'},
 {id:4,title:'Ekosistem Alat Digital',summary:'Ringkasan kategori dan fungsi alatan penyelidikan.',pages:8,file:'assets/downloads/slaid-website/04-ekosistem-alatan.pdf'},
 {id:5,title:'Infografik Alatan Digital',summary:'Koleksi infografik terperinci untuk alatan penyelidikan utama.',pages:38,file:'assets/downloads/slaid-website/05-infografik-alatan.pdf'},
 {id:6,title:'Prompt AI untuk Penyelidikan',summary:'Kaedah membina prompt, membandingkan hasil dan membuat semakan.',pages:8,file:'assets/downloads/slaid-website/06-prompt-ai.pdf'},
 {id:7,title:'Sumber Pembelajaran Kursus',summary:'Panduan, FAQ, glosari, dataset dan bahan muat turun.',pages:7,file:'assets/downloads/slaid-website/07-sumber-pembelajaran.pdf'}
];
const q=(s,r=document)=>r.querySelector(s);
const thumb=(kind,name)=>`assets/images/materials/${kind}-${name}.jpg`;
const viewer=(kind,id)=>`bahan/paparan.html?jenis=${kind}&id=${id}`;
const moduleCard=(m,mode='all')=>{
 const image=mode==='notes'?thumb('nota-modul',`nota-modul-${m.id}`):thumb('slaid-modul',m.slide.split('/').pop().replace('.pdf',''));
 return `<article class="material-card"><img src="${image}" alt="Muka hadapan ${mode==='notes'?'nota':'slaid'} Modul ${m.id}" loading="lazy"><div class="material-card-body"><span class="material-label">Modul ${m.id}</span><h3>${m.title}</h3><p>${m.summary}</p><div class="material-meta"><span>${m.slides} slaid</span><span>${m.notes} halaman nota</span></div><div class="material-actions">${mode!=='notes'?`<a class="btn btn-primary btn-small" href="${viewer('slaid',m.id)}">Lihat Slaid</a>`:''}${mode!=='slides'?`<a class="btn btn-secondary btn-small" href="${viewer('nota',m.id)}">Baca Nota</a>`:''}<a class="text-link" href="${m.exercise}">Latihan</a></div></div></article>`;
};
const websiteCard=w=>{const stem=w.file.split('/').pop().replace('.pdf','');return `<article class="material-card"><img src="${thumb('slaid-website',stem)}" alt="Muka hadapan ${w.title}" loading="lazy"><div class="material-card-body"><span class="material-label">Slaid Website ${String(w.id).padStart(2,'0')}</span><h3>${w.title}</h3><p>${w.summary}</p><div class="material-meta"><span>${w.pages} slaid</span><span>PDF</span></div><div class="material-actions"><a class="btn btn-primary btn-small" href="${viewer('website',w.id)}">Lihat Slaid</a><a class="btn btn-secondary btn-small" href="${w.file}" download>Muat Turun</a></div></div></article>`};
const moduleGrid=q('[data-module-materials]');
if(moduleGrid){const mode=moduleGrid.dataset.mode||'all';moduleGrid.innerHTML=modules.map(m=>moduleCard(m,mode)).join('');}
const websiteGrid=q('[data-website-materials]');if(websiteGrid)websiteGrid.innerHTML=website.map(websiteCard).join('');

const path=location.pathname;
const match=path.match(/modul-(\d)-/);
if(match&&!q('.module-material-strip')){
 const m=modules.find(x=>x.id===Number(match[1]));
 const hero=q('.module-page-hero');
 if(m&&hero)hero.insertAdjacentHTML('afterend',`<section class="module-material-strip"><div class="container"><div class="module-material-copy"><span class="kicker">Bahan Modul ${m.id}</span><h2>Belajar, baca dan terus mencuba</h2><p>Gunakan slaid semasa sesi, nota untuk penerangan lanjut dan latihan untuk aplikasi langkah demi langkah.</p></div><div class="module-material-actions"><a class="btn btn-primary" href="${viewer('slaid',m.id)}">Lihat Slaid</a><a class="btn btn-secondary" href="${viewer('nota',m.id)}">Baca Nota</a><a class="btn btn-secondary" href="${m.exercise}">Mulakan Latihan</a></div></div></section>`);
}

if(path.endsWith('/bahan/paparan.html')){
 const params=new URLSearchParams(location.search);const type=params.get('jenis');const id=Number(params.get('id'));
 let item,file,title,kind,prev,next,download;
 if(type==='website'){
   item=website.find(x=>x.id===id);file=item?.file;title=item?.title;kind='Slaid Penerangan Website';download=file;
   prev=id>1?viewer('website',id-1):'bahan/slaid-website.html';next=id<website.length?viewer('website',id+1):'bahan/slaid-website.html';
 }else{
   item=modules.find(x=>x.id===id);const notes=type==='nota';file=notes?item?.note:item?.slide;title=item?`Modul ${item.id}: ${item.title}`:'';kind=notes?'Nota Pembelajaran':'Slaid Pembentangan';download=file;
   prev=id>1?viewer(type,id-1):notes?'bahan/nota-modul.html':'bahan/slaid-modul.html';next=id<modules.length?viewer(type,id+1):notes?'bahan/nota-modul.html':'bahan/slaid-modul.html';
 }
 if(!item){location.href='bahan/index.html';return;}
 document.title=`${kind} | ${title}`;q('[data-viewer-kind]').textContent=kind;q('[data-viewer-title]').textContent=title;q('[data-viewer-summary]').textContent=item.summary;
 const frame=q('[data-pdf-frame]');frame.src=`${file}#view=FitH`;frame.title=`${kind} ${title}`;
 q('[data-open-pdf]').href=file;q('[data-download-pdf]').href=download;q('[data-viewer-prev]').href=prev;q('[data-viewer-next]').href=next;
 if(item.module){q('[data-viewer-module]').href=item.module;q('[data-viewer-exercise]').href=item.exercise;}else{q('[data-viewer-context]').hidden=true;}
}
window.courseMaterials={modules,website};
})();
