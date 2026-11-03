# Performance Evaluation of Agent-Based Systems

Website for the CAI 461 Topic 8 guest lecture at Princess Nourah bint Abdulrahman University (PNU × UTM), delivered by Assoc. Prof. Dr. Mohd Shahizan Othman and hosted by Dr. Eman Aljabarti.

A static site: plain HTML, CSS and JavaScript with no build step, ready for GitHub Pages.

## Pages

| File | Content |
|---|---|
| `index.html` | Home: overview, four-layer framework, learning outcomes, speakers, FAQ |
| `programme.html` | The 110-minute session drawn as a trace timeline, with slide ranges |
| `modules.html` | Overview of the six modules and how they map to the four layers |
| `module-1-performing-well.html` | Performance measures, rationality, expected utility, achievement and maintenance tasks |
| `module-2-society-of-agents.html` | Social welfare, Pareto, Nash, price of anarchy, protocol checklist, Contract Net |
| `module-3-measuring-the-system.html` | Metric families, curves, tracing, JADE tools, experiment design |
| `module-4-agent-based-models.html` | Verification, validation, replication, BehaviorSpace, ODD |
| `module-5-llm-agents.html` | Benchmarks, pass^k, cost, MultiAgentBench, MAST, LLM-as-a-judge, OpenTelemetry |
| `module-6-bringing-it-together.html` | Four-layer framework, case activity, lab preview, takeaways |
| `big-picture.html` | Ecosystem map, timeline, one system across four layers, metric picker |
| `tools.html` | Six interactive calculators |
| `case-studies.html` | Cases A, B and C with model answers, plus four published studies |
| `lab.html` | Two-hour practical guide |
| `resources.html` | Searchable reading list |
| `glossary.html` | 30 key terms |
| `404.html` | Not-found page |

`assets/css/style.css` holds all styles, `assets/js/main.js` the shared behaviour (menu, quizzes, copy buttons, resource search) and `assets/js/tools.js` the calculators. `assets/img/infographics/` holds the 14 infographic images (WebP), each shown once beside the text that explains it. `assets/downloads/` contains the slides, the lab harness (`lab_harness.py`, Python 3.10+, no dependencies) and the Markdown templates.

## Publish on GitHub Pages

1. Create a repository, for example `cai461-topic8`, and upload the contents of this folder to the root of the `main` branch.
2. In the repository, open **Settings → Pages**, set **Source** to “Deploy from a branch”, choose `main` and `/ (root)`, and save.
3. After a minute the site is live at `https://<your-username>.github.io/cai461-topic8/`.

To put it inside an existing site instead, copy the folder into that repository (for example `drshahizan.github.io/cai461-topic8/`). All links are relative, so it works from any sub-folder.

## Before publishing

- Session date set to Wednesday, 4 November 2026, 8.30 pm Malaysia time (3.30 pm Riyadh time). To change it, edit the line on `index.html`.
- Check the speaker and host details on `index.html`.
- Visitor counter: the footer uses the same visitorbadge.io badge as drshahizan.github.io/bdc (path github.com/drshahizan), so visits add to the same count.
