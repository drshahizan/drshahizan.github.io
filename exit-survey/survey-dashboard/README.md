# SCST1133 Entry Survey Dashboard

Public dashboard URL after uploading the website to GitHub Pages:

`https://drshahizan.github.io/scst1133/survey-dashboard/`

## Dashboard pages

- `index.html` — survey participation overview
- `academic.html` — academic background
- `computing.html` — computing and Internet readiness
- `learning.html` — learning preferences and confidence
- `digital-tools.html` — previous digital tool experience
- `knowledge.html` — baseline data engineering knowledge
- `student-profile.html` — character, interests, programme motivation and computing exposure
- `support-needs.html` — current situation, support themes and recommended next steps
- `teaching-insights.html` — aggregated teaching suggestions

The dashboard is intentionally not linked from the main course website. GitHub Pages remains public, so the dashboard displays aggregated statistics only. The Apps Script Web App URL is stored in `assets/config.js`.

## Required Apps Script update

1. Open the Google Sheet used by the SCST1133 Entry Survey.
2. Select **Extensions → Apps Script**.
3. Replace the existing `Code.gs` with the latest file from `apps-script/Code.gs`.
4. Select **Deploy → Manage deployments**.
5. Edit the current Web App deployment.
6. Select **New version** and deploy it.
7. Keep **Execute as: Me** and the existing access setting used by the survey website.
8. Reload the dashboard after deployment.

The new `survey-dashboard` API action returns counts and grouped distributions only. It does not return student names, matric numbers, contact details or individual answers.
