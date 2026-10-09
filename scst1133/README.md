# SCST1133 Course Website

GitHub Pages website for **SCST1133 - Data Engineering Ecosystem**, Semester 1, Session 2026/2027.

## Upload to GitHub Pages

Upload the contents of this folder to:

`scst1133/`

The main page is `index.html`. The expected address is:

`https://drshahizan.github.io/scst1133/`

The Entry Survey is available at:

`https://drshahizan.github.io/scst1133/entry-survey/`

## Google Apps Script for Entry Survey

The survey uses the Web App URL already configured in:

`entry-survey/assets/config.js`

The backend code is provided in:

`apps-script/Code.gs`

Copy this file into the Google Apps Script project, then update the existing Web App deployment using **New version**, **Execute as Me**, and **Who has access: Anyone**.

If the `/exec` URL changes, update `entry-survey/assets/config.js`.
