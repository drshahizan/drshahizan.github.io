# Kursus Pemerkasaan AI - UTM GitHub Pages

Laman web rasmi bagi **Kursus Pemerkasaan AI Universiti Teknologi Malaysia (UTM)**.

## Halaman Utama

- `index.html` — maklumat kursus dan tentatif
- `bahan-sesi.html` — laluan kursus mengikut lima sesi dengan bahan wajib, tambahan dan rujukan selepas bengkel
- `downloads/Modul_Rujukan_Pemerkasaan_Tugasan_Harian_AI_FC_UTM.pdf` — modul rujukan peserta 19 halaman yang menggabungkan nota dan latihan bagi lima sesi
- `ai-tools.html` — direktori Alat AI
- `prompt-ai.html` — pusat koleksi prompt AI
- `prompt-kerja-fc.html` — 50 prompt kerja Sumber Manusia & Pengurusan Akademik
- `prompt-library.html` — perpustakaan 100 prompt dengan carian dan penapis
- `prompt-builder.html` — pembina prompt interaktif untuk Sumber Manusia & Akademik, dan pusat pautan ke ketiga-tiga pembina prompt lain (Studio, Multimedia, Analisis Data)
- `video-ai.html` — panduan menghasilkan video AI (proses, storyboard, alat AI, hasil pertandingan)
- `multimedia-ai.html` — panduan menghasilkan poster, infografik dan muzik menggunakan Google Gemini
- `analisis-data-ai.html` — panduan analisis data & sokongan membuat keputusan menggunakan Deep Research, Canvas, Gems dan Guided Learning
- `latihan-sesi-1-pembantu-digital.html` — latihan memilih alat AI dan membina aliran kerja tugasan–alat–semakan
- `latihan-sesi-2-prompt-engineering.html` — latihan membina, menguji dan menambah baik prompt secara berperingkat
- `latihan-sesi-3-populasi.html` — latihan Google Gemini menggunakan dataset penduduk Malaysia OpenDOSM, termasuk analisis, ramalan 2050, laporan, poster dan infografik
- `latihan-sesi-3-pensyarah.html` — Latihan 2 Google Gemini secara langkah demi langkah menggunakan dataset pensyarah universiti awam OpenDOSM
- `latihan-program-senamrobik.html` — latihan pengurusan program langkah demi langkah berdasarkan poster Senamrobik & Sukan Rakyat FC 2026
- `latihan-gemini-notebook-sspa.html` — latihan Gemini Notebook menggunakan PP Bilangan 1 Tahun 2024 untuk Custom Chat HR, Skim N dan output Studio
- `latihan-laporan-tahunan-utm-2020.html` — latihan 17 langkah menggunakan Gemini Notebook dan Google Gemini untuk menganalisis Laporan Tahunan UTM 2020
- `latihan-sesi-5-ai-bertanggungjawab.html` — latihan klasifikasi data, privasi, semakan fakta dan kawalan manusia
- `panduan-ai.html` — panduan penggunaan AI yang bertanggungjawab
- `sumber-ai.html` — lapan templat kerja pentadbiran, templat komunikasi/kreatif, kuiz kendiri, glosari, soalan lazim dan senarai semak induk

Pusat Prompt AI turut menyediakan tiga halaman tempatan untuk aktiviti harian di tempat kerja:

- `gemini-notebook-prompts.html` — 30 prompt analisis sumber kerja
- `gemini-notebook-studio-prompts.html` — 24 prompt bagi lapan output Studio
- `studio-prompt-builder.html` — pembina prompt Studio interaktif

Multimedia AI dan Analisis Data turut menyediakan halaman pembina prompt tersuai masing-masing:

- `multimedia-builder.html` — pembina prompt untuk poster, infografik, banner media sosial atau muzik latar
- `analisis-data-builder.html` — pembina prompt untuk Deep Research, Canvas, Gems atau Guided Learning

Kesemua 27 halaman berkongsi header dan footer standard yang sama. Navigasi utama diringkaskan kepada enam pautan: Utama, Bahan Pengajaran, Prompt AI, Ruang Kerja, Alat AI dan Sumber; halaman khusus dicapai melalui pusat bahan mengikut sesi.

## Struktur Fail

- `css/style.css` — reka bentuk asas laman (nav-wrap, hero, section, footer)
- `css/hub-style.css` — reka bentuk halaman "hub" (kad, grid, prompt builder, dsb.)
- `css/nav-standard.css` — subset header & footer standard untuk halaman yang guna `hub-style.css`, supaya nav/footer kekal seragam tanpa bertembung dengan gaya `hub-style.css`
- `js/hub.js` — toggle menu mudah alih (mobile) untuk header standard
- `js/prompt-builder.js`, `js/prompt-library.js`, `js/studio-prompt-builder.js`, `js/multimedia-builder.js`, `js/analisis-data-builder.js` — logik interaktif setiap pembina/perpustakaan prompt (setiap satu ada butang "Salin Prompt" dengan pengesahan)
- `js/copy-prompt.js` — logik "Salin Prompt" kongsi untuk kad contoh prompt statik (Multimedia, Analisis Data) dan templat (Sumber)
- `js/kuiz-kendiri.js` — logik penskoran Kuiz Kendiri (Sumber) — semua pemprosesan berlaku dalam pelayar, tiada data dihantar atau disimpan
- `assets/` — poster, ikon dan imej

Semua contoh prompt dan templat di seluruh laman kini mempunyai butang salin, dengan label yang seragam ("Salin Prompt").

Fail Laporan Tahunan UTM 2020 tidak disertakan dalam ZIP. Peserta menggunakan salinan yang telah disimpan sendiri untuk latihan berkaitan.

## GitHub Pages

Muat naik semua fail dan folder ke akar repositori. Pastikan struktur folder `assets`, `css` dan `js` dikekalkan.

## Hak Cipta
© 2026 Assoc. Prof. Dr Mohd Shahizan Othman · Universiti Teknologi Malaysia.
