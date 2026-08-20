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
- `materials.html` — four-part training slide presentation plus the AI prompt library index and pre-submission checklists
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
- `module-3-knowledge-organisation.html` — Module 3 companion page with a Knowledge Organisation prompt builder and recommended mind-mapping tools (Xmind, Miro, Whimsical, Obsidian, Gemini Notebook Studio, Notion)
- `module-4-data-visualisation.html` — Module 4 companion page with a chart-type decision helper and recommended bibliometric-mapping and scientific-communication tools (VOSviewer, Bibliometrix, Gephi, Open Knowledge Maps, BioRender, Canva)
- `module-5-academic-writing.html` — Module 5 companion page with a citation quick reference, recommended citation managers & writing assistants (Zotero, Mendeley, EndNote, Grammarly, Paperpal, Jenni AI) and a responsible AI writing checklist

## Files

- `style.css` — shared styling
- `script.js` — shared behaviour (theme toggle, mobile menu, scroll effects, poster lightbox, reading-guide search)
- `tools-catalog.js` — tool data and search/filter logic for the AI Tools pages (includes Miro and Whimsical under Paper Visualisation)
- `scopus-ai-prompts.js`, `notebook-prompts.js`, `studio-prompts.js`, `publication-prompts.js`, `manuscript-review-prompts.js` — prompt data and search/filter logic for the AI Prompt Centre libraries
- `slr-review-builder.js`, `studio-prompt-builder.js`, `agentic-ai-publication.js` — interactive prompt-builder logic for the SLR review builder, Studio prompt builder and Agentic AI workflow builder
- `modules.js` — interactive tool logic for the five Module companion pages (search string builder, research question builder, knowledge organisation builder, chart-type helper, Scopus AI pattern copy, Gemini Notebook pattern copy)
- `assets/images/ai-for-research-poster.png` — official training poster
- `assets/images/*.jpg` — supporting imagery for the AI Tools, AI Prompt Centre, Materials and Resources pages
