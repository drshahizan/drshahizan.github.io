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

  // ---------- Module 4: Chart-Type Decision Helper ----------
  (()=>{
    const form=document.getElementById("chartHelperForm");
    if(!form)return;
    const preview=document.getElementById("chartHelperPreview"),copy=document.getElementById("copyChartHelper"),reset=document.getElementById("chartHelperReset"),toast=document.getElementById("builderToast");
    let generated="";
    const recommendations={
      "Comparison between categories":["Bar chart — clear side-by-side comparison of discrete categories.","Grouped or stacked bar chart — compare categories across two variables."],
      "Trend over time":["Line chart — show change or trend across a continuous time period.","Area chart — emphasise cumulative volume or magnitude over time."],
      "Part-to-whole proportion":["Pie or donut chart — best with 5 or fewer categories.","100% stacked bar chart — better than pie for many categories or multiple groups."],
      "Relationship between variables":["Scatter plot — show correlation or relationship between two numeric variables.","Bubble chart — add a third variable as bubble size."],
      "Distribution of values":["Histogram — show the frequency distribution of a single numeric variable.","Box plot — compare distribution, spread and outliers across groups."],
      "Process or workflow":["Flowchart — show sequential steps or decision points.","Sankey diagram — show flow volume or transitions between stages."],
      "Geographic pattern":["Choropleth map — shade regions by a numeric value.","Symbol map — show location-based points sized or coloured by value."]
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
});
