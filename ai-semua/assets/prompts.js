const categories=[
{id:'surat',title:'Surat & Komunikasi Rasmi',desc:'Surat, e-mel dan mesej yang jelas serta sopan.',prompts:[
'Tuliskan surat rasmi memohon penggunaan dewan komuniti pada [TARIKH] untuk program [NAMA PROGRAM]. Gunakan bahasa Melayu formal dan sertakan tujuan, masa serta jumlah peserta.',
'Perkemaskan teks surat berikut supaya lebih profesional, sopan dan mudah difahami. Kekalkan semua fakta asal dan jangan tambah maklumat baharu: [TAMPAL TEKS].',
'Tuliskan surat jemputan rasmi kepada [NAMA/JAWATAN] untuk merasmikan program [NAMA PROGRAM] pada [TARIKH, MASA DAN TEMPAT].',
'Sediakan surat penghargaan kepada sukarelawan yang membantu menjayakan [NAMA PROGRAM]. Gunakan nada ikhlas dan panjang maksimum 200 patah perkataan.',
'Tuliskan e-mel ringkas untuk membuat susulan terhadap permohonan yang dihantar pada [TARIKH]. Gunakan nada sopan dan tidak mendesak.',
'Sediakan notis rasmi mengenai penutupan sementara [TEMPAT/KEMUDAHAN] dari [TARIKH] hingga [TARIKH]. Nyatakan sebab dan tindakan yang perlu diambil.',
'Tuliskan mesej WhatsApp rasmi untuk mengingatkan ahli tentang mesyuarat pada [TARIKH, MASA DAN TEMPAT]. Minta mereka mengesahkan kehadiran.',
'Sediakan surat permohonan sumbangan bagi program komuniti [NAMA PROGRAM]. Terangkan tujuan sumbangan dan manfaat kepada penduduk tanpa membuat tuntutan berlebihan.',
'Tukarkan maklumat berikut kepada surat makluman rasmi dengan tajuk, pembukaan, isi dan penutup yang sesuai: [TAMPAL MAKLUMAT].',
'Semak surat berikut dari segi tatabahasa, ejaan dan kesopanan. Senaraikan pembetulan dahulu, kemudian berikan versi akhir: [TAMPAL SURAT].']},
{id:'kertas-kerja',title:'Kertas Kerja & Program Komuniti',desc:'Merancang aktiviti, mesyuarat dan dokumentasi program.',prompts:[
'Sediakan rangka kertas kerja untuk program [NAMA PROGRAM] yang merangkumi latar belakang, objektif, sasaran peserta, tarikh, tempat, tentatif, anggaran perbelanjaan dan penutup.',
'Berdasarkan idea program berikut, cadangkan tiga objektif yang khusus, realistik dan boleh dinilai: [TERANGKAN PROGRAM].',
'Sediakan tentatif program komuniti dari jam [MASA MULA] hingga [MASA TAMAT]. Masukkan pendaftaran, perasmian, aktiviti utama, rehat dan penutup.',
'Bina senarai tugas jawatankuasa untuk program [NAMA PROGRAM]. Bahagikan kepada sebelum, semasa dan selepas program.',
'Sediakan anggaran bajet asas untuk program [NAMA PROGRAM] bagi [JUMLAH] peserta. Gunakan jadual dengan item, kuantiti, anggaran harga dan jumlah.',
'Tuliskan teks hebahan program untuk WhatsApp berdasarkan maklumat berikut: [TAMPAL MAKLUMAT]. Gunakan emoji secara sederhana dan pastikan mudah dibaca.',
'Sediakan agenda mesyuarat jawatankuasa bagi membincangkan [PROGRAM/ISU]. Susun mengikut keutamaan dan sertakan ruangan tindakan.',
'Tukarkan catatan mesyuarat berikut kepada minit mesyuarat yang teratur. Jangan tambah keputusan yang tidak dinyatakan: [TAMPAL CATATAN].',
'Sediakan borang maklum balas ringkas dengan 8 soalan untuk menilai program [NAMA PROGRAM]. Gunakan skala 1 hingga 5 dan dua soalan terbuka.',
'Tuliskan laporan ringkas selepas program berdasarkan maklumat berikut. Masukkan pencapaian, jumlah peserta, aktiviti, isu dan cadangan penambahbaikan: [TAMPAL MAKLUMAT].']},
{id:'rumah',title:'Kehidupan Harian & Rumah',desc:'Menu, belanjawan, urusan rumah dan pengurusan masa.',prompts:[
'Cadangkan menu makan tengah hari untuk [JUMLAH] orang menggunakan bahan berikut: [SENARAI BAHAN]. Pilih resipi mudah dan terangkan langkah secara ringkas.',
'Sediakan menu tujuh hari yang seimbang untuk dua orang pesara. Gunakan makanan Malaysia yang mudah disediakan dan elakkan pembaziran bahan.',
'Bina senarai barang dapur untuk satu minggu berdasarkan menu berikut: [TAMPAL MENU]. Susun mengikut sayur, protein, bahan kering dan lain-lain.',
'Cadangkan cara menggunakan lebihan [NAMA MAKANAN/BAHAN] untuk menghasilkan dua hidangan lain yang mudah dan selamat.',
'Sediakan jadual mingguan yang seimbang untuk kerja rumah, rehat, senaman, ibadah, hobi dan masa bersama keluarga.',
'Cadangkan langkah mudah untuk mengemas satu bilik yang berselerak dalam masa 30 minit. Susun mengikut keutamaan.',
'Bina belanjawan bulanan asas berdasarkan pendapatan RM[JUMLAH] dan perbelanjaan berikut: [SENARAI]. Jangan berikan nasihat pelaburan.',
'Bandingkan dua pilihan pembelian berikut berdasarkan harga, keperluan, ketahanan dan kos jangka panjang: [PILIHAN A] dan [PILIHAN B].',
'Sediakan senarai semak sebelum meninggalkan rumah untuk perjalanan selama [TEMPOH]. Masukkan keselamatan, elektrik, air, haiwan peliharaan dan dokumen.',
'Terangkan cara melakukan tugasan berikut dalam langkah yang sangat mudah untuk orang yang baru belajar: [NAMA TUGASAN].']},
{id:'kesihatan',title:'Kesihatan & Gaya Hidup',desc:'Sokongan umum yang tidak menggantikan nasihat profesional.',prompts:[
'Cadangkan rutin berjalan kaki ringan selama tujuh hari untuk pesara yang baru hendak aktif. Mulakan perlahan dan sertakan peringatan keselamatan umum.',
'Sediakan senarai soalan yang boleh saya bawa ketika berjumpa doktor mengenai [ISU KESIHATAN]. Jangan buat diagnosis atau cadangkan ubat.',
'Terangkan istilah perubatan berikut dalam bahasa Melayu yang mudah: [ISTILAH]. Nyatakan bahawa penerangan ini bukan pengganti nasihat doktor.',
'Cadangkan menu sarapan rendah gula selama tujuh hari menggunakan makanan yang mudah didapati di Malaysia. Elakkan tuntutan perubatan.',
'Sediakan rutin regangan lembut selama 10 minit untuk warga emas. Terangkan bila perlu berhenti dan mendapatkan nasihat profesional.',
'Cadangkan aktiviti untuk menjaga kecergasan minda yang boleh dilakukan di rumah tanpa membeli peralatan.',
'Bina jadual minum air sepanjang hari sebagai panduan umum. Ingatkan bahawa keperluan mungkin berbeza bagi individu dengan masalah kesihatan.',
'Sediakan senarai semak maklumat yang patut dibawa ke temu janji perubatan, termasuk senarai ubat dan soalan kepada doktor.',
'Cadangkan cara membina rutin tidur yang lebih teratur tanpa ubat. Gunakan langkah yang praktikal dan selamat.',
'Ringkaskan artikel kesihatan berikut dalam bahasa mudah. Bezakan fakta, pendapat dan perkara yang perlu disahkan dengan doktor: [TAMPAL ARTIKEL].']},
{id:'keluarga',title:'Keluarga, Hobi & Perjalanan',desc:'Idea untuk masa berkualiti, minat dan percutian.',prompts:[
'Cadangkan 10 aktiviti tanpa kos yang boleh dilakukan oleh datuk dan nenek bersama cucu berumur [UMUR]. Elakkan penggunaan skrin.',
'Tuliskan cerita pendek keluarga berdasarkan kenangan berikut. Gunakan nada hangat dan kekalkan fakta yang diberikan: [TAMPAL KENANGAN].',
'Hasilkan pantun empat kerat untuk majlis [NAMA MAJLIS]. Gunakan bahasa yang sopan dan mudah difahami.',
'Cadangkan lima projek berkebun mudah untuk pesara dengan ruang halaman yang kecil dan bajet terhad.',
'Terangkan cara menjaga tanaman [NAMA TANAMAN] di Malaysia, termasuk cahaya, siraman dan tanda masalah biasa.',
'Sediakan jadual perjalanan tiga hari dua malam ke [DESTINASI] untuk pasangan pesara. Utamakan aktiviti santai dan masa rehat.',
'Bina senarai barang untuk perjalanan ke [DESTINASI] selama [TEMPOH]. Susun mengikut dokumen, pakaian, ubat dan keperluan lain.',
'Cadangkan aktiviti hari keluarga untuk 40 orang daripada pelbagai peringkat umur. Pastikan aktiviti mudah, selamat dan inklusif.',
'Sediakan 10 soalan untuk merakam sejarah hidup seorang ahli keluarga yang lebih tua secara sopan dan bermakna.',
'Cadangkan lima hobi baharu yang murah dan sesuai dilakukan di rumah. Terangkan keperluan asas dan cara bermula.']},
{id:'keselamatan',title:'Keselamatan Digital & Semakan Maklumat',desc:'Mengenal pasti scam, berita palsu dan risiko privasi.',prompts:[
'Semak mesej berikut dan senaraikan tanda yang menunjukkan ia mungkin penipuan. Jangan buka atau akses sebarang pautan: [TAMPAL MESEJ].',
'Terangkan dalam bahasa mudah mengapa kita tidak boleh berkongsi OTP, kata laluan atau nombor PIN dengan sesiapa.',
'Bina senarai semak lima langkah sebelum menekan pautan yang diterima melalui WhatsApp atau SMS.',
'Nilai dakwaan berikut. Senaraikan perkara yang perlu disahkan dan cadangkan jenis sumber rasmi untuk semakan: [TAMPAL DAKWAAN].',
'Bandingkan mesej rasmi dan mesej scam berdasarkan bahasa, alamat penghantar, pautan, permintaan segera dan permintaan maklumat peribadi.',
'Terangkan cara mencipta kata laluan yang kuat dan mudah diurus tanpa meminta saya berkongsi kata laluan sebenar.',
'Sediakan panduan ringkas untuk membantu rakan yang akaun WhatsAppnya mungkin telah diambil alih. Utamakan saluran bantuan rasmi.',
'Semak tawaran pelaburan berikut dan kenal pasti tanda amaran umum. Jangan mengesahkan bahawa pelaburan itu selamat: [TAMPAL TAWARAN].',
'Terangkan risiko memuat naik gambar kad pengenalan, penyata bank atau laporan perubatan ke aplikasi AI.',
'Sediakan mesej ringkas untuk mengingatkan kumpulan keluarga supaya tidak menyebarkan berita sebelum menyemak sumber rasmi.']}
];
const nav=document.getElementById('categoryNav'),root=document.getElementById('promptLibrary'),wrap=document.querySelector('.library-wrap');
const finder=document.createElement('section');finder.className='prompt-finder';finder.innerHTML='<label for="promptSearch"><b>Cari prompt</b><span>Taip contoh: surat, menu, cucu atau scam</span></label><input id="promptSearch" type="search" placeholder="Cari dalam 60 prompt…"><label class="fav-filter"><input id="favOnly" type="checkbox"> Kegemaran sahaja</label><strong id="resultCount" aria-live="polite"></strong>';wrap.insertBefore(finder,nav);
let storedFavourites=[];try{storedFavourites=JSON.parse(localStorage.getItem('ai-favourite-prompts')||'[]')}catch(e){storedFavourites=[]}const saved=new Set(Array.isArray(storedFavourites)?storedFavourites:[]);
categories.forEach((c,ci)=>{const link=document.createElement('a');link.href='#'+c.id;link.textContent=c.title;nav.appendChild(link);const sec=document.createElement('section');sec.className='prompt-category';sec.id=c.id;sec.innerHTML=`<div class="category-heading"><p class="kicker">Kategori ${ci+1}</p><h2>${c.title}</h2><p>${c.desc}</p></div><div class="library-grid">${c.prompts.map((p,i)=>{const key=c.id+'-'+i;return `<article class="library-card" data-search="${(c.title+' '+p).toLowerCase()}" data-key="${key}"><button class="fav-btn${saved.has(key)?' saved':''}" type="button" aria-label="Simpan prompt kegemaran">${saved.has(key)?'★':'☆'}</button><h3>${i+1}. ${c.title.split(' & ')[0]}</h3><div class="prompt">${p}</div></article>`}).join('')}</div>`;root.appendChild(sec)});
const search=document.getElementById('promptSearch'),favOnly=document.getElementById('favOnly'),count=document.getElementById('resultCount');
function filter(){const q=search.value.trim().toLowerCase();let shown=0;document.querySelectorAll('.library-card').forEach(card=>{const ok=(!q||card.dataset.search.includes(q))&&(!favOnly.checked||saved.has(card.dataset.key));card.hidden=!ok;if(ok)shown++});document.querySelectorAll('.prompt-category').forEach(sec=>sec.hidden=!sec.querySelector('.library-card:not([hidden])'));count.textContent=shown+' prompt dipaparkan'}
document.querySelectorAll('.fav-btn').forEach(btn=>btn.onclick=()=>{const card=btn.closest('.library-card'),key=card.dataset.key;if(saved.has(key)){saved.delete(key);btn.textContent='☆';btn.classList.remove('saved')}else{saved.add(key);btn.textContent='★';btn.classList.add('saved')}localStorage.setItem('ai-favourite-prompts',JSON.stringify([...saved]));filter()});search.addEventListener('input',filter);favOnly.addEventListener('change',filter);filter();
