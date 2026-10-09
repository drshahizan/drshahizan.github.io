# SCST1133 Entry Survey

This package contains a GitHub Pages wrapper and a Google Apps Script survey application.

## 1. Prepare Google Sheets

1. Create one Google Sheets workbook.
2. Open Extensions > Apps Script.
3. Copy every file from `apps-script` into the Apps Script project, using the same filenames.
4. Copy the spreadsheet ID from its URL and replace `PASTE_GOOGLE_SHEET_ID_HERE` in `Code.gs`.
5. Run `setupSheets()` once and grant permission.
6. Paste the official student records into the `Students` tab using these columns:
   `MatricNumber`, `FullName`, `Section`, `ProgrammeCode`, `Status`.
7. Do not include IC numbers.

## 2. Deploy Apps Script

1. Select Deploy > New deployment > Web app.
2. Execute as: Me.
3. Choose the intended access setting for students.
4. Deploy and copy the URL ending in `/exec`.

## 3. Configure GitHub Pages

1. In `github-pages/assets/config.js`, replace the placeholder with the `/exec` URL.
2. Upload the contents of `github-pages` to the intended GitHub repository folder.
3. Enable GitHub Pages for that repository or branch.

## Important

- Upload only the contents of `github-pages` to a public GitHub repository.
- Do not upload the `apps-script` folder, Excel student lists, IC numbers, or Google Sheets data to GitHub.
- Test with one matric number before releasing the link to students.
