"use strict";
const researchTools=[
{n:"Scopus",g:"discovery",t:"Scholarly Database",d:"Comprehensive abstract and citation database covering peer-reviewed journals, books and conference proceedings.",u:"https://www-scopus-com.ezproxy.utm.my/search/form.uri#basic"},
{n:"Web of Science",g:"discovery",t:"Scholarly Database",d:"Clarivate citation index and discovery platform for scholarly literature, proceedings, books and datasets.",u:"https://www-webofscience-com.ezproxy.utm.my/wos/woscc/basic-search"},
{n:"Google Scholar",g:"discovery",t:"Academic Search",d:"Free academic search engine covering papers, theses, books, abstracts and other scholarly materials.",u:"https://scholar.google.com/"},
{n:"ACM Digital Library",g:"discovery",t:"Computer Science Database",d:"ACM journals, conference proceedings, magazines and newsletters in computing and information technology.",u:"https://dl-acm-org.ezproxy.utm.my/"},
{n:"IEEE Xplore",g:"discovery",t:"Engineering & CS Database",d:"Scientific and technical literature in electrical engineering, computer science, electronics and related fields.",u:"https://ieeexplore-ieee-org.ezproxy.utm.my/Xplore/home.jsp"},
{n:"Emerald Insight",g:"discovery",t:"Multidisciplinary Database",d:"Journals, books and case studies in business, management, engineering, computing and social sciences.",u:"https://www-emerald-com.ezproxy.utm.my/"},
{n:"ScienceDirect",g:"discovery",t:"Full-text Database",d:"Elsevier journal articles and book chapters across science, technology, medicine and social sciences.",u:"https://www-sciencedirect-com.ezproxy.utm.my/"},
{n:"SpringerLink",g:"discovery",t:"Full-text Database",d:"Scholarly journals, books, proceedings, protocols and reference works across many disciplines.",u:"https://link-springer-com.ezproxy.utm.my/"},
{n:"PubMed",g:"discovery",t:"Biomedical Database",d:"Free biomedical and life-sciences literature search maintained by the US National Library of Medicine.",u:"https://pubmed.ncbi.nlm.nih.gov/"},
{n:"Zeta Alpha",g:"discovery",t:"AI Paper Discovery",d:"Neural and semantic search platform for discovering and organising technical and scientific knowledge.",u:"https://search.zeta-alpha.com/"},
{n:"EvidenceHunt",g:"discovery",t:"Clinical Evidence",d:"AI-powered search for relevant clinical trials, systematic reviews and healthcare evidence.",u:"https://evidencehunt.com/"},
{n:"Semantic Scholar",g:"discovery",t:"AI Scholarly Search",d:"Free AI-powered search for discovering papers and following connections across scientific literature.",u:"https://www.semanticscholar.org/"},
{n:"R Discovery",g:"discovery",t:"Personalised Discovery",d:"Finds relevant literature, follows topics and provides personalised paper recommendations.",u:"https://discovery.researcher.life/"},
{n:"Connected Papers",g:"discovery",t:"Citation Discovery",d:"Builds a graph of papers related to a seed publication to reveal prior and derivative work.",u:"https://www.connectedpapers.com/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-discovery/connected-papers"},
{n:"Consensus",g:"discovery",t:"Evidence Search",d:"AI academic search engine that synthesises findings and links answers to underlying papers.",u:"https://consensus.app/"},
{n:"Elicit",g:"discovery",t:"AI Literature Search",d:"Finds papers, supports study screening and extracts information into structured review tables.",u:"https://elicit.com/"},
{n:"Keenious",g:"discovery",t:"Contextual Discovery",d:"Recommends papers from short queries or manuscripts by analysing topics and context.",u:"https://keenious.com/"},
{n:"Liner",g:"discovery",t:"AI Research Search",d:"Research-focused AI search for finding citations, generating hypotheses and reviewing scholarly work.",u:"https://app.liner.com/"},
{n:"Sourcely",g:"discovery",t:"Source Discovery",d:"Finds, filters and summarises relevant scholarly sources from keywords or existing text.",u:"https://www.sourcely.net/"},
{n:"Publish or Perish",g:"discovery",t:"Citation Metrics",d:"Retrieves academic citations and calculates a range of bibliometric indicators.",u:"https://harzing.com/resources/publish-or-perish"},
{n:"ResearchRabbit",g:"review",t:"Research Landscape",d:"Maps related papers, authors and citation connections for iterative literature exploration.",u:"https://www.researchrabbit.ai/"},
{n:"Litmaps",g:"review",t:"Literature Mapping",d:"Creates citation maps, monitors new publications and reveals influential or under-explored areas.",u:"https://www.litmaps.com/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-discovery/litmaps"},
{n:"Iris.ai",g:"review",t:"Contextual Mapping",d:"Identifies and organises contextually related papers and presents relevant topics visually.",u:"https://iris.ai/"},
{n:"Scite",g:"review",t:"Citation Context",d:"Shows whether citations support, contrast with or merely mention a publication.",u:"https://scite.ai/"},
{n:"SciSpace",g:"review",t:"Paper Exploration",d:"Supports literature discovery, connected-paper exploration and question answering over papers.",u:"https://scispace.com/"},
{n:"Anara",g:"review",t:"Document Research",d:"Helps researchers understand, organise and write from documents using citation-linked answers.",u:"https://anara.com/"},
{n:"Humata AI",g:"review",t:"Chat with Documents",d:"Answers questions about uploaded files, summarises technical documents and extracts information.",u:"https://www.humata.ai/"},
{n:"ChatGPT",g:"review",t:"Large Language Model",d:"AI assistant for brainstorming, literature summarisation, coding, academic writing and general research support.",u:"https://chatgpt.com/"},
{n:"Claude",g:"review",t:"Large Language Model",d:"AI assistant with long-context capabilities suited to analysing lengthy research documents.",u:"https://claude.ai/"},
{n:"Google Gemini",g:"review",t:"Large Language Model",d:"Google AI assistant for research, writing, coding and multimodal analysis.",u:"https://gemini.google.com/"},
{n:"Jenni AI",g:"writing",t:"Academic Writing",d:"Assists with drafting, editing, proofreading and locating potential citations.",u:"https://jenni.ai/"},
{n:"Paperpal",g:"writing",t:"Academic Language",d:"Provides suggestions for grammar, vocabulary, translation, tone and consistency.",u:"https://paperpal.com/"},
{n:"WriteWise",g:"writing",t:"Writing Feedback",d:"Supports coherence, argument strength, academic style and research-paper organisation.",u:"https://web.writewise.io/"},
{n:"Yomu AI",g:"writing",t:"Writing & Citation",d:"Combines drafting, feedback, citation support, formatting and originality checks.",u:"https://www.yomu.ai/"},
{n:"Bibliome",g:"writing",t:"Private PDF Library",d:"Local-first reference library that organises and searches PDF collections on Mac.",u:"https://psychosonicconsulting.com/"},
{n:"Obsidian",g:"writing",t:"Knowledge Management",d:"Linked-note knowledge-management app with graph views and an extensive plugin ecosystem.",u:"https://obsidian.md/"},
{n:"Nested Knowledge",g:"writing",t:"Systematic Review",d:"Supports search planning, study retrieval, screening, tagging, extraction and evidence visualisation.",u:"https://nested-knowledge.com/"},
{n:"LiveWrite",g:"writing",t:"Journal Formatting",d:"Reformats manuscripts to align with medical-journal and article-type requirements.",u:"https://livewrite.app/"},
{n:"Zotero",g:"writing",t:"Citation Management",d:"Free tool for collecting, organising, citing and sharing research sources.",u:"https://www.zotero.org/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/citation-management/zotero"},
{n:"EndNote",g:"writing",t:"Citation Management",d:"Reference-management software for organising literature and producing citations and bibliographies.",u:"https://endnote.com",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/citation-management/endnote"},
{n:"RefWorks",g:"writing",t:"Citation Management",d:"Online reference manager for organising sources and creating bibliographies in common styles.",u:"https://refworks.proquest.com/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/citation-management/refworks"},
{n:"Mendeley",g:"writing",t:"Citation Management",d:"Reference manager and academic network for organising research, collaboration and discovery.",u:"https://www.mendeley.com/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/citation-management/mendeley"},
{n:"QuillBot",g:"writing",t:"Grammar, Editing & Paraphrasing",d:"AI tool for paraphrasing, grammar checking, summarisation and citation assistance.",u:"https://quillbot.com/"},
{n:"Grammarly",g:"writing",t:"Grammar & Academic Editing",d:"Improves grammar, spelling, punctuation, clarity and tone, with plagiarism-related features on supported plans.",u:"https://www.grammarly.com/"},
{n:"JabRef",g:"writing",t:"Citation Management",d:"Open-source bibliography manager designed especially for BibTeX and LaTeX workflows.",u:"https://www.jabref.org/"},
{n:"Rayyan",g:"writing",t:"Systematic Review",d:"AI-assisted platform for screening and organising studies in systematic and scoping reviews.",u:"https://www.rayyan.ai/"},
{n:"Covidence",g:"writing",t:"Systematic Review",d:"Streamlines systematic-review screening, conflict resolution, data extraction and evidence synthesis.",u:"https://www.covidence.org/"},
{n:"RevMan",g:"writing",t:"Systematic Review & Meta-analysis",d:"Cochrane software for preparing systematic reviews and conducting meta-analysis.",u:"https://training.cochrane.org/online-learning/core-software-cochrane-reviews/revman"},
{n:"ResearchGate",g:"writing",t:"Research Profile & Publication Portfolio",d:"Platform for sharing publications, connecting with researchers and following research engagement.",u:"https://www.researchgate.net/"},
{n:"ORCID",g:"writing",t:"Researcher Identifier",d:"Persistent researcher identifier that connects publications, grants, affiliations and other scholarly outputs.",u:"https://orcid.org/"},
{n:"Markmap",g:"visualisation",t:"Mind-map Visualisation",d:"Transforms Markdown outlines into interactive mind maps for organising research concepts.",u:"https://markmap.js.org/",i:"https://github.com/drshahizan/ai-tools/blob/main/materials/markmap.md"},
{n:"SciDraw AI",g:"visualisation",t:"Scientific Illustration",d:"Generates scientific illustrations, diagrams, posters and charts from prompts or data.",u:"https://sci-draw.com/"},
{n:"Inciteful",g:"visualisation",t:"Citation Graph",d:"Free tools for mapping academic literature from seed papers or a reference list.",u:"https://inciteful.xyz/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-discovery/inciteful"},
{n:"Open Knowledge Maps",g:"visualisation",t:"Knowledge Map",d:"Open platform that creates visual overviews of research topics from scholarly literature.",u:"https://openknowledgemaps.org/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-visualization/open-knowledge-maps-okm"},
{n:"VOSviewer",g:"visualisation",t:"Bibliometric Network",d:"Constructs and visualises co-authorship, citation and keyword co-occurrence networks.",u:"https://www.vosviewer.com/",i:"https://github.com/drshahizan/ai-tools/blob/main/materials/vosviewer.md"},
{n:"CiteSpace",g:"visualisation",t:"Science Mapping",d:"Creates and explores publication networks, research fronts and emerging trends from citation data.",u:"https://citespace.podia.com/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-visualization/citespace"},
{n:"Gephi",g:"visualisation",t:"Network Analysis",d:"Open-source platform for visualising and analysing complex networks.",u:"https://gephi.org/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-visualization/gephi"},
{n:"Bibliometrix",g:"visualisation",t:"Bibliometric Analysis",d:"R-based toolkit for comprehensive bibliometric analysis and science mapping.",u:"https://www.bibliometrix.org/home/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-visualization/bibliometrix"}
,{n:"Canva",g:"visualisation",t:"Scientific Figures & Communication",d:"Creates presentations, posters, infographics and other visual research communication materials.",u:"https://www.canva.com/"}
,{n:"BioRender",g:"visualisation",t:"Scientific Illustration",d:"Creates professional scientific illustrations for biology, medicine and the life sciences.",u:"https://www.biorender.com/"}
,{n:"diagrams.net",g:"visualisation",t:"Diagrams & Frameworks",d:"Free online tool for flowcharts, conceptual frameworks and research diagrams; formerly known as Draw.io.",u:"https://www.diagrams.net/"}
,{n:"MindMeister",g:"visualisation",t:"Mind Mapping",d:"Online collaborative mind-mapping tool for organising concepts, projects and research ideas.",u:"https://www.mindmeister.com/"}
,{n:"XMind",g:"visualisation",t:"Mind Mapping",d:"Professional brainstorming, mind-mapping and concept-mapping software.",u:"https://xmind.app/"}
,{n:"Mermaid",g:"visualisation",t:"Text-based Diagrams",d:"Creates flowcharts, timelines and other diagrams from a concise text-based syntax.",u:"https://mermaid.js.org/"}
,{n:"SPSS",g:"methods",t:"Quantitative Data Analysis",d:"Statistical software widely used for survey research and quantitative analysis in the social sciences.",u:"https://www.ibm.com/products/spss-statistics"}
,{n:"JASP",g:"methods",t:"Quantitative Data Analysis",d:"Free statistical software with an accessible interface and support for frequentist and Bayesian analyses.",u:"https://jasp-stats.org/"}
,{n:"ATLAS.ti",g:"methods",t:"Qualitative Data Analysis",d:"Analyses interviews, focus groups, documents, videos and other qualitative datasets.",u:"https://atlasti.com/"}
,{n:"NVivo",g:"methods",t:"Qualitative Data Analysis",d:"Supports coding, thematic analysis and management of qualitative and mixed-methods research.",u:"https://lumivero.com/products/nvivo"}
,{n:"Otter.ai",g:"methods",t:"Research Transcription",d:"Records meetings and produces AI-assisted transcripts, summaries and searchable notes.",u:"https://otter.ai/"}
,{n:"Trello",g:"methods",t:"Research Project Management",d:"Kanban-style project management for organising research tasks, milestones and collaboration.",u:"https://trello.com/"}
,{n:"Notion",g:"methods",t:"Research Workspace",d:"All-in-one workspace for research notes, planning, databases, documentation and collaboration.",u:"https://www.notion.so/"}
,{n:"Pomofocus",g:"methods",t:"Focus & Time Management",d:"Web-based Pomodoro timer for structuring focused work and restorative breaks.",u:"https://pomofocus.io/"}
,{n:"REDCap",g:"methods",t:"Research Data Collection",d:"Secure platform for building surveys and databases for clinical and academic research.",u:"https://projectredcap.org/"}
,{n:"Qualtrics",g:"methods",t:"Survey & Data Collection",d:"Advanced platform for online surveys, research data collection and experience management.",u:"https://www.qualtrics.com/"}
,{n:"SurveyMonkey",g:"methods",t:"Survey & Data Collection",d:"Online platform for creating surveys, collecting responses and reviewing results.",u:"https://www.surveymonkey.com/"}
,{n:"Python",g:"methods",t:"Data Analysis & Automation",d:"Programming language for statistics, machine learning, data visualisation and research automation.",u:"https://www.python.org/"}
,{n:"jamovi",g:"methods",t:"Quantitative Data Analysis",d:"Free statistical software built on R with an intuitive graphical interface.",u:"https://www.jamovi.org/"}
,{n:"Dedoose",g:"methods",t:"Mixed-methods Analysis",d:"Cloud-based platform for qualitative and mixed-methods research data analysis.",u:"https://www.dedoose.com/"}
,{n:"Calendly",g:"methods",t:"Research Scheduling",d:"Schedules research meetings, supervision sessions and consultations through shareable availability.",u:"https://calendly.com/"}
,{n:"Doodle",g:"methods",t:"Collaborative Scheduling",d:"Helps research teams identify suitable meeting times across multiple participants.",u:"https://doodle.com/"}
];
const groupLabels={discovery:"Discovery & Databases",review:"Review & Evidence Analysis",writing:"Writing, Citation & Publishing",visualisation:"Paper Visualisation",methods:"Research Methods, Data & Productivity"};
const esc=s=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const card=t=>`<article class="tool-card"><small>${esc(t.t)}</small><h3>${esc(t.n)}</h3><p>${esc(t.d)}</p><div class="tool-actions">${t.i?`<a class="tool-info" href="${t.i}" target="_blank" rel="noopener noreferrer">Guide</a>`:""}<a href="${t.u}" target="_blank" rel="noopener noreferrer">Visit tool →</a></div></article>`;
document.addEventListener("DOMContentLoaded",()=>{
 const collection=document.querySelector("[data-tool-collection]");
 if(collection){const group=collection.dataset.toolCollection,items=researchTools.filter(t=>t.g===group||t.x===group),input=document.getElementById("collectionSearch"),subcategory=document.getElementById("subcategoryFilter"),count=document.getElementById("collectionCount");if(subcategory){[...new Set(items.map(t=>t.t))].sort((a,b)=>a.localeCompare(b)).forEach(label=>{const option=document.createElement("option");option.value=label;option.textContent=label;subcategory.appendChild(option);});}const draw=()=>{const q=(input?.value||"").trim().toLowerCase(),selected=subcategory?.value||"",shown=items.filter(t=>(!selected||t.t===selected)&&`${t.n} ${t.t} ${t.d}`.toLowerCase().includes(q));collection.innerHTML=shown.map(card).join("");if(count)count.textContent=`${shown.length} of ${items.length} tool${items.length===1?"":"s"} shown`;};input?.addEventListener("input",draw);subcategory?.addEventListener("change",draw);draw();}
 const input=document.getElementById("toolSearch"),results=document.getElementById("toolSearchResults"),count=document.getElementById("toolSearchCount");
 if(input&&results){const draw=()=>{const q=input.value.trim().toLowerCase();if(!q){results.innerHTML="";count.textContent="Start typing to search all research tools.";return;}const shown=researchTools.filter(t=>`${t.n} ${t.t} ${t.d} ${groupLabels[t.g]}`.toLowerCase().includes(q));results.innerHTML=shown.map(card).join("");count.textContent=shown.length?`${shown.length} matching tool${shown.length===1?"":"s"}`:"No tools found. Try a broader keyword.";};input.addEventListener("input",draw);}
});
