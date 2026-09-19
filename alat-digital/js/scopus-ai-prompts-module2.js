(()=>{const categories=[
["scope","Skop Topik & Terminologi","Takrifkan bidang sebelum mengecilkan fokus",[
["Map the Core Concepts","What are the main concepts associated with [TOPIC] in recent academic literature?"],
["Compare Definitions","How is [KEY CONCEPT] defined and measured across different studies?"],
["Identify Related Terminology","What related terms should researchers consider when investigating [TOPIC]?"],
["Trace Concept Evolution","How has the academic understanding of [TOPIC] evolved over the last ten years?"]]],
["gaps","Jurang Penyelidikan & Trend Baharu","Kenal pasti peluang dan arah penyelidikan baharu",[
["Identify Current Research Gaps","What are the current research gaps regarding [TOPIC]?"],
["Detect Emerging Trends","What emerging trends have shaped research on [TOPIC] over the last three years?"],
["Locate Underexplored Areas","Which aspects of [TOPIC] remain underexplored in [CONTEXT OR POPULATION]?"],
["Find Unresolved Challenges","What unresolved challenges are frequently reported in the literature on [TOPIC]?"]]],
["debates","Konsensus Saintifik & Perdebatan","Fahami persetujuan dan percanggahan dalam bukti",[
["Establish Scientific Consensus","What is the current scientific consensus on [TOPIC]?"],
["Identify Conflicting Findings","What conflicting findings have been reported regarding [TOPIC]?"],
["Map Unresolved Debates","What are the major unresolved debates surrounding [TOPIC]?"],
["Explain Divergent Conclusions","Why do studies on [TOPIC] report different conclusions?"]]],
["methods","Kaedah & Reka Bentuk Penyelidikan","Bandingkan cara sesuatu topik dikaji",[
["Review Common Methodologies","What methodologies are most commonly used to investigate [TOPIC]?"],
["Compare Two Methods","How does [METHOD A] compare with [METHOD B] when applied to [TOPIC]?"],
["Identify Methodological Limitations","What methodological limitations are frequently reported in studies of [TOPIC]?"],
["Map Data and Evaluation","Which datasets, instruments or evaluation metrics are commonly used to study [TOPIC]?"]]],
["theory","Teori & Kerangka Konseptual","Bina asas teori yang lebih kukuh",[
["Identify Common Frameworks","What theoretical frameworks are commonly used to explain [TOPIC]?"],
["Review Theory Application","How have researchers applied [THEORY] to investigate [TOPIC]?"],
["Compare Competing Theories","Which theories provide competing explanations for [RESEARCH PROBLEM]?"],
["Find Emerging Frameworks","What conceptual frameworks have recently emerged in research on [TOPIC]?"]]],
["relationships","Hubungan, Pemacu & Hasil","Teroka pengaruh, impak dan faktor penerang",[
["Examine an Impact","What is the impact of [VARIABLE X] on [OUTCOME Y]?"],
["Add a Specific Context","How does [VARIABLE X] influence [OUTCOME Y] in [CONTEXT OR POPULATION]?"],
["Identify Primary Drivers","What are the primary drivers or determinants of [TOPIC]?"],
["Explore Mechanisms","What mediating or moderating variables have been investigated between [VARIABLE X] and [OUTCOME Y]?"]]],
["context","Perbandingan Konteks & Populasi","Uji sama ada dapatan boleh dipindahkan antara persekitaran",[
["Compare Countries or Regions","How do findings on [TOPIC] differ across countries or regions?"],
["Compare Populations","How does [TOPIC] affect different demographic or professional populations?"],
["Identify Contextual Influences","What contextual factors influence the outcomes associated with [TOPIC]?"],
["Locate Underrepresented Contexts","Which geographical or population contexts remain underrepresented in research on [TOPIC]?"]]],
["evolution","Evolusi Penyelidikan & Sumbangan Penting","Jejaki perkembangan bidang dan idea utama",[
["Identify Major Milestones","What are the key milestones and breakthroughs in the development of research on [TOPIC]?"],
["Locate Foundational Contributions","Which foundational studies or contributions have shaped the current understanding of [TOPIC]?"],
["Trace Changes in Research Focus","How has the focus of research on [TOPIC] changed over the last [NUMBER] years?"],
["Explain Turning Points","What scientific, technological or societal developments produced major turning points in research on [TOPIC]?"]]],
["evidence","Kekuatan Bukti & Batasan Penyelidikan","Nilai keyakinan terhadap kesimpulan literatur",[
["Assess the Strength of Evidence","How strong and consistent is the current evidence regarding [CLAIM OR RELATIONSHIP] in [TOPIC]?"],
["Identify Recurring Limitations","What recurring limitations weaken the current body of research on [TOPIC]?"],
["Examine Sources of Bias","What sources of bias or uncertainty are commonly reported in studies of [TOPIC]?"],
["Separate Robust and Tentative Findings","Which findings concerning [TOPIC] appear robust across studies, and which remain tentative or context-dependent?"]]],
["interdisciplinary","Hubungan Antara Disiplin","Temui idea berguna merentasi sempadan disiplin",[
["Map Contributing Disciplines","Which academic disciplines contribute most directly to research on [TOPIC], and what does each contribute?"],
["Find Cross-Disciplinary Concepts","What concepts from other disciplines have been applied to explain or investigate [TOPIC]?"],
["Identify Transferable Methods","Which methods from related disciplines could be relevant to research on [TOPIC]?"],
["Locate Integration Opportunities","What interdisciplinary research opportunities remain underexplored in relation to [TOPIC]?"]]],
["review","Perancangan Sorotan Literatur & Pemilihan Sumber","Tukar penerokaan awal kepada strategi pembacaan",[
["Define Review Subthemes","What major themes and subthemes should be covered in a literature review on [TOPIC]?"],
["Balance Foundational and Recent Evidence","Which foundational contributions and recent research directions should be considered when reviewing [TOPIC]?"],
["Prioritise Evidence for Close Reading","Which types of studies should be prioritised for close reading to understand [TOPIC], and why?"],
["Build a Literature Review Sequence","What logical sequence of themes would support a critical literature review on [TOPIC]?"]]],
["position","Kedudukan Artikel & Kebaharuan","Hubungkan penemuan dengan sumbangan penerbitan",[
["Position the Research Question","How is the proposed research question positioned within the existing literature on [TOPIC]?"],
["Identify Established Knowledge","What established findings should be acknowledged when positioning a study on [TOPIC]?"],
["Build a Defensible Contribution","Which research gaps could support a defensible contribution concerning [TOPIC]?"],
["Challenge the Novelty Claim","What evidence could challenge the claimed novelty of a study on [TOPIC]?"]]]
];const bank=document.querySelector("#scopusPromptBank"),filters=document.querySelector("#scopusPromptFilters"),search=document.querySelector("#scopusPromptSearch"),count=document.querySelector("#scopusPromptCount"),empty=document.querySelector("#scopusPromptEmpty");if(!bank||!filters||!search)return;let active="all",number=0;const safe=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");filters.innerHTML='<button class="active" type="button" data-filter="all">Semua</button>'+categories.map(([key,label])=>`<button type="button" data-filter="${key}">${safe(label)}</button>`).join("");bank.innerHTML=categories.map(([key,label,purpose,prompts],i)=>`<section class="prompt-category" data-group="${key}"><div class="prompt-category-head"><div><span class="kicker">Kategori ${i+1}</span><h3>${safe(label)}</h3></div><p>${safe(purpose)} · 4 prompt</p></div><div class="prompt-bank-grid">${prompts.map(([title,prompt])=>{number++;return `<article class="prompt-bank-card" data-category="${key}" data-search="${safe((label+" "+purpose+" "+title+" "+prompt).toLowerCase())}"><h4>${String(number).padStart(2,"0")} · ${safe(title)}</h4><p>${safe(prompt)}</p><button class="btn btn-secondary btn-small" type="button" data-copy-prompt>Salin prompt</button></article>`}).join("")}</div></section>`).join("");const update=()=>{const term=search.value.trim().toLowerCase();let visible=0;bank.querySelectorAll(".prompt-bank-card").forEach(card=>{const show=(active==="all"||card.dataset.category===active)&&(!term||card.dataset.search.includes(term));card.hidden=!show;if(show)visible++});bank.querySelectorAll(".prompt-category").forEach(group=>group.hidden=![...group.querySelectorAll(".prompt-bank-card")].some(card=>!card.hidden));count.textContent=`${visible} daripada 48 prompt dipaparkan`;empty.hidden=visible!==0};filters.addEventListener("click",e=>{const button=e.target.closest("[data-filter]");if(!button)return;active=button.dataset.filter;filters.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===button));update()});search.addEventListener("input",update);bank.addEventListener("click",async e=>{const button=e.target.closest("[data-copy-prompt]");if(!button)return;const prompt=button.closest(".prompt-bank-card").querySelector("p").textContent;try{await navigator.clipboard.writeText(prompt)}catch(_){const area=document.createElement("textarea");area.value=prompt;document.body.appendChild(area);area.select();document.execCommand("copy");area.remove()}button.textContent="Disalin";setTimeout(()=>button.textContent="Salin prompt",1400)});update()})();
