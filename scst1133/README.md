# SCST1133 Entry Survey — GitHub Pages + Google Sheets

Versi ini meletakkan keseluruhan borang pada GitHub Pages. Google Apps Script hanya bertindak sebagai API untuk membaca senarai pelajar dan menyimpan jawapan ke Google Sheets.

## 1. Google Apps Script

1. Buka projek Apps Script yang disambungkan kepada sistem ini.
2. Padam kandungan lama dalam `Code.gs` dan tampal seluruh kandungan `apps-script/Code.gs`.
3. Fail HTML Apps Script (`Index.html`, `Styles.html`, `Scripts.html`) tidak diperlukan.
4. Klik **Deploy → Manage deployments**.
5. Edit deployment Web app sedia ada, pilih **New version**, kemudian tetapkan:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Klik **Deploy**. Jika URL `/exec` berubah, salin URL baharu ke `assets/config.js`.

Spreadsheet ID telah ditetapkan kepada:
`1wLVdXNzBrzxsn7ZKVSe6ifjqAkwG2I3_andD-JBdycc`

## 2. GitHub Pages

Muat naik fail berikut ke folder `scst1133/entry-survey/` dalam repositori GitHub Pages:

- `index.html`
- folder `assets/` berserta `config.js`, `style.css` dan `app.js`

Jangan muat naik folder `apps-script/` ke GitHub Pages. Folder itu hanya mengandungi kod yang perlu ditampal ke Google Apps Script.

Halaman utama ialah `index.html`. Alamat akhirnya:
`https://drshahizan.github.io/scst1133/entry-survey/`

## 3. Ujian

1. Buka URL Apps Script `/exec`; ia sepatutnya memaparkan JSON dengan `"ok":true`.
2. Buka halaman GitHub Pages.
3. Masukkan nombor matriks yang ada dalam helaian `Students`.
4. Lengkapkan satu bahagian dan tekan **Save & Continue**.
5. Semak helaian `Progress`; satu rekod sementara sepatutnya muncul.
6. Setelah semua bahagian selesai, tekan **Submit Survey** dan semak helaian `Responses`.

Nota: Jangan jalankan fungsi persediaan yang memadam atau membina semula helaian. Fail `Code.gs` ini tidak mengandungi fungsi tersebut.
