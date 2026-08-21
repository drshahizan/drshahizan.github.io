# AI for Research: From Literature Discovery to Academic Writing

Static, responsive website prepared for GitHub Pages.

## Publish on GitHub Pages

1. Upload all files and folders in this package to the root of your GitHub repository.
2. Open **Settings → Pages** in GitHub.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.

The site uses only HTML, CSS and JavaScript; no build step is required.

## Main Pages

- `index.html` — training overview, objectives, learning outcomes, target participants, modules, trainer, preparation and FAQ
- `programme.html` — full one-day schedule, detailed module descriptions and training methodology
- `materials.html` — four-part training slide presentation, the AI prompt library index, an end-to-end article workflow (10 stages, literature discovery to submission) and an interactive pre-submission checklist
- `tools.html` — searchable AI tools directory with five collections
- `tools-discovery.html` — Discovery & Databases tools
- `tools-review.html` — Review & Evidence Analysis tools
- `tools-writing.html` — Writing, Citation & Publishing tools
- `tools-visualisation.html` — Paper Visualisation tools
- `tools-methods.html` — Research Methods, Data & Productivity tools
- `ai-prompt.html` — AI Prompt Centre hub (8 categories of prompt resources)
- `scopus-ai-prompts.html` — Scopus AI prompts for research discovery (48 prompts, 12 categories)
- `gemini-notebook-prompts.html` — Gemini Notebook prompts for literature synthesis and publishing (95 prompts)
- `gemini-notebook-studio-prompts.html` — Gemini Notebook Studio prompts for source-grounded outputs (24 prompts, 8 formats)
- `studio-prompt-builder.html` — interactive builder for a Gemini Notebook Studio prompt
- `ai-publication-prompts.html` — Google Gemini prompts for publication (66 prompts, 6 phases, 20 categories)
- `manuscript-review-prompts.html` — five specialist manuscript review prompts (Word report output)
- `prompt-builder.html` — interactive SLR review prompt builder
- `agentic-ai-publication.html` — eight agentic AI workflows for writing and publication, plus an agent workflow builder
- `resources.html` — related research repositories and curated further-reading guides (PhD journey, research design, research gap, academic writing, AI for research)
- `training-modules.html` — Training Modules hub linking to all five module companion pages
- `module-1-literature-discovery.html` — Module 1 companion page with a Boolean search string builder, core & subject-specific scholarly databases, AI-powered discovery tools (Zeta Alpha, Semantic Scholar, Connected Papers, Elicit), a Publish or Perish citation-ranking guide and a hands-on Scopus AI exercise
- `module-2-idea-generation.html` — Module 2 companion page with a Research Question & Design prompt builder, a FINER quick reference, novelty-check tools (Scite, ResearchRabbit, Litmaps, Consensus) and a hands-on Gemini Notebook idea-validation exercise
- `module-3-knowledge-organisation.html` — Module 3 companion page with a Knowledge Organisation prompt builder and recommended mind-mapping tools (Xmind, Markmap, MindMeister, Obsidian, Gemini Notebook Studio, Notion, Miro, Whimsical)
- `module-4-data-visualisation.html` — Module 4 companion page with a chart-type decision helper and recommended bibliometric-mapping and scientific-communication tools (VOSviewer, Bibliometrix, Gephi, Open Knowledge Maps, BioRender, Canva)
- `module-5-academic-writing.html` — Module 5 companion page with a citation quick reference, recommended citation managers & writing assistants (Zotero, Mendeley, EndNote, Grammarly, Paperpal, Jenni AI) and a responsible AI writing checklist

Every module page (1–5) also includes: a sticky "Jump to" dropdown, a "Before You Start" preparation checklist, a "Scan to open this module on your phone" QR code box, a Trainer's Tip callout from Dr. Shahizan, a worked example of the module's hands-on tool output, a set of numbered hands-on exercises with estimated time tags (see below), a Traditional vs AI-assisted comparison table, a Key Takeaways & Glossary recap, a 4-question self-check quiz with instant feedback that saves your score, a "What's Next" bridge to the following module, and Previous/Next module navigation linking through the full 5-module sequence.

## Numbered exercises

Every hands-on tool and exercise on a module page is numbered in one continuous sequence per module (Exercise 1.1, 1.2, and so on), each carrying an estimated time tag and, where relevant, a short technique, a worked example or template, and a ready-to-use AI prompt. Two exercises also include a "reveal the answer" `<details>` box you can open after attempting the task yourself:

- **Module 1:** 1.1 Boolean Search String Builder, 1.2 Rank papers with Publish or Perish, 1.3 Try Scopus AI with your own topic, 1.4 Citation snowballing (with a reveal-box worked example), 1.5 Compare database coverage, 1.6 Check a source with the CRAAP test
- **Module 2:** 2.1 Research Question & Design Prompt Builder, 2.2 Pressure-test your idea with Gemini Notebook, 2.3 Problem tree (broad problem to candidate questions), 2.4 Gap-spotting worksheet (with a reveal-box worked example), 2.5 Peer critique with the FINER rubric
- **Module 3:** 3.1 Knowledge Organisation Prompt Builder, 3.2 Build a Research Matrix (Literature Review / Research Design / Synthesis, with a custom prompt builder), 3.3 Concept mapping from an abstract
- **Module 4:** 4.1 Chart-Type Decision Helper, 4.2 Spot the misleading chart (distorted vs honest axis, illustrated), 4.3 Recreate a chart from your own data, 4.4 Generate and fact-check a Studio infographic
- **Module 5:** 5.1 Using AI deep-research features responsibly, 5.2 Draft your own AI disclosure statement (interactive builder), 5.3 Verify an AI-drafted paragraph (sample paragraph with a reveal-the-errors answer key), 5.4 Convert a reference list between citation styles

Each module page also has a sticky "Jump to" dropdown (`.page-toc`) right below the hero, linking to every section above in one compact `<select>` — pick a destination and the page scrolls straight to it. Chosen over a row of pill links so there is one control to pick from instead of a long scrolling list, especially on mobile.

## Deployment URL

This package is configured for **https://drshahizan.github.io/bdc/**. If you deploy it to a different URL (a different repository name or a custom domain), update the absolute URLs in the Open Graph / Twitter Card meta tags and `<link rel="canonical">` on `index.html`, `programme.html`, `training-modules.html` and the five `module-N-*.html` pages, and regenerate the QR codes (see below) to point at the new URL.

## Recent additions

- **Open Graph / Twitter Card meta tags** — `index.html`, `programme.html`, `training-modules.html` and the five module pages each carry `og:*` and `twitter:*` meta tags plus a `<link rel="canonical">`, so links shared in WhatsApp, Telegram, LinkedIn, etc. show a proper title, description and preview image.
- **QR codes** — `assets/images/qr/` contains a QR code PNG for the Training Modules hub and each of the five module pages, generated from their live GitHub Pages URLs. Each module page and the hub show a "Scan to open on your phone" box using the matching QR code, handy for in-person handouts and slides.
- **Progress tracking** — each module's self-check quiz saves its score to the browser's `localStorage` (key `bdcProgress`) on submit. Revisiting a module shows your last score above the quiz, and the Training Modules hub shows a "Not started / In progress / Completed X of Y" badge on every module card. This is per-device and per-browser only; it is not synced anywhere.
- **Trainer's Tips** — a short, practical tip attributed to Dr. Shahizan appears in the "Before You Start" section of every module page.
- **Printable cheat sheet** — `assets/downloads/ai-for-research-cheat-sheet.pdf` is a five-page PDF (one page per module) with that module's key takeaways, main prompt pattern, glossary and QR code. It is linked from the Materials page under "Printable Handout". To regenerate it after editing module content, update `/tmp/work/cheatsheet/build_data.py`-style content and re-render with a headless browser (see the source notes left in this project's working files, or simply rebuild from the takeaways/glossary text already on each module page).
- **Accessibility** — automated `axe-core` scans (WCAG 2 A/AA) pass with zero violations on `index.html`, `programme.html`, `training-modules.html`, `materials.html`, `404.html` and all five module pages. Fixed two pre-existing low-contrast issues: the "You're here" state in the Previous/Next module pager, and prompt text on the dark Gemini Notebook configuration panel in Module 1.
- **On-page jump-to dropdown** — a sticky `<select>` (`.page-toc`) sits below the hero on every module page, linking to that module's tools, every numbered exercise, the comparison table, recap and quiz. A single dropdown was chosen over a row of pill links so there is one easy control to pick from, with no horizontal scrolling on mobile.
- **Estimated time tags** — every hands-on tool and numbered exercise across all five modules shows an estimated completion time (e.g. "~15 min") next to its heading, to help participants and the trainer pace the day.
- **Full internal link check** — every `href` across all pages (internal links and same-page anchors) was checked programmatically against the actual target files and `id` attributes; zero broken links or missing anchors.
- **Mobile check (375px)** — every core page and all five module pages were checked at a 375px viewport for horizontal overflow; none found.
- **Custom 404 page and sitemap** — `404.html` matches the site's header/footer and links back to Home, Training Modules, Programme and Materials. `sitemap.xml` lists all 25 pages, and `robots.txt` points crawlers to it.
- **Print stylesheet** — a `@media print` block strips the header, navigation, jump-to dropdown, forms, copy buttons and other on-screen-only chrome, expands any collapsed "reveal the answer" boxes, and renders the page in plain black-on-white for anyone who prints a module page as a handout.
- **More reveal-box answer keys** — Exercise 1.4 (Citation snowballing) and Exercise 2.4 (Gap-spotting) now include a "Reveal a worked example" box, extending the pattern first used in Module 5's paragraph-verification exercise.
- **Venue update** — the venue across the whole site (footer, Home hero, Programme, all module pages) is now **Seminar Room, Level 1, Block N31, UTM Johor Bahru**.
- **Header cleanup** — removed the "View Programme" / "View Full Schedule" button from the header on every page, since it duplicated the "Programme" link already in the main navigation. The header now shows the nav links and the theme toggle only.
- **Article workflow** — `materials.html` has a new "Your end-to-end article workflow" section: a 10-stage numbered timeline from literature discovery (Module 1) through drafting (Module 5), self-review, peer/supervisor review, a similarity/AI-writing check, formatting, and final submission — each stage links to the relevant module, tool or checklist.
- **Interactive pre-submission checklist** — `materials.html` has a new 20-item checklist ("Pre-Submission Checklist") grouped into Content & Argument, Citations & Evidence, AI Use & Integrity, Formatting & Journal Requirements, and Final Technical Checks. Each item is a real checkbox with a live progress bar; your ticks are saved to this browser's `localStorage` (key `bdcSubmissionChecklist`) and a "Reset Checklist" button clears them.
- **Detailed printable module notes** — `assets/downloads/module-1-literature-discovery-notes.pdf` through `module-5-academic-writing-notes.pdf` are five separate, detailed, maroon/gold-themed PDFs (one per module, 9–12 pages each). Each covers learning objectives, a glossary, step-by-step "how to use" guides for that module's AI tools (Scopus AI, Publish or Perish, Gemini Notebook, the Research Matrix builder, the Chart-Type Decision Helper, the AI Disclosure Builder, and more), a worked example, every numbered exercise with a full model answer, an AI tools table, a Traditional vs AI-assisted comparison, common pitfalls to check, a recap of key takeaways, and blank ruled pages for handwritten notes. Linked from the Materials page under "Detailed Printable Notes" and from a "Download Module Notes (PDF)" button on each module page's hero. To regenerate after editing module content, update the `content_m1.py`–`content_m5.py` data files and re-run `build.py` + `render_pdf.py` from this project's working files (`/tmp/work/modulenotes/`), which use the same shared print-CSS/Playwright pipeline as the cheat sheet.

## Files

- `style.css` — shared styling, including the QR box, Trainer's Tip callout and hub progress-badge components
- `script.js` — shared behaviour (theme toggle, mobile menu, scroll effects, poster lightbox, reading-guide search)
- `tools-catalog.js` — tool data and search/filter logic for the AI Tools pages
- `scopus-ai-prompts.js`, `notebook-prompts.js`, `studio-prompts.js`, `publication-prompts.js`, `manuscript-review-prompts.js` — prompt data and search/filter logic for the AI Prompt Centre libraries
- `slr-review-builder.js`, `studio-prompt-builder.js`, `agentic-ai-publication.js` — interactive prompt-builder logic for the SLR review builder, Studio prompt builder and Agentic AI workflow builder
- `modules.js` — interactive tool logic for the five Module companion pages (search string builder, research question builder, knowledge organisation builder, chart-type helper, Scopus AI pattern copy, Gemini Notebook pattern copy, the shared self-check quiz handler with `localStorage` progress saving, the Training Modules hub progress-badge renderer, the on-page jump-to dropdown handler, and the Materials page pre-submission checklist with `localStorage` persistence)
- `assets/images/ai-for-research-poster.png` — official training poster
- `assets/images/*.jpg` — supporting imagery for the AI Tools, AI Prompt Centre, Materials and Resources pages
- `assets/images/qr/*.png` — QR codes for the Training Modules hub and each module page
- `assets/downloads/ai-for-research-cheat-sheet.pdf` — printable five-page module cheat sheet
- `assets/downloads/module-1-literature-discovery-notes.pdf` … `module-5-academic-writing-notes.pdf` — five detailed, printable per-module PDF notes with tool guides, worked examples, exercises with model answers, and blank note pages
- `404.html` — custom "page not found" page matching the site's header/footer
- `sitemap.xml` — XML sitemap listing all 25 pages, for search engines
- `robots.txt` — allows crawling and points to `sitemap.xml`
