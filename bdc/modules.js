"use strict";
document.addEventListener("DOMContentLoaded",()=>{
  const value=id=>document.getElementById(id)?.value.trim()||"";
  const copyText=async text=>{
    try{await navigator.clipboard.writeText(text)}
    catch{const a=document.createElement("textarea");a.value=text;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();document.execCommand("copy");a.remove()}
  };
  const wireCopy=(button,getText,toast)=>{
    if(!button)return;
    button.addEventListener("click",async()=>{
      const text=getText();
      if(!text)return;
      await copyText(text);
      const label=button.querySelector("span");
      const original=label?label.textContent:"";
      if(label)label.textContent="Copied";
      toast?.classList.add("visible");
      clearTimeout(button._toastTimer);
      button._toastTimer=setTimeout(()=>toast?.classList.remove("visible"),1700);
      setTimeout(()=>{if(label)label.textContent=original||"Copy"},1800);
    });
  };

  // ---------- Module 1: Boolean Search String Builder ----------
  (()=>{
    const form=document.getElementById("searchStringForm");
    if(!form)return;
    const preview=document.getElementById("searchStringPreview"),copy=document.getElementById("copySearchString"),reset=document.getElementById("searchStringReset"),toast=document.getElementById("builderToast");
    let generated="";
    const group=terms=>{
      const list=terms.split(",").map(t=>t.trim()).filter(Boolean).map(t=>t.includes(" ")?`"${t}"`:t);
      if(!list.length)return "";
      return list.length===1?list[0]:`(${list.join(" OR ")})`;
    };
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const groups=[group(value("concept1")),group(value("concept2")),group(value("concept3"))].filter(Boolean);
      generated=groups.join(" AND ");
      const scope=value("fieldScope")||"Title and Abstract";
      preview.classList.remove("empty");
      preview.textContent=`${generated}\n\nSearch scope: ${scope}. Adjust field tags for your target database (e.g., TITLE-ABS-KEY(...) in Scopus, TS=(...) in Web of Science).`;
      copy.disabled=false;
      preview.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    wireCopy(copy,()=>generated,toast);
    reset?.addEventListener("click",()=>{
      form.reset();generated="";copy.disabled=true;
      preview.classList.add("empty");
      preview.innerHTML='<div class="empty-state"><i data-lucide="scan-search"></i><h3>Your search string will appear here</h3><p>Enter at least one concept, then select <b>Generate Search String</b>.</p></div>';
      window.lucide?.createIcons();
      document.getElementById("concept1")?.focus();
    });
  })();

  // ---------- Module 2: Research Question & Design Prompt Builder ----------
  (()=>{
    const form=document.getElementById("rqBuilderForm");
    if(!form)return;
    const preview=document.getElementById("rqBuilderPreview"),copy=document.getElementById("copyRqPrompt"),reset=document.getElementById("rqBuilderReset"),toast=document.getElementById("builderToast");
    let generated="";
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const parts=[`Act as an experienced research supervisor in ${value("rqField")||"[FIELD]"}.`,
        `I am exploring this broad topic or interest area: ${value("rqTopic")}.`];
      if(value("rqContext"))parts.push(`Target population or context: ${value("rqContext")}.`);
      if(value("rqMotivation"))parts.push(`Motivation or observed problem: ${value("rqMotivation")}.`);
      parts.push(`Preferred research type: ${value("rqType")}.`);
      if(value("rqConstraints"))parts.push(`Known constraints: ${value("rqConstraints")}.`);
      parts.push(`Propose 3 to 5 candidate research questions for this topic. For each question, assess it against the FINER criteria (Feasible, Interesting, Novel, Ethical, Relevant) in one line each. Then outline an initial research design (suggested methodology, data source and analysis approach) for the strongest question.`);
      parts.push(`Important: do not fabricate literature, citations or findings. Clearly flag anything I should verify against the published literature before committing to a direction.`);
      generated=parts.join("\n\n");
      preview.classList.remove("empty");
      preview.textContent=generated;
      copy.disabled=false;
      preview.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    wireCopy(copy,()=>generated,toast);
    reset?.addEventListener("click",()=>{
      form.reset();generated="";copy.disabled=true;
      preview.classList.add("empty");
      preview.innerHTML='<div class="empty-state"><i data-lucide="lightbulb"></i><h3>Your prompt will appear here</h3><p>Complete the required fields, then select <b>Generate Prompt</b>.</p></div>';
      window.lucide?.createIcons();
      document.getElementById("rqTopic")?.focus();
    });
  })();

  // ---------- Module 3: Knowledge Organisation Prompt Builder ----------
  (()=>{
    const form=document.getElementById("koBuilderForm");
    if(!form)return;
    const preview=document.getElementById("koBuilderPreview"),copy=document.getElementById("copyKoPrompt"),reset=document.getElementById("koBuilderReset"),toast=document.getElementById("builderToast");
    let generated="";
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const parts=[`Act as a research assistant helping me organise source material.`,
        `Sources, notes or topic to organise:\n${value("koSources")}`,
        `Organisation goal: ${value("koGoal")}.`,
        `Present the result as a ${value("koFormat").toLowerCase()}.`,
        `Level of detail: ${value("koDetail").toLowerCase()}.`,
        `Ground every theme, connection and entry in the sources or notes I provided. Do not invent studies, findings or relationships that are not supported by the material. Clearly flag any gaps where more source information is needed.`];
      generated=parts.join("\n\n");
      preview.classList.remove("empty");
      preview.textContent=generated;
      copy.disabled=false;
      preview.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    wireCopy(copy,()=>generated,toast);
    reset?.addEventListener("click",()=>{
      form.reset();generated="";copy.disabled=true;
      preview.classList.add("empty");
      preview.innerHTML='<div class="empty-state"><i data-lucide="network"></i><h3>Your prompt will appear here</h3><p>Describe your sources, then select <b>Generate Prompt</b>.</p></div>';
      window.lucide?.createIcons();
      document.getElementById("koSources")?.focus();
    });
  })();

  // ---------- Generic ready-to-use pattern copy buttons ----------
  document.querySelectorAll("[data-copy-pattern]").forEach(button=>{
    const toast=document.getElementById("builderToast");
    const targetId=button.dataset.copyPattern;
    button.addEventListener("click",async()=>{
      const text=document.getElementById(targetId)?.textContent.trim();
      if(!text)return;
      await copyText(text);
      const label=button.querySelector("span");
      const original=label?label.textContent:"";
      if(label)label.textContent="Copied";
      toast?.classList.add("visible");
      clearTimeout(button._toastTimer);
      button._toastTimer=setTimeout(()=>toast?.classList.remove("visible"),1700);
      setTimeout(()=>{if(label)label.textContent=original||"Copy"},1800);
    });
  });

  // ---------- On-page jump nav (dropdown) ----------
  document.querySelectorAll("[data-jump-nav]").forEach(select=>{
    select.addEventListener("change",()=>{
      const value=select.value;
      if(!value)return;
      const target=document.querySelector(value);
      if(target){
        target.scrollIntoView({behavior:"smooth",block:"start"});
        history.replaceState(null,"",value);
      }
      select.selectedIndex=0;
    });
  });

  // ---------- Materials: Pre-submission checklist ----------
  (()=>{
    const container=document.getElementById("submissionChecklist");
    if(!container)return;
    const CHECKLIST_KEY="bdcSubmissionChecklist";
    const checkboxes=Array.from(container.querySelectorAll("[data-checklist-item]"));
    const fill=document.getElementById("checklistProgressFill"),label=document.getElementById("checklistProgressLabel"),resetBtn=document.getElementById("checklistReset");
    function readState(){
      try{return JSON.parse(localStorage.getItem(CHECKLIST_KEY))||{}}catch(e){return{}}
    }
    function writeState(state){
      try{localStorage.setItem(CHECKLIST_KEY,JSON.stringify(state))}catch(e){}
    }
    function updateProgress(){
      const checked=checkboxes.filter(cb=>cb.checked).length;
      const total=checkboxes.length;
      const pct=total?Math.round((checked/total)*100):0;
      if(fill)fill.style.width=pct+"%";
      if(label)label.textContent=`${checked} of ${total} completed`;
    }
    const state=readState();
    checkboxes.forEach(cb=>{
      const key=cb.dataset.checklistItem;
      if(state[key])cb.checked=true;
      cb.addEventListener("change",()=>{
        const s=readState();
        s[key]=cb.checked;
        writeState(s);
        updateProgress();
      });
    });
    updateProgress();
    resetBtn?.addEventListener("click",()=>{
      checkboxes.forEach(cb=>{cb.checked=false});
      writeState({});
      updateProgress();
    });
  })();

  // ---------- Module 3: Research Matrix Prompt Builder ----------
  (()=>{
    const form=document.getElementById("matrixBuilderForm");
    if(!form)return;
    const preview=document.getElementById("matrixBuilderPreview"),copy=document.getElementById("copyMatrixPrompt"),reset=document.getElementById("matrixBuilderReset"),toast=document.getElementById("builderToast");
    const typeSelect=document.getElementById("matrixType"),columnsInput=document.getElementById("matrixColumns");
    const defaultColumns={
      "Literature Review Matrix":"Author & Year, Purpose/Objective, Method & Sample, Key Findings, Limitations, Gap or Question This Raises",
      "Research Design Matrix":"Research Question, Objective, Variables or Constructs, Method, Data Source or Instrument",
      "Synthesis Matrix":"Theme, Supporting Sources, Notes or Position",
    };
    const roleLine={
      "Literature Review Matrix":"Act as a research assistant helping me build a literature review matrix.",
      "Research Design Matrix":"Act as a research supervisor helping me check the alignment of my study.",
      "Synthesis Matrix":"Act as a research assistant helping me build a thematic synthesis matrix.",
    };
    const taskLine={
      "Literature Review Matrix":"Organise them into a table with these columns",
      "Research Design Matrix":"Build a table with one row per research question and these columns",
      "Synthesis Matrix":"Identify the recurring themes across these sources, then build a table with these columns",
    };
    const applyDefaultColumns=()=>{
      if(columnsInput&&!columnsInput.dataset.touched)columnsInput.value=defaultColumns[typeSelect.value]||"";
    };
    applyDefaultColumns();
    typeSelect?.addEventListener("change",applyDefaultColumns);
    columnsInput?.addEventListener("input",()=>{columnsInput.dataset.touched="1"});

    let generated="";
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const type=typeSelect.value;
      const parts=[roleLine[type],
        `Sources, notes or study components to include:\n${value("matrixSources")}`,
        `${taskLine[type]}: ${value("matrixColumns")}.`,
        `Present the result as a ${value("matrixFormat").toLowerCase()}.`,
        `Level of detail: ${value("matrixDetail").toLowerCase()}.`,
        `Ground every row and cell only in the sources or components I provided. Do not invent studies, findings, methods or themes that are not supported by the material. Write "Not reported" where a source does not cover a column, and flag any gaps, misalignments or contradictions you notice.`];
      generated=parts.join("\n\n");
      preview.classList.remove("empty");
      preview.textContent=generated;
      copy.disabled=false;
      preview.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    wireCopy(copy,()=>generated,toast);
    reset?.addEventListener("click",()=>{
      form.reset();generated="";copy.disabled=true;
      if(columnsInput)columnsInput.dataset.touched="";
      applyDefaultColumns();
      preview.classList.add("empty");
      preview.innerHTML='<div class="empty-state"><i data-lucide="table-2"></i><h3>Your prompt will appear here</h3><p>Choose a matrix type and describe your sources, then select <b>Generate Prompt</b>.</p></div>';
      window.lucide?.createIcons();
      document.getElementById("matrixSources")?.focus();
    });
  })();

  // ---------- Module 4: Chart-Type Decision Helper ----------
  (()=>{
    const form=document.getElementById("chartHelperForm");
    if(!form)return;
    const preview=document.getElementById("chartHelperPreview"),copy=document.getElementById("copyChartHelper"),reset=document.getElementById("chartHelperReset"),toast=document.getElementById("builderToast");
    let generated="";
    const recommendations={
      "Comparison between categories":["Bar chart, which gives a clear side-by-side comparison of discrete categories.","Grouped or stacked bar chart, used to compare categories across two variables."],
      "Trend over time":["Line chart, which shows change or trend across a continuous time period.","Area chart, which emphasises cumulative volume or magnitude over time."],
      "Part-to-whole proportion":["Pie or donut chart, best used with 5 or fewer categories.","100% stacked bar chart, which works better than a pie chart for many categories or multiple groups."],
      "Relationship between variables":["Scatter plot, which shows correlation or relationship between two numeric variables.","Bubble chart, which adds a third variable as bubble size."],
      "Distribution of values":["Histogram, which shows the frequency distribution of a single numeric variable.","Box plot, used to compare distribution, spread and outliers across groups."],
      "Process or workflow":["Flowchart, which shows sequential steps or decision points.","Sankey diagram, which shows flow volume or transitions between stages."],
      "Geographic pattern":["Choropleth map, which shades regions by a numeric value.","Symbol map, which shows location-based points sized or coloured by value."]
    };
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const goal=value("chartGoal");
      const variables=value("chartVariables")||"2 variables";
      const audience=value("chartAudience")||"Academic or technical audience";
      const options=recommendations[goal]||[];
      const lines=[`Goal: ${goal}`,`Variables: ${variables}`,`Audience: ${audience}`,"","Recommended chart types:",...options.map(o=>`• ${o}`)];
      if(audience==="General audience")lines.push("","Tip: simplify labels, add a short takeaway title and avoid dense technical notation for a general audience.");
      if(variables==="3 or more variables")lines.push("","Tip: with 3 or more variables, consider small multiples (a grid of simple charts) instead of overloading a single chart.");
      generated=lines.join("\n");
      preview.classList.remove("empty");
      preview.textContent=generated;
      copy.disabled=false;
      preview.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    wireCopy(copy,()=>generated,toast);
    reset?.addEventListener("click",()=>{
      form.reset();generated="";copy.disabled=true;
      preview.classList.add("empty");
      preview.innerHTML='<div class="empty-state"><i data-lucide="bar-chart-3"></i><h3>Your recommendation will appear here</h3><p>Choose what you are showing, then select <b>Recommend Chart Types</b>.</p></div>';
      window.lucide?.createIcons();
      document.getElementById("chartGoal")?.focus();
    });
  })();

  // ---------- Module 1: Scopus AI hands-on exercise — copy pattern ----------
  (()=>{
    const button=document.getElementById("copyScopusPatternM1");
    if(!button)return;
    const toast=document.getElementById("builderToast");
    button.addEventListener("click",async()=>{
      const text=document.getElementById("scopusPatternM1")?.textContent.trim();
      if(!text)return;
      await copyText(text);
      const label=button.querySelector("span");
      if(label)label.textContent="Pattern Copied";
      toast?.classList.add("visible");
      clearTimeout(button._toastTimer);
      button._toastTimer=setTimeout(()=>toast?.classList.remove("visible"),1700);
      setTimeout(()=>{if(label)label.textContent="Copy Pattern"},1800);
    });
  })();

  // ---------- Module 2: Gemini Notebook hands-on exercise — copy pattern ----------
  (()=>{
    const button=document.getElementById("copyGeminiNotebookM2");
    if(!button)return;
    const toast=document.getElementById("builderToast");
    button.addEventListener("click",async()=>{
      const text=document.getElementById("geminiNotebookPatternM2")?.textContent.trim();
      if(!text)return;
      await copyText(text);
      const label=button.querySelector("span");
      if(label)label.textContent="Pattern Copied";
      toast?.classList.add("visible");
      clearTimeout(button._toastTimer);
      button._toastTimer=setTimeout(()=>toast?.classList.remove("visible"),1700);
      setTimeout(()=>{if(label)label.textContent="Copy Pattern"},1800);
    });
  })();

  // ---------- Module 5: AI Disclosure Statement Builder ----------
  (()=>{
    const form=document.getElementById("disclosureForm");
    if(!form)return;
    const preview=document.getElementById("disclosurePreview"),copy=document.getElementById("copyDisclosure"),reset=document.getElementById("disclosureReset"),toast=document.getElementById("builderToast");
    let generated="";
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const uses=[`${value("disclosureTool1Name")} to ${value("disclosureTool1Purpose")}`];
      const tool2Name=value("disclosureTool2Name"),tool2Purpose=value("disclosureTool2Purpose");
      if(tool2Name&&tool2Purpose)uses.push(`${tool2Name} to ${tool2Purpose}`);
      const usesText=uses.length>1?`${uses[0]}, and ${uses[1]}`:uses[0];
      generated=`During the preparation of this manuscript, the author(s) used ${usesText}. All AI-suggested content was reviewed, verified against original sources, and edited by the author(s), who take full responsibility for the content of this publication.`;
      preview.classList.remove("empty");
      preview.textContent=generated;
      copy.disabled=false;
      preview.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
    wireCopy(copy,()=>generated,toast);
    reset?.addEventListener("click",()=>{
      form.reset();generated="";copy.disabled=true;
      preview.classList.add("empty");
      preview.innerHTML='<div class="empty-state"><i data-lucide="file-check-2"></i><h3>Your statement will appear here</h3><p>Describe the tools you used, then select <b>Generate Statement</b>.</p></div>';
      window.lucide?.createIcons();
      document.getElementById("disclosureTool1Name")?.focus();
    });
  })();

  // ---------- Progress tracking (localStorage) ----------
  const PROGRESS_KEY="bdcProgress";
  const readProgress=()=>{
    try{return JSON.parse(localStorage.getItem(PROGRESS_KEY))||{}}
    catch{return{}}
  };
  const writeProgress=data=>{
    try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(data))}
    catch{/* localStorage unavailable, ignore */}
  };
  const saveModuleProgress=(moduleId,score,total)=>{
    if(!moduleId)return;
    const data=readProgress();
    data[moduleId]={score,total,date:new Date().toISOString()};
    writeProgress(data);
  };

  // ---------- Module Self-Check Quizzes ----------
  document.querySelectorAll("form[data-quiz]").forEach(form=>{
    const moduleId=form.dataset.quiz;
    const priorResult=form.querySelector(".quiz-result");
    const prior=moduleId?readProgress()[moduleId]:null;
    if(prior&&priorResult)priorResult.textContent=`Last attempt: ${prior.score} of ${prior.total} correct. Retake anytime.`;

    form.addEventListener("submit",event=>{
      event.preventDefault();
      const questions=[...form.querySelectorAll(".quiz-q")];
      let score=0;
      questions.forEach(q=>{
        const checked=q.querySelector("input[type=radio]:checked");
        const feedback=q.querySelector(".quiz-feedback");
        q.classList.remove("correct","incorrect");
        if(!checked){
          q.classList.add("incorrect");
          if(feedback)feedback.textContent="Please select an answer.";
          return;
        }
        const isCorrect=checked.value===q.dataset.answer;
        if(isCorrect)score++;
        q.classList.add(isCorrect?"correct":"incorrect");
        if(feedback)feedback.textContent=(isCorrect?"✓ Correct. ":"✗ Not quite. ")+(q.dataset.explain||"");
      });
      const result=form.querySelector(".quiz-result");
      if(result)result.textContent=`${score} of ${questions.length} correct.`;
      saveModuleProgress(moduleId,score,questions.length);
    });
    form.querySelectorAll("input[type=radio]").forEach(input=>{
      input.addEventListener("change",()=>{
        const q=input.closest(".quiz-q");
        q?.classList.remove("correct","incorrect");
        const feedback=q?.querySelector(".quiz-feedback");
        if(feedback)feedback.textContent="";
      });
    });
  });

  // ---------- Training hub: progress badges ----------
  document.querySelectorAll("[data-module]").forEach(card=>{
    const entry=readProgress()[card.dataset.module];
    if(!entry)return;
    const badge=document.createElement("span");
    badge.className="progress-badge";
    badge.setAttribute("data-progress-badge","");
    if(entry.score===entry.total){
      badge.textContent=`Quiz completed · ${entry.score}/${entry.total}`;
      badge.dataset.state="completed";
    }else{
      badge.textContent=`Quiz attempted · ${entry.score}/${entry.total}`;
      badge.dataset.state="attempted";
    }
    card.prepend(badge);
  });

  const moduleCards=[...document.querySelectorAll("[data-module]")];
  if(moduleCards.length){
    const data=readProgress();
    const attempted=moduleCards.filter(card=>Boolean(data[card.dataset.module])).length;
    const completed=moduleCards.filter(card=>{
      const entry=data[card.dataset.module];
      return entry&&entry.total>0&&entry.score===entry.total;
    }).length;
    if(attempted>0){
      const summary=document.createElement("div");
      summary.className="module-progress-summary";
      summary.innerHTML=`<div><p class="eyebrow">YOUR QUIZ PROGRESS</p><strong>${completed} of ${moduleCards.length} module quizzes completed</strong><span>${attempted} attempted · Saved on this device only.</span></div><div class="module-progress-track" role="progressbar" aria-label="Module quiz completion" aria-valuemin="0" aria-valuemax="${moduleCards.length}" aria-valuenow="${completed}"><span style="width:${moduleCards.length?completed/moduleCards.length*100:0}%"></span></div>`;
      moduleCards[0].closest(".tool-grid")?.before(summary);
    }
  }

  // ---------- Materials page: task-based prompt hierarchy ----------
  const materialsPromptGrid=document.getElementById("materialsPromptGrid");
  if(materialsPromptGrid){
    const cardMap=new Map([...materialsPromptGrid.children].map(card=>[card.getAttribute("href"),card]));
    const makeCard=(href,number,icon,meta,title,description,action)=>{
      const a=document.createElement("a");a.className="resource-card resource-link-card";a.href=href;
      a.innerHTML=`<div class="resource-top"><b>${number}</b><i data-lucide="${icon}"></i></div><small>${meta}</small><h3>${title}</h3><p>${description}</p><span>${action} →</span>`;return a;
    };
    cardMap.set("module-2-idea-generation.html#rq-builder",makeCard("module-2-idea-generation.html#rq-builder","05","lightbulb","RESEARCH QUESTION & DESIGN","Research Question and Design Builder","Align the research problem, question, objective and initial design.","Build a Research Question"));
    cardMap.set("module-3-knowledge-organisation.html#ko-builder",makeCard("module-3-knowledge-organisation.html#ko-builder","06","table-properties","MATRIX & KNOWLEDGE MAP","Knowledge Organisation Prompt Builder","Organise verified studies into themes, matrices and conceptual structures.","Organise the Evidence"));
    const groups=[
      ["Workshop Prompt Libraries","Use these four resources directly alongside Parts 2–4 of the training presentation.",["scopus-ai-prompts.html","gemini-notebook-prompts.html","gemini-notebook-studio-prompts.html","ai-publication-prompts.html"]],
      ["Research Development","Refine the study, organise evidence, design methods, develop an SLR or build a custom Studio output.",["module-2-idea-generation.html#rq-builder","module-3-knowledge-organisation.html#ko-builder","research-methodology-prompts.html","slr-development-prompts.html","studio-prompt-builder.html"]],
      ["Review and Publication","Evaluate a completed manuscript or SLR, then coordinate complex revision and publication workflows.",["manuscript-review-prompts.html","prompt-builder.html","agentic-ai-publication.html"]]
    ];
    materialsPromptGrid.replaceChildren();materialsPromptGrid.removeAttribute("class");materialsPromptGrid.className="materials-prompt-groups";
    let promptNumber=1;
    groups.forEach(([title,description,hrefs])=>{
      const section=document.createElement("section");section.className="materials-prompt-group";
      section.innerHTML=`<div class="materials-prompt-group-head"><div><h3>${title}</h3><p>${description}</p></div></div><div class="materials-grid"></div>`;
      const grid=section.querySelector(".materials-grid");hrefs.forEach(href=>{
        const card=cardMap.get(href);
        if(card){
          const number=card.querySelector(".resource-top b");
          if(number)number.textContent=String(promptNumber).padStart(2,"0");
          promptNumber+=1;
          grid.append(card);
        }
      });materialsPromptGrid.append(section);
    });
    window.lucide?.createIcons();
  }
});
