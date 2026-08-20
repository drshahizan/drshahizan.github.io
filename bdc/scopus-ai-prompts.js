(() => {
  const categories = [
    ["scope", "1. Topic Scoping & Terminology", "Define the field before narrowing the article", [
      ["Map the Core Concepts", "What are the main concepts associated with [TOPIC] in recent academic literature?"],
      ["Compare Definitions", "How is [KEY CONCEPT] defined and measured across different studies?"],
      ["Identify Related Terminology", "What related terms should researchers consider when investigating [TOPIC]?"],
      ["Trace Concept Evolution", "How has the academic understanding of [TOPIC] evolved over the last ten years?"]
    ]],
    ["gaps", "2. Research Gaps & Emerging Trends", "Find defensible opportunities and new directions", [
      ["Identify Current Research Gaps", "What are the current research gaps regarding [TOPIC]?"],
      ["Detect Emerging Trends", "What emerging trends have shaped research on [TOPIC] over the last three years?"],
      ["Locate Underexplored Areas", "Which aspects of [TOPIC] remain underexplored in [CONTEXT OR POPULATION]?"],
      ["Find Unresolved Challenges", "What unresolved challenges are frequently reported in the literature on [TOPIC]?"]
    ]],
    ["debates", "3. Scientific Consensus & Debates", "Understand where the evidence agrees or conflicts", [
      ["Establish Scientific Consensus", "What is the current scientific consensus on [TOPIC]?"],
      ["Identify Conflicting Findings", "What conflicting findings have been reported regarding [TOPIC]?"],
      ["Map Unresolved Debates", "What are the major unresolved debates surrounding [TOPIC]?"],
      ["Explain Divergent Conclusions", "Why do studies on [TOPIC] report different conclusions?"]
    ]],
    ["methods", "4. Methods & Research Designs", "Compare how the topic has been investigated", [
      ["Review Common Methodologies", "What methodologies are most commonly used to investigate [TOPIC]?"],
      ["Compare Two Methods", "How does [METHOD A] compare with [METHOD B] when applied to [TOPIC]?"],
      ["Identify Methodological Limitations", "What methodological limitations are frequently reported in studies of [TOPIC]?"],
      ["Map Data and Evaluation", "Which datasets, instruments or evaluation metrics are commonly used to study [TOPIC]?"]
    ]],
    ["theory", "5. Theories & Conceptual Frameworks", "Build a stronger theoretical foundation", [
      ["Identify Common Frameworks", "What theoretical frameworks are commonly used to explain [TOPIC]?"],
      ["Review Theory Application", "How have researchers applied [THEORY] to investigate [TOPIC]?"],
      ["Compare Competing Theories", "Which theories provide competing explanations for [RESEARCH PROBLEM]?"],
      ["Find Emerging Frameworks", "What conceptual frameworks have recently emerged in research on [TOPIC]?"]
    ]],
    ["relationships", "6. Relationships, Drivers & Outcomes", "Explore influence, impact and explanatory factors", [
      ["Examine an Impact", "What is the impact of [VARIABLE X] on [OUTCOME Y]?"],
      ["Add a Specific Context", "How does [VARIABLE X] influence [OUTCOME Y] in [CONTEXT OR POPULATION]?"],
      ["Identify Primary Drivers", "What are the primary drivers or determinants of [TOPIC]?"],
      ["Explore Mechanisms", "What mediating or moderating variables have been investigated between [VARIABLE X] and [OUTCOME Y]?"]
    ]],
    ["context", "7. Context & Population Comparison", "Test whether findings transfer across settings", [
      ["Compare Countries or Regions", "How do findings on [TOPIC] differ across countries or regions?"],
      ["Compare Populations", "How does [TOPIC] affect different demographic or professional populations?"],
      ["Identify Contextual Influences", "What contextual factors influence the outcomes associated with [TOPIC]?"],
      ["Locate Underrepresented Contexts", "Which geographical or population contexts remain underrepresented in research on [TOPIC]?"]
    ]],
    ["evolution", "8. Research Evolution & Landmark Contributions", "Trace how the field and its major ideas developed", [
      ["Identify Major Milestones", "What are the key milestones and breakthroughs in the development of research on [TOPIC]?"],
      ["Locate Foundational Contributions", "Which foundational studies or contributions have shaped the current understanding of [TOPIC]?"],
      ["Trace Changes in Research Focus", "How has the focus of research on [TOPIC] changed over the last [NUMBER] years?"],
      ["Explain Turning Points", "What scientific, technological or societal developments produced major turning points in research on [TOPIC]?"]
    ]],
    ["evidence", "9. Evidence Strength & Research Limitations", "Judge how confidently the literature supports its conclusions", [
      ["Assess the Strength of Evidence", "How strong and consistent is the current evidence regarding [CLAIM OR RELATIONSHIP] in [TOPIC]?"],
      ["Identify Recurring Limitations", "What recurring limitations weaken the current body of research on [TOPIC]?"],
      ["Examine Sources of Bias", "What sources of bias or uncertainty are commonly reported in studies of [TOPIC]?"],
      ["Separate Robust and Tentative Findings", "Which findings concerning [TOPIC] appear robust across studies, and which remain tentative or context-dependent?"]
    ]],
    ["interdisciplinary", "10. Interdisciplinary Connections", "Discover useful ideas beyond a single disciplinary boundary", [
      ["Map Contributing Disciplines", "Which academic disciplines contribute most directly to research on [TOPIC], and what does each contribute?"],
      ["Find Cross-Disciplinary Concepts", "What concepts from other disciplines have been applied to explain or investigate [TOPIC]?"],
      ["Identify Transferable Methods", "Which methods from related disciplines could be relevant to research on [TOPIC]?"],
      ["Locate Integration Opportunities", "What interdisciplinary research opportunities remain underexplored in relation to [TOPIC]?"]
    ]],
    ["review", "11. Literature Review Planning & Source Selection", "Turn initial discovery into a structured reading strategy", [
      ["Define Review Subthemes", "What major themes and subthemes should be covered in a literature review on [TOPIC]?"],
      ["Balance Foundational and Recent Evidence", "Which foundational contributions and recent research directions should be considered when reviewing [TOPIC]?"],
      ["Prioritise Evidence for Close Reading", "Which types of studies should be prioritised for close reading to understand [TOPIC], and why?"],
      ["Build a Literature Review Sequence", "What logical sequence of themes would support a critical literature review on [TOPIC]?"]
    ]],
    ["position", "12. Article Positioning & Novelty", "Connect discovery to a defensible publication contribution", [
      ["Position the Research Question", "How is the proposed research question positioned within the existing literature on [TOPIC]?"],
      ["Identify Established Knowledge", "What established findings should be acknowledged when positioning a study on [TOPIC]?"],
      ["Build a Defensible Contribution", "Which research gaps could support a defensible contribution concerning [TOPIC]?"],
      ["Challenge the Novelty Claim", "What evidence could challenge the claimed novelty of a study on [TOPIC]?"]
    ]]
  ];

  const featuredTitles = new Set([
    "Identify Current Research Gaps",
    "Detect Emerging Trends",
    "Establish Scientific Consensus",
    "Compare Two Methods",
    "Build a Defensible Contribution"
  ]);
  const bank = document.getElementById("scopusPromptBank");
  const filters = document.getElementById("scopusFilters");
  const search = document.getElementById("scopusSearch");
  const count = document.getElementById("promptCount");
  const total = document.getElementById("scopusTotal");
  const empty = document.getElementById("promptEmpty");
  if (!bank || !filters || !search) return;

  const safe = value => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  let active = "all";
  let promptNumber = 0;
  filters.innerHTML = `<button type="button" data-filter="all" class="active" aria-pressed="true">All Prompts</button><button type="button" data-filter="featured" class="top-five-filter" aria-pressed="false">★ Top 5 Prompts</button>` + categories.map(([key, label]) => `<button type="button" data-filter="${key}" aria-pressed="false">${label.replace(/^\d+\. /, "")}</button>`).join("");
  bank.innerHTML = categories.map(([key, label, purpose, prompts]) => {
    const cards = prompts.map(([title, prompt], index) => {
      promptNumber += 1;
      const featured = featuredTitles.has(title);
      const searchText = safe(`${label} ${purpose} ${title} ${prompt}`.toLowerCase());
      return `<article class="prompt-card${featured ? " featured-prompt" : ""}" data-category="${key}" data-featured="${featured}" data-search="${searchText}"><div class="prompt-meta"><span>${featured ? "★ TOP 5 · " : ""}${String(promptNumber).padStart(2, "0")}</span><button class="copy-prompt" type="button" aria-label="Copy ${safe(title)}"><i data-lucide="copy"></i><span>Copy</span></button></div><h3>${safe(title)}</h3><p>${safe(prompt)}</p></article>`;
    }).join("");
    return `<section class="prompt-category" data-main-category="${key}"><div class="prompt-category-heading"><p class="eyebrow">SCOPUS AI QUESTION SET</p><h2>${safe(label)}</h2><span>${safe(purpose)} · ${prompts.length} focused questions</span></div><div class="prompt-grid">${cards}</div></section>`;
  }).join("");

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

  const copyText = async text => {
    try { await navigator.clipboard.writeText(text); } catch (_) {
      const area = document.createElement("textarea");
      area.value = text; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove();
    }
  };
  const patternButton = document.getElementById("copyScopusPattern");
  patternButton?.addEventListener("click", async () => {
    const text = document.getElementById("scopusPattern")?.textContent.trim();
    if (!text) return;
    await copyText(text);
    const label = patternButton.querySelector("span");
    label.textContent = "Pattern Copied";
    setTimeout(() => label.textContent = "Copy Pattern", 1700);
  });
  bank.addEventListener("click", async event => {
    const target = event.target.closest(".copy-prompt");
    if (!target) return;
    await copyText(target.closest(".prompt-card").querySelector("p").textContent);
    const label = target.querySelector("span");
    label.textContent = "Copied";
    setTimeout(() => label.textContent = "Copy", 1400);
  });

  if (total) total.textContent = `${promptNumber} prompts · 12 categories · publication-focused discovery`;
  update();
  if (window.lucide) window.lucide.createIcons();
})();
