document.addEventListener('DOMContentLoaded',()=>{
  const reset=document.querySelector('#reset-checklist');
  reset?.addEventListener('click',()=>document.querySelectorAll('#kualiti input[type="checkbox"]').forEach(box=>box.checked=false));
  const pages=[
    ['Bahan Kursus Mengikut Sesi','Pusat bahan, latihan dan hasil pembelajaran untuk kelima-lima sesi kursus.','bahan-sesi.html'],
    ['Modul Rujukan Peserta PDF','Nota lengkap dan latihan bagi kelima-lima sesi kursus dalam format PDF.','downloads/Modul_Rujukan_Pemerkasaan_Tugasan_Harian_AI_FC_UTM.pdf'],
    ['Latihan Sesi 1: AI sebagai Pembantu Digital','Pilih alat AI, nyahpengenal input dan bina aliran kerja tugasan–alat–semakan.','latihan-sesi-1-pembantu-digital.html'],
    ['Latihan Sesi 2: Prompt Engineering','Bina, uji, audit dan tambah baik prompt untuk urusan HR dan pejabat akademik.','latihan-sesi-2-prompt-engineering.html'],
    ['Latihan Sesi 3: Penduduk Malaysia 2050','Analisis dataset OpenDOSM menggunakan Google Gemini, termasuk carta, peramalan, laporan, poster dan infografik.','latihan-sesi-3-populasi.html'],
    ['Latihan 2 Sesi 3: Pensyarah Universiti Awam','Analisis langkah demi langkah data staf akademik mengikut universiti, jantina dan kewarganegaraan.','latihan-sesi-3-pensyarah.html'],
    ['Latihan Pengurusan Program Senamrobik & Sukan Rakyat','13 prompt daripada brief, kertas kerja dan promosi hingga laporan serta berita selepas program.','latihan-program-senamrobik.html'],
    ['Latihan Gemini Notebook: Pekeliling SSPA','12 langkah untuk Custom Chat HR, ringkasan, Skim N dan output lengkap Studio.','latihan-gemini-notebook-sspa.html'],
    ['Latihan Laporan Tahunan UTM 2020','17 langkah menggunakan Gemini Notebook dan Google Gemini untuk bukti, Studio, dashboard dan laporan.','latihan-laporan-tahunan-utm-2020.html'],
    ['Latihan Sesi 5: AI Selamat dan Bertanggungjawab','Klasifikasi data, nyahpengenalan, audit fakta dan senarai semak tiga fasa.','latihan-sesi-5-ai-bertanggungjawab.html'],
    ['20 Prompt Utama Bengkel','Prompt asas Sesi 2 untuk cuti, kontrak, latihan, pendaftaran, jadual, peperiksaan, graduasi dan mesyuarat.','prompt-utama-bengkel.html'],
    ['Prompt HR dan Akademik','50 prompt untuk cuti, kontrak, latihan, pendaftaran, jadual, peperiksaan, graduasi dan mesyuarat.','prompt-kerja-fc.html'],
    ['Prompt Builder','Bina prompt tersuai mengikut proses, sumber, penerima dan kawalan data.','prompt-builder.html'],
    ['Pusat Prompt AI','Akses perpustakaan prompt, Gemini Notebook dan Studio prompts.','prompt-ai.html'],
    ['AI Tools','Direktori alat untuk teks, dokumen, imej, video, data dan produktiviti.','ai-tools.html'],
    ['Analisis Data dengan AI','Aliran analisis, semakan data, dapatan dan sokongan keputusan.','analisis-data-ai.html'],
    ['Video AI','Idea, storyboard, penjanaan segmen dan suntingan video.','video-ai.html'],
    ['Multimedia AI','Poster, infografik, banner dan audio untuk komunikasi kerja.','multimedia-ai.html'],
    ['Panduan AI Bertanggungjawab','Privasi, kerahsiaan, pengesahan fakta dan semakan manusia.','panduan-ai.html'],
    ['Sumber dan Templat','E-mel, minit, kertas kerja, storyboard, kuiz dan glosari.','sumber-ai.html'],
    ['Gemini Notebook Prompts','Prompt berasaskan sumber untuk dokumen, mesyuarat, program dan data.','gemini-notebook-prompts.html'],
    ['Gemini Notebook Studio Prompts','Prompt untuk infografik, slaid, audio, video, kuiz dan laporan.','gemini-notebook-studio-prompts.html'],
    ['Ruang Kerja AI FC','Laluan peranan, senario, semakan kualiti, privasi, latihan, muat turun dan kuota.','ruang-kerja-ai.html']
  ];
  const input=document.querySelector('#site-search'),results=document.querySelector('#search-results'),count=document.querySelector('#search-count');
  if(!input||!results||!count)return;
  input.addEventListener('input',()=>{
    const q=input.value.trim().toLocaleLowerCase('ms'); results.replaceChildren();
    if(q.length<2){count.textContent='Taip sekurang-kurangnya dua aksara untuk mencari.';return;}
    const matches=pages.filter(item=>(item[0]+' '+item[1]).toLocaleLowerCase('ms').includes(q));
    count.textContent=matches.length?`${matches.length} hasil ditemui.`:'Tiada hasil. Cuba istilah lain seperti “cuti”, “gred” atau “privasi”.';
    matches.forEach(([title,desc,url])=>{const a=document.createElement('a');a.className='search-result';a.href=url;const b=document.createElement('b');b.textContent=title;const s=document.createElement('small');s.textContent=desc;a.append(b,s);results.append(a);});
  });
});
