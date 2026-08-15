(() => {
  const sharedRule = "Use only the information and verified sources supplied. Preserve facts, numerical values, citations, quotations, technical terms, and the intended research scope. Do not invent evidence, references, methods, or results. Mark missing or uncertain information as [AUTHOR VERIFICATION REQUIRED].";

  const thesisGroups = [
    ["planning", "Thesis Planning", [
      "Develop a detailed Chapter 1–5 thesis outline and explain the purpose of every proposed section",
      "Evaluate a proposed thesis structure for completeness, balance, logical progression, and misplaced content",
      "Map the research problem, questions, objectives, methods, expected outputs, and intended contributions",
      "Develop a realistic thesis writing and revision plan with chapter dependencies and review checkpoints"
    ]],
    ["chapter-1", "Chapter 1: Introduction", [
      "Develop a research background that progresses from the broad context to the specific problem",
      "Strengthen the problem statement using the ideal situation, actual evidence, discrepancy, consequences, and research need",
      "Identify and formulate the most defensible empirical, theoretical, methodological, contextual, or population research gap",
      "Align the problem statement, research gap, research questions, and research objectives in a structured matrix",
      "Evaluate whether the research objectives are specific, measurable, achievable, relevant, and methodologically answerable",
      "Develop the scope, delimitations, significance, operational definitions, and organisation of the thesis",
      "Conduct a comprehensive academic and alignment review of Chapter 1"
    ]],
    ["chapter-2", "Chapter 2: Literature Review", [
      "Develop a thematic Chapter 2 structure connected to the research questions, objectives, and proposed framework",
      "Produce a critical thematic synthesis that compares studies rather than summarising them one at a time",
      "Critically compare previous studies by theory, context, sample or dataset, method, findings, and limitations",
      "Evaluate the suitability and explanatory power of the proposed theoretical foundation",
      "Develop and justify a conceptual framework without introducing unsupported constructs or relationships",
      "Strengthen the literature-based research gap by distinguishing what is known, uncertain, and insufficient",
      "Conduct a rigorous review of Chapter 2 for coverage, synthesis, critical depth, theory, framework, and gap"
    ]],
    ["chapter-3", "Chapter 3: Research Methodology", [
      "Select and justify a research design that directly addresses the research questions and objectives",
      "Review the population, sampling frame, inclusion criteria, sampling method, sample size, and potential bias",
      "Evaluate the research instrument, adaptation, validity, pilot testing, reliability, translation, and administration",
      "Review an AI or computational methodology for dataset quality, preprocessing, architecture, training, validation, baselines, and reproducibility",
      "Develop a data-analysis plan mapping every objective to data, variables, techniques, assumptions, criteria, and outputs",
      "Assess validity, reliability, trustworthiness, robustness, ethics, and reproducibility procedures",
      "Conduct a comprehensive review of Chapter 3 and create an Objective–Method–Output alignment matrix"
    ]],
    ["chapter-4", "Chapter 4: Results and Analysis", [
      "Organise Chapter 4 by research question and objective while separating results from broader discussion",
      "Review quantitative results for consistency among the narrative, tables, figures, and reported statistical values",
      "Review qualitative findings for transparent theme development, supporting evidence, and differing perspectives",
      "Interpret model performance using the supplied metrics, baselines, robustness evidence, and practical significance",
      "Review every table and figure for accuracy, numbering, titles, labels, units, legends, and narrative alignment",
      "Conduct a rigorous Chapter 4 audit and flag every discrepancy requiring statistical or author verification"
    ]],
    ["chapter-5", "Chapter 5: Discussion, Conclusion and Recommendations", [
      "Discuss the findings by research objective and compare them with verified literature and theoretical expectations",
      "Evaluate and demonstrate the achievement of every research objective using methods, evidence, and remaining limitations",
      "Identify defensible theoretical, methodological, empirical, technological, and practical contributions",
      "Develop a balanced, study-specific limitations section and explain the effect of each limitation",
      "Develop evidence-based future research recommendations arising directly from the findings and limitations",
      "Review and revise the final conclusion without adding new results, references, claims, or recommendations"
    ]],
    ["cross-chapter", "Cross-Chapter Alignment", [
      "Build a complete Chapters 1–5 alignment matrix covering problem, gap, questions, objectives, theory, method, results, conclusion, and contribution",
      "Audit consistency in terminology, constructs, abbreviations, objective wording, model names, datasets, and chapter references",
      "Check every major thesis claim against the study results and verified literature and qualify unsupported claims",
      "Identify repetition, contradiction, missing transitions, and content placed in the wrong chapter"
    ]],
    ["examination", "Examiner Comments and Corrections", [
      "Classify examiner comments by severity, chapter, required action, evidence needed, and revision priority",
      "Draft a professional response to each examiner comment with the action, location, revised text, and justification",
      "Verify that every promised examiner correction is reflected accurately and consistently in the revised thesis"
    ]],
    ["viva", "Viva Preparation", [
      "Generate challenging viva questions on novelty, theory, methodology, validity, findings, limitations, and contributions",
      "Evaluate draft viva answers for accuracy, evidence, clarity, defensibility, and appropriate qualification",
      "Prepare a concise oral defence that connects the problem, gap, method, findings, contributions, and limitations"
    ]]
  ];

  const articleGroups = [
    ["title-keywords", "Title and Keywords", ["Evaluate the title for clarity, specificity, accuracy, discoverability, and alignment with the study", "Generate alternative journal-article titles without adding concepts absent from the manuscript", "Select precise and searchable keywords that complement rather than merely repeat the title"]],
    ["abstract", "Abstract", ["Audit the abstract for background, problem, objective, method, principal findings, contribution, and conclusion", "Revise the abstract to the specified word limit using only verified manuscript information", "Check consistency between every abstract claim and the corresponding manuscript section"]],
    ["introduction", "Introduction", ["Strengthen the introduction from research context to problem, gap, objective, and contribution", "Evaluate whether the problem and research gap are evidence-based, significant, and defensible", "Clarify the study objectives, research questions, scope, novelty, and article roadmap"]],
    ["literature", "Related Work and Literature Review", ["Develop a critical thematic synthesis instead of a study-by-study summary", "Compare related studies by theory, context, data, method, findings, limitations, and relevance", "Evaluate whether the literature review justifies the research gap and proposed approach"]],
    ["methodology", "Methodology", ["Review the methodology for design, setting, population or dataset, sampling, instruments, procedures, analysis, ethics, and reproducibility", "Evaluate an AI or computational experiment for preprocessing, architecture, parameters, training, validation, baselines, metrics, leakage, and overfitting", "Map every research objective to the data source, analytical method, evaluation criterion, and reported output", "Identify missing methodological details that prevent replication without filling the gaps"]],
    ["results", "Results", ["Review the results for logical order, completeness, and consistency between text, tables, figures, and numerical values", "Rewrite the results narrative using only reported data and without introducing interpretation or changing values", "Assess whether the analyses and evaluation metrics adequately answer every research question"]],
    ["discussion", "Discussion", ["Develop a critical discussion that explains findings in relation to the research questions, theory, and verified prior studies", "Distinguish evidence-based interpretation, plausible explanation, speculation, implication, and unsupported claim", "Evaluate whether the discussion addresses agreements, contradictions, significance, boundary conditions, and alternative explanations"]],
    ["conclusion", "Conclusion and Implications", ["Revise the conclusion to synthesise purpose, principal findings, contribution, implications, limitations, and future work", "Check that conclusions and implications remain within the evidence and do not introduce new claims or references"]],
    ["visuals", "Tables and Figures", ["Audit tables and figures for accuracy, readability, numbering, titles, labels, units, legends, and text alignment", "Identify redundant visuals and recommend whether information belongs in prose, a table, or a figure"]],
    ["novelty", "Novelty and Contributions", ["Evaluate the strength and evidence base of the claimed novelty against the verified literature", "Distinguish theoretical, methodological, empirical, technological, and practical contributions and define their boundaries"]],
    ["journal", "Journal Selection and Compliance", ["Assess manuscript fit with the supplied journal scope, audience, article type, and recent publication themes", "Create a compliance checklist from the supplied author guidelines without inventing requirements", "Draft a concise, evidence-based cover letter highlighting fit, originality, contribution, and ethical declarations"]],
    ["reviewers", "Reviewer Response", ["Classify reviewer comments and create an action plan by severity, manuscript location, evidence, and response strategy", "Draft a professional point-by-point response stating the action, location, revised text, or justified disagreement", "Verify that every response accurately reflects a visible change in the revised manuscript"]],
    ["integrity", "Citation and Research Integrity", ["Audit statements requiring citations and classify them as required, recommended, common knowledge, interpretation, or own result", "Flag unverifiable references, citation–claim mismatches, duplicated text, and statements requiring source checking"]],
    ["final-check", "Final Submission Review", ["Conduct a journal-level final manuscript audit for novelty, alignment, methods, results, discussion, presentation, and integrity", "Create a priority-ranked pre-submission checklist of critical, major, and minor corrections"]]
  ];

  const data = document.body.dataset.promptType === "article" ? articleGroups : thesisGroups;
  const bank = document.getElementById("specialisedPromptBank");
  const filters = document.getElementById("specialisedFilters");
  const search = document.getElementById("promptSearch");
  const count = document.getElementById("promptCount");
  const total = document.getElementById("specialisedTotal");
  const empty = document.getElementById("promptEmpty");
  if (!bank || !filters || !search) return;

  let active = "all";
  const allItems = [];
  const button = (key, label, selected = false) => `<button type="button" data-filter="${key}" class="${selected ? "active" : ""}" aria-pressed="${selected}">${label}</button>`;
  filters.innerHTML = button("all", "All Prompts", true) + data.map(group => button(group[0], group[1])).join("");
  bank.innerHTML = data.map(([key, label, tasks]) => {
    const cards = tasks.map((task, index) => {
      const prompt = `Act as an experienced academic researcher and editor in [FIELD OF STUDY]. ${task}. ${sharedRule} Return: (1) the requested output, (2) a concise explanation of the major issues or changes, and (3) items requiring author verification.\n\n[PASTE RELEVANT TEXT OR STUDY INFORMATION HERE]`;
      const item = { key, label, task, prompt };
      allItems.push(item);
      return `<article class="prompt-card" data-category="${key}" data-search="${(label + " " + task + " " + prompt).toLowerCase().replace(/"/g, "&quot;")}"><div class="prompt-meta"><span>${label} · ${String(index + 1).padStart(2, "0")}</span><button class="copy-prompt" type="button" aria-label="Copy ${task}"><i data-lucide="copy"></i><span>Copy</span></button></div><h3>${task}</h3><p>${prompt}</p></article>`;
    }).join("");
    return `<section class="prompt-category" data-group="${key}"><div class="prompt-category-heading"><p class="eyebrow">PROMPT CATEGORY</p><h2>${label}</h2><span>${tasks.length} guided prompts</span></div><div class="prompt-grid">${cards}</div></section>`;
  }).join("");

  const update = () => {
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    bank.querySelectorAll(".prompt-card").forEach(card => {
      const show = (active === "all" || card.dataset.category === active) && (!term || card.dataset.search.includes(term));
      card.hidden = !show;
      if (show) visible++;
    });
    bank.querySelectorAll(".prompt-category").forEach(group => {
      group.hidden = !Array.from(group.querySelectorAll(".prompt-card")).some(card => !card.hidden);
    });
    count.textContent = `${visible} prompt${visible === 1 ? "" : "s"} shown`;
    empty.hidden = visible !== 0;
  };

  filters.addEventListener("click", event => {
    const target = event.target.closest("button[data-filter]");
    if (!target) return;
    active = target.dataset.filter;
    filters.querySelectorAll("button").forEach(item => {
      const selected = item === target;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", selected);
    });
    update();
  });
  search.addEventListener("input", update);
  bank.addEventListener("click", async event => {
    const target = event.target.closest(".copy-prompt");
    if (!target) return;
    const text = target.closest(".prompt-card").querySelector("p").textContent;
    try { await navigator.clipboard.writeText(text); } catch (_) {
      const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
    }
    const toast = document.getElementById("copyToast");
    if (toast) { toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 1600); }
  });
  total.textContent = `${allItems.length} copy-ready prompts across ${data.length} categories`;
  update();
  if (window.lucide) window.lucide.createIcons();
})();
