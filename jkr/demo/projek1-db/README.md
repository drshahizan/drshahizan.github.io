# Projek 1 DB — JalanCare Google Sheets

Versi Fasa 2 Projek 1. Website statik dihoskan pada GitHub Pages, manakala data disimpan dalam Google Sheets melalui Google Apps Script Web App.

## Kandungan

- `index.html` — portal awam
- `dashboard.html` — portal dalaman
- `js/config.js` — tempat memasukkan URL Web App
- `google-apps-script/Code.gs` — API Google Apps Script
- `dokumen/Pangkalan_Data_Portal_Aduan_JalanCare.xlsx` — templat pangkalan data
- `panduan.html` — panduan pemasangan langkah demi langkah

## Pemasangan ringkas

1. Muat naik fail XLSX dalam folder `dokumen` ke Google Drive.
2. Buka fail itu menggunakan Google Sheets dan simpan sebagai Google Sheets.
3. Pilih **Extensions > Apps Script**.
4. Gantikan kandungan `Code.gs` dengan kod dalam folder `google-apps-script`.
5. Deploy sebagai **Web app**, Execute as **Me**, Who has access **Anyone**.
6. Salin URL yang berakhir dengan `/exec`.
7. Masukkan URL itu pada `API_URL` dalam `js/config.js`.
8. Muat naik semua fail projek ke repositori GitHub dan aktifkan GitHub Pages.

Panduan bergambar berasaskan teks ada dalam `panduan.html`.

## Akaun latihan

| Peranan | Nama pengguna | Kata laluan |
|---|---|---|
| Pentadbir | admin | Admin@123 |
| Pegawai Aduan | pegawai | Pegawai@123 |
| Penyelia | penyelia | Penyelia@123 |
| Pasukan Lapangan | lapangan | Lapangan@123 |
| Kontraktor | kontraktor | Kontraktor@123 |
| Pengurusan | pengurusan | Laporan@123 |

Tukar semua kata laluan sebelum penggunaan sebenar.

## Fungsi pangkalan data

- Hantar aduan awam dan jana nombor rujukan serta kod semakan
- Semak status aduan tanpa log masuk
- Log masuk staf mengikut peranan
- Statistik dashboard
- Senarai dan butiran aduan
- Kemas kini status serta catatan
- Senarai tugasan
- Senarai pengguna untuk pentadbir
- Log aktiviti dan sesi pengguna

## Nota keselamatan

Projek ini ialah bahan latihan. Ia sesuai untuk demonstrasi dan prototaip, bukan terus untuk data rasmi sensitif. Jangan letakkan rahsia dalam fail JavaScript. Untuk penggunaan produksi, gunakan identiti Google Workspace/SSO, kawalan akses organisasi, CAPTCHA, pengesahan input yang lebih ketat, polisi retensi data dan audit keselamatan.
