"use strict";
document.addEventListener("DOMContentLoaded",()=>{
  if(window.lucide)lucide.createIcons();
  const root=document.documentElement,header=document.getElementById("siteHeader"),progress=document.getElementById("scrollProgress"),back=document.getElementById("backTop"),menu=document.getElementById("menuToggle"),nav=document.getElementById("navLinks"),theme=document.getElementById("themeToggle");

  const saved=localStorage.getItem("air-theme");
  if(saved)root.dataset.theme=saved;
  const icon=()=>{if(!theme)return;theme.innerHTML=`<i data-lucide="${root.dataset.theme==="dark"?"sun":"moon"}"></i>`;if(window.lucide)lucide.createIcons()};
  icon();
  theme?.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("air-theme",root.dataset.theme);icon()});

  menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const scroll=()=>{
    const top=scrollY,max=document.documentElement.scrollHeight-innerHeight;
    header?.classList.toggle("compact",top>25);
    back?.classList.toggle("visible",top>500);
    if(progress)progress.style.width=`${max>0?top/max*100:0}%`;
  };
  scroll();
  addEventListener("scroll",scroll,{passive:true});
  back?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

  const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.1});
  document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

  const readingSearch=document.getElementById("readingSearch");
  readingSearch?.addEventListener("input",()=>{
    const term=readingSearch.value.toLowerCase().trim();
    let matches=0;
    document.querySelectorAll(".reading-groups details").forEach(group=>{
      const groupTitle=group.querySelector("summary")?.textContent.toLowerCase()||"";
      let groupMatches=0;
      group.querySelectorAll("[data-title]").forEach(a=>{
      const searchable=`${a.dataset.title} ${a.textContent} ${groupTitle}`.toLowerCase();
      const match=searchable.includes(term);
      a.classList.toggle("search-hidden",!match);
      if(match){matches+=1;groupMatches+=1}
      });
      group.classList.toggle("search-hidden",Boolean(term)&&groupMatches===0);
      if(groupMatches&&term)group.open=true;
    });
    const empty=document.getElementById("readingEmpty");
    if(empty)empty.hidden=matches>0;
  });

  const lightbox=document.getElementById("posterLightbox"),open=document.getElementById("posterOpen"),close=document.getElementById("posterClose");
  const shut=()=>{if(lightbox){lightbox.hidden=true;document.body.style.overflow=""}};
  open?.addEventListener("click",()=>{lightbox.hidden=false;document.body.style.overflow="hidden";close.focus()});
  close?.addEventListener("click",shut);
  lightbox?.addEventListener("click",e=>{if(e.target===lightbox)shut()});
  addEventListener("keydown",e=>{if(e.key==="Escape")shut()});

  // Keep navigation state accurate on every page, including nested prompt pages.
  const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const sectionFor=page.startsWith("module-")||page==="training-modules.html"?"training-modules.html":
    page.startsWith("tools-")||page==="tools.html"?"tools.html":
    page.includes("prompt")||page==="agentic-ai-publication.html"?"ai-prompt.html":page;
  const updateNavState=()=>nav?.querySelectorAll("a").forEach(a=>{
    const [target,anchor]=(a.getAttribute("href")||"").toLowerCase().split("#");
    const active=page==="index.html"&&target==="index.html"
      ?(anchor?location.hash.toLowerCase()===`#${anchor}`:!location.hash)
      :target===sectionFor&&!anchor;
    a.classList.toggle("active",active);
    if(active)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
  });
  updateNavState();
  addEventListener("hashchange",updateNavState);

  // Breadcrumbs are generated from the current page so all internal pages stay consistent.
  const pageNames={
    "programme.html":"Programme","training-modules.html":"Training Modules",
    "module-1-literature-discovery.html":"Module 1: Literature Discovery",
    "module-2-idea-generation.html":"Module 2: Idea Generation",
    "module-3-knowledge-organisation.html":"Module 3: Knowledge Organisation",
    "module-4-data-visualisation.html":"Module 4: Data Visualisation",
    "module-5-academic-writing.html":"Module 5: Academic Writing",
    "materials.html":"Materials","resources.html":"Resources","tools.html":"AI Tools",
    "tools-discovery.html":"Discovery & Databases","tools-review.html":"Review & Evidence Analysis",
    "tools-writing.html":"Writing, Citation & Publishing","tools-visualisation.html":"Paper Visualisation",
    "tools-methods.html":"Research Methods & Data","ai-prompt.html":"AI Prompt Centre",
    "scopus-ai-prompts.html":"Scopus AI Prompts","gemini-notebook-prompts.html":"Gemini Notebook Prompts",
    "gemini-notebook-studio-prompts.html":"Studio Prompts","ai-publication-prompts.html":"Publication Prompts",
    "manuscript-review-prompts.html":"Manuscript Review Prompts","prompt-builder.html":"SLR Prompt Builder",
    "studio-prompt-builder.html":"Studio Prompt Builder","agentic-ai-publication.html":"Agentic AI for Publication",
    "research-methodology-prompts.html":"Methodology and Data Analysis Prompts",
    "slr-development-prompts.html":"SLR Development Prompts"
  };
  if(page!=="index.html"&&page!=="404.html"&&pageNames[page]){
    const hero=document.querySelector("main > section:first-child");
    const group=sectionFor!==page&&pageNames[sectionFor]?`<a href="${sectionFor}">${pageNames[sectionFor]}</a><span aria-hidden="true">›</span>`:"";
    const crumb=document.createElement("nav");
    crumb.className="breadcrumbs";crumb.setAttribute("aria-label","Breadcrumb");
    crumb.innerHTML=`<div class="container"><a href="index.html">Home</a><span aria-hidden="true">›</span>${group}<span aria-current="page">${pageNames[page]}</span></div>`;
    hero?.before(crumb);
  }

  const moduleMeta={
    "module-1-literature-discovery.html":["Approximately 60 minutes","A verified literature-search strategy and shortlist of relevant papers"],
    "module-2-idea-generation.html":["Approximately 55 minutes","A refined research problem, question and initial research design"],
    "module-3-knowledge-organisation.html":["Approximately 50 minutes","A structured evidence matrix and conceptual knowledge map"],
    "module-4-data-visualisation.html":["Approximately 50 minutes","An accurate research chart, diagram or visual summary"],
    "module-5-academic-writing.html":["Approximately 45 minutes","An improved, verified and responsibly documented academic section"]
  };
  if(moduleMeta[page]){
    const copy=document.querySelector(".page-hero-grid>div:first-child");
    const [duration,output]=moduleMeta[page];
    copy?.querySelector(".button-row")?.insertAdjacentHTML("beforebegin",`<div class="module-outcome"><span><i data-lucide="clock-3"></i><b>Estimated time</b>${duration}</span><span><i data-lucide="package-check"></i><b>You will produce</b>${output}</span></div>`);
  }

  // Improve image loading without changing the generated source files.
  document.querySelectorAll("img").forEach((img,index)=>{
    img.decoding="async";
    if(index>1&&!img.closest(".page-hero-visual,.poster-card,.prompt-story-image"))img.loading="lazy";
  });

  // Show maintenance currency on pages whose tool and prompt information changes frequently.
  if(/^(tools|resources|ai-prompt|scopus|gemini|ai-publication|agentic|manuscript|prompt-builder|studio-prompt)/.test(page)){
    const firstHero=document.querySelector("main > section:first-child .container>div:first-child,main > section:first-child .container");
    if(firstHero&&!firstHero.querySelector(".updated-badge"))firstHero.insertAdjacentHTML("beforeend",'<p class="updated-badge"><i data-lucide="calendar-check"></i> Last updated: August 2026</p>');
  }

  // A compact site-wide search for the most important learning destinations.
  const searchItems=Object.entries(pageNames).map(([url,title])=>({url,title,terms:(title+" "+url.replaceAll("-"," ")).toLowerCase()}));
  const navActions=document.querySelector(".nav-actions");
  if(navActions){
    const searchButton=document.createElement("button");
    searchButton.className="icon-button site-search-button";searchButton.type="button";
    searchButton.setAttribute("aria-label","Search this website");searchButton.innerHTML='<i data-lucide="search"></i>';
    navActions.prepend(searchButton);
    const dialog=document.createElement("dialog");dialog.className="site-search-dialog";
    dialog.innerHTML='<form method="dialog" class="site-search-head"><label for="siteSearchInput">Search this website</label><button class="icon-button" value="cancel" aria-label="Close search"><i data-lucide="x"></i></button></form><div class="site-search-field"><i data-lucide="search"></i><input id="siteSearchInput" type="search" placeholder="Search modules, tools and prompts…" autocomplete="off"></div><div class="site-search-results" id="siteSearchResults"><p>Start typing to find a page.</p></div>';
    document.body.append(dialog);
    const input=dialog.querySelector("input"),results=dialog.querySelector(".site-search-results");
    const renderSearch=()=>{const q=input.value.trim().toLowerCase();const matches=q?searchItems.filter(x=>x.terms.includes(q)).slice(0,8):[];results.innerHTML=matches.length?matches.map(x=>`<a href="${x.url}"><span>${x.title}</span><i data-lucide="arrow-right"></i></a>`).join(""):(q?'<p>No matching page found.</p>':'<p>Start typing to find a page.</p>');window.lucide?.createIcons()};
    searchButton.addEventListener("click",()=>{dialog.showModal();setTimeout(()=>input.focus(),20)});
    input.addEventListener("input",renderSearch);
  }
  if(window.lucide)lucide.createIcons();
});
