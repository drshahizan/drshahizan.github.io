# Kursus Pemerkasaan AI - UTM GitHub Pages

Laman web rasmi bagi **Kursus Pemerkasaan AI Universiti Teknologi Malaysia (UTM)**.

## Halaman Utama

- `index.html` — maklumat kursus dan tentatif
- `ai-tools.html` — direktori alat AI
- `prompt-ai.html` — pusat koleksi prompt AI
- `prompt-kerja-fc.html` — 50 prompt kerja Sumber Manusia & Pengurusan Akademik
- `prompt-library.html` — perpustakaan 100 prompt dengan carian dan penapis
- `prompt-builder.html` — pembina prompt interaktif untuk Sumber Manusia & Akademik, dan pusat pautan ke ketiga-tiga pembina prompt lain (Studio, Multimedia, Analisis Data)
- `video-ai.html` — panduan menghasilkan video AI (proses, storyboard, alat AI, hasil pertandingan)
- `multimedia-ai.html` — panduan menghasilkan poster, infografik dan muzik menggunakan Google Gemini
- `analisis-data-ai.html` — panduan analisis data & sokongan membuat keputusan menggunakan Deep Research, Canvas, Gems dan Guided Learning
- `panduan-ai.html` — panduan penggunaan AI yang bertanggungjawab
- `sumber-ai.html` — templat pentadbiran, kuiz kendiri, glosari istilah AI, soalan lazim dan senarai semak induk

Pusat Prompt AI turut menyediakan tiga halaman tempatan untuk aktiviti harian di tempat kerja:

- `gemini-notebook-prompts.html` — 30 prompt analisis sumber kerja
- `gemini-notebook-studio-prompts.html` — 24 prompt bagi lapan output Studio
- `studio-prompt-builder.html` — pembina prompt Studio interaktif

Multimedia AI dan Analisis Data turut menyediakan halaman pembina prompt tersuai masing-masing:

- `multimedia-builder.html` — pembina prompt untuk poster, infografik, banner media sosial atau muzik latar
- `analisis-data-builder.html` — pembina prompt untuk Deep Research, Canvas, Gems atau Guided Learning

Kesemua 16 halaman berkongsi header dan footer standard yang sama (brand, navigation 9 link, hamburger menu pada skrin sempit, dan footer hak cipta).

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

## GitHub Pages

Muat naik semua fail dan folder ke akar repositori. Pastikan struktur folder `assets`, `css` dan `js` dikekalkan.

## Hak Cipta
© 2026 Assoc. Prof. Dr Mohd Shahizan Othman · Universiti Teknologi Malaysia.
