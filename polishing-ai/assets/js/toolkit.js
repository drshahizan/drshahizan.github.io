/* Interactive toolkit: prompt builder, language checker, disclosure generator, reference checker */
(function () {
  "use strict";
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function words(s) { var m = s.trim().match(/\S+/g); return m ? m.length : 0; }

  /* =========================================================
     PROMPT BUILDER
     ========================================================= */
  var pbForm = $("pb-form");
  if (pbForm) {
    var T = {
      polish: function (d) {
        return [
          "Act as an academic editor for a Q1 journal in " + d.field + ".",
          "Improve the clarity, grammar and flow of the paragraph below for " + d.journal + ".",
          "", "Rules:"].concat(d.rules).concat([
          "",
          "Return: (1) the revised paragraph" + (d.explain ? ", (2) a table listing each change and why." : "."),
          "", "Paragraph:", d.text]);
      },
      translate: function (d) {
        return [
          "Act as a bilingual academic editor in " + d.field + ".",
          "The text below is my draft in " + d.lang + ". Translate it into clear academic " + d.variant + " English suitable for " + d.journal + ".",
          "", "Rules:", "- Translate the meaning faithfully; do not summarise or omit content."].concat(d.rules).concat([
          "- Mark any term where the English equivalent is uncertain with [CHECK].",
          "",
          "Return: (1) the English text" + (d.explain ? ", (2) a list of terms you were unsure about and the options you considered." : "."),
          "", "Draft (" + d.lang + "):", d.text]);
      },
      abstract: function (d) {
        return [
          "Act as the handling editor of " + d.journal + ", a journal in " + d.field + ".",
          "Review my abstract against this structure: background, aim, method, key findings, contribution.",
          "1. Identify any missing or weak element.",
          "2. Suggest a revised abstract" + (d.limit ? " within " + d.limit + " words" : "") + ".",
          "3. Use only the information in my text; do not invent results or numbers."].concat(d.rules.length ? ["", "Rules:"].concat(d.rules) : []).concat([
          "", "Abstract:", d.text]);
      },
      titles: function (d) {
        return [
          "Suggest 8 alternative titles for the article summarised below, for " + d.journal + " (" + d.field + ").",
          "Mix styles: descriptive, question-based and finding-led.",
          "Each title must be under " + (d.limit || "[N]") + " words and contain the key terms readers would search for.",
          "Do not promise more than the study shows.",
          "After the list, recommend the 2 strongest titles and explain why.",
          "", "Summary or abstract:", d.text];
      },
      gap: function (d) {
        return [
          "Act as a reviewer for " + d.journal + " in " + d.field + ". Read my introduction and answer:",
          "1. What research gap does it claim? Quote the sentence.",
          "2. Is the gap supported by cited literature, or only asserted?",
          "3. Are the objectives and contributions stated explicitly?",
          "Then suggest how to restructure the final two paragraphs so the gap leads directly to the objectives."].concat(d.rules.length ? ["", "Rules:"].concat(d.rules) : []).concat([
          "", "Introduction:", d.text]);
      },
      synthesis: function (d) {
        return [
          "The paragraph below summarises studies one by one.",
          "Rewrite it as a synthesis organised by theme or argument, not by author, in academic " + d.variant + " English for " + d.journal + ".",
          "Keep every citation exactly as given and do not add new sources.",
          "Point out where the studies agree, where they disagree, and what remains unknown."].concat(d.rules.length ? ["", "Rules:"].concat(d.rules) : []).concat([
          "", "Paragraph:", d.text]);
      },
      hedging: function (d) {
        return [
          "Identify every sentence in the text below that makes a claim stronger than the evidence supports (for example: proves, clearly shows, always, demonstrates, causes).",
          "For each, quote it and suggest a more appropriately hedged version.",
          "Do not change sentences that are already appropriately cautious.",
          "Do not weaken statements that report results factually (for example, descriptive statistics).",
          "", "Text:", d.text];
      },
      aistyle: function (d) {
        return [
          "Review the text below for wording that sounds generic or machine-generated: overused words (such as delve, pivotal, intricate, underscore), filler transitions, inflated adjectives and repetitive sentence openings.",
          "List each instance with a plainer, more precise alternative.",
          "Keep my sentence structure and technical terms. Use " + d.variant + " English.",
          "", "Text:", d.text];
      },
      alignment: function (d) {
        return [
          "Below are my research objectives, research questions, main findings and conclusion.",
          "Build a table that maps each objective to its research question, finding and conclusion.",
          "Flag any objective without a finding, any finding without an objective, and any conclusion not supported by the findings.",
          "Do not rewrite the text; only analyse it.",
          "", d.text];
      },
      outline: function (d) {
        return [
          "Summarise each paragraph of the text below in one sentence, numbered.",
          "Then tell me:",
          "- which paragraphs repeat the same point,",
          "- where the logical flow breaks,",
          "- which paragraph could be cut with the least loss,",
          "- what order would make the argument easiest to follow.",
          "", "Text:", d.text];
      },
      discussion: function (d) {
        return [
          "Act as a reviewer for " + d.journal + " in " + d.field + ". Read my discussion section and tell me:",
          "1. Which paragraphs only repeat the results instead of interpreting them?",
          "2. Where are the findings compared with previous studies, and where is that comparison missing?",
          "3. Does the text answer “so what?” for theory and for practice? Quote the sentences that do.",
          "4. Which claims go beyond the data?",
          "Then suggest a paragraph-by-paragraph plan to strengthen it."].concat(d.rules.length ? ["", "Rules:"].concat(d.rules) : []).concat([
          "", "Discussion:", d.text]);
      },
      reviewer: function (d) {
        return [
          "Act as a critical but fair reviewer for " + d.journal + ", a Q1 journal in " + d.field + ".",
          "Evaluate the manuscript summary below on: novelty, theoretical contribution, methodological rigour, clarity and fit with the journal scope.",
          "Give: (1) major concerns, (2) minor concerns, (3) the questions an editor is most likely to ask, (4) a likely recommendation (accept / minor / major / reject) with justification.",
          "Be specific and quote the text you are commenting on.",
          "", "Summary (abstract, key method and key findings):", d.text];
      },
      response: function (d) {
        return [
          "Help me draft a point-by-point response to the reviewer comment below for " + d.journal + ".",
          "Tone: respectful, concise and confident. Use " + d.variant + " English.",
          "Structure: thank the reviewer, state what was changed (with [page X, lines Y–Z] placeholders), and explain briefly.",
          "If I disagree, phrase it politely and support it with evidence. Do not promise analyses I have not done.",
          "", "Reviewer comment:", d.text, "", "My planned change or position:", d.plan];
      },
      cover: function (d) {
        return [
          "Draft a cover letter to the editor of " + d.journal + " for my manuscript.",
          "Include: the problem addressed, the main contribution in two sentences, why it fits the journal's scope, and confirmation that the work is original and not under review elsewhere.",
          "Maximum 250 words. Avoid exaggerated language. Use " + d.variant + " English.",
          "Leave [EDITOR NAME] and [MANUSCRIPT TITLE] as placeholders.",
          "", "Abstract:", d.text];
      }
    };

    function readPB() {
      var f = pbForm;
      var d = {
        task: f.task.value,
        field: f.field.value.trim() || "[FIELD]",
        journal: f.journal.value.trim() || "[JOURNAL NAME]",
        variant: f.variant.value,
        limit: f.limit.value.trim(),
        lang: f.lang.value,
        plan: f.plan.value.trim() || "[DESCRIBE YOUR CHANGE OR POSITION]",
        text: f.text.value.trim() || "[PASTE TEXT HERE]",
        explain: f.explain.checked
      };
      var r = [];
      if (f.keepMeaning.checked) r.push("- Do not change the meaning or add new claims, data or results.");
      if (f.noCitations.checked) r.push("- Do not add, remove or invent citations.");
      if (f.keepTerms.checked) r.push("- Keep technical terms and construct names exactly as written.");
      if (f.voice.checked) r.push("- Keep my sentence structure and voice where possible; change only what improves clarity.");
      if (f.flag.checked) r.push("- If something is unclear or ambiguous, flag it with [CHECK] instead of guessing.");
      r.push("- Use " + d.variant + " English spelling.");
      if (d.limit && (d.task === "polish" || d.task === "translate")) r.push("- Keep the result within " + d.limit + " words.");
      d.rules = r;
      return d;
    }
    function renderPB() {
      var d = readPB();
      document.querySelectorAll("[data-show]").forEach(function (el) { el.hidden = el.dataset.show !== d.task; });
      $("pb-out").textContent = T[d.task](d).join("\n");
    }
    pbForm.addEventListener("input", renderPB);
    pbForm.addEventListener("change", renderPB);
    renderPB();
  }

  /* =========================================================
     LANGUAGE CHECKER
     ========================================================= */
  var ckText = $("ck-text");
  if (ckText) {
    var AI = {
      "delve": "examine, explore", "delves": "examines", "delving": "examining",
      "tapestry": "range, mix", "pivotal": "key, central", "intricate": "complex, detailed",
      "underscore": "show, highlight", "underscores": "shows", "underscoring": "showing",
      "showcase": "show", "showcases": "shows", "meticulous": "careful", "meticulously": "carefully",
      "realm": "field, area", "landscape": "field, context", "navigate": "manage, address", "navigating": "managing",
      "foster": "encourage, support", "fostering": "supporting", "leverage": "use", "leveraging": "using", "leverages": "uses",
      "utilize": "use", "utilise": "use", "utilization": "use", "utilisation": "use",
      "seamless": "smooth", "seamlessly": "smoothly", "paramount": "essential", "multifaceted": "complex",
      "holistic": "comprehensive", "groundbreaking": "new", "transformative": "substantial", "unprecedented": "new, unusual",
      "elevate": "improve", "harness": "use", "harnessing": "using", "embark": "begin", "endeavour": "effort", "endeavor": "effort",
      "testament": "evidence", "plethora": "many", "myriad": "many", "garnered": "received", "bolster": "strengthen",
      "spearhead": "lead", "commendable": "(remove or be specific)", "noteworthy": "notable", "nuanced": "detailed",
      "crucial": "important", "vital": "important", "robust": "reliable, strong", "comprehensive": "(be specific)",
      "innovative": "new", "cutting-edge": "recent", "ever-evolving": "changing", "intricacies": "details"
    };
    var LEFTOVER = ["as an ai language model", "regenerate response", "certainly, here is", "certainly! here is", "i hope this helps", "as of my last knowledge update", "here is a revised version", "i cannot browse", "sure, here"];
    var FILLER = ["it is worth noting that", "it is important to note that", "it should be noted that", "in today's world", "in today’s world", "in today's fast-paced", "in the ever-evolving", "plays a crucial role", "plays a pivotal role", "plays a vital role", "a testament to", "shed light on", "sheds light on", "pave the way", "paves the way", "a deeper understanding", "the intricate interplay", "in the realm of", "serves as a", "a wide range of", "in order to", "due to the fact that", "at the end of the day", "first and foremost", "last but not least"];
    var CLAIM = { "prove": "suggest, indicate", "proves": "suggests", "proved": "indicated", "proven": "shown", "undoubtedly": "(remove)", "clearly": "(remove or hedge)", "obviously": "(remove)", "always": "often, generally", "never": "rarely", "definitively": "(hedge)", "conclusively": "(hedge)", "unequivocally": "(hedge)", "certainly": "likely", "perfectly": "(be specific)", "completely": "(be specific)", "confirms": "supports", "confirm": "support", "guarantees": "is associated with" };
    var UK = ["analys", "organis", "optimis", "utilis", "emphasis", "recognis", "minimis", "maximis", "characteris", "summaris", "prioritis", "generalis", "conceptualis", "standardis", "visualis", "behaviour", "colour", "favour", "centre", "modelling", "labelled", "travelled", "defence", "catalogue"];
    var US = ["analyz", "organiz", "optimiz", "utiliz", "emphasiz", "recogniz", "minimiz", "maximiz", "characteriz", "summariz", "prioritiz", "generaliz", "conceptualiz", "standardiz", "visualiz", "behavior", "color", "favor", "center", "modeling", "labeled", "traveled", "defense", "catalog"];

    function spellingHits(text) {
      var uk = [], us = [];
      (text.match(/[A-Za-z]+/g) || []).forEach(function (w) {
        var l = w.toLowerCase();
        for (var i = 0; i < UK.length; i++) {
          if (l.indexOf(UK[i]) === 0 && !(UK[i] === "emphasis" && (l === "emphasis" || l === "emphases"))) { uk.push(w); break; }
          if (l.indexOf(US[i]) === 0) { us.push(w); break; }
        }
      });
      return { uk: uk, us: us };
    }
    function sentences(text) {
      return text.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+(?=[A-Z“"(])/).filter(function (s) { return s.length > 1; });
    }
    function analyse() {
      var text = ckText.value;
      var stats = $("ck-stats"), view = $("ck-view"), list = $("ck-list"), legend = $("ck-legend");
      if (!text.trim()) { stats.innerHTML = ""; view.hidden = true; legend.hidden = true; list.innerHTML = ""; return; }
      var wc = words(text), cc = text.trim().length;
      var sents = sentences(text);
      var avg = sents.length ? Math.round(wc / sents.length) : 0;
      var long = sents.filter(function (s) { return words(s) > 35; });

      // limit
      var sel = $("ck-preset"), custom = $("ck-custom").value.trim();
      var limit = custom ? +custom : (sel.value ? +sel.value : 0);
      var chars = !custom && sel.options[sel.selectedIndex].dataset.chars === "1";
      var used = chars ? cc : wc, unit = chars ? "characters" : "words";
      var limitHTML = "";
      if (limit) {
        var over = used - limit;
        limitHTML = '<div class="stat ' + (over > 0 ? "bad" : "ok") + '"><b>' + used + " / " + limit + "</b><span>" + unit + (over > 0 ? " · " + over + " over" : " · " + (-over) + " to spare") + '</span><div class="bar"><span style="width:' + Math.min(100, used / limit * 100) + '%"></span></div></div>';
      }

      // findings
      var found = { leftover: [], ai: [], filler: [], claim: [] };
      var lower = text.toLowerCase();
      LEFTOVER.forEach(function (p) { if (lower.indexOf(p) !== -1) found.leftover.push(p); });
      FILLER.forEach(function (p) { if (lower.indexOf(p) !== -1) found.filler.push(p); });
      var counts = {};
      (lower.match(/[a-z’'-]+/g) || []).forEach(function (w) {
        if (AI[w]) { counts[w] = (counts[w] || 0) + 1; }
        if (CLAIM[w]) { found.claim.push(w); }
      });
      Object.keys(counts).forEach(function (w) { found.ai.push(w + (counts[w] > 1 ? " ×" + counts[w] : "")); });
      var sp = spellingHits(text);
      var mixed = sp.uk.length && sp.us.length;

      // openings
      var opens = {};
      sents.forEach(function (s) { var f = (s.match(/^[“"(]?([A-Za-z]+)/) || [])[1]; if (f) { f = f.toLowerCase(); opens[f] = (opens[f] || 0) + 1; } });
      var repeated = Object.keys(opens).filter(function (k) { return opens[k] >= 3 && ["the"].indexOf(k) === -1; });
      var trans = ["moreover", "furthermore", "additionally", "however", "notably", "importantly"].filter(function (k) { return (opens[k] || 0) >= 2; });

      stats.innerHTML =
        '<div class="stat"><b>' + wc + '</b><span>words</span></div>' +
        '<div class="stat"><b>' + sents.length + '</b><span>sentences</span></div>' +
        '<div class="stat ' + (avg > 28 ? "warn" : "") + '"><b>' + avg + '</b><span>words per sentence</span></div>' +
        '<div class="stat ' + (long.length ? "warn" : "") + '"><b>' + long.length + '</b><span>sentences over 35 words</span></div>' +
        limitHTML;

      // highlighted view
      var html = esc(text);
      function wrapPhrase(list, cls, tip) {
        list.forEach(function (p) {
          var re = new RegExp("(" + p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "['’]") + ")", "gi");
          html = html.replace(re, '<mark class="' + cls + '" title="' + esc(tip(p)) + '">$1</mark>');
        });
      }
      wrapPhrase(LEFTOVER.filter(function (p) { return lower.indexOf(p) !== -1; }), "m-leftover", function () { return "Leftover from an AI chat. Remove it."; });
      wrapPhrase(FILLER.filter(function (p) { return lower.indexOf(p) !== -1; }), "m-filler", function () { return "Filler. Cut it or say it directly."; });
      html = html.replace(/(^|[^\w>-])([A-Za-z][A-Za-z’'-]*)(?=[^\w<]|$)/g, function (m, pre, w) {
        var l = w.toLowerCase();
        if (AI[l]) return pre + '<mark class="m-ai" title="Try: ' + esc(AI[l]) + '">' + w + "</mark>";
        if (CLAIM[l]) return pre + '<mark class="m-claim" title="Overclaiming? Try: ' + esc(CLAIM[l]) + '">' + w + "</mark>";
        if (mixed && (sp.uk.indexOf(w) !== -1 || sp.us.indexOf(w) !== -1)) return pre + '<mark class="m-spell" title="' + (sp.uk.indexOf(w) !== -1 ? "British" : "American") + ' spelling. Your text mixes both.">' + w + "</mark>";
        return m;
      });
      // long sentences
      long.forEach(function (s) {
        var key = esc(s.slice(0, 40));
        var i = html.indexOf(key);
        if (i !== -1) html = html.slice(0, i) + '<span class="m-long" title="' + words(s) + ' words">' + html.slice(i);
        var endKey = esc(s.slice(-25)), j = html.indexOf(endKey, i);
        if (i !== -1 && j !== -1) { j += endKey.length; html = html.slice(0, j) + "</span>" + html.slice(j); }
      });
      view.innerHTML = html.replace(/\n/g, "<br>");
      view.hidden = false; legend.hidden = false;

      var items = [];
      if (found.leftover.length) items.push(["bad", "Prompt leftovers found", "Remove: " + found.leftover.join("; ") + ". Leftovers like these have led to retractions."]);
      if (found.ai.length) items.push(["warn", found.ai.length + " AI-sounding word" + (found.ai.length > 1 ? "s" : ""), found.ai.join(", ") + ". Hover over each highlight for plainer options."]);
      if (found.filler.length) items.push(["warn", "Filler phrases", found.filler.join("; ")]);
      if (found.claim.length) items.push(["warn", "Possible overclaiming", found.claim.join(", ") + ". Check that each claim matches the strength of your evidence."]);
      if (mixed) items.push(["warn", "Mixed British and American spelling", "British: " + sp.uk.join(", ") + ". American: " + sp.us.join(", ") + "."]);
      if (repeated.length) items.push(["warn", "Repeated sentence openings", repeated.map(function (k) { return "“" + k + "” ×" + opens[k]; }).join(", ")]);
      if (trans.length) items.push(["warn", "Stacked transitions", trans.map(function (k) { return "“" + k + "” ×" + opens[k]; }).join(", ") + ". Use transitions only where the logic needs them."]);
      if (long.length) items.push(["warn", "Long sentences", long.length + " sentence" + (long.length > 1 ? "s are" : " is") + " over 35 words (underlined). Consider splitting."]);
      if (!items.length) items.push(["ok", "Nothing flagged", "No common problem patterns found. A careful human read is still the final check."]);
      list.innerHTML = '<ul class="findings">' + items.map(function (it) { return '<li class="' + it[0] + '"><b>' + esc(it[1]) + "</b><span>" + esc(it[2]) + "</span></li>"; }).join("") + "</ul>";
    }
    ["input", "change"].forEach(function (ev) {
      ckText.addEventListener(ev, analyse); $("ck-preset").addEventListener(ev, analyse); $("ck-custom").addEventListener(ev, analyse);
    });
    analyse();
  }

  /* =========================================================
     DISCLOSURE GENERATOR
     ========================================================= */
  var dsForm = $("ds-form");
  if (dsForm) {
    var PURP = {
      language: "improve the language and readability of the manuscript",
      grammar: "check grammar, spelling and punctuation",
      translate: "translate text originally written in {LANG} into English",
      restructure: "restructure and shorten selected paragraphs",
      titles: "suggest alternative titles and keywords",
      literature: "help find and organise relevant literature",
      draft: "help draft parts of the text",
      code: "generate or edit code used in the analysis",
      figures: "create illustrative figures or diagrams"
    };
    var WHERE = {
      elsevier: "<b>Where:</b> in a separate section at the end of the manuscript, just before the references, headed “Declaration of generative AI and AI-assisted technologies in the writing process”. Basic grammar, spelling and punctuation checks need no declaration.",
      springer: "<b>Where:</b> in the Methods section, or an equivalent section if your article has no Methods. Springer Nature's guidance on whether AI-assisted copy editing must be declared is not consistent across its pages, so check the journal's instructions or ask the editor.",
      wiley: "<b>Where:</b> describe it transparently in the Methods section (or a disclosure or Acknowledgements section), and declare it at submission. Tools used only for grammar and general editing fall outside Wiley's disclosure requirement.",
      tandf: "<b>Where:</b> as a specific AI-use disclosure statement in the article. Taylor &amp; Francis asks for the full name of the tool with its version number, how it was used and why. Some journals limit AI use to language improvement only.",
      ieee: "<b>Where:</b> in the Acknowledgments section. Name the AI system, identify the sections where it was used and briefly describe the level of use. For editing and grammar only, IEEE says disclosure is recommended.",
      mdpi: "<b>Where:</b> name the tool in the Acknowledgments section and explain how it was used in the Materials and Methods section (or equivalent).",
      sage: "<b>Where:</b> disclose AI-generated content when you submit. SAGE does not require you to disclose assistive tools that only improve language, grammar or structure.",
      emerald: "<b>Where:</b> in the Methods and Acknowledgements sections, or another appropriate section, flagged clearly and transparently.",
      other: "<b>Where:</b> follow the journal's Guide for Authors. If it gives no guidance, the Acknowledgements section, or the Methods section for empirical work, is the usual place."
    };
    function warnings(pub, p) {
      var w = [];
      if (p.indexOf("draft") !== -1 && pub === "emerald") w.push("Emerald does not permit using generative AI to create or draft any part of a submission. Remove this use or rewrite that text yourself.");
      if (p.indexOf("draft") !== -1 && (pub === "elsevier" || pub === "springer")) w.push("This publisher's guidance limits AI in writing mainly to improving readability and language. Check that your use is allowed before submitting.");
      if (p.indexOf("figures") !== -1 && (pub === "elsevier" || pub === "springer")) w.push("This publisher generally does not permit generative AI to create or alter images in submitted manuscripts. Check the exceptions in the policy.");
      if (p.indexOf("figures") !== -1 && pub === "tandf") w.push("Taylor &amp; Francis permits AI for conceptual illustrations and data visualisations, but not for creating or manipulating research outputs such as diagnostic images.");
      if (p.indexOf("literature") !== -1) w.push("If AI helped find literature, state that you verified every reference against the original source.");
      if (p.length === 1 && p[0] === "grammar" && ["elsevier", "wiley", "sage", "mdpi"].indexOf(pub) !== -1) w.push("Grammar, spelling and punctuation checks alone usually do not need a declaration for this publisher. Including one is still acceptable.");
      return w;
    }
    function list(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]; }
    function renderDS() {
      var f = dsForm, pub = f.pub.value;
      var tool = (f.tool.value.trim() || "[TOOL]") + (f.ver.value.trim() ? " (" + f.ver.value.trim() + ")" : "");
      var p = Array.prototype.slice.call(f.querySelectorAll('input[name="purpose"]:checked')).map(function (c) { return c.value; });
      document.querySelectorAll("[data-when]").forEach(function (el) { el.hidden = p.indexOf(el.dataset.when) === -1; });
      var reasons = p.map(function (k) { return PURP[k].replace("{LANG}", f.lang.value.trim() || "[LANGUAGE]"); });
      var we = f.who.value === "we";
      var A = we ? "the authors" : "the author", Ac = we ? "The authors" : "The author", S = f.sections.value.trim();
      var reason = reasons.length ? list(reasons) : "[PURPOSE]";
      var txt;
      if (pub === "elsevier") {
        txt = "Declaration of generative AI and AI-assisted technologies in the writing process\n\nDuring the preparation of this work " + A + " used " + tool + " in order to " + reason + (S ? " in the " + S : "") + ". After using this tool, " + A + " reviewed and edited the content as needed and take" + (we ? "" : "s") + " full responsibility for the content of the published article.";
      } else if (pub === "ieee") {
        txt = Ac + " used " + tool + " to " + reason + (S ? " in the following sections: " + S : "") + ". The tool was used at the level of [e.g., sentence-level language editing]. All AI-assisted text was reviewed and revised by " + A + ", who take" + (we ? "" : "s") + " full responsibility for the content.";
      } else {
        txt = (pub === "tandf" ? "AI-use disclosure: " : "") + Ac + " used " + tool + " to " + reason + (S ? " in the " + S : "") + ". " + (we ? "We" : "I") + " reviewed, edited and verified all output, including any references, and take full responsibility for the content of this article. No AI tool was used to generate, alter or analyse research data or results.";
      }
      $("ds-out").textContent = txt;
      $("ds-where").innerHTML = WHERE[pub];
      var w = warnings(pub, p);
      $("ds-warn").innerHTML = w.length ? '<ul class="findings">' + w.map(function (x) { return '<li class="warn"><b>Check</b><span>' + x + "</span></li>"; }).join("") + "</ul>" : "";
    }
    dsForm.addEventListener("input", renderDS);
    dsForm.addEventListener("change", renderDS);
    renderDS();
  }

  /* =========================================================
     REFERENCE (DOI) CHECKER
     ========================================================= */
  var dcForm = $("dc-form");
  if (dcForm) {
    var SAMPLE = [
      "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539",
      "Smith, J. A., & Lee, K. (2022). Deep learning approaches for automated academic writing assessment. Nature, 521(7553), 436–444. https://doi.org/10.1038/nature14539",
      "Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. Qualitative Research in Psychology, 3(2), 77–101. https://doi.org/10.1191/1478088706qp063oa",
      "Walters, W. H., & Wilder, E. I. (2023). Fabrication and errors in the bibliographic citations generated by ChatGPT. Scientific Reports, 13, 14045. https://doi.org/10.1038/s41598-023-41032-5",
      "Rahman, M., Nguyen, T. H., & Ibrahim, S. (2024). Large language models as co-authors: A systematic review of retracted papers. Journal of Academic Integrity and Artificial Intelligence, 3(1), 45–67."
    ];
    $("dc-sample").addEventListener("click", function () { $("dc-text").value = SAMPLE.join("\n"); });
    function toks(s) { return (s.toLowerCase().match(/[a-z0-9]{4,}/g) || []); }
    function overlap(title, line) {
      var t = toks(title); if (!t.length) return 0;
      var l = line.toLowerCase(), hit = 0;
      t.forEach(function (w) { if (l.indexOf(w) !== -1) hit++; });
      return hit / t.length;
    }
    function getJSON(url) { return fetch(url, { headers: { Accept: "application/json" } }).then(function (r) { if (!r.ok) { var e = new Error(r.status); e.status = r.status; throw e; } return r.json(); }); }
    function crossrefDOI(doi) {
      return getJSON("https://api.crossref.org/works/" + encodeURIComponent(doi)).then(function (j) {
        var m = j.message;
        return { src: "Crossref", title: (m.title || [""])[0], journal: (m["container-title"] || [""])[0], year: ((m.issued || {})["date-parts"] || [[""]])[0][0], authors: (m.author || []).slice(0, 3).map(function (a) { return a.family || a.name || ""; }).join(", ") };
      });
    }
    function dataciteDOI(doi) {
      return getJSON("https://api.datacite.org/dois/" + encodeURIComponent(doi)).then(function (j) {
        var a = j.data.attributes;
        return { src: "DataCite", title: ((a.titles || [])[0] || {}).title || "", journal: a.publisher && (a.publisher.name || a.publisher) || "", year: a.publicationYear || "", authors: (a.creators || []).slice(0, 3).map(function (c) { return c.familyName || c.name || ""; }).join(", ") };
      });
    }
    function searchRef(line) {
      return getJSON("https://api.crossref.org/works?rows=1&query.bibliographic=" + encodeURIComponent(line.slice(0, 300))).then(function (j) {
        var m = (j.message.items || [])[0]; if (!m) return null;
        return { src: "Crossref search", doi: m.DOI, title: (m.title || [""])[0], journal: (m["container-title"] || [""])[0], year: ((m.issued || {})["date-parts"] || [[""]])[0][0], authors: (m.author || []).slice(0, 3).map(function (a) { return a.family || ""; }).join(", ") };
      });
    }
    function rec(r) {
      return "<b>" + esc(r.title || "(no title)") + "</b><br><span class=\"muted\">" + esc([r.authors, r.journal, r.year].filter(Boolean).join(" · ")) + (r.doi ? "<br>DOI " + esc(r.doi) : "") + "</span>";
    }
    function badge(kind, text) { return '<span class="result ' + kind + '">' + text + "</span>"; }
    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

    dcForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var lines = $("dc-text").value.split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 40);
      var tbody = $("dc-rows"); tbody.innerHTML = "";
      if (!lines.length) { $("dc-status").textContent = "Paste at least one reference."; return; }
      $("dc-wrap").hidden = false; $("dc-run").disabled = true;
      var counts = { ok: 0, bad: 0, warn: 0 };
      var chain = Promise.resolve();
      lines.forEach(function (line, i) {
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + (i + 1) + "</td><td>" + esc(line) + '</td><td class="muted">Checking…</td><td></td>';
        tbody.appendChild(tr);
        chain = chain.then(function () {
          $("dc-status").textContent = "Checking " + (i + 1) + " of " + lines.length + "…";
          var m = line.match(/10\.\d{4,9}\/[^\s"<>]+/i);
          var cells = tr.children;
          if (m) {
            var doi = m[0].replace(/[.,;)\]]+$/, "");
            return crossrefDOI(doi).catch(function (e) { if (e.status === 404) return dataciteDOI(doi); throw e; }).then(function (r) {
              var ov = overlap(r.title, line);
              cells[2].innerHTML = rec(r);
              if (ov >= 0.6) { cells[3].innerHTML = badge("ok", "DOI matches"); counts.ok++; }
              else { cells[3].innerHTML = badge("bad", "DOI belongs to a different work"); counts.bad++; }
            }).catch(function (e) {
              if (e.status === 404) { cells[2].textContent = "No record for DOI " + doi + " in Crossref or DataCite."; cells[3].innerHTML = badge("bad", "DOI not found"); counts.bad++; }
              else { cells[2].textContent = "Could not reach the registry. Check your connection and try again."; cells[3].innerHTML = badge("warn", "Not checked"); counts.warn++; }
            });
          }
          return searchRef(line).then(function (r) {
            if (!r) { cells[2].textContent = "No similar record found."; cells[3].innerHTML = badge("bad", "No DOI, no match"); counts.bad++; return; }
            var ov = overlap(r.title, line);
            cells[2].innerHTML = "Closest record:<br>" + rec(r);
            if (ov >= 0.8) { cells[3].innerHTML = badge("warn", "No DOI · likely match, add the DOI"); counts.warn++; }
            else { cells[3].innerHTML = badge("bad", "No DOI · no matching record"); counts.bad++; }
          }).catch(function () { cells[2].textContent = "Could not reach Crossref. Try again later."; cells[3].innerHTML = badge("warn", "Not checked"); counts.warn++; });
        }).then(function () { return wait(150); });
      });
      chain.then(function () {
        $("dc-run").disabled = false;
        $("dc-status").textContent = "Done: " + counts.ok + " matched, " + counts.warn + " to review, " + counts.bad + " problem" + (counts.bad === 1 ? "" : "s") + ".";
      });
    });
  }
  /* =========================================================
     REPORTING GUIDELINE FINDER
     ========================================================= */
  var rg = $("rg-select");
  if (rg) {
    rg.addEventListener("change", function () {
      var v = rg.value, res = $("rg-result");
      document.querySelectorAll("#rg-rows tr").forEach(function (tr) { tr.hidden = v !== "" && tr.dataset.rg !== v; });
      if (v === "") { res.innerHTML = ""; return; }
      var tr = document.querySelector('#rg-rows tr[data-rg="' + v + '"]');
      res.innerHTML = '<div class="note"><h3>Use ' + tr.children[1].innerHTML + '</h3><p>' + tr.children[2].textContent + '. Download the checklist, then ask AI to check your Methods section against it item by item.</p></div>';
    });
  }
})();
