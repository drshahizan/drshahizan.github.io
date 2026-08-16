(() => {
const categories = [
["infographic","1 · Infographic",[
["Research Article Infographic",`Create a professional research infographic that communicates the central storyline of the supplied article.

Include: 1. Research problem; 2. Specific research gap; 3. Study objective; 4. Methodology; 5. Principal findings; 6. Theoretical contribution; 7. Practical implications; 8. Key limitation.

Use only information supported by the uploaded sources. Prioritise the article’s main argument rather than general background information. Use concise academic English, short labels, clear visual hierarchy and minimal text. Do not invent numerical values, claims or references. Suggested title: “Research at a Glance: Problem, Evidence and Contribution”.`],
["Research Process Infographic",`Create a process infographic showing the complete research methodology described in the uploaded manuscript.

Present the stages in chronological order: Research Design → Population and Sampling → Data Collection → Instrumentation → Data Analysis → Validation → Ethical Considerations → Research Output.

For each stage, include only the most important verified information. Use arrows, numbered stages and concise labels. Clearly distinguish completed procedures from proposed procedures. Do not infer missing methodological details.`],
["Literature-to-Gap Infographic",`Create an academic infographic explaining how the uploaded literature leads to a defensible research gap.

Organise the infographic into five connected sections: 1. What is already established; 2. Areas of agreement; 3. Conflicting or inconsistent findings; 4. Methodological or contextual limitations; 5. The specific unresolved problem addressed by the proposed study.

End with a concise research-gap statement and the proposed contribution. Every point must be traceable to the uploaded sources. Avoid presenting a general lack of studies as sufficient evidence of a research gap.`]
]],
["slides","2 · Slide Deck",[
["Research Article Presentation",`Create a concise academic slide deck for a 10-minute presentation of the supplied research article.

Target audience: Academic researchers and journal reviewers in [FIELD].

Use 10 slides: 1. Title and central message; 2. Research context; 3. Important problem; 4. Evidence-based research gap; 5. Research objective or questions; 6. Methodology; 7. Principal findings; 8. Interpretation of findings; 9. Contribution and implications; 10. Limitations and conclusion.

Use one clear message per slide, concise bullet points and source-grounded evidence. Prioritise diagrams, comparison tables and workflows over long paragraphs. Do not fabricate data or citations.`],
["Manuscript Development Workshop",`Create an instructional slide deck titled “From Research Evidence to a Publishable Article”.

Target audience: Researchers preparing manuscripts for peer-reviewed journals.

Organise the deck into: 1. Establishing article positioning; 2. Building an evidence-based research gap; 3. Developing the article storyline; 4. Aligning the IMRaD sections; 5. Connecting claims with evidence; 6. Demonstrating contribution; 7. Reviewing manuscript quality; 8. Preparing for journal submission.

Use examples from the uploaded sources. Include practical checklists, before-and-after examples and short reflection questions. Keep detailed prompts outside the slides. Use formal, clear and accessible academic English.`],
["Critical Literature Synthesis",`Create a slide deck that presents a critical synthesis of the uploaded articles rather than a paper-by-paper summary.

Include: 1. Scope of the literature; 2. Major research themes; 3. Areas of consensus; 4. Conflicting findings; 5. Differences in methods and contexts; 6. Frequently used theories; 7. Recurring limitations; 8. Evidence quality; 9. Defensible research gaps; 10. Future research directions.

Compare studies across slides using matrices, thematic groupings and evidence patterns. Cite the supporting sources. Do not organise the deck as “Article A, Article B, Article C”.`]
]],
["audio","3 · Audio Overview",[
["Critical Research Discussion",`Create an expert-level audio discussion for researchers preparing a journal article.

Focus on: the central research problem; what the literature has established; areas of disagreement or uncertainty; methodological strengths and weaknesses; the most defensible research gap; and the article’s potential contribution.

Use a critical and analytical tone rather than a general introductory explanation. The two speakers should challenge assumptions, compare evidence and identify claims that still require verification. Conclude with five actions the author should take.`],
["Simulated Reviewer Conversation",`Create a simulated discussion between two experienced journal reviewers evaluating the supplied manuscript.

Reviewer 1 should focus on novelty, theoretical positioning and contribution. Reviewer 2 should focus on methodology, evidence quality, reporting and reproducibility.

The reviewers should identify strengths, major concerns and revisions required before submission. Use a constructive but rigorous tone. Do not introduce criticisms that cannot be connected to the supplied manuscript or journal guidelines.`],
["Author Revision Planning Discussion",`Create an expert audio discussion that helps an author plan revisions to the supplied manuscript after peer review.

Discuss each major reviewer concern, what the reviewer is likely requesting, the evidence or analysis required, the manuscript sections affected, and the risks of an incomplete response. Distinguish essential revisions from optional improvements.

Conclude with a prioritised revision plan and five checks the author should complete before resubmission. Use only the uploaded manuscript, decision letter, reviewer comments and supporting sources.`]
]],
["video","4 · Video Overview",[
["Research Article Explainer",`Create a professional academic video overview explaining the supplied research article to postgraduate researchers.

Use the following narrative: Problem → Current Knowledge → Research Gap → Study Design → Findings → Interpretation → Contribution.

Emphasise the relationship between evidence and claims. Use diagrams, process visuals, comparison tables and short on-screen text. Avoid decorative visuals that do not support understanding. End with three key takeaways and two issues requiring further investigation.`],
["Publication Journey",`Create an instructional video overview titled “The AI-Assisted Publication Journey”.

Explain the workflow: Discover → Synthesise → Position → Develop → Review → Select a Journal → Submit → Respond → Resubmit.

For every stage, explain the researcher’s main task, the evidence required, how AI may provide support and what must be verified by the researcher. Maintain the central message that AI accelerates the process, but researchers remain accountable for scientific accuracy and integrity.`],
["Research Methodology Explainer",`Create a concise academic video overview explaining the methodology of the supplied study to researchers in [FIELD].

Use this sequence: Research Design → Population or Dataset → Sampling → Instruments or Measures → Procedures → Analysis → Validation → Ethics.

Explain why each methodological choice was made, how it supports the research objective, and which limitations affect interpretation. Use only verified manuscript information, show key procedures visually, and flag missing details rather than inferring them.`]
]],
["mindmap","5 · Mind Map",[
["Research Landscape",`Create a mind map of the research landscape represented by the uploaded articles. Place [CENTRAL TOPIC] at the centre.

Create major branches for research themes, theoretical frameworks, methodologies, populations, contexts, principal findings, contradictions, limitations, research gaps and future research directions.

Group related studies under the appropriate branches. Preserve meaningful differences between concepts and avoid creating unsupported relationships.`],
["Article Storyline",`Create a mind map that shows the logical storyline of the supplied manuscript.

Use these primary branches: 1. Central problem; 2. Established knowledge; 3. Specific research gap; 4. Study purpose; 5. Research design; 6. Principal findings; 7. Interpretation; 8. Contribution; 9. Limitations; 10. Implications.

Identify missing connections, duplicated arguments and claims that are not adequately supported by the manuscript.`],
["Reviewer Comments and Revision Plan",`Create a mind map that converts the uploaded editor and reviewer comments into a structured revision plan.

Use primary branches for: novelty and positioning; theory and literature; methodology; analysis and results; discussion and contribution; reporting and presentation; journal requirements; and author verification.

Under each branch, connect the exact concern, required action, evidence needed, affected manuscript section, priority and completion status. Preserve reviewer meaning and do not mark revisions as completed unless they are visible in the revised manuscript.`]
]],
["flashcards","6 · Flashcards",[
["Publication Concepts",`Generate advanced flashcards for researchers learning scientific writing and journal publication.

Cover article positioning, research gaps, novelty, theoretical contribution, methodological contribution, claim–evidence alignment, IMRaD structure, journal fit, editorial screening, reviewer responses and responsible AI use.

Use scenario-based questions where possible. Avoid simple definition-only flashcards. Each answer should be concise, accurate and grounded in the uploaded materials.`],
["Article-Specific Evidence and Findings",`Generate advanced flashcards from the supplied research article to help the author prepare for presentation, viva or peer-review questions.

Cover the research problem, evidence-based gap, objectives, theoretical basis, methodological choices, principal findings, interpretation, contribution, limitations and implications.

Use question-and-answer pairs that test explanation and justification rather than memorisation. Keep every answer traceable to the uploaded article and flag information that the manuscript does not adequately explain.`],
["Journal Submission and Reviewer Response",`Generate scenario-based flashcards for researchers preparing a journal submission or revision.

Cover journal fit, author guidelines, cover letters, disclosure statements, editorial screening, reviewer-comment classification, point-by-point responses, respectful disagreement, revision verification and resubmission checks.

Base the cards on the uploaded journal guidelines and workshop materials. Each answer must state the appropriate action and the reason for it.`]
]],
["quiz","7 · Quiz",[
["Manuscript Quality Review",`Generate a challenging quiz for researchers preparing a manuscript for journal submission.

Include 10 multiple-choice questions, 5 scenario-based questions and 5 true-or-false questions.

Assess the ability to distinguish a topic from a research gap, identify unsupported novelty claims, evaluate article positioning, detect IMRaD misalignment, assess journal fit, recognise fabricated or unverified AI output and select an appropriate reviewer response. Provide the correct answer and a brief source-grounded explanation for every question.`],
["Research Article Comprehension",`Generate a rigorous quiz that assesses understanding of the supplied research article.

Include questions on the problem, gap, objectives, theory, methodology, results, interpretation, contribution, limitations and implications. Use 10 multiple-choice questions and 5 short research scenarios.

Avoid trivial recall. Test whether the learner can connect claims with evidence and recognise interpretations that exceed the findings. Provide the correct answer, source citation and concise explanation for every question.`],
["Reviewer Response Decision-Making",`Generate a scenario-based quiz on responding to the uploaded reviewer comments.

Create 15 scenarios requiring the author to decide whether to revise, clarify, provide additional evidence, conduct further analysis, acknowledge a limitation or disagree respectfully.

For every scenario, provide the best response strategy, a brief justification grounded in the reviewer letter or journal guidelines, and one common response mistake to avoid.`]
]],
["report","8 · Report",[
["Critical Manuscript Review",`Produce a structured pre-submission review of the supplied manuscript.

Evaluate: 1. Article positioning; 2. Novelty; 3. Research-gap evidence; 4. Objective–method–result alignment; 5. Methodological credibility; 6. Claim–evidence consistency; 7. Theoretical contribution; 8. Practical contribution; 9. Reporting completeness; 10. Citation integrity; 11. Ethical considerations; 12. Journal readiness.

For every issue, provide the identified weakness, supporting evidence from the manuscript, its likely editorial consequence, a specific recommended action, and priority: Critical, Major or Minor. Do not rewrite the manuscript unless requested.`],
["Journal Fit and Submission Readiness",`Produce a journal-fit and submission-readiness report using the uploaded manuscript, target journal aims and scope, author guidelines and recent journal articles.

Evaluate topical fit, readership, article type, methodological fit, novelty threshold, contribution, structure, word limits, required declarations, references and supplementary requirements.

Return a fit rating with evidence, desk-rejection risks, missing requirements and a prioritised pre-submission action list. Do not infer journal requirements that are absent from the uploaded sources.`],
["Reviewer Response and Resubmission Audit",`Produce a structured audit of the uploaded reviewer comments, response letter and revised manuscript.

For every reviewer comment, verify whether the response addresses the concern, whether the promised revision appears in the manuscript, whether the stated location is accurate, and whether new claims are supported.

Classify each item as Resolved, Partially Resolved or Unresolved. Identify response–manuscript inconsistencies, revision-created problems and exact actions required before resubmission. Preserve the original reviewer wording.`]
]]];
const bank=document.getElementById("studioPromptBank"),filters=document.getElementById("studioFilters"),search=document.getElementById("studioSearch"),count=document.getElementById("promptCount"),total=document.getElementById("studioTotal"),empty=document.getElementById("promptEmpty"),toast=document.getElementById("copyToast");
let active="all"; const all=categories.flatMap(c=>c[2].map(p=>({category:c[0],label:c[1],title:p[0],text:p[1]})));
total.textContent=`${all.length} copy-ready prompts · ${categories.length} Studio output types`;
filters.innerHTML=`<button class="active" data-filter="all">All Outputs</button>`+categories.map(c=>`<button data-filter="${c[0]}">${c[1].replace(/^\d+ · /,"")}</button>`).join("");
bank.innerHTML=categories.map(c=>`<section class="prompt-category" data-category="${c[0]}"><div class="prompt-category-heading"><div><p class="eyebrow">STUDIO OUTPUT</p><h2>${c[1]}</h2></div><span>${c[2].length} prompt${c[2].length===1?"":"s"}</span></div><div class="prompt-grid">${c[2].map((p,i)=>`<article class="prompt-card" data-search="${(p[0]+" "+p[1]).toLowerCase().replace(/"/g,"&quot;")}"><div class="prompt-meta"><span>${String(i+1).padStart(2,"0")} · ${p[0]}</span><button class="copy-prompt" type="button" data-prompt="${encodeURIComponent(p[1])}"><i data-lucide="copy"></i> Copy</button></div><p>${p[1].split("\n")[0]}</p></article>`).join("")}</div></section>`).join("");
function apply(){const q=search.value.trim().toLowerCase();let shown=0;document.querySelectorAll(".prompt-category").forEach(sec=>{let n=0;sec.querySelectorAll(".prompt-card").forEach(card=>{const ok=(active==="all"||sec.dataset.category===active)&&(!q||card.dataset.search.includes(q));card.hidden=!ok;if(ok){n++;shown++;}});sec.hidden=n===0;});count.textContent=`Showing ${shown} of ${all.length} Studio prompts`;empty.hidden=shown!==0;}
filters.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;active=b.dataset.filter;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));apply();});search.addEventListener("input",apply);
document.addEventListener("click",async e=>{const b=e.target.closest(".copy-prompt");if(!b)return;await navigator.clipboard.writeText(decodeURIComponent(b.dataset.prompt));b.classList.add("copied");b.innerHTML='<i data-lucide="check"></i> Copied';lucide.createIcons();toast.classList.add("visible");setTimeout(()=>{b.classList.remove("copied");b.innerHTML='<i data-lucide="copy"></i> Copy';lucide.createIcons();toast.classList.remove("visible");},1600);});
document.getElementById("copyStudioFormula").addEventListener("click",async()=>{await navigator.clipboard.writeText(document.getElementById("studioFormulaPrompt").textContent);toast.classList.add("visible");setTimeout(()=>toast.classList.remove("visible"),1600);});
apply(); if(window.lucide)lucide.createIcons();
})();
