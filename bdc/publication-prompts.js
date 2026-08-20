const publicationPhases = [
  {id:"plan",number:"01",title:"Plan & Position",subtitle:"Idea → Positioning",icon:"compass",categories:[
    {title:"Article Positioning",prompts:[
      ["Define the publication angle","Using my research problem, objectives, method and findings, propose three defensible publication angles. For each, state the central claim, intended scholarly audience, contribution and evidence required. Rank the options and explain the ranking."],
      ["Convert a study into an article concept","Transform the supplied study description into a concise article concept containing the problem, gap, purpose, approach, principal message and likely contribution. Flag any element that is not yet supported."],
      ["Test the article's focus","Evaluate whether my proposed article has one coherent and publishable focus. Identify scope creep, competing messages and unnecessary material, then recommend a precise focus statement and boundaries."]]},
    {title:"Novelty and Contribution",prompts:[
      ["Distinguish novelty from significance","Separate the study's novelty, theoretical contribution, methodological contribution, empirical contribution and practical significance. Use only the supplied evidence and identify unsupported claims."],
      ["Write a contribution statement","Draft three versions of a rigorous contribution statement: one for the introduction, one for the discussion and one for the cover letter. Avoid exaggerated priority claims."],
      ["Stress-test the contribution","Act as a sceptical editor. Challenge the claimed contribution against the supplied literature and findings. List the strongest objections, evidence needed and a revised defensible claim."]]},
    {title:"Article Storyline and Outline",prompts:[
      ["Build the article storyline","Create a logical article storyline linking problem → gap → purpose → method → results → interpretation → contribution. Explain the role of each section in advancing the central argument."],
      ["Create an IMRaD outline","Develop a detailed IMRaD outline for my article. Under each heading, specify the key message, evidence, tables or figures, and transition to the next section."],
      ["Check narrative coherence","Review my outline for broken logic, repetition, missing steps and sections that do not serve the central claim. Return a revised outline with reasons for each structural change."]]}
  ]},
  {id:"develop",number:"02",title:"Develop Manuscript",subtitle:"Manuscript",icon:"file-pen-line",categories:[
    {title:"Title and Keywords",prompts:[
      ["Generate accurate titles","Propose ten concise, informative titles that accurately reflect the topic, design, population or context and main contribution. Avoid hype, ambiguity and claims beyond the evidence."],
      ["Evaluate title quality","Score my title for accuracy, specificity, discoverability, readability and fit with the target journal. Explain weaknesses and provide five improved alternatives."],
      ["Optimise keywords","Recommend 5–8 indexing-friendly keywords not unnecessarily duplicated in the title. Explain how each keyword supports discoverability and flag terms requiring field-specific verification."]]},
    {title:"Abstract",prompts:[
      ["Draft a structured abstract","Draft a structured abstract from the supplied manuscript using Background, Objective, Methods, Results and Conclusion. Include only verified numerical results and respect [WORD LIMIT]."],
      ["Strengthen an existing abstract","Critically revise my abstract for completeness, clarity, internal consistency and journal fit. Preserve all findings and return the revised abstract plus a concise change log."],
      ["Check abstract–manuscript alignment","Compare the abstract with the manuscript. Identify claims, numbers, methods or conclusions that are missing, inconsistent or overstated, then propose exact corrections."]]},
    {title:"Introduction",prompts:[
      ["Build a problem–gap–purpose introduction","Draft an introduction that moves from the important problem to current knowledge, the specific gap, study rationale, objective and contribution. Use placeholders where verified citations are required."],
      ["Diagnose introduction logic","Map each paragraph of my introduction to its function. Identify weak transitions, unsupported claims, excessive background and an unclear gap, then propose a revised paragraph sequence."],
      ["Sharpen the research gap","Rewrite the gap paragraph so it distinguishes what is known, what remains unresolved, why the gap matters and how this study addresses it. Do not imply that no research exists unless verified."]]},
    {title:"Literature Review",prompts:[
      ["Synthesize evidence by theme","Organise the supplied verified sources into meaningful themes. Compare agreements, contradictions, methods and limitations, then draft a critical synthesis rather than a source-by-source summary."],
      ["Build a literature synthesis matrix","Create a matrix with source, context, objective, method, key finding, limitation and relevance to my article. Add a final column showing how each source supports or challenges my argument."],
      ["Identify evidence gaps","Using only the supplied literature, identify conceptual, methodological, population, context and evidence gaps. Distinguish genuine gaps from topics that are merely under-cited in my draft."]]},
    {title:"Methodology",prompts:[
      ["Draft a reproducible methods section","Draft a transparent methods section from my protocol covering design, setting, participants or data, sampling, instruments, procedure, analysis, ethics and quality controls. Mark missing details as [AUTHOR INPUT REQUIRED]."],
      ["Audit methodological completeness","Review my methodology as a peer reviewer. Identify missing information affecting reproducibility, validity, ethics or interpretation and organise recommendations into critical and optional revisions."],
      ["Align methods with objectives","Create an alignment table connecting each objective or question to data, variables, sampling, instrument, analysis and expected output. Flag any objective that the design cannot answer."]]},
    {title:"Results",prompts:[
      ["Structure the results narrative","Organise my verified results according to the research questions. Draft a factual results narrative that highlights essential patterns without interpretation or duplication of tables."],
      ["Improve statistical reporting","Check the supplied results for complete and consistent statistical reporting, including sample sizes, estimates, uncertainty and exact values where appropriate. Do not calculate or invent missing statistics."],
      ["Choose results for text, tables and figures","Recommend which findings belong in narrative text, tables or figures. Explain each choice and identify redundancy, missing labels and comparisons that require author verification."]]},
    {title:"Discussion",prompts:[
      ["Build a discussion from findings","Draft a discussion that begins with the principal findings, interprets each against verified literature, explains plausible mechanisms, addresses unexpected results and ends with the contribution."],
      ["Calibrate interpretation and claims","Review my discussion for causal overreach, unsupported generalisation, selective interpretation and claims that exceed the design or data. Provide precise, appropriately qualified revisions."],
      ["Integrate conflicting evidence","Compare my findings with the supplied supporting and conflicting studies. Develop balanced explanations for convergence and divergence without dismissing contradictory evidence."]]},
    {title:"Conclusion and Implications",prompts:[
      ["Draft a proportionate conclusion","Write a concise conclusion that answers the objective, states the principal contribution and practical or scholarly implications, while remaining proportionate to the design and results."],
      ["Separate implications from recommendations","Distinguish theoretical, methodological, practical and policy implications from recommendations for action or future research. Ensure each statement is traceable to a verified finding."],
      ["Strengthen limitations and future work","Rewrite the limitations constructively, explaining their likely effect on interpretation and transferability. Derive specific future research priorities without using generic statements."]]},
    {title:"Tables, Figures and Supplementary Material",prompts:[
      ["Audit tables and figures","Review every table and figure for purpose, self-contained labels, units, denominators, consistency with the text and accessibility. Return an itemised correction list."],
      ["Draft publication-ready captions","Write concise, self-contained captions for the supplied tables and figures. Define abbreviations and symbols, describe the content accurately and avoid interpreting results in the caption."],
      ["Plan supplementary materials","Recommend which detailed methods, instruments, analyses, tables, checklists or data notes belong in supplementary files. Explain how each item improves transparency without weakening the main article."]]}
  ]},
  {id:"quality",number:"03",title:"Strengthen Quality",subtitle:"Quality Review",icon:"badge-check",categories:[
    {title:"Cross-Section Alignment",prompts:[
      ["Run a full alignment audit","Create an alignment matrix for title, abstract, gap, objectives, methods, results, discussion and conclusion. Identify every mismatch and propose the smallest defensible correction."],
      ["Trace claims to evidence","Extract the manuscript's major claims and map each to supporting results and verified references. Flag unsupported, duplicated, contradictory or overextended claims."],
      ["Check terminology and numbers","Audit terminology, abbreviations, sample sizes, dates, variable names and numerical values across all sections, tables and figures. Report inconsistencies without guessing the correct value."]]},
    {title:"Critical Quality Review",prompts:[
      ["Simulate an editorial review","Act as the target journal's handling editor. Assess fit, originality, methodological credibility, clarity, significance and reporting quality, then recommend proceed, revise or reject with reasons."],
      ["Simulate a rigorous peer review","Write a constructive peer-review report with summary, major issues, minor issues and recommendation. Prioritise issues that affect validity, interpretation, transparency or contribution."],
      ["Create a revision priority plan","Convert the manuscript weaknesses into a prioritised action plan using Critical, Important and Enhancement levels. For each item, state the location, problem, action and evidence needed."]]},
    {title:"Citation and Research Integrity",prompts:[
      ["Audit citation support","For each citation-dependent claim, assess whether the supplied source directly supports it. Flag citation stretching, missing evidence, secondary citation and statements requiring source verification."],
      ["Check paraphrasing integrity","Compare my paragraph with the supplied source text. Identify overly close phrasing or distorted meaning, then propose an original, accurate synthesis with correct attribution placeholders."],
      ["Prepare an AI-use integrity check","Review my declared AI-assisted workflow for confidentiality, authorship, accountability, disclosure and journal-policy risks. Produce a compliance checklist; do not assume the journal permits any specific use."]]},
    {title:"Reporting Standards and Compliance",prompts:[
      ["Select a reporting guideline","Based on my verified study design, identify likely reporting guidelines to check, explain why they may apply and list information needed to confirm the correct guideline. Do not invent requirements."],
      ["Audit against a supplied checklist","Compare the manuscript with the reporting checklist I provide. Return item number, requirement, manuscript location, status and exact action required for incomplete items."],
      ["Check ethics and transparency statements","Review ethics approval, consent, funding, conflicts, author contributions, data availability, preregistration and acknowledgements. Mark missing or ambiguous items for author verification."]]}
  ]},
  {id:"journal",number:"04",title:"Select Journal",subtitle:"Journal Selection",icon:"library",categories:[
    {title:"Journal Selection and Fit",prompts:[
      ["Create a journal-fit shortlist","Using only verified journal information I provide, rank 3–5 journals by aims and scope, audience, article type, methodological fit and practical constraints. Show evidence and uncertainties."],
      ["Evaluate one target journal","Assess my manuscript's fit with [JOURNAL] based on its supplied aims, scope and recent article information. Identify fit strengths, risks and positioning changes needed before submission."],
      ["Compare journal options responsibly","Build a comparison table for my candidate journals covering scope fit, audience, indexing claims to verify, access model, fees to verify, word limits and submission risks. Do not predict acceptance."]]}
  ]},
  {id:"submit",number:"05",title:"Prepare & Submit",subtitle:"Submission",icon:"send",categories:[
    {title:"Submission Package",prompts:[
      ["Draft a journal-specific cover letter","Draft a concise cover letter stating manuscript title, article type, problem, principal verified contribution, journal fit, originality and required declarations. Avoid flattery and unsupported claims."],
      ["Prepare highlights and key points","Create [NUMBER] journal highlights within [CHARACTER LIMIT] from the verified findings. Make each point specific, non-overlapping and understandable without overstating impact."],
      ["Draft a plain-language summary","Write a plain-language summary for a non-specialist reader covering why the study matters, what was done, what was found and what it means. Preserve uncertainty and avoid jargon."],
      ["Compile submission declarations","Create a completion checklist for authorship, contributions, funding, conflicts, ethics, consent, data availability, acknowledgements, prior dissemination and AI-use disclosure. Use placeholders only."]]},
    {title:"Pre-Submission and Editorial Screening",prompts:[
      ["Run a pre-submission audit","Conduct a final audit of manuscript files, journal instructions supplied, metadata, word limits, references, tables, figures, supplementary files and declarations. Return pass, fix or verify for each item."],
      ["Simulate a desk-rejection screen","Act as a time-pressured editor screening the submission. Identify the five most likely desk-rejection risks and the exact revisions that would reduce each risk."],
      ["Check manuscript–portal consistency","Compare the manuscript title, abstract, authors, affiliations, keywords, funding and declarations with the submission-portal text I provide. Flag every discrepancy for author correction."],
      ["Prepare the final upload sequence","Create a safe, ordered upload plan listing each required file, suggested filename, anonymisation status and final verification. Do not assume requirements not contained in the journal instructions."]]}
  ]},
  {id:"revise",number:"06",title:"Respond & Resubmit",subtitle:"Reviewer Response",icon:"messages-square",categories:[
    {title:"Reviewer Comments and Article Revision",prompts:[
      ["Classify reviewer comments","Break every reviewer and editor comment into discrete requests. Classify each as conceptual, methodological, analytical, reporting, language, formatting or clarification, and assign a priority."],
      ["Build a response matrix","Create a response matrix with reviewer comment, interpretation, planned action, manuscript location, evidence needed and completion status. Do not claim a revision has been made unless verified."],
      ["Draft point-by-point responses","Draft respectful point-by-point responses using: acknowledgement, action taken, rationale and exact location. Quote each supplied comment accurately and avoid defensive language."],
      ["Respond to conflicting reviewers","Identify conflicts between reviewer requests and propose a reasoned resolution consistent with the editor's guidance, study design and evidence. Draft separate courteous responses to each reviewer."],
      ["Draft a respectful disagreement","Prepare a concise response when we cannot implement a request. Acknowledge the concern, explain the evidence-based reason, offer a reasonable alternative and state any clarifying revision made."],
      ["Verify revision completeness","Compare the revised manuscript, response letter and all reviewer comments. Flag comments not addressed, responses without manuscript changes, incorrect page references and new inconsistencies."],
      ["Prepare the resubmission package","Create a final resubmission checklist for clean manuscript, tracked manuscript, response letter, revised figures or supplements, declarations and editor note. Identify any unresolved item requiring author action."]]}
  ]}
];

document.addEventListener("DOMContentLoaded", () => {
  const host = document.getElementById("publicationPhases");
  if (!host) return;
  const filters = document.getElementById("publicationFilters");
  const search = document.getElementById("publicationPromptSearch");
  const count = document.getElementById("publicationResultCount");
  const empty = document.getElementById("publicationEmpty");
  const toast = document.getElementById("publicationToast");
  const total = publicationPhases.reduce((sum,p)=>sum+p.categories.reduce((n,c)=>n+c.prompts.length,0),0);
  document.getElementById("promptTotal").textContent = total;
  let phase = "all", timer;

  filters.innerHTML = `<button class="active" type="button" data-phase="all">All phases</button>` + publicationPhases.map(p=>`<button type="button" data-phase="${p.id}">${p.number} ${p.title}</button>`).join("");
  host.innerHTML = publicationPhases.map(p=>`<section class="publication-phase" data-phase="${p.id}"><header class="phase-heading"><div class="phase-number">${p.number}</div><div><p>${p.subtitle}</p><h2>${p.title}</h2></div><i data-lucide="${p.icon}"></i></header><div class="publication-category-grid">${p.categories.map((c,ci)=>`<section class="publication-category"><header><span>${String(ci+1).padStart(2,"0")}</span><h3>${c.title}</h3><small>${c.prompts.length} prompts</small></header><div class="publication-prompt-list">${c.prompts.map((item,pi)=>`<article class="publication-prompt-card" data-search="${(c.title+' '+item[0]+' '+item[1]).toLowerCase().replace(/"/g,'&quot;')}"><div><span>P${String(pi+1).padStart(2,"0")}</span><h4>${item[0]}</h4></div><p>${item[1]}</p><button class="copy-library-prompt" type="button" aria-label="Copy ${item[0]}"><i data-lucide="copy"></i><span>Copy prompt</span></button></article>`).join("")}</div></section>`).join("")}</div></section>`).join("");

  const apply = () => {
    const term = search.value.trim().toLowerCase(); let visible = 0;
    document.querySelectorAll(".publication-phase").forEach(section => {
      const phaseMatch = phase === "all" || section.dataset.phase === phase;
      let phaseVisible = 0;
      section.querySelectorAll(".publication-category").forEach(category => {
        let categoryVisible = 0;
        category.querySelectorAll(".publication-prompt-card").forEach(card => {
          const show = phaseMatch && (!term || card.dataset.search.includes(term));
          card.hidden = !show; if (show) { categoryVisible++; phaseVisible++; visible++; }
        });
        category.hidden = categoryVisible === 0;
      });
      section.hidden = phaseVisible === 0;
    });
    count.textContent = `${visible} of ${total} prompts shown`;
    empty.hidden = visible !== 0;
  };
  filters.addEventListener("click", e => { const button=e.target.closest("button[data-phase]"); if(!button)return; phase=button.dataset.phase; filters.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===button)); apply(); });
  search.addEventListener("input", apply);
  document.addEventListener("keydown", e => { if(e.key==="/" && !/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();search.focus();} });
  document.addEventListener("click", async e => {
    const button=e.target.closest(".copy-library-prompt"); if(!button)return;
    const target=button.dataset.copyTarget ? document.getElementById(button.dataset.copyTarget) : button.closest(".publication-prompt-card")?.querySelector("p");
    if(!target)return; const text=target.textContent.trim();
    try{await navigator.clipboard.writeText(text)}catch{const area=document.createElement("textarea");area.value=text;area.style.cssText="position:fixed;opacity:0";document.body.appendChild(area);area.select();document.execCommand("copy");area.remove();}
    const label=button.querySelector("span"), old=label.textContent; label.textContent="Copied"; button.classList.add("copied"); toast.classList.add("visible"); clearTimeout(timer); timer=setTimeout(()=>toast.classList.remove("visible"),1600); setTimeout(()=>{label.textContent=old;button.classList.remove("copied")},1700);
  });
  apply(); window.lucide?.createIcons();
});
