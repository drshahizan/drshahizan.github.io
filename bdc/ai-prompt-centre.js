document.addEventListener("DOMContentLoaded",()=>{
  const prompts=[
    {title:"Identify a Defensible Research Gap",tool:"Scopus AI",text:"What established findings, recurring limitations, unresolved contradictions and underexplored contexts in recent research on [TOPIC] could support a defensible research gap in [CONTEXT]? Distinguish a genuine evidence-based gap from a general lack of studies."},
    {title:"Build an Evidence Matrix",tool:"Gemini Notebook",text:"Using only the uploaded sources, construct an evidence matrix with one row per study covering citation, problem, objective, theory, methodology, sample or dataset, analysis, key findings, limitations and relevance to [RESEARCH TOPIC]. Cite the supporting source for every row and mark information not reported by the authors."},
    {title:"Compare Conflicting Findings",tool:"Gemini Notebook",text:"Using only the uploaded sources, identify studies reporting conflicting findings about [ISSUE]. Compare their definitions, contexts, samples or datasets, methods, measures and analytical choices. Distinguish genuine disagreement from differences in design, and state the most defensible conclusion with appropriate uncertainty."},
    {title:"Position the Article's Novelty",tool:"Google Gemini",text:"Evaluate the claimed novelty of my manuscript on [TOPIC] for [TARGET JOURNAL OR LEVEL]. Compare the problem, context, theory, method, data and contribution against the verified literature I provide. Identify what is genuinely new, what is incremental, what is unsupported and how the contribution statement should be strengthened without exaggeration."},
    {title:"Run a Pre-Submission Quality Review",tool:"Google Gemini",text:"Conduct a rigorous pre-submission review of the complete uploaded manuscript for [TARGET JOURNAL OR LEVEL]. Check title–abstract–RQ–method–results–discussion alignment, novelty, methodological transparency, evidence-to-claim traceability, citation integrity, tables and figures, limitations, responsible AI disclosure and journal fit. Rank issues as Critical, Major, Moderate or Minor and provide specific corrective actions. Do not invent missing information."}
  ];
  const grid=document.getElementById("quickPromptGrid");if(!grid)return;
  grid.innerHTML=prompts.map((p,i)=>`<article class="quick-prompt-card"><header><span>0${i+1}</span><small>${p.tool}</small></header><h3>${p.title}</h3><p>${p.text}</p><button type="button" data-quick-copy="${i}"><i data-lucide="copy"></i><span>Copy Prompt</span></button></article>`).join("");
  grid.addEventListener("click",async e=>{
    const button=e.target.closest("[data-quick-copy]");if(!button)return;
    const text=prompts[Number(button.dataset.quickCopy)].text;
    try{await navigator.clipboard.writeText(text)}catch{const area=document.createElement("textarea");area.value=text;area.style.cssText="position:fixed;opacity:0";document.body.append(area);area.select();document.execCommand("copy");area.remove()}
    const label=button.querySelector("span"),old=label.textContent;label.textContent="Copied";setTimeout(()=>label.textContent=old,1600);
  });
  window.lucide?.createIcons();
});
