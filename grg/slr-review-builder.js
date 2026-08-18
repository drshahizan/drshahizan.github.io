document.addEventListener("DOMContentLoaded",()=>{
 const form=document.getElementById("slrPromptBuilderForm");if(!form)return;
 const preview=document.getElementById("builderPreview"),copy=document.getElementById("copyBuilderPrompt"),reset=document.getElementById("builderReset"),toast=document.getElementById("builderToast");let generated="",timer;
 const val=id=>document.getElementById(id)?.value.trim()||"Not supplied";
 form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;const criteria=[...form.querySelectorAll('input[name="criteria"]:checked')].map((x,i)=>`${i+1}. ${x.value}`).join("\n");if(!criteria){alert("Select at least one review criterion.");return}
 generated=`ROLE
Act as a ${val("reviewRole")} with extensive experience evaluating systematic literature reviews for peer-reviewed Web of Science journals. Conduct a ${val("reviewDepth").toLowerCase()} of the uploaded article. Be rigorous, constructive and evidence-based; do not merely correct grammar.

MANUSCRIPT PROFILE
- Article type: Systematic Literature Review
- Title or topic: ${val("researchTopic")}
- Field: ${val("researchField")}
- Target journal: ${val("targetJournal")}
- Review framework: ${val("reviewFramework")}

REVIEW MATERIAL
Evaluate the complete systematic literature review article uploaded by the user. Before reviewing, confirm that the uploaded article is readable and complete. Read all available sections, tables, figures, appendices, supplementary content and references. If the article is unavailable, incomplete or unreadable, stop and request a usable copy. Do not infer omitted content.

REVIEW CRITERIA
${criteria}

REVIEW PROCEDURE
1. Read the complete uploaded article before reaching any conclusion.
2. Establish the central question, scope, claimed gap, novelty and contribution.
3. Evaluate compliance with ${val("reviewFramework")} while distinguishing reporting compliance from methodological quality.
4. Reconstruct the review workflow: eligibility → search → deduplication → screening → extraction → appraisal → synthesis → reporting.
5. Test whether databases, search strings, dates, filters and screening decisions are transparent and reproducible.
6. Check numerical consistency across the abstract, main text, PRISMA flow diagram, tables and appendices.
7. Trace major findings and claims to the studies cited within the uploaded article; flag citations that cannot be verified from the available content.
8. Distinguish methodological defects from incomplete reporting.
9. Identify weaknesses likely to cause desk rejection, rejection or major revision.
10. Rank corrective actions and issue a justified editorial recommendation.

ISSUE REPORTING RULE
For every issue, provide: criterion; severity (${val("severity")}); exact page, section, table or figure; quoted or closely paraphrased manuscript evidence; explanation; likely editorial consequence; and a specific corrective action. Clearly label any item that cannot be verified from the uploaded article.

REQUIRED OUTPUT
Produce the final result in ${val("outputLanguage")} as a professionally structured ${val("outputFormat")}. If Microsoft Word is selected, generate a downloadable .docx file rather than displaying only chat text.

COVER PAGE
Include: “Systematic Literature Review — Journal Review Report”; manuscript title; target journal; research field; selected reviewer perspective; review framework; review date; evaluator role; confidentiality notice; and “AI-Assisted Review — Researcher Verification Required”.

REPORT STRUCTURE
1. Executive summary
2. Uploaded-article completeness check
3. Overall evaluation scorecard
4. Principal strengths
5. Desk-rejection and publication risks
6. Novelty, gap and contribution assessment
7. PRISMA and reporting-guideline assessment
8. Search-strategy reproducibility audit
9. Screening, extraction, quality-appraisal and synthesis review
10. Results, tables, figures and traceability review
11. Discussion, limitations, implications and conclusion review
12. Citation and reference-integrity audit
13. Major issues
14. Minor issues
15. Prioritised revision roadmap
16. Final recommendation using: ${val("decisionScale")}
17. Verification limitations and items requiring author confirmation

ADDITIONAL REQUIREMENTS
${val("constraints")}

NON-NEGOTIABLE CONSTRAINTS
- Base the evaluation on the uploaded SLR article and clearly identified reporting standards.
- Do not invent studies, references, quotations, numerical values, journal policies, search procedures or methodological details.
- Do not assume that PRISMA compliance guarantees methodological quality.
- Do not treat a general lack of studies as a sufficient research gap.
- Preserve uncertainty and distinguish missing reporting from absent procedures.
- Do not rewrite the manuscript unless specifically requested.
- The researcher must verify the final report before acting on it.`;
 preview.classList.remove("empty");preview.textContent=generated;copy.disabled=false;preview.scrollIntoView({behavior:"smooth",block:"nearest"})});
 copy.addEventListener("click",async()=>{if(!generated)return;try{await navigator.clipboard.writeText(generated)}catch{const a=document.createElement("textarea");a.value=generated;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();document.execCommand("copy");a.remove()}copy.querySelector("span").textContent="Copied";toast?.classList.add("visible");clearTimeout(timer);timer=setTimeout(()=>toast?.classList.remove("visible"),1700);setTimeout(()=>copy.querySelector("span").textContent="Copy Prompt",1800)});
 reset.addEventListener("click",()=>{form.reset();generated="";copy.disabled=true;copy.querySelector("span").textContent="Copy Prompt";preview.classList.add("empty");preview.innerHTML='<div class="empty-state"><i data-lucide="file-search-2"></i><h3>Your SLR review prompt will appear here</h3><p>Upload the SLR article, choose the review criteria, then generate and copy the prompt.</p></div>';window.lucide?.createIcons();document.getElementById("reviewRole")?.focus()});
});
