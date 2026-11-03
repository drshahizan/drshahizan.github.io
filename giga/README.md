# Practical Generative AI for Digital Services

Static, responsive GitHub Pages website for the five-day workshop **Practical Generative AI for Digital Services: From Prompt to Portfolio**.

## Project structure

```text
index.html
pages/
  prepare/start-here.html
  programme/programme.html
  capstone/capstone.html
  exercises/exercises.html
  exercises/day-1.html
  exercises/day-2.html
  exercises/day-3.html
  exercises/day-4.html
  exercises/day-5.html
  resources/ai-tools.html
  resources/resources.html
assets/
  css/site.css
  css/themes/light-professional.css
  js/site.js
  img/mark.svg
  data/mersing-visitor-sessions.csv
```

## Publish with GitHub Pages

1. Copy the contents of this project folder into the root of your GitHub Pages repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch that contains the files (commonly `main`) and choose `/(root)`.
5. Save the setting and wait for GitHub Pages to publish the site.

The site uses relative asset and page links, so it works from a repository path as well as a user or organisation site. It has no build step or server-side dependency. Google Fonts are loaded when a visitor has an internet connection; system font fallbacks are included. The footer follows the clean, grouped layout of the UTM Big Data Centre BDC site.

## Content notes

- The programme follows the supplied indicative five-day workshop schedule.
- The capstone business, Mersing Coastal Homestay, is fictional. Booking records are intended to be simulated training data.
- The tourism figures on the capstone page are historical context from DOSM's 2023 Domestic Tourism Survey and are linked to the source.
- Day 4 guides participants through a dashboard, static website and Google Sheets-backed Apps Script web app.
- Day 5 completes the Mersing homestay capstone: reuse Day 3 visuals, connect an enquiry form to Supabase, and manage fictional booking requests with CRUD and RLS checks.
- The Day 5 exercise page links to a starter/reference app bundle with setup SQL, a scoped RLS example, seed records and lecturer instructions. Day 4 uses a separate Google Sheets practice app; its visitor-session analytics data is not booking data.
- All five day pages include step-by-step participant guidance, copyable prompts and expected outputs. Day 1 covers responsible prompt workflows and the agent case study; Day 2 covers video planning, production and showcase.
- The Start Here page explains participant preparation, the learning route, downloads, common troubleshooting and a plain-language glossary.
- The AI tools directory groups 34 optional AI tools and four supporting workshop platforms by task, maps them to the five-day programme and includes responsible-use reminders.
- The Resources hub groups whitepapers, tutorials, YouTube videos, editable templates, dashboard examples, Behance inspiration and day-by-day workshop materials.
- The Day 4 exercise guide includes a simulated 6,000-session visitor CSV covering January–December 2025 and 13 countries.
- The guide describes participant activities; no working booking form, customer database or external AI service is connected to this course information site.

