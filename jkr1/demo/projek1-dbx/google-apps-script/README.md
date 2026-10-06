# Pemasangan Google Apps Script

1. Buka Google Sheets JalanCare.
2. Pilih **Extensions > Apps Script**.
3. Padam kod contoh dalam `Code.gs`.
4. Salin semua kandungan fail `Code.gs` dari folder ini.
5. Klik **Save**.
6. Klik **Deploy > New deployment**.
7. Pilih jenis **Web app**.
8. Description: `JalanCare API v1`.
9. Execute as: **Me**.
10. Who has access: **Anyone**.
11. Klik **Deploy**, beri kebenaran, kemudian salin URL `/exec`.
12. Tampal URL pada `API_URL` dalam `../js/config.js`.

Uji URL dengan membuka:

```
URL_WEB_APP_ANDA?action=ping
```

Respons yang betul mengandungi `"ok":true`.

Jika anda mengubah `Code.gs`, pilih **Deploy > Manage deployments > Edit > New version > Deploy**. URL Web App yang sama boleh terus digunakan.
