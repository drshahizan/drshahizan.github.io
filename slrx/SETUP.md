# SLR Course Portal — Setup

The website works immediately in demo mode. Records are saved in the current browser using local storage. Complete the steps below when you are ready to use a shared Google Sheet.

## 1. Create the Google Sheet

1. Create a new Google Sheet and name it `SLR Article Repository`.
2. Open **Extensions → Apps Script**.
3. Replace the editor content with `google-apps-script/Code.gs` from this package.
4. Save the project.

## 2. Deploy the Apps Script

1. Select **Deploy → New deployment**.
2. Choose **Web app**.
3. Set **Execute as** to yourself.
4. Select the access option appropriate for your participants. For an open course form, select the option that allows anyone with the link to access the web app.
5. Deploy, authorise access, and copy the Web App URL ending in `/exec`.

## 3. Connect the website

1. Open `assets/config.js`.
2. Paste the Web App URL between the quotation marks for `apiUrl`.
3. Save the file.
4. Upload the complete contents of the `slr-course-portal` folder to the root of your GitHub repository.
5. In GitHub, open **Settings → Pages**, select deployment from a branch, and choose the repository's main branch and root folder.

## Notes

- Test the form with one article before sharing the site.
- The APA parser is a convenience tool. Participants must verify every extracted field.
- WoS, Scopus, and quartile details are entered manually because they are not normally contained in an APA reference.
- The website blocks duplicate DOI submissions in the browser. The Apps Script performs a second DOI check before adding a shared record.
- Do not collect sensitive personal information in this form.

## Updating an existing deployment

After replacing `Code.gs` with a newer version:

1. Open **Deploy → Manage deployments** in Apps Script.
2. Select the existing Web App and click **Edit**.
3. Choose **New version** under the version setting.
4. Click **Deploy**.
5. Keep the existing `/exec` URL in `assets/config.js` unless Google provides a different URL.

The current script provides a compact dashboard summary endpoint, five-minute server caching, cache invalidation after new submissions, limited-range Sheet reads, duplicate DOI protection, and a write lock for simultaneous submissions.

## Participant Registration (2026)

The site now includes `workspace/register-participant.html` for workshop registration.

- Target spreadsheet ID: `1qpPXgREKy7Pl8iP26SQwzE921n9Yo0XaHEQZ28WVCiE`
- New sheet/tab: `Participant Registration`
- The tab is created automatically by the Apps Script on the first participant registration, or you can run `setupParticipantRegistration()` once from the Apps Script editor.
- After replacing `google-apps-script/Code.gs`, deploy a **new version** of the existing Web App. Keep the same deployment URL when possible so `assets/config.js` does not need to change.
- Web App execution should have permission to edit the target spreadsheet.

The participant form dynamically switches between Postgraduate Student and Academic Staff. Student-only fields are Level of Study, Current Semester, and Supervisor's Name. All registrations cover all four workshop stages.
