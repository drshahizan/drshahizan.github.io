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
{n:"Connected Papers",g:"discovery",x:"visualisation",t:"Citation Discovery",d:"Builds a graph of papers related to a seed publication to reveal prior and derivative work.",u:"https://www.connectedpapers.com/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-discovery/connected-papers"},
{n:"Consensus",g:"discovery",t:"Evidence Search",d:"AI academic search engine that synthesises findings and links answers to underlying papers.",u:"https://consensus.app/"},
{n:"Elicit",g:"discovery",t:"AI Literature Search",d:"Finds papers, supports study screening and extracts information into structured review tables.",u:"https://elicit.com/"},
{n:"Keenious",g:"discovery",t:"Contextual Discovery",d:"Recommends papers from short queries or manuscripts by analysing topics and context.",u:"https://keenious.com/"},
{n:"Liner",g:"discovery",t:"AI Research Search",d:"Research-focused AI search for finding citations, generating hypotheses and reviewing scholarly work.",u:"https://app.liner.com/"},
{n:"Sourcely",g:"discovery",t:"Source Discovery",d:"Finds, filters and summarises relevant scholarly sources from keywords or existing text.",u:"https://www.sourcely.net/"},
{n:"Publish or Perish",g:"discovery",t:"Citation Metrics",d:"Retrieves academic citations and calculates a range of bibliometric indicators.",u:"https://harzing.com/resources/publish-or-perish"},
{n:"ResearchRabbit",g:"review",t:"Research Landscape",d:"Maps related papers, authors and citation connections for iterative literature exploration.",u:"https://www.researchrabbit.ai/"},
{n:"Litmaps",g:"review",x:"visualisation",t:"Literature Mapping",d:"Creates citation maps, monitors new publications and reveals influential or under-explored areas.",u:"https://www.litmaps.com/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-discovery/litmaps"},
{n:"Iris.ai",g:"review",t:"Contextual Mapping",d:"Identifies and organises contextually related papers and presents relevant topics visually.",u:"https://iris.ai/"},
{n:"Scite",g:"review",t:"Citation Context",d:"Shows whether citations support, contrast with or merely mention a publication.",u:"https://scite.ai/"},
{n:"SciSpace",g:"review",t:"Paper Exploration",d:"Supports literature discovery, connected-paper exploration and question answering over papers.",u:"https://scispace.com/"},
{n:"Anara",g:"review",t:"Document Research",d:"Helps researchers understand, organise and write from documents using citation-linked answers.",u:"https://anara.com/"},
{n:"Humata AI",g:"review",t:"Chat with Documents",d:"Answers questions about uploaded files, summarises technical documents and extracts information.",u:"https://www.humata.ai/"},
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
{n:"Markmap",g:"visualisation",t:"Mind-map Visualisation",d:"Transforms Markdown outlines into interactive mind maps for organising research concepts.",u:"https://markmap.js.org/",i:"https://github.com/drshahizan/ai-tools/blob/main/materials/markmap.md"},
{n:"SciDraw AI",g:"visualisation",t:"Scientific Illustration",d:"Generates scientific illustrations, diagrams, posters and charts from prompts or data.",u:"https://sci-draw.com/"},
{n:"Inciteful",g:"visualisation",t:"Citation Graph",d:"Free tools for mapping academic literature from seed papers or a reference list.",u:"https://inciteful.xyz/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-discovery/inciteful"},
{n:"Open Knowledge Maps",g:"visualisation",t:"Knowledge Map",d:"Open platform that creates visual overviews of research topics from scholarly literature.",u:"https://openknowledgemaps.org/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-visualization/open-knowledge-maps-okm"},
{n:"VOSviewer",g:"visualisation",t:"Bibliometric Network",d:"Constructs and visualises co-authorship, citation and keyword co-occurrence networks.",u:"https://www.vosviewer.com/",i:"https://github.com/drshahizan/ai-tools/blob/main/materials/vosviewer.md"},
{n:"CiteSpace",g:"visualisation",t:"Science Mapping",d:"Creates and explores publication networks, research fronts and emerging trends from citation data.",u:"https://citespace.podia.com/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-visualization/citespace"},
{n:"Gephi",g:"visualisation",t:"Network Analysis",d:"Open-source platform for visualising and analysing complex networks.",u:"https://gephi.org/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-visualization/gephi"},
{n:"Bibliometrix",g:"visualisation",t:"Bibliometric Analysis",d:"R-based toolkit for comprehensive bibliometric analysis and science mapping.",u:"https://www.bibliometrix.org/home/",i:"https://drshahizan.gitbook.io/ai-tools/ai-tools/paper-visualization/bibliometrix"}
];
const groupLabels={discovery:"Discovery & Databases",review:"Review & Evidence Analysis",writing:"Writing, Citation & Publishing",visualisation:"Paper Visualisation"};
const esc=s=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const card=t=>`<article class="tool-card"><small>${esc(t.t)}</small><h3>${esc(t.n)}</h3><p>${esc(t.d)}</p><div class="tool-actions">${t.i?`<a class="tool-info" href="${t.i}" target="_blank" rel="noopener noreferrer">Guide</a>`:""}<a href="${t.u}" target="_blank" rel="noopener noreferrer">Visit tool →</a></div></article>`;
document.addEventListener("DOMContentLoaded",()=>{
 const collection=document.querySelector("[data-tool-collection]");
 if(collection){const group=collection.dataset.toolCollection,items=researchTools.filter(t=>t.g===group||t.x===group),input=document.getElementById("collectionSearch"),count=document.getElementById("collectionCount");const draw=()=>{const q=(input?.value||"").trim().toLowerCase(),shown=items.filter(t=>`${t.n} ${t.t} ${t.d}`.toLowerCase().includes(q));collection.innerHTML=shown.map(card).join("");if(count)count.textContent=`${shown.length} tool${shown.length===1?"":"s"} shown`;};input?.addEventListener("input",draw);draw();}
 const input=document.getElementById("toolSearch"),results=document.getElementById("toolSearchResults"),count=document.getElementById("toolSearchCount");
 if(input&&results){const draw=()=>{const q=input.value.trim().toLowerCase();if(!q){results.innerHTML="";count.textContent="Start typing to search all research tools.";return;}const shown=researchTools.filter(t=>`${t.n} ${t.t} ${t.d} ${groupLabels[t.g]}`.toLowerCase().includes(q));results.innerHTML=shown.map(card).join("");count.textContent=shown.length?`${shown.length} matching tool${shown.length===1?"":"s"}`:"No tools found. Try a broader keyword.";};input.addEventListener("input",draw);}
});
