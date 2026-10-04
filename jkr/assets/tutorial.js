const DATA={
aduan:{title:'Portal Aduan & Semakan',label:'Projek 1 · Perkhidmatan Awam',demo:'../../demo/aduan/index.html',download:'../../muat-turun/projek-aduan.zip',summary:'Portal awam untuk membuat dan menyemak aduan serta portal dalaman untuk pengurusan aduan, tugasan, kerja lapangan, peta, SLA dan laporan.',tree:`aduan/\n├── index.html\n├── home.html\n├── aduan-baharu.html\n├── berjaya.html\n├── semakan.html\n├── login.html\n├── dashboard.html\n├── css/theme.css\n├── js/{public.js,auth.js,dashboard.js,map.js}\n├── aduan/{senarai.html,butiran.html,pengesahan.html}\n├── lapangan/{pemeriksaan.html,bukti-kerja.html}\n├── peta/index.html\n├── tugasan/index.html\n├── sla/index.html\n├── laporan/{index.html,prestasi.html}\n├── konfigurasi/kategori.html\n└── pengguna/index.html`,
master:`Anda ialah pembangun web kanan dan pereka UX sektor awam. Hasilkan PROTOTAIP STATIK lengkap bernama “JalanCare JKR Daerah Rembau” yang mesti sepadan dengan spesifikasi berikut. Jangan gabungkan semua halaman dalam satu fail dan jangan menukar nama fail atau folder.

TEKNOLOGI DAN KEKANGAN
1. Gunakan HTML5, CSS3 dan JavaScript biasa sahaja. Tiada React, Bootstrap, build tool atau pangkalan data.
2. Semua halaman mesti boleh dibuka terus dan diterbitkan melalui GitHub Pages.
3. Data, borang, carian, status dan log masuk ialah simulasi antaramuka menggunakan localStorage/sessionStorage jika perlu.
4. Gunakan Bahasa Melayu, reka bentuk cerah, profesional dan responsif. Warna utama: biru gelap JKR, merah, kuning keselamatan, putih dan kelabu muda.
5. Gunakan satu fail css/theme.css untuk identiti visual yang konsisten. Menu mudah alih, sidebar boleh dikuncup, kad statistik, jadual responsif, badge status, borang, modal dan notifikasi mesti mempunyai gaya yang konsisten.

PORTAL AWAM
- index.html: halaman portal rasmi dengan logo/teks JKR, JalanCare, navigasi Utama, Buat Aduan, Semak Status dan Log Masuk Staf. Hero mesti mengandungi tajuk “Jalan selamat bermula dengan laporan anda”, penerangan, butang Buat Aduan Baharu dan Semak Aduan. Paparkan panduan bahaya serta-merta, lokasi tepat, bukti gambar dan kategori Jalan rosak, Longkang & banjir, Papan tanda, Cerun & struktur.
- home.html: halaman penerangan perkhidmatan.
- aduan-baharu.html: borang lengkap nama, telefon, e-mel, kategori, lokasi, koordinat, penerangan, tahap keutamaan dan muat naik gambar. Laksanakan pengesahan medan wajib.
- berjaya.html: paparkan kejayaan dan nombor rujukan contoh.
- semakan.html: carian nombor rujukan dan paparan garis masa status.

PORTAL DALAMAN
- login.html: akaun latihan admin / jkr123 dan penerangan bahawa sistem ialah prototaip.
- dashboard.html: sidebar modul, kad statistik, aduan terkini, status, keutamaan dan tindakan pantas.
- aduan/senarai.html, aduan/butiran.html dan aduan/pengesahan.html untuk pengurusan rekod.
- tugasan/index.html untuk pengagihan pegawai dan tarikh sasaran.
- lapangan/pemeriksaan.html serta lapangan/bukti-kerja.html untuk pemeriksaan dan gambar sebelum/selepas.
- peta/index.html menggunakan js/map.js untuk paparan peta demonstrasi dan penanda aduan.
- sla/index.html bagi pemantauan tempoh tindak balas.
- laporan/index.html dan laporan/prestasi.html bagi penapis dan statistik prestasi.
- konfigurasi/kategori.html serta pengguna/index.html bagi tetapan pentadbir.

JAVASCRIPT
- js/public.js: borang awam, nombor rujukan, semakan status dan interaksi portal.
- js/auth.js: simulasi log masuk dan log keluar.
- js/dashboard.js: menu, kad, jadual dan data demonstrasi.
- js/map.js: penanda, popup dan penapis lokasi.

HASIL YANG WAJIB
Hasilkan setiap fail satu per satu dengan tajuk laluan fail sebelum blok kod. Pastikan semua pautan relatif betul. Sertakan README.md dengan arahan membuka portal awam, portal dalaman dan akaun latihan. Jangan tulis pseudokod, TODO, “sambungkan kemudian”, atau memendekkan kandungan. Semua halaman mesti lengkap dan boleh digunakan sebagai demonstrasi.`,
steps:[
['Analisis keperluan dan aliran aduan','Takrif pengguna, kategori, status dan maklumat aduan.',`Analisis Portal Aduan JalanCare. Hasilkan matriks pengguna-fungsi untuk orang awam, pentadbir, pegawai teknikal dan pegawai lapangan. Tetapkan kategori Jalan rosak, Longkang & banjir, Papan tanda dan Cerun & struktur. Gunakan status Diterima, Disahkan, Ditugaskan, Dalam Tindakan dan Selesai. Senaraikan data yang diperlukan dan aliran proses penuh.`,'Dokumen keperluan menjadi rujukan untuk semua halaman.'],
['Struktur folder dan tema bersama','Cipta semua laluan fail sebenar sebelum membina halaman.',`Cipta struktur folder tepat seperti yang diberikan. Hasilkan css/theme.css dengan pemboleh ubah warna, reset, tipografi, header portal awam, sidebar portal dalaman, kad, jadual, badge status, borang, butang, modal, footer dan media query. Pastikan reka bentuk cerah, profesional dan responsif.`,'Semua halaman menggunakan satu identiti visual.'],
['Portal awam','Bina halaman utama, borang, berjaya dan semakan.',`Berdasarkan struktur dan theme.css, hasilkan index.html, home.html, aduan-baharu.html, berjaya.html dan semakan.html. Kekalkan teks dan kategori yang dinyatakan dalam Prompt Induk. Sambungkan semua navigasi dan gunakan js/public.js untuk pengesahan borang, nombor rujukan dan simulasi status.`,'Orang awam boleh membuat dan menyemak aduan tanpa log masuk.'],
['Log masuk dan dashboard','Bina pintu masuk serta ringkasan operasi.',`Hasilkan login.html, dashboard.html, js/auth.js dan js/dashboard.js. Akaun latihan ialah admin / jkr123. Selepas log masuk, paparkan sidebar, statistik, aduan mengikut status, keutamaan, tugasan dan tindakan pantas. Simpan sesi secara demonstrasi dan sediakan log keluar.`,'Portal dalaman boleh diteroka dengan akaun latihan.'],
['Modul operasi','Lengkapkan pengurusan aduan dan kerja lapangan.',`Hasilkan semua halaman dalam folder aduan, tugasan dan lapangan. Gunakan data aduan yang konsisten antara senarai, butiran, pengesahan, tugasan, pemeriksaan dan bukti kerja. Sediakan tindakan yang munasabah, badge status dan breadcrumb pada setiap halaman.`,'Aliran aduan boleh diikuti dari penerimaan hingga siap.'],
['Peta, SLA, laporan dan pentadbiran','Lengkapkan modul pemantauan.',`Hasilkan peta/index.html, js/map.js, sla/index.html, laporan/index.html, laporan/prestasi.html, konfigurasi/kategori.html dan pengguna/index.html. Gunakan data contoh yang sama, penapis yang berfungsi secara demonstrasi serta paparan responsif.`,'Semua modul dalam fail ZIP telah diliputi.'],
['Audit kesepadanan dan penerbitan','Pastikan hasil akhir sama dengan spesifikasi.',`Audit keseluruhan projek terhadap Prompt Induk. Semak setiap nama fail, pautan relatif, navigasi, teks Bahasa Melayu, akaun latihan, borang, responsif dan tiada halaman kosong. Baiki semua ketidakpadanan. Akhir sekali hasilkan README.md dan arahan GitHub Pages.`,'Projek lengkap dan boleh diterbitkan.'] ]},
jalancare:{title:'Sistem Pengurusan Kerja JalanCare',label:'Projek 2 · Operasi Dalaman',demo:'../../demo/jalancare/',download:'../../muat-turun/projek-jalancare.zip',summary:'Sistem dalaman berasaskan peranan untuk permohonan, semakan teknikal, kelulusan, pelaksanaan, pengesahan dan laporan.',tree:`jalancare/\n├── index.html\n├── dashboard.html\n├── css/theme.css\n├── js/{auth.js,app.js}\n├── permohonan/{baru.html,senarai.html}\n├── semakan/index.html\n├── kelulusan/index.html\n├── pelaksanaan/index.html\n├── pengesahan/index.html\n├── laporan/index.html\n├── pengguna/{senarai.html,baharu.html}\n├── profil/index.html\n└── panduan/index.html`,
master:`Anda ialah pembangun web kanan. Hasilkan prototaip latihan berbilang halaman “JalanCare JKR Rembau” yang sama dengan spesifikasi ini.

Gunakan HTML5, CSS3 dan JavaScript biasa tanpa framework atau pangkalan data. Gunakan localStorage/sessionStorage untuk demonstrasi. Semua fail mesti berfungsi di GitHub Pages. Reka bentuk mesti cerah, profesional, responsif, menggunakan identiti JKR dan satu css/theme.css.

STRUKTUR WAJIB
index.html, dashboard.html, css/theme.css, js/auth.js, js/app.js, permohonan/baru.html, permohonan/senarai.html, semakan/index.html, kelulusan/index.html, pelaksanaan/index.html, pengesahan/index.html, laporan/index.html, pengguna/senarai.html, pengguna/baharu.html, profil/index.html dan panduan/index.html.

AKAUN DAN PERANAN
- admin / admin123 — Pentadbir
- juruteknik / jkr123 — Juruteknik
- jurutera / jkr123 — Jurutera Daerah
- pemohon / jkr123 — Pemohon
- pelaksana / jkr123 — Pegawai Pelaksana
- pengesah / jkr123 — Pegawai Pengesah
- pemerhati / jkr123 — Pemerhati

index.html ialah halaman log masuk dengan teks JKR, Jabatan Kerja Raya Daerah Rembau, JalanCare, “Pengurusan penyelenggaraan jalan yang tersusun, telus dan pantas”, medan ID pengguna, kata laluan, kawalan Lihat, Ingat saya dan bahagian Akaun latihan.

Selepas log masuk, dashboard dan menu mesti berubah mengikut peranan. Pemohon mengurus permohonan sendiri; juruteknik membuat semakan; jurutera memberikan kelulusan; pelaksana mengurus kerja; pengesah mengesahkan hasil; pentadbir mengurus pengguna dan keseluruhan sistem; pemerhati hanya melihat maklumat yang dibenarkan.

ALIRAN KERJA
Permohonan Baharu → Semakan Teknikal → Kelulusan → Pelaksanaan → Pengesahan → Selesai.

FUNGSI
- Dashboard: kad statistik, tindakan menunggu, aktiviti dan pautan mengikut peranan.
- Permohonan baharu: butiran lokasi, skop, kategori, keutamaan, anggaran dan lampiran demonstrasi.
- Senarai permohonan: carian, penapis, status dan tindakan.
- Semakan: ulasan teknikal dan cadangan.
- Kelulusan: keputusan lulus/tolak/kembali untuk pembetulan.
- Pelaksanaan: kemajuan, tarikh, pegawai, kontraktor dan bukti.
- Pengesahan: semakan hasil dan keputusan.
- Laporan: ringkasan dan penapis.
- Pengguna: senarai serta borang pengguna baharu.
- Profil dan panduan: maklumat pengguna dan panduan sistem.

js/auth.js mengurus akaun latihan, sesi, peranan dan log keluar. js/app.js membina shell dashboard, sidebar boleh disembunyikan, tajuk halaman tunggal, kawalan akses menu, data contoh dan interaksi. Jangan benarkan peranan melihat menu yang tidak berkaitan.

Hasilkan setiap fail penuh satu per satu dengan laluan fail. Jangan gabungkan halaman, jangan tinggalkan TODO/pseudokod dan jangan menukar nama fail. Akhir sekali hasilkan README.md yang menerangkan akaun, GitHub Pages dan batasan localStorage sebagai demonstrasi sahaja.`,
steps:[
['Model peranan dan aliran kerja','Tetapkan tujuh peranan dan enam status proses.',`Bina matriks akses tepat untuk Pentadbir, Juruteknik, Jurutera Daerah, Pemohon, Pegawai Pelaksana, Pegawai Pengesah dan Pemerhati. Padankan setiap peranan dengan menu, tindakan dan data yang boleh dilihat. Gunakan aliran Permohonan Baharu hingga Selesai.`,'Kawalan akses menjadi asas js/auth.js dan js/app.js.'],
['Tema dan shell aplikasi','Bangunkan login, sidebar dan layout responsif.',`Hasilkan css/theme.css, index.html, js/auth.js dan shell asas js/app.js. Gunakan akaun latihan tepat dalam Prompt Induk. Sidebar mesti boleh disembunyikan, logo rapat dengan teks, tajuk halaman tidak berganda dan paparan utama berkembang apabila sidebar ditutup.`,'Log masuk dan navigasi asas berfungsi.'],
['Dashboard mengikut peranan','Paparkan kerja yang berkaitan sahaja.',`Hasilkan dashboard.html dan fungsi render dashboard dalam js/app.js. Gunakan statistik, tindakan menunggu dan menu khusus berdasarkan peranan aktif. Pastikan pemohon atau pemerhati tidak melihat pengurusan pengguna atau fungsi kelulusan.`,'Setiap akaun melihat dashboard berbeza.'],
['Permohonan dan semakan','Bina permohonan/baru.html, permohonan/senarai.html dan semakan/index.html.',`Gunakan borang terperinci, jadual responsif, carian, penapis, badge status serta data demonstrasi konsisten. Simpan rekod demonstrasi dalam localStorage dan benarkan juruteknik merekodkan ulasan.`,'Permohonan boleh diwujudkan dan disemak.'],
['Kelulusan, pelaksanaan dan pengesahan','Lengkapkan aliran utama sistem.',`Hasilkan kelulusan/index.html, pelaksanaan/index.html dan pengesahan/index.html. Laksanakan tindakan demonstrasi mengikut peranan serta kemas kini status yang munasabah. Paparkan bukti, catatan, tarikh dan pihak bertanggungjawab.`,'Aliran kerja lengkap hingga Selesai.'],
['Laporan, pengguna, profil dan panduan','Lengkapkan halaman sokongan.',`Hasilkan laporan/index.html, pengguna/senarai.html, pengguna/baharu.html, profil/index.html dan panduan/index.html. Kekalkan shell, breadcrumb, tajuk tunggal dan kawalan akses.`,'Struktur akhir sama dengan kod sumber.'],
['Audit akhir','Uji semua akaun dan laluan.',`Uji tujuh akaun latihan, setiap menu, pautan relatif, tajuk halaman, sidebar, paparan telefon dan sekatan peranan. Baiki isu kosong atau akses berlebihan. Sediakan README dan arahan GitHub Pages.`,'Prototaip sedia diterbitkan.']]},
pendaftaran:{title:'Portal Pendaftaran Kursus',label:'Projek 3 · Latihan Organisasi',demo:'../../demo/pendaftaran/',download:'../../muat-turun/projek-pendaftaran.zip',summary:'Portal awam tanpa akaun serta portal urus setia untuk program, peserta, kehadiran, sijil, laporan dan pengguna.',tree:`pendaftaran/\n├── index.html\n├── home.html\n├── login.html\n├── dashboard.html\n├── css/theme.css\n├── js/{public.js,auth.js,app.js}\n├── kursus/{index.html,butiran.html,daftar.html,berjaya.html}\n├── semakan/index.html\n├── program/{senarai.html,baharu.html}\n├── peserta/senarai.html\n├── kehadiran/index.html\n├── sijil/index.html\n├── laporan/index.html\n├── pengguna/senarai.html\n├── profil/index.html\n└── panduan/index.html`,
master:`Anda ialah pembangun web kanan. Hasilkan prototaip statik lengkap “DaftarKita JKR Rembau”, iaitu Sistem Pendaftaran Dalam Talian untuk kursus dan pembangunan kompetensi.

Gunakan HTML5, CSS3 dan JavaScript biasa tanpa framework atau pangkalan data. Gunakan data simulasi dan localStorage/sessionStorage. Semua halaman mesti berfungsi dalam GitHub Pages. Reka bentuk cerah, profesional, responsif, menggunakan identiti JKR serta satu css/theme.css.

PORTAL AWAM TANPA LOG MASUK
- index.html: header JKR, DaftarKita, JKR Daerah Rembau, menu Utama, Senarai Kursus, Semak Pendaftaran dan Log Masuk Staf. Hero “Temui kursus yang sesuai untuk anda”, butang Lihat Semua Kursus dan Semak Pendaftaran. Paparkan 3 program, 145 tempat tersedia dan tiga kursus contoh: Kursus Pengurusan Aset Jalan pada 12 Oktober, Bengkel Keselamatan Tapak pada 20 Oktober dan Taklimat Sistem JalanCare pada 28 Oktober. Paparkan tiga langkah Pilih kursus, Isi borang dan Terima rujukan.
- home.html: penerangan portal.
- kursus/index.html: senarai dan penapis kursus.
- kursus/butiran.html: maklumat program, tarikh, masa, tempat, syarat, kuota dan butang daftar.
- kursus/daftar.html: borang peserta tanpa akaun.
- kursus/berjaya.html: mesej kejayaan dan nombor rujukan.
- semakan/index.html: semakan pendaftaran berdasarkan nombor rujukan.

PORTAL DALAMAN
- login.html dan akaun: admin/admin123, penyelaras/jkr123, urusetia/jkr123, pengurusan/jkr123.
- dashboard.html: statistik program, peserta, kehadiran dan sijil.
- program/senarai.html dan program/baharu.html.
- peserta/senarai.html.
- kehadiran/index.html dengan simulasi kehadiran QR.
- sijil/index.html untuk sijil digital.
- laporan/index.html, pengguna/senarai.html, profil/index.html dan panduan/index.html.

JAVASCRIPT
- js/public.js: paparan kursus, butiran, borang, nombor rujukan dan semakan.
- js/auth.js: akaun, sesi dan log keluar.
- js/app.js: sidebar, tajuk, dashboard, peranan, program, peserta, kehadiran, sijil dan laporan.

STRUKTUR FAIL mesti sama tepat dengan senarai: index.html, home.html, login.html, dashboard.html, css/theme.css, js/public.js, js/auth.js, js/app.js, profil/index.html, sijil/index.html, laporan/index.html, pengguna/senarai.html, kursus/index.html, kursus/berjaya.html, kursus/daftar.html, kursus/butiran.html, semakan/index.html, kehadiran/index.html, program/baharu.html, program/senarai.html, peserta/senarai.html dan panduan/index.html.

Hasilkan setiap fail penuh dengan laluan fail sebelum blok kod. Pastikan pautan relatif tepat, tiada halaman kosong, tiada TODO atau pseudokod. Akhir sekali hasilkan README.md dengan akaun latihan dan penjelasan bahawa data ialah simulasi pelayar.`,
steps:[
['Analisis portal awam dan dalaman','Pisahkan pengalaman peserta dan urus setia.',`Takrif fungsi peserta tanpa akaun dan fungsi admin, penyelaras, urus setia serta pengurusan. Bentuk status pendaftaran Diterima, Disahkan, Berjaya, Hadir dan Sijil Dikeluarkan. Senaraikan medan kursus dan peserta.`,'Skop portal jelas sebelum kod dijana.'],
['Struktur dan tema DaftarKita','Cipta semua folder serta komponen visual.',`Hasilkan struktur fail tepat dan css/theme.css untuk header awam, hero, kad kursus, langkah pendaftaran, borang, login, sidebar, dashboard, jadual, badge, modal dan footer. Gunakan reka bentuk cerah dan responsif.`,'Satu tema digunakan oleh keseluruhan portal.'],
['Halaman utama dan senarai kursus','Bina kandungan awam yang sama dengan spesifikasi.',`Hasilkan index.html, home.html dan kursus/index.html dengan tiga kursus, tarikh, masa, lokasi, status dan kuota tepat seperti Prompt Induk. Sambungkan navigasi dan penapis menggunakan js/public.js.`,'Peserta boleh meneroka kursus tanpa akaun.'],
['Butiran, pendaftaran dan semakan','Lengkapkan perjalanan peserta.',`Hasilkan kursus/butiran.html, kursus/daftar.html, kursus/berjaya.html dan semakan/index.html. Laksanakan pengesahan borang, nombor rujukan demonstrasi, simpanan localStorage dan paparan status.`,'Pendaftaran awam lengkap dari pilihan hingga semakan.'],
['Login dan dashboard urus setia','Bina portal dalaman mengikut peranan.',`Hasilkan login.html, dashboard.html, js/auth.js dan js/app.js menggunakan empat akaun tepat. Paparkan statistik dan menu yang sesuai untuk admin, penyelaras, urus setia dan pengurusan.`,'Portal staf boleh diteroka dengan akaun latihan.'],
['Program, peserta dan kehadiran','Bina fungsi pengurusan operasi.',`Hasilkan program/senarai.html, program/baharu.html, peserta/senarai.html dan kehadiran/index.html. Gunakan data yang konsisten dan simulasi kehadiran QR tanpa mendakwa kamera atau backend sebenar.`,'Urus setia boleh mengurus program dan peserta.'],
['Sijil, laporan dan sokongan','Lengkapkan semua fail akhir.',`Hasilkan sijil/index.html, laporan/index.html, pengguna/senarai.html, profil/index.html dan panduan/index.html. Pastikan menu, tajuk, jadual dan kawalan akses konsisten.`,'Semua halaman dalam ZIP telah dihasilkan.'],
['Audit kesepadanan','Bandingkan dengan Prompt Induk.',`Semak setiap nama fail, tiga kursus contoh, akaun latihan, nombor statistik, pautan relatif, paparan telefon, localStorage dan semua halaman. Baiki ketidakpadanan dan hasilkan README serta arahan GitHub Pages.`,'Hasil akhir sepadan dengan spesifikasi kod sumber.']]}}
;
const key=document.body.dataset.project,project=DATA[key],root=document.querySelector('#tutorial');
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
root.innerHTML=`<div class="tutorial-intro"><div><span class="eyebrow">${project.label}</span><h2>${project.title}</h2><p>${project.summary}</p><div class="tutorial-actions"><a class="btn btn-primary" href="${project.demo}" target="_blank">Lihat demo akhir</a><a class="btn btn-secondary" href="${project.download}" download>Muat turun kod sumber</a></div></div><div class="progress-ring"><span>${project.steps.length} langkah</span></div></div><div class="exact-note"><strong>Sasaran kesepadanan:</strong> Ikuti Prompt Induk dan semua langkah mengikut turutan. Jangan ubah nama fail, peranan, akaun latihan atau modul jika hasil akhir perlu sama dengan kod sumber yang dibekalkan.</div><div class="tutorial-shell"><aside class="tutorial-nav"><strong>Kandungan</strong><a href="#struktur">Struktur fail</a><a href="#prompt-induk">Prompt Induk</a>${project.steps.map((s,i)=>`<a href="#langkah-${i+1}">${i+1}. ${s[0]}</a>`).join('')}<a href="#akhir">Semakan akhir</a></aside><div class="tutorial-main"><section class="lesson" id="struktur"><div class="lesson-head"><span class="lesson-number">00</span><div><h2>Struktur kod sumber akhir</h2><p>Nama dan lokasi fail yang mesti dihasilkan.</p></div></div><div class="lesson-body"><div class="file-tree">${esc(project.tree)}</div></div></section><section class="lesson master" id="prompt-induk"><div class="lesson-head"><span class="lesson-number">AI</span><div><h2>Prompt Induk Lengkap</h2><p>Gunakan prompt ini untuk menetapkan keseluruhan skop dan hasil akhir.</p></div></div><div class="lesson-body"><div class="prompt-box"><button class="copy-prompt">Salin prompt</button>${esc(project.master)}</div><div class="notice"><strong>Cara penggunaan:</strong> Mulakan perbualan baharu dengan Prompt Induk. Selepas AI mengesahkan skop, berikan prompt langkah 1 hingga langkah terakhir satu demi satu. Minta AI mengekalkan semua fail yang telah dibina.</div></div></section>${project.steps.map((s,i)=>`<section class="lesson" id="langkah-${i+1}"><div class="lesson-head"><span class="lesson-number">${String(i+1).padStart(2,'0')}</span><div><h2>${s[0]}</h2><p>${s[1]}</p></div></div><div class="lesson-body"><h3>Prompt langkah ${i+1}</h3><div class="prompt-box"><button class="copy-prompt">Salin prompt</button>${esc(s[2])}</div><h3>Hasil yang perlu disahkan</h3><div class="result-box">✓ ${s[3]}</div></div></section>`).join('')}<section class="lesson" id="akhir"><div class="lesson-head"><span class="lesson-number">✓</span><div><h2>Semakan akhir dan kod sumber</h2><p>Bandingkan hasil peserta dengan prototaip rujukan.</p></div></div><div class="lesson-body"><div class="lesson-grid"><div><h3>Senarai semak</h3><ul class="checklist"><li>Struktur dan nama fail sama</li><li>Semua pautan relatif berfungsi</li><li>Peranan dan akaun latihan tepat</li><li>Tiada halaman kosong atau tajuk berganda</li><li>Responsif pada telefon</li><li>Boleh diterbitkan melalui GitHub Pages</li></ul></div><div><h3>Tindakan akhir</h3><p>Bandingkan dengan demo dan kod sumber. Jika terdapat perbezaan, gunakan prompt audit pada langkah terakhir untuk pembetulan terarah.</p><div class="tutorial-actions"><a class="btn btn-primary" href="${project.download}" download>Muat turun ZIP lengkap</a><a class="btn btn-secondary" href="../">Kembali ke semua projek</a></div></div></div></div></section></div></div>`;
document.querySelectorAll('.copy-prompt').forEach(btn=>btn.addEventListener('click',async()=>{const box=btn.parentElement;await navigator.clipboard.writeText(box.innerText.replace('Salin prompt','').trim());btn.textContent='Disalin';setTimeout(()=>btn.textContent='Salin prompt',1400)}));
