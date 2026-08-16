document.addEventListener("DOMContentLoaded",()=>{
const form=document.getElementById("studioBuilderForm");if(!form)return;
const preview=document.getElementById("studioBuilderPreview"),copy=document.getElementById("copyStudioBuilderPrompt"),reset=document.getElementById("studioBuilderReset"),toast=document.getElementById("builderToast");let generated="",timer;
const value=id=>document.getElementById(id)?.value.trim()||"";
form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity())return;
generated=`Create a ${value("studioOutput").toLowerCase()} for ${value("studioAudience")} to achieve the following purpose:
${value("studioPurpose")}

Focus on this evidence:
${value("studioEvidence")}

Organise the output into:
${value("studioStructure")}

Use ${value("studioLanguage")} with a ${value("studioStyle").toLowerCase()} style.${value("studioConstraints")?`\n\nAdditional constraints:\n${value("studioConstraints")}`:""}

Use only information supported by the uploaded sources. Preserve uncertainty and cite supporting sources wherever possible. Do not invent facts, findings, references, quotations, methods or numerical values. Clearly flag missing evidence and interpretations that require researcher verification.`;
preview.classList.remove("empty");preview.textContent=generated;copy.disabled=false;preview.scrollIntoView({behavior:"smooth",block:"nearest"});});
copy.addEventListener("click",async()=>{if(!generated)return;try{await navigator.clipboard.writeText(generated)}catch{const a=document.createElement("textarea");a.value=generated;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();document.execCommand("copy");a.remove()}copy.querySelector("span").textContent="Copied";toast.classList.add("visible");clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove("visible"),1700);setTimeout(()=>copy.querySelector("span").textContent="Copy Prompt",1800)});
reset.addEventListener("click",()=>{form.reset();generated="";copy.disabled=true;copy.querySelector("span").textContent="Copy Prompt";preview.classList.add("empty");preview.innerHTML='<div class="empty-state"><i data-lucide="panels-top-left"></i><h3>Your Studio prompt will appear here</h3><p>Complete the required fields, then select <b>Generate Studio Prompt</b>.</p></div>';window.lucide?.createIcons();document.getElementById("studioOutput")?.focus()});
});
