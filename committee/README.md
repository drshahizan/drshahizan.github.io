# Committee Portal — AiScholar Conferences 2027

Laman jemputan jawatankuasa untuk ICBIS 2027 (Shanghai) dan ICAIFE 2027 (Tokyo). Staf akademik mengisi maklumat sendiri; data disimpan dalam Google Sheet.

## Peraturan kelayakan
| Jawatan | Syarat |
|---|---|
| General Chair | Professor sahaja |
| Publication Chair / Technical Program Chair | Associate Professor ke atas |
| Technical Program Committee Member | Professor, Associate Professor atau Dr |

Peraturan disemak dua kali: di borang (pilihan yang tidak layak dikelabukan) dan di Apps Script (server).

## Struktur
```
index.html          laman utama + borang
config.js           SEMUA tetapan: conference, track, kuota, syarat, SCRIPT_URL
assets/style.css    reka bentuk
assets/app.js       logik borang
apps-script/Code.gs backend Google Sheets (bukan untuk GitHub Pages)
```

## Langkah 1 — Google Sheet (backend)
1. Buat Google Sheet baru, contohnya "Committee Applications 2027".
2. **Extensions → Apps Script**, padam kod sedia ada, tampal isi `apps-script/Code.gs`, kemudian Save.
3. Pilih fungsi `setup` → **Run** → benarkan akses (Authorize).
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Salin URL yang berakhir dengan `/exec`.

## Langkah 2 — GitHub Pages
1. Buat repo baru di GitHub (contoh: `committee-portal`), jenis Public.
2. Buka `config.js` dan tampal URL tadi: `SCRIPT_URL: "https://script.google.com/macros/s/…/exec"`
3. Upload semua fail (kecuali folder `apps-script` jika mahu) ke repo: **Add file → Upload files**.
4. **Settings → Pages → Source: Deploy from a branch → main / (root)** → Save.
5. Laman akan aktif dalam 1–2 minit di `https://<username>.github.io/committee-portal/`.

## Mengurus permohonan
- Semua permohonan masuk ke tab **Applications** dengan status `Pending`.
- Tukar Status kepada **Approved / Rejected / Reserve**. Hanya `Approved` dikira dalam "x of y open" di laman web.
- Foto disimpan dalam folder Drive **Committee Portal Photos**.
- Menu **Committee → Export AiScholar format** menghasilkan tab `Export ICBIS2027` / `Export ICAIFE2027` dalam susun atur templat AiScholar → **File → Download → Microsoft Excel**.
- Notifikasi email: isi `NOTIFY_EMAIL` dalam Code.gs.

## Tambah conference baru
1. `config.js`: tambah objek dalam `conferences` (id, nama, tarikh, track, positions).
2. `Code.gs`: tambah entri sama dalam `CONFERENCES`, kemudian **Deploy → Manage deployments → Edit → New version**.

> Setiap kali Code.gs diubah, mesti deploy **versi baru**. Jika tidak, perubahan tidak akan berkuat kuasa.
