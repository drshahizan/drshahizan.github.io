# Polishing Your Draft Article Using AI Tools

One-stop website for the session at the **Winning Journal Writing Workshop 2026**, a collaborative programme between Universiti Teknologi Malaysia (UTM) and Ho Chi Minh City University of Technology (HCMUT), Vietnam.

- **Date:** Friday, 6 November 2026
- **Time:** 9:00 AM – 1:00 PM (MYT)
- **Platform:** Cisco Webex (online)
- **Speaker:** Assoc. Prof. Dr. Mohd Shahizan Othman, UTM
- **Register:** https://forms.gle/gkNi6a5dqNoLiU2EA
- **Organised by:** UTM and HCMUT, in collaboration with the Faculty of Computing, UTM and PGSS-FC, UTM

## Slides

The slides are on `slides.html` (images in `assets/slides/`, PDF in `assets/files/polishing-your-draft-article-slides.pdf`). To replace them, overwrite the PDF and the `slide-NN.jpg` / `thumb-NN.jpg` images.

## After the session: add recording and Q&A

Edit `assets/files/links.json` on GitHub. The Materials page updates automatically.

```json
{
  "slides": "assets/files/slides.pdf",
  "recording": "https://link-to-the-webex-recording",
  "qa": [
    { "q": "A question from the session", "a": "Your answer" }
  ]
}
```

To publish the slides, upload `slides.pdf` into `assets/files/` and set `"slides"` as above (or paste a Google Drive link).

## Site map

| Section | Pages |
|---|---|
| Learn | `index.html`, `slides.html`, `session.html`, `modules.html` + `modules/` (12), `example.html`, `activities.html`, `vi.html` (Tiếng Việt) |
| Toolkit | `toolkit.html`, `prompt-builder.html`, `checker.html`, `disclosure.html`, `doi-checker.html`, `checklist.html` |
| Guides | `guides.html`, `sections.html`, `phrasebank.html`, `policies.html`, `reporting.html`, `verify.html`, `pitfalls.html`, `response-letter.html`, `resources.html` |
| Other | `prompts.html`, `tools.html`, `materials.html`, `404.html` |

Assets:

```
assets/css/style.css            Stylesheet
assets/js/main.js               Menu, theme, checklists, copy buttons, filters, site search
assets/js/toolkit.js            Prompt builder, checker, disclosure generator, reference checker, guideline finder
assets/js/materials.js          QR code, slides/recording/Q&A loader
assets/js/vendor/qrcode.js      QR Code Generator (MIT licence, Kazuhiko Arase)
assets/search-index.json        Site search index
assets/files/                   Workflow PDF, AI-use log (Excel), prompt pack, links.json
assets/images/                  Workshop poster
```

Notes:
- Site search, the Materials page loader and the reference checker need the site to be served over the web (GitHub Pages works). They do not work when opening files directly from disk.
- The reference checker queries the public Crossref and DataCite APIs from the visitor's browser.
- The publisher policy summary was checked on 5 November 2026. Review it before reusing the site for later workshops.

## Publishing on GitHub Pages

1. Create a public repository and upload everything in this folder, keeping the folder structure.
2. Go to **Settings → Pages**, choose branch `main` and folder `/ (root)`, then save.
3. The site will be live at `https://<username>.github.io/<repository-name>/`.
