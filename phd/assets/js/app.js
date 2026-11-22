/* PhD Hub — renders every page from data.js, publications.js and the
   Apps Script hub data (submissions, announcements, resources).
   Each block runs only if its element exists on the page. */
(function () {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const btn = (href, label, cls = "") =>
    `<a class="btn ${cls}" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const key = (n) => String(n || "").toLowerCase().replace(/[^a-z]/g, "");
  const ext = (href, html, cls = "") => `<a${cls ? ` class="${cls}"` : ""} href="${esc(href)}" target="_blank" rel="noopener">${html}</a>`;

  // Page links work from the root (index.html) and from pages/
  const ROOT = document.body.dataset.root || "";
  const P = (name) => (name === "home" ? ROOT + "index.html" : (ROOT ? "" : "pages/") + name + ".html");

  const initials = (n) =>
    n.replace(/\b(binti|bin|bte)\b/gi, "").replace(/@.*/, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

  // ---------- Shared
  if ($("#yr")) $("#yr").textContent = new Date().getFullYear();
  $$(".scholar-link").forEach((a) => (a.href = PROFILE.links.scholar));
  $$(".material-link").forEach((a) => (a.href = PROFILE.links.material));
  const menuBtn = $(".menu-btn"), links = $(".links");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
    });
  }

  // ---------- Hub data from Apps Script (cached for 3 minutes in this tab)
  const STAGES = [["FA_PROPOSAL", "Proposal · First Assessment"], ["FA_SLIDES", "Slides · First Assessment"], ["THESIS_EXAM", "Thesis for examination"], ["VIVA_SLIDES", "Viva slides"], ["THESIS_FINAL", "Final thesis"]];
  const stageIndex = (t) => STAGES.findIndex((s) => s[0] === t);
  async function hubData() {
    const url = window.PHD_SUBMIT_API;
    if (!url || /PASTE/.test(url)) return null;
    try {
      const c = JSON.parse(sessionStorage.getItem("phd-hub") || "null");
      if (c && Date.now() - c.at < 180000) return c.data;
    } catch (e) {}
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "sub-public" }) });
      const r = await res.json();
      if (r.ok === false) return null;
      try { sessionStorage.setItem("phd-hub", JSON.stringify({ at: Date.now(), data: r })); } catch (e) {}
      return r;
    } catch (e) { return null; }
  }
  const needsHub = ["#hub-feed", "#hub-announcements", "#hub-progress", "#current-list", "#lib-list", "#guide-resources", "#hub-stats"].some((s) => $(s));
  const hubPromise = needsHub ? hubData() : Promise.resolve(null);
  const docsByName = (items) => {
    const m = {};
    (items || []).filter((d) => d.type !== "DRAFT").forEach((d) => (m[key(d.name)] = m[key(d.name)] || []).push(d));
    return m;
  };
  const shortLabel = (l) => String(l || "");
  const alumni = () => {
    const seen = new Set();
    return STUDENTS.filter((s) => (s.group === "cs" || s.group === "ss") && !seen.has(s.name) && seen.add(s.name));
  };

  // ================================================================ HOME (hub)
  if ($("#hub-stats")) {
    const countries = new Set(CURRENT_STUDENTS.map((s) => s.country)).size;
    const draw = (shared) => {
      $("#hub-stats").innerHTML = [
        [CURRENT_STUDENTS.length, "Current students", P("students")],
        [countries, "Countries", P("students")],
        [shared, "Documents shared", P("library") + "?k=Current"],
        [alumni().length, "Alumni theses", P("library") + "?k=Thesis"],
      ].map(([n, l, h]) => `<a class="stat" href="${h}"><strong>${n}</strong><span>${esc(l)}</span></a>`).join("");
    };
    draw("–");
    hubPromise.then((r) => draw(r ? r.items.filter((d) => d.type !== "DRAFT").length : "–"));
  }

  if ($("#hub-announcements")) {
    hubPromise.then((r) => {
      const when = (a) => Date.parse(a.ts) || Date.parse(a.date) || 0;
      const limit = Number($("#hub-announcements").dataset.limit) || 5;
      const list = ((r && r.announcements) || []).slice().sort((x, y) => when(y) - when(x));
      $("#hub-announcements").innerHTML = list.length
        ? list.slice(0, limit).map((a) => `<article class="ann">
            <p class="ann-date">${esc(a.date)}${Date.now() - when(a) < 7 * 864e5 ? ' <span class="ann-new">New</span>' : ""}</p>
            <h3>${esc(a.title)}</h3>
            ${a.message ? `<p class="ann-msg">${esc(a.message)}</p>` : ""}
            ${a.link ? ext(a.link, "Details →", "btn ghost sb-small") : ""}
          </article>`).join("")
        : `<p class="empty">${r ? "No announcements right now." : "Announcements are not available at the moment."}</p>`;
    });
  }

  if ($("#hub-feed")) {
    hubPromise.then((r) => {
      const items = ((r && r.items) || []).filter((d) => d.type !== "DRAFT").slice().sort((a, b) => String(b.ts).localeCompare(String(a.ts))).slice(0, 6);
      $("#hub-feed").innerHTML = items.length
        ? items.map((d) => `<li>
            <div class="avatar g-cs">${esc(initials(d.name))}</div>
            <div><p class="feed-who"><b>${esc(d.name)}</b> shared <span class="tag">${esc(shortLabel(d.typeLabel))}</span></p>
            <p class="feed-title">${d.link ? ext(d.link, esc(d.title)) : esc(d.title)}</p>
            <p class="feed-meta">${[d.version, d.date].filter(Boolean).map(esc).join(" · ")}</p></div>
          </li>`).join("")
        : `<li class="empty">${r ? "Nothing shared yet. Be the first: <a href=\"" + P("submit") + "\">submit a document</a>." : "Submissions are not available at the moment."}</li>`;
    });
  }

  if ($("#hub-progress")) {
    const cols = [["none", "Not shared yet"], ["prop", "First Assessment"], ["ch", "Thesis submitted"], ["draft", "Viva"], ["viva", "Final thesis"]];
    const colOf = (best) => (best < 0 ? "none" : best <= 1 ? "prop" : best === 2 ? "ch" : best === 3 ? "draft" : "viva");
    hubPromise.then((r) => {
      const docs = docsByName(r && r.items);
      const groups = Object.fromEntries(cols.map(([k]) => [k, []]));
      CURRENT_STUDENTS.forEach((s) => {
        const best = Math.max(-1, ...(docs[key(s.name)] || []).map((d) => stageIndex(d.type)));
        groups[colOf(best)].push(s.name);
      });
      $("#hub-progress").innerHTML = cols.map(([k, l]) => `<div class="pb-col pb-${k}">
          <h3>${l} <small>${groups[k].length}</small></h3>
          ${k === "none" && groups[k].length > 4
            ? `<details><summary>Show names</summary><div>${groups[k].map((n) => `<span class="pb-name">${esc(n)}</span>`).join("")}</div></details>`
            : `<div>${groups[k].map((n) => `<span class="pb-name">${esc(n)}</span>`).join("") || '<span class="pb-empty">—</span>'}</div>`}
        </div>`).join("");
    });
  }

  // ================================================================ ABOUT
  if ($("#p-name")) {
    $("#p-affil").textContent = PROFILE.affiliation;
    $("#p-name").textContent = PROFILE.name;
    $("#p-role").textContent = PROFILE.role;
    $("#p-tagline").textContent = PROFILE.tagline;
    $("#p-links").innerHTML =
      btn(PROFILE.links.scholar, "Google Scholar", "primary") +
      btn(PROFILE.links.linkedin, "LinkedIn", "ghost") +
      btn(PROFILE.links.github, "GitHub", "ghost");
  }
  if ($("#stats")) {
    const phd = CURRENT_STUDENTS.filter((s) => s.level === "PhD");
    $("#stats").innerHTML = [
      [phd.length, "Current PhD students", P("students")],
      [alumni().length, "PhD alumni", P("students") + "#alumni"],
      [PUBLICATIONS.length, "Publications", P("publications")],
      [SCHOLAR_STATS.citations.toLocaleString(), "Citations · h-index " + SCHOLAR_STATS.hIndex, P("publications")],
    ].map(([n, l, h]) => `<a class="stat" href="${h}"><strong>${n}</strong><span>${esc(l)}</span></a>`).join("");
  }
  if ($("#areas")) {
    $("#areas").innerHTML = RESEARCH_AREAS.map((a, i) => `<a class="card tile area" href="${P("research")}#${slug(a.title)}">
        <span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></a>`).join("");
  }

  // ================================================================ PUBLICATIONS
  const pubItem = (p) => {
    const doiUrl = p.doi ? "https://doi.org/" + p.doi : null;
    const l = [];
    if (p.doi) l.push(ext(doiUrl, "doi:" + esc(p.doi), "doi"));
    if (p.link && !p.doi) l.push(ext(p.link, "Google Scholar"));
    else if (!p.doi) l.push(ext("https://scholar.google.com/scholar?q=" + encodeURIComponent('"' + p.title + '"'), "Find on Google Scholar"));
    if (p.cited) l.push(ext(p.citedLink || p.link || "#", "Cited by " + p.cited, "cites"));
    const main = doiUrl || p.link;
    return `<li>
      <div class="pub-meta"><span class="tag">${esc(p.type)}</span>${p.kind === "SLR" ? '<span class="tag kind-slr">Review</span>' : ""}<span class="tag field-${p.field === "SS" ? "ss" : "cs"}">${p.field === "SS" ? "Social Science" : "Computer Science"}</span>${p.sjr ? `<span class="tag sjr sjr-${esc(p.sjr.toLowerCase())}" title="SCImago Journal Rank quartile">SJR ${esc(p.sjr)}</span>` : ""}<span>${p.year}</span></div>
      <h3>${main ? ext(main, esc(p.title), "pub-title") : esc(p.title)}</h3>
      <p class="authors">${esc(p.authors).replace(/Othman, M\. S\./g, "<b>Othman, M. S.</b>")}</p>
      ${p.venue ? `<p class="venue"><em>${esc(p.venue)}</em></p>` : ""}
      <p class="pub-links">${l.join("")}</p>
    </li>`;
  };
  if ($("#pubs")) {
    const n = +$("#pubs").dataset.limit || PUBLICATIONS.length;
    $("#pubs").innerHTML = PUBLICATIONS.slice(0, n).map(pubItem).join("");
  }
  if ($("#pubs-by-year")) {
    const KINDS = [["", "All"], ["SLR", "Review"], ["Technical", "Article"]];
    const FIELDS = [["", "All"], ["CS", "Computer Science"], ["SS", "Social Science"]];
    const DOCS = ["Journal", "Conference", "Book", "Book chapter", "Preprint", "Other"].filter((t) => PUBLICATIONS.some((p) => p.type === t));
    const params = new URLSearchParams(location.search);
    let kind = KINDS.some((k) => k[0] === params.get("kind")) ? params.get("kind") : "";
    let field = FIELDS.some((k) => k[0] === params.get("field")) ? params.get("field") : "";
    let doc = DOCS.includes(params.get("doc")) ? params.get("doc") : "";
    let sortBy = "year";
    const search = $("#pub-search");
    if (params.get("q")) search.value = params.get("q");

    $("#pub-summary").innerHTML = [
      [PUBLICATIONS.length, "Publications"],
      [PUBLICATIONS.filter((p) => p.kind === "SLR").length, "Reviews"],
      [PUBLICATIONS.filter((p) => p.field === "CS").length + " · " + PUBLICATIONS.filter((p) => p.field === "SS").length, "Computer · Social Science"],
      [SCHOLAR_STATS.citations.toLocaleString(), "Citations · h-index " + SCHOLAR_STATS.hIndex],
    ].map(([n, l]) => `<div class="stat"><strong>${n}</strong><span>${l}</span></div>`).join("");

    const q = () => search.value.trim().toLowerCase();
    const pass = (p, o = {}) => {
      const k = "kind" in o ? o.kind : kind, f = "field" in o ? o.field : field, d = "doc" in o ? o.doc : doc;
      return (!k || p.kind === k) && (!f || p.field === f) && (!d || p.type === d) &&
        (!q() || [p.title, p.authors, p.venue].join(" ").toLowerCase().includes(q()));
    };
    const chips = (el, list, cur, key) => {
      $(el).innerHTML = list.map(([v, l]) => {
        const n = PUBLICATIONS.filter((p) => pass(p, { [key]: v })).length;
        return `<button type="button" class="lib-cat${v === cur ? " on" : ""}" data-v="${v}" aria-pressed="${v === cur}">${esc(l)} <small>${n}</small></button>`;
      }).join("");
    };
    const updateUrl = () => {
      const u = new URL(location.href);
      [["kind", kind], ["field", field], ["doc", doc], ["q", search.value.trim()]].forEach(([k, v]) => (v ? u.searchParams.set(k, v) : u.searchParams.delete(k)));
      history.replaceState(null, "", u);
    };
    const render = () => {
      chips("#pub-kind", KINDS, kind, "kind");
      chips("#pub-field", FIELDS, field, "field");
      $("#pub-doctype").innerHTML = `<option value="">All (${PUBLICATIONS.filter((p) => pass(p, { doc: "" })).length})</option>` +
        DOCS.map((t) => `<option value="${esc(t)}"${t === doc ? " selected" : ""}>${esc(t)} (${PUBLICATIONS.filter((p) => pass(p, { doc: t })).length})</option>`).join("");
      const list = PUBLICATIONS.filter((p) => pass(p));
      const parts = [kind && KINDS.find((k) => k[0] === kind)[1], field && FIELDS.find((k) => k[0] === field)[1], doc].filter(Boolean);
      $("#pub-count").textContent = `${list.length} publication${list.length === 1 ? "" : "s"}` + (parts.length ? " · " + parts.join(" · ") : "") + (q() ? ` · matching “${search.value.trim()}”` : "");
      if (sortBy === "cited") {
        $("#year-nav").innerHTML = "";
        $("#pubs-by-year").innerHTML = list.length
          ? `<ol class="pubs">${[...list].sort((a, b) => (b.cited || 0) - (a.cited || 0)).map(pubItem).join("")}</ol>`
          : `<p class="empty">No publications match these filters.</p>`;
        return;
      }
      const ys = [...new Set(list.map((p) => p.year))].sort((a, b) => b - a);
      $("#year-nav").innerHTML = ys.map((y) => `<a href="#y${y}">${y}</a>`).join("");
      $("#pubs-by-year").innerHTML = ys.length
        ? ys.map((y) => {
            const items = list.filter((p) => p.year === y);
            return `<div class="year-block" id="y${y}"><h2 class="year">${y} <small>${items.length}</small></h2>
              <ol class="pubs">${items.map(pubItem).join("")}</ol></div>`;
          }).join("")
        : `<p class="empty">No publications match these filters.</p>`;
    };
    $("#pub-kind").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { kind = b.dataset.v; updateUrl(); render(); } });
    $("#pub-field").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { field = b.dataset.v; updateUrl(); render(); } });
    $("#pub-doctype").addEventListener("change", (e) => { doc = e.target.value; updateUrl(); render(); });
    $("#pub-sort").addEventListener("change", (e) => { sortBy = e.target.value; render(); });
    let t;
    search.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { updateUrl(); render(); }, 120); });
    render();
    if (/^#y\d{4}$/.test(location.hash)) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView(), 0);
    }
  }

  // ================================================================ RESEARCH
  if ($("#areas-full")) {
    $("#areas-full").innerHTML = RESEARCH_AREAS.map((a, i) => {
      const people = (a.students || [])
        .map((name) => `<a class="person" href="${P("library")}?q=${encodeURIComponent(name)}">${esc(name)}</a>`).join("");
      return `<article class="area-row" id="${slug(a.title)}">
        <span class="num big">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <h2>${esc(a.title)}</h2>
          <p>${esc(a.text)}</p>
          ${people ? `<p class="label">Students in this area</p><div class="people">${people}</div>` : ""}
        </div>
      </article>`;
    }).join("");
    if (location.hash) { const el = document.querySelector(location.hash); if (el) setTimeout(() => el.scrollIntoView(), 0); }
  }

  // ================================================================ STUDENTS
  if ($("#current-list")) {
    $("#cur-session").textContent = "Session " + CURRENT_SESSION;
    let docs = {};
    const docsHtml = (name) => {
      const list = docs[key(name)];
      const have = new Set((list || []).map((d) => d.type));
      const bar = `<div class="stages" aria-label="Progress">${STAGES.map(([id, l]) => `<span class="${have.has(id) ? "on" : ""}" title="${l}${have.has(id) ? " · shared" : ""}"></span>`).join("")}</div>`;
      if (!list || !list.length) return bar;
      const arts = list.filter((d) => d.type === "ARTICLE");
      const items = list.filter((d) => d.type !== "ARTICLE").sort((a, b) => a.order - b.order).map((d) => {
        const label = esc(shortLabel(d.typeLabel));
        const meta = [d.version, d.date].filter(Boolean).map(esc).join(" · ");
        return `<li>${d.link ? `<a href="${esc(d.link)}" target="_blank" rel="noopener" title="${esc(d.title)}">${label}</a>` : `<span title="${esc(d.title)}">${label}</span>`}${meta ? ` <small>${meta}</small>` : ""}</li>`;
      }).join("");
      const artLi = arts.length ? `<li><a href="${P("library")}?k=Article&q=${encodeURIComponent(name)}">📝 ${arts.length} article${arts.length > 1 ? "s" : ""}</a></li>` : "";
      return bar + `<ul class="docs">${items}${artLi}</ul>`;
    };
    let order = STAGE_ORDER.slice(), stageOf = {};
    CURRENT_STUDENTS.forEach((s) => (stageOf[key(s.name)] = s.stage || ""));
    let stage = "";
    const card = (s) => `<div class="cur-card">
          <div class="avatar g-cs">${esc(initials(s.name))}</div>
          <div><h3>${esc(s.name)}</h3>
            <p><span class="flag">${FLAGS[s.country] || ""}</span> ${esc(s.country)}${s.level !== "PhD" ? ` · <span class="badge b-project">${esc(s.level)}</span>` : ""}</p>
            ${docsHtml(s.name)}</div>
        </div>`;
    const render = () => {
      const groups = order.map((g) => [g, CURRENT_STUDENTS.filter((s) => stageOf[key(s.name)] === g)]);
      const other = CURRENT_STUDENTS.filter((s) => !order.includes(stageOf[key(s.name)]));
      if (other.length) groups.push(["Other", other]);
      $("#country-chips").innerHTML =
        `<button class="chip ${!stage ? "on" : ""}" data-c="">All <small>${CURRENT_STUDENTS.length}</small></button>` +
        groups.filter(([, l]) => l.length).map(([g, l]) => `<button class="chip ${stage === g ? "on" : ""}" data-c="${esc(g)}">${esc(g)} <small>${l.length}</small></button>`).join("");
      $("#current-list").innerHTML = groups.filter(([g, l]) => l.length && (!stage || stage === g)).map(([g, l], i) => `
        <section class="stage-group">
          <h3 class="stage-h"><span class="stage-n">${order.indexOf(g) + 1 || "•"}</span>${esc(g)} <small>${l.length} student${l.length > 1 ? "s" : ""}</small></h3>
          ${STAGE_INFO[g] ? `<p class="stage-d">${esc(STAGE_INFO[g])}</p>` : ""}
          <div class="current-grid">${l.map(card).join("")}</div>
        </section>`).join("");
    };
    $("#country-chips").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b) { stage = b.dataset.c; render(); }
    });
    render();
    hubPromise.then((r) => {
      if (!r) return;
      docs = docsByName(r.items);
      if (r.stages && r.stages.length) order = r.stages;
      (r.students || []).forEach((x) => { if (x.stage) stageOf[key(x.name)] = x.stage; });
      render();
    });
  }

  if ($("#alumni-list")) {
    const CATS = [["all", "All"], ["cs", "Computer Science"], ["ss", "Social Science"]];
    const list = alumni();
    let cat = "all";
    const row = (s) => `<li class="lib-row">
        <div class="lib-main">
          <p class="lib-tags"><span class="tag">PhD thesis</span></p>
          <h3>${s.files ? ext(s.files, esc(s.title)) : esc(s.title)}</h3>
          <p class="lib-meta"><b>${esc(s.name)}</b>${s.note ? " · " + esc(s.note) : ""}</p>
        </div>
        ${s.files ? `<a class="btn ghost lib-open" href="${esc(s.files)}" target="_blank" rel="noopener" aria-label="Open thesis of ${esc(s.name)} (opens in a new tab)">Open ↗</a>` : ""}
      </li>`;
    const render = () => {
      $("#alumni-filter").innerHTML = CATS.map(([k, l]) => {
        const n = k === "all" ? list.length : list.filter((s) => s.group === k).length;
        return `<button type="button" class="lib-cat${k === cat ? " on" : ""}" data-k="${k}" aria-pressed="${k === cat}">${esc(l)} <small>${n}</small></button>`;
      }).join("");
      const shown = list.filter((s) => cat === "all" || s.group === cat);
      $("#alumni-count").textContent = shown.length + (shown.length === 1 ? " thesis" : " theses") + (cat === "all" ? "" : " in " + CATS.find((c) => c[0] === cat)[1]);
      $("#alumni-list").innerHTML = CATS.filter(([k]) => k !== "all" && (cat === "all" || cat === k)).map(([k, l]) => {
        const g = shown.filter((s) => s.group === k);
        if (!g.length) return "";
        return `<section class="lib-group" aria-labelledby="al-${k}">
            <div class="lib-group-head"><h2 id="al-${k}">${esc(l)} <small>${g.length}</small></h2>
            ${cat === "all" ? `<button type="button" class="link-btn" data-k="${k}">See only ${esc(l)} →</button>` : ""}</div>
            <ul class="lib-rows">${g.map(row).join("")}</ul>
          </section>`;
      }).join("");
    };
    const pick = (k) => { cat = k; render(); };
    $("#alumni-filter").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) pick(b.dataset.k); });
    $("#alumni-list").addEventListener("click", (e) => { const b = e.target.closest("button[data-k]"); if (b) pick(b.dataset.k); });
    render();
  }

  // ================================================================ LIBRARY
  // Categories in display order. "Current" = items a current student shared (status "Library").
  const KINDS = [
    ["All", "All"], ["Thesis", "Theses"], ["Proposal", "Proposals"], ["Slides", "Slides"],
    ["Article", "Articles"], ["MSc", "MSc projects"], ["Guide", "Guides & resources"], ["Current", "From current students"],
  ];
  const KIND_LABEL = Object.fromEntries(KINDS);
  const fromSubmission = (d) => {
    if (d.type === "DRAFT" || !d.library) return null; // only items the supervisor set to "Library"
    const t = d.type;
    const kind = t === "FA_PROPOSAL" ? "Proposal" : /^THESIS/.test(t) ? "Thesis" : /SLIDES$/.test(t) ? "Slides" : "Article";
    return { kind, current: true, tag: shortLabel(d.typeLabel), title: d.title, who: d.name,
      meta: [d.version, d.date].filter(Boolean).join(" · "), link: d.link || "" };
  };
  function libraryItems(r) {
    const out = [];
    (r && r.items ? r.items : []).map(fromSubmission).filter(Boolean).forEach((x) => out.push(x));
    STUDENTS.forEach((s) => {
      const kind = s.group === "msc" ? "MSc" : s.group === "proposal" ? "Proposal" : "Thesis";
      const tag = kind === "Thesis" ? "PhD thesis" : kind === "Proposal" ? "PhD proposal" : "MSc project";
      out.push({ kind, tag, title: s.title, who: s.name, meta: s.note || "", link: s.files || "" });
    });
    out.push({ kind: "Guide", tag: "Guide", title: "Chapter 2 – Literature review guide", who: "",
      meta: "Step-by-step guide and examples for writing Chapter 2.", link: REPO + "chapter2" });
    (r && r.resources ? r.resources : []).forEach((x) => out.push({
      kind: "Guide", tag: x.category || "Resource", title: x.title, who: "",
      meta: [x.description, x.stage].filter(Boolean).join(" · "), link: x.link || "" }));
    return out;
  }
  if ($("#lib-list")) {
    const params = new URLSearchParams(location.search);
    let kind = KINDS.some((k) => k[0] === params.get("k")) ? params.get("k") : "All";
    const search = $("#lib-search");
    if (params.get("q")) search.value = params.get("q");
    let items = libraryItems(null);
    const match = (it, k) => k === "All" || (k === "Current" ? it.current : it.kind === k);
    const row = (it) => `<li class="lib-row${it.current ? " is-current" : ""}">
        <div class="lib-main">
          <p class="lib-tags"><span class="tag">${esc(it.tag)}</span>${it.current ? '<span class="tag new">Current student</span>' : ""}</p>
          <h3>${it.link ? ext(it.link, esc(it.title)) : esc(it.title)}</h3>
          ${it.who || it.meta ? `<p class="lib-meta">${it.who ? `<b>${esc(it.who)}</b>` : ""}${it.who && it.meta ? " · " : ""}${esc(it.meta)}</p>` : ""}
        </div>
        ${it.link ? `<a class="btn ghost lib-open" href="${esc(it.link)}" target="_blank" rel="noopener" aria-label="Open ${esc(it.title)} (opens in a new tab)">Open ↗</a>` : ""}
      </li>`;
    const updateUrl = () => {
      const u = new URL(location.href);
      kind === "All" ? u.searchParams.delete("k") : u.searchParams.set("k", kind);
      search.value.trim() ? u.searchParams.set("q", search.value.trim()) : u.searchParams.delete("q");
      history.replaceState(null, "", u);
    };
    const render = () => {
      const q = search.value.trim().toLowerCase();
      $("#lib-clear").hidden = !q;
      const hit = (it) => !q || [it.title, it.who, it.tag, it.meta].join(" ").toLowerCase().includes(q);
      $("#lib-filter").innerHTML = KINDS.map(([k, l]) => {
        const n = items.filter((it) => match(it, k) && hit(it)).length;
        if (k !== "All" && k !== kind && !items.some((it) => match(it, k))) return ""; // hide empty categories
        return `<button type="button" class="lib-cat${k === kind ? " on" : ""}" data-k="${k}" aria-pressed="${k === kind}">${esc(l)} <small>${n}</small></button>`;
      }).join("");
      const list = items.filter((it) => match(it, kind) && hit(it));
      $("#lib-count").textContent = (q ? `${list.length} result${list.length === 1 ? "" : "s"} for “${search.value.trim()}”` : `${list.length} item${list.length === 1 ? "" : "s"}`) +
        (kind !== "All" ? " in " + KIND_LABEL[kind] : "");
      $("#lib-empty").hidden = list.length > 0;
      $("#lib-empty").querySelector("p").textContent = q ? "Nothing matches your search." : "Nothing in this category yet.";
      if (kind === "All" && !q) {
        // grouped view: one section per category
        $("#lib-list").innerHTML = KINDS.filter(([k]) => k !== "All" && k !== "Current").map(([k, l]) => {
          const g = list.filter((it) => it.kind === k);
          if (!g.length) return "";
          return `<section class="lib-group" aria-labelledby="g-${k}">
              <div class="lib-group-head"><h2 id="g-${k}">${esc(l)} <small>${g.length}</small></h2>
              <button type="button" class="link-btn" data-k="${k}">See only ${esc(l.toLowerCase())} →</button></div>
              <ul class="lib-rows">${g.slice(0, 6).map(row).join("")}</ul>
              ${g.length > 6 ? `<button type="button" class="link-btn lib-more" data-k="${k}">Show all ${g.length} ${esc(l.toLowerCase())}</button>` : ""}
            </section>`;
        }).join("");
      } else {
        $("#lib-list").innerHTML = list.length ? `<ul class="lib-rows">${list.map(row).join("")}</ul>` : "";
      }
    };
    const pick = (k) => { kind = k; updateUrl(); render(); window.scrollTo({ top: $("#lib-filter").offsetTop - 80, behavior: "smooth" }); };
    $("#lib-filter").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) pick(b.dataset.k); });
    $("#lib-list").addEventListener("click", (e) => { const b = e.target.closest("button[data-k]"); if (b) pick(b.dataset.k); });
    let t;
    search.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { updateUrl(); render(); }, 120); });
    $("#lib-clear").onclick = () => { search.value = ""; updateUrl(); render(); search.focus(); };
    $("#lib-reset").onclick = () => { search.value = ""; kind = "All"; updateUrl(); render(); };
    render();
    hubPromise.then((r) => { if (r) { items = libraryItems(r); render(); } });
  }

  // ================================================================ GUIDE
  if ($("#guide-resources")) {
    const draw = (r) => {
      const res = ((r && r.resources) || []).map((x) => [x.category || "Resource", x.title, x.description, x.link]);
      const base = [
        ["Guide", "Chapter 2 – Literature review", "Step-by-step guide and examples for writing Chapter 2.", REPO + "chapter2"],
        ["Repository", "Research Material", "Shared research materials, guides and examples.", PROFILE.links.material],
      ];
      const seen = new Set();
      $("#guide-resources").innerHTML = [...res, ...base].filter(([, t]) => !seen.has(t) && seen.add(t))
        .map(([c, t, d, h]) => `<div class="card contact"><span class="tag">${esc(c)}</span><h3>${esc(t)}</h3>${d ? `<p>${esc(d)}</p>` : ""}
          ${h ? `<a class="btn ghost" href="${esc(h)}" target="_blank" rel="noopener">Open</a>` : ""}</div>`).join("");
    };
    draw(null);
    hubPromise.then((r) => r && draw(r));
  }

  // ================================================================ CONTACT
  if ($("#contact-cards")) {
    const cards = [
      ["LinkedIn", "Questions, feedback and supervision enquiries.", PROFILE.links.linkedin, "Message on LinkedIn"],
      ["Google Scholar", "Full list of publications and citations.", PROFILE.links.scholar, "Open profile"],
      ["GitHub", "Report an error or suggest an improvement to this site.", PROFILE.links.issues, "Open an issue"],
    ];
    if (PROFILE.email) cards.unshift(["Email", PROFILE.email, "mailto:" + PROFILE.email, "Send email"]);
    $("#contact-cards").innerHTML = cards.map(([t, d, h, l]) => `<div class="card contact"><h3>${esc(t)}</h3><p>${esc(d)}</p>
        <a class="btn ghost" href="${esc(h)}" target="_blank" rel="noopener">${esc(l)}</a></div>`).join("");
    if (PROFILE.address) $("#contact-cards").insertAdjacentHTML("afterend", `<p class="address"><b>Office:</b> ${esc(PROFILE.address)}</p>`);
  }
})();
