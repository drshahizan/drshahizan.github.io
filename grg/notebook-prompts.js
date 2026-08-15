(() => {
  const categories = [
    ["understand", "A · Understand & Structure", [
      ["source-profiling", "1. Source Profiling", [
        ["Build a 30-Article Evidence Matrix", "Analyze every article and construct a table containing the citation, research problem, objectives, theoretical foundation, methodology, population or dataset, analytical technique, evaluation metrics, principal findings, limitations, and proposed future work. Use one row per article and retain the terminology used by the authors."],
        ["Create Structured Analytical Profiles", "Produce a concise analytical profile for each article covering purpose, context, design, evidence, contribution, and limitations. End each profile with a one-sentence statement explaining how the article contributes to the overall research field."],
        ["Identify Foundational and Peripheral Studies", "Classify the articles as foundational, confirmatory, contradictory, methodological, application-focused, or peripheral to the central topic. Explain the classification criteria and justify the placement of every article using source evidence."],
        ["Extract Article Contributions", "Identify the theoretical, methodological, empirical, technological, and practical contribution claimed by each article. Assess whether the evidence presented adequately supports each claimed contribution."],
        ["Create Concise Study Briefs", "Produce a standardized brief for every article containing the research question, approach, most important result, principal contribution, strongest limitation, and relevance to the planned review article."]
      ]],
      ["concept-terminology", "2. Concept & Terminology Analysis", [
        ["Compare Core Definitions", "Identify the main concepts, constructs, variables, and technical terms across all sources. Compare how each concept is defined, measured, or operationalized and highlight definitions that are inconsistent, incomplete, or context-dependent."],
        ["Resolve Overlapping Terminology", "Find terms that appear different but represent similar ideas, as well as identical terms used with different meanings. Create a terminology reconciliation table containing the term, source-specific meaning, overlap or difference, and recommended definition for the review article."],
        ["Trace Conceptual Evolution", "Trace how the key concepts have evolved chronologically across the sources. Identify changes in definitions, assumptions, scope, and measurement, and explain what drove those changes according to the available evidence."],
        ["Build a Construct–Measure Map", "Map every major construct to the indicators, instruments, variables, or computational measures used to operationalize it. Highlight measurement inconsistency and potential threats to cross-study comparison."],
        ["Recommend a Consistent Vocabulary", "Based on the terminology used across the sources, recommend a consistent vocabulary for the review article. Justify preferred terms and identify synonyms or ambiguous labels that should be defined explicitly."]
      ]],
      ["thematic-analysis", "3. Thematic Analysis", [
        ["Develop Themes and Subthemes", "Conduct a thematic analysis across all articles. Identify major themes, subthemes, recurring patterns, and emerging issues. Define every theme clearly and list the sources that provide supporting, contrasting, or partial evidence."],
        ["Build a Theme–Evidence Matrix", "Create a matrix with themes as rows and articles as columns. Indicate whether each source strongly supports, partially supports, contradicts, or does not address each theme, followed by a concise synthesis of the overall pattern."],
        ["Write a Critical Thematic Narrative", "Develop a critical literature-review narrative organized by themes rather than article-by-article summaries. Within each theme, synthesize agreements, disagreements, methodological differences, boundary conditions, and unresolved questions."],
        ["Detect Emerging and Declining Themes", "Compare themes across publication periods to identify topics gaining attention, topics losing prominence, and newly emerging concerns. Explain the evidence supporting each temporal pattern."],
        ["Evaluate Theme Coverage", "Assess whether each major theme is supported by sufficient and diverse evidence. Identify themes dominated by a narrow context, method, research group, population, or dataset."]
      ]],
      ["literature-classification", "4. Literature Classification", [
        ["Construct a Literature Taxonomy", "Classify all sources using a defensible taxonomy based on theory, methodology, context, population or dataset, technology, and contribution type. Explain the classification logic and allow articles to occupy multiple categories when justified."],
        ["Map the Research Landscape", "Map the distribution of studies across domains, research designs, datasets, populations, technologies, and outcomes. Identify clusters, imbalances, sparsely studied combinations, and areas that dominate the literature."],
        ["Identify Research Archetypes", "Derive recurring study archetypes from the sources, such as theory-building, model-development, empirical-validation, comparative, exploratory, or application studies. Describe each archetype and assess its strengths and weaknesses."],
        ["Create a Multi-Dimensional Classification", "Classify the literature simultaneously by research purpose, theoretical orientation, methodology, evidence type, context, and contribution. Show where classifications intersect and where evidence is sparse."],
        ["Evaluate Classification Robustness", "Test whether the proposed taxonomy remains coherent when borderline and multi-category studies are considered. Identify categories that overlap excessively, lack sufficient evidence, or require clearer definitions."]
      ]]
    ]],
    ["compare", "B · Compare & Synthesise", [
      ["cross-study-comparison", "5. Cross-Study Comparison", [
        ["Compare Studies Systematically", "Compare all studies by objectives, theoretical basis, context, data, methodology, metrics, results, contributions, strengths, and weaknesses. Present a structured comparison table followed by the most important cross-study patterns."],
        ["Explain Differences in Findings", "Identify studies investigating similar questions but reporting different outcomes. Examine whether differences in population, dataset, setting, design, measurement, implementation, or evaluation could explain the variation."],
        ["Compare Approaches and Performance", "Compare the principal theories, methods, models, or technologies used across the sources. Assess the conditions under which each approach performs well or poorly without treating results from incomparable settings as directly equivalent."],
        ["Compare Contextual Effects", "Compare how setting, country, institution, discipline, population, dataset, or implementation environment influences study findings. Identify outcomes that appear context-sensitive and those that remain stable across contexts."],
        ["Compare Strengths and Trade-Offs", "For each major approach, compare accuracy or effectiveness, interpretability, cost, complexity, scalability, data requirements, and practical limitations. Avoid declaring a universal best approach when the evidence is context-dependent."]
      ]],
      ["evidence-synthesis", "6. Evidence Synthesis", [
        ["Assess Evidence Consistency", "Synthesize the evidence for each major claim. Classify findings as consistently supported, partially supported, contradictory, weakly supported, or inconclusive, and justify each classification using multiple sources where available."],
        ["Evaluate Evidence Strength and Breadth", "Assess the strength and breadth of evidence behind the principal conclusions by considering the number of supporting studies, methodological rigor, diversity of contexts, sample or dataset quality, and consistency of results."],
        ["Create an Evidence-to-Claim Map", "Develop a map linking every important review claim to its supporting and opposing sources. Identify claims dependent on a single study, claims supported across contexts, and claims that should be qualified because of limited evidence."],
        ["Synthesize Convergent and Divergent Evidence", "For every major research issue, synthesize convergent evidence, divergent evidence, possible explanations, and the most defensible conclusion. Indicate the appropriate confidence level for each conclusion."],
        ["Draft an Evidence-Based Synthesis Section", "Write a publication-ready synthesis section that integrates results across studies, weighs evidence quality, acknowledges uncertainty, and avoids vote counting based only on the number of supporting articles."]
      ]],
      ["contradiction-analysis", "7. Contradiction Analysis", [
        ["Identify and Explain Contradictions", "Identify every significant disagreement among the sources. Present the conflicting claims, supporting evidence, methodological and contextual differences, plausible causes, and the additional evidence needed to resolve each disagreement."],
        ["Distinguish Real and Apparent Contradictions", "Determine whether conflicting findings represent genuine theoretical disagreement or merely differences in definitions, populations, datasets, methods, metrics, or analytical scope. Explain the basis of each judgement."],
        ["Develop a Contradiction Resolution Agenda", "Prioritize the unresolved contradictions by scholarly importance. For each one, propose a research design, data requirement, comparison, or theoretical test that could resolve it, while identifying assumptions that must be controlled."],
        ["Trace Contradictions Over Time", "Determine when each major contradiction first appeared, how later studies responded, and whether the disagreement has narrowed, intensified, or remained unresolved."],
        ["Write a Balanced Contradiction Synthesis", "Draft a balanced synthesis of the conflicting evidence without selecting a preferred position prematurely. Explain the support, weaknesses, boundary conditions, and uncertainty associated with each position."]
      ]],
      ["hidden-connections", "8. Hidden Connections", [
        ["Reveal Non-Obvious Relationships", "Search across all sources for relationships between concepts, findings, contexts, and methods that individual authors did not explicitly connect. Explain the evidence chain supporting each proposed relationship."],
        ["Identify Transferable Methods and Insights", "Identify theories, methods, datasets, measures, or solutions from one research cluster that could address limitations in another. Explain the conditions required for responsible transfer and the risks of inappropriate generalization."],
        ["Generate Cross-Source Insights", "Combine complementary evidence from different documents to derive higher-order insights that are not available from any single article. Label each insight as evidence-backed inference and explain its supporting sources and assumptions."],
        ["Connect Problems to Unused Solutions", "Identify recurring problems in one group of studies and methods, theories, datasets, or solutions from another group that could address them. Evaluate whether the proposed connection is feasible and evidence-grounded."],
        ["Identify Multi-Level Relationships", "Examine whether findings at individual, organizational, technological, societal, or policy levels interact. Propose cross-level relationships supported by combined evidence and state the assumptions involved."]
      ]]
    ]],
    ["evaluate", "C · Critically Evaluate", [
      ["methodological-critique", "9. Methodological Critique", [
        ["Audit Research Designs", "Critically evaluate the suitability of the research designs, sampling strategies, datasets, instruments, procedures, analyses, metrics, and validation methods used across the studies. Identify recurring strengths and methodological weaknesses."],
        ["Assess Validity and Reproducibility", "Evaluate internal validity, external validity, construct validity, statistical conclusion validity, transparency, and reproducibility across the sources. Identify missing details that prevent replication or weaken confidence in the conclusions."],
        ["Compare Methodological Rigor", "Develop a transparent methodological-rigor framework and apply it consistently to all articles. Report the criteria, evidence-based assessment, major risks of bias, and limitations of making comparisons across different study designs."],
        ["Detect Data Leakage and Evaluation Bias", "Examine computational or predictive studies for possible data leakage, inappropriate validation, weak baselines, class imbalance, selective metrics, overfitting, and insufficient robustness testing."],
        ["Recommend Methodological Improvements", "Synthesize the recurring methodological weaknesses and recommend specific improvements for research design, sampling, data collection, analysis, validation, reporting, and reproducibility."]
      ]],
      ["theoretical-analysis", "10. Theoretical Analysis", [
        ["Map the Theoretical Landscape", "Identify all theories, models, and conceptual frameworks used across the sources. Explain their core assumptions, constructs, explanatory roles, supporting evidence, and frequency of use."],
        ["Evaluate Theoretical Adequacy", "Assess whether the theories used adequately explain the studied phenomena and whether the empirical methods genuinely test the proposed theoretical relationships. Identify mismatches between theory, constructs, measures, and interpretation."],
        ["Identify Theoretical Integration Opportunities", "Identify complementary, competing, or disconnected theories that could be integrated. Propose defensible integration opportunities, explain their potential explanatory value, and flag relationships not yet supported by direct evidence."],
        ["Detect Neglected Constructs and Mechanisms", "Identify constructs, mediators, moderators, causal mechanisms, and boundary conditions that are theoretically relevant but rarely examined across the sources."],
        ["Compare Competing Explanations", "Identify phenomena explained by more than one theory. Compare the assumptions, explanatory scope, evidence, predictive value, and limitations of each theoretical explanation."]
      ]],
      ["limitation-analysis", "11. Limitation Analysis", [
        ["Construct a Limitation Taxonomy", "Extract explicit and implicit limitations from all sources and classify them as theoretical, methodological, data-related, contextual, population-related, technical, evaluation-related, or generalizability limitations."],
        ["Assess the Consequences of Limitations", "Explain how each recurring limitation affects interpretation, validity, reliability, generalizability, or practical adoption. Distinguish limitations that are minor from those that materially weaken the conclusions."],
        ["Track Whether Limitations Were Addressed", "Identify limitations reported in earlier studies and determine whether later studies resolved, reduced, repeated, or ignored them. Present a limitation-resolution timeline and the remaining unresolved issues."],
        ["Identify Hidden Limitations", "Infer important limitations not explicitly acknowledged by the authors by examining design choices, data coverage, assumptions, analytical procedures, evaluation strategies, and claims."],
        ["Prioritize Limitations for Future Research", "Rank recurring limitations by their effect on evidence credibility and field progress. Recommend which limitations should be addressed first and explain the methodological response required."]
      ]],
      ["quality-assessment", "12. Research Quality Assessment", [
        ["Assess Overall Study Quality", "Evaluate every article using transparent criteria covering research-question clarity, theoretical grounding, design suitability, data quality, analytical rigor, validity, transparency, reproducibility, and evidence-based conclusions."],
        ["Detect Overclaiming and Evidence Mismatch", "Identify conclusions, causal statements, generalizations, or practical claims that exceed the evidence presented. Explain the mismatch and rewrite each claim at a strength justified by the source evidence."],
        ["Build an Evidence Confidence Profile", "Classify the confidence that can be placed in each major body of evidence as high, moderate, low, or insufficient. Justify the rating using study quality, consistency, precision, directness, and risk of bias."],
        ["Assess Reporting Completeness", "Evaluate whether each article reports sufficient information about theory, data, sampling, procedures, parameters, analysis, results, limitations, ethics, and reproducibility."],
        ["Identify Influential but Weak Evidence", "Identify claims or studies that are frequently treated as influential within the notebook despite limited methodological quality or narrow evidence. Explain why cautious interpretation is necessary."]
      ]]
    ]],
    ["novelty", "D · Build Novelty & Contribution", [
      ["research-gap", "13. Research Gap Identification", [
        ["Identify and Classify Research Gaps", "Identify evidence-based theoretical, methodological, empirical, contextual, population, dataset, evaluation, application, contradiction, and integration gaps. Cite the sources demonstrating what is known and what remains unresolved."],
        ["Prioritize Defensible Gaps", "Rank the identified gaps by scholarly significance, strength of supporting evidence, urgency, feasibility, potential impact, and suitability for a WoS Q1 article. Explain why the highest-ranked gaps deserve attention."],
        ["Convert Gaps into Researchable Problems", "Transform the strongest gaps into precise research problems. For each problem, specify the unresolved issue, affected context or population, evidence of insufficiency, consequences, and the type of study needed."],
        ["Distinguish Genuine and Superficial Gaps", "Evaluate whether proposed gaps represent important unresolved knowledge or merely the absence of a study in a specific location, population, dataset, or technology. Reject gaps lacking scholarly significance."],
        ["Build a Gap–Evidence–Opportunity Matrix", "Create a matrix linking each research gap to supporting sources, affected theory or practice, consequences, required evidence, suitable methodology, and potential contribution."]
      ]],
      ["novelty-positioning", "14. Novelty & Research Positioning", [
        ["Establish the Scholarly Position", "Develop a structured positioning argument explaining what is established, what remains uncertain, why existing approaches are insufficient, and where a new study can make a defensible contribution."],
        ["Evaluate Potential Novelty", "Assess proposed research ideas against all notebook sources. Distinguish genuine theoretical, methodological, empirical, contextual, technological, or integrative novelty from replication, incremental extension, or unsupported novelty claims."],
        ["Draft a Q1-Level Novelty Statement", "Draft a concise novelty and contribution statement for a WoS Q1 article. Link every claimed difference to the existing literature, define the contribution boundaries, and avoid absolute claims such as 'first' unless fully demonstrated by the sources."],
        ["Compare the Proposed Study with Closest Prior Work", "Identify the studies most similar to the proposed research and compare them directly by problem, theory, method, data, context, evaluation, findings, and contribution. State precisely how the proposed study differs."],
        ["Stress-Test the Novelty Claim", "Act as a skeptical Q1 reviewer and challenge the proposed novelty claim. Identify prior studies that weaken it, unsupported assertions, incremental elements, and the evidence needed to make the positioning defensible."]
      ]],
      ["framework-agenda", "15. Framework & Research Agenda", [
        ["Develop an Evidence-Based Framework", "Propose a conceptual framework grounded in the synthesized literature. Define the constructs, relationships, mechanisms, contextual factors, mediators, moderators, assumptions, and source evidence supporting each element."],
        ["Formulate Research Questions and Hypotheses", "Develop research questions and, where appropriate, testable hypotheses from the prioritized gaps and proposed framework. Explain the theoretical basis, source evidence, novelty, variables, and expected contribution of each."],
        ["Construct a Future Research Agenda", "Create a prioritized research agenda covering immediate, medium-term, and long-term studies. For each direction, specify the gap addressed, recommended theory, methodology, data, context, expected contribution, and key implementation risks."],
        ["Develop a Q1 Article Argument Map", "Construct an argument map connecting the research problem, established knowledge, unresolved gap, proposed framework, research questions, methodological response, expected findings, and contributions."],
        ["Design a Validation Roadmap", "Propose a sequence of studies or analyses needed to validate the framework, including exploratory, confirmatory, comparative, longitudinal, cross-context, and replication work where appropriate."]
      ]]
    ]]
  ];

  const featuredTitles = new Set([
    "Assess Evidence Consistency",
    "Identify and Explain Contradictions",
    "Audit Research Designs",
    "Identify and Classify Research Gaps",
    "Draft a Q1-Level Novelty Statement"
  ]);

  const bank = document.getElementById("notebookPromptBank");
  const filters = document.getElementById("notebookFilters");
  const search = document.getElementById("notebookSearch");
  const count = document.getElementById("promptCount");
  const total = document.getElementById("notebookTotal");
  const empty = document.getElementById("promptEmpty");
  if (!bank || !filters || !search) return;

  let active = "all";
  let promptNumber = 0;
  const safe = value => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  filters.innerHTML = `<button type="button" data-filter="all" class="active" aria-pressed="true">All Prompts</button><button type="button" data-filter="featured" class="top-five-filter" aria-pressed="false">★ Top 5 Prompts</button>` + categories.map(([key, label]) => `<button type="button" data-filter="${key}" aria-pressed="false">${label}</button>`).join("");
  bank.innerHTML = categories.map(([categoryKey, categoryLabel, subcategories]) => subcategories.map(([subKey, subLabel, prompts]) => {
    const cards = prompts.map(([title, instruction], index) => {
      promptNumber += 1;
      const prompt = instruction;
      const featured = featuredTitles.has(title);
      const searchText = safe(`${categoryLabel} ${subLabel} ${title} ${prompt}`.toLowerCase());
      return `<article class="prompt-card${featured ? " featured-prompt" : ""}" data-category="${categoryKey}" data-featured="${featured}" data-search="${searchText}"><div class="prompt-meta"><span>${featured ? "★ TOP 5 · " : ""}${subLabel} · ${String(index + 1).padStart(2, "0")}</span><button class="copy-prompt" type="button" aria-label="Copy ${safe(title)}"><i data-lucide="copy"></i><span>Copy</span></button></div><h3>${safe(title)}</h3><p>${safe(prompt)}</p></article>`;
    }).join("");
    return `<section class="prompt-category" data-main-category="${categoryKey}" data-subcategory="${subKey}"><div class="prompt-category-heading"><p class="eyebrow">${categoryLabel}</p><h2>${subLabel}</h2><span>${prompts.length} guided prompts</span></div><div class="prompt-grid">${cards}</div></section>`;
  }).join("")).join("");

  const update = () => {
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    bank.querySelectorAll(".prompt-card").forEach(card => {
      const categoryMatch = active === "all" || (active === "featured" ? card.dataset.featured === "true" : card.dataset.category === active);
      const show = categoryMatch && (!term || card.dataset.search.includes(term));
      card.hidden = !show;
      if (show) visible += 1;
    });
    bank.querySelectorAll(".prompt-category").forEach(group => group.hidden = !Array.from(group.querySelectorAll(".prompt-card")).some(card => !card.hidden));
    count.textContent = `${visible} prompt${visible === 1 ? "" : "s"} shown`;
    empty.hidden = visible !== 0;
  };

  filters.addEventListener("click", event => {
    const target = event.target.closest("button[data-filter]");
    if (!target) return;
    active = target.dataset.filter;
    filters.querySelectorAll("button").forEach(button => {
      const selected = button === target;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    update();
  });
  search.addEventListener("input", update);
  const configCopy = document.getElementById("copyChatConfig");
  configCopy?.addEventListener("click", async () => {
    const text = document.getElementById("chatConfigPrompt")?.textContent.trim();
    if (!text) return;
    try { await navigator.clipboard.writeText(text); } catch (_) {
      const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
    }
    const label = configCopy.querySelector("span");
    label.textContent = "Configuration Copied";
    setTimeout(() => label.textContent = "Copy Configuration", 1700);
  });
  bank.addEventListener("click", async event => {
    const target = event.target.closest(".copy-prompt");
    if (!target) return;
    const text = target.closest(".prompt-card").querySelector("p").textContent;
    try { await navigator.clipboard.writeText(text); } catch (_) {
      const area = document.createElement("textarea"); area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
    }
    const label = target.querySelector("span");
    const original = label.textContent;
    label.textContent = "Copied";
    setTimeout(() => label.textContent = original, 1600);
    const toast = document.getElementById("copyToast");
    if (toast) { toast.classList.add("visible"); setTimeout(() => toast.classList.remove("visible"), 1600); }
  });
  total.textContent = `${promptNumber} copy-ready prompts · 15 subcategories · 4 research stages · Top 5 featured prompts`;
  update();
  window.lucide?.createIcons();
})();
