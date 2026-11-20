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
      const list = (r && r.announcements) || [];
      $("#hub-announcements").innerHTML = list.length
        ? list.slice(0, 5).map((a) => `<article class="ann">
            <p class="ann-date">${esc(a.date)}</p>
            <h3>${esc(a.title)}</h3>
            ${a.message ? `<p>${esc(a.message)}</p>` : ""}
            ${a.link ? ext(a.link, "Open →", "see-all") : ""}
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
      <div class="pub-meta"><span class="tag">${esc(p.type)}</span>${p.sjr ? `<span class="tag sjr sjr-${esc(p.sjr.toLowerCase())}" title="SCImago Journal Rank quartile">SJR ${esc(p.sjr)}</span>` : ""}<span>${p.year}</span></div>
      <h3>${main ? ext(main, esc(p.title), "t") : esc(p.title)}</h3>
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
    const types = ["All", ...["Journal", "Conference", "Book", "Book chapter", "Preprint", "Other"].filter((t) => PUBLICATIONS.some((p) => p.type === t)), "With DOI"];
    let type = "All", sortBy = "year";
    $("#pub-sort").addEventListener("change", (e) => { sortBy = e.target.value; render(); });
    $("#pub-summary").innerHTML = [
      [PUBLICATIONS.length, "Publications"],
      [PUBLICATIONS.filter((p) => p.type === "Journal").length, "Journal articles"],
      [SCHOLAR_STATS.citations.toLocaleString(), "Citations"],
      [SCHOLAR_STATS.hIndex, "h-index"],
    ].map(([n, l]) => `<div class="stat"><strong>${n}</strong><span>${l}</span></div>`).join("");
    const render = () => {
      const q = $("#pub-search").value.trim().toLowerCase();
      const byType = (t) => PUBLICATIONS.filter((p) => t === "All" || p.type === t || (t === "With DOI" && p.doi));
      $("#pub-filter").innerHTML = types
        .map((t) => `<button class="chip ${t === type ? "on" : ""}" data-t="${esc(t)}">${esc(t)} <small>${byType(t).length}</small></button>`).join("");
      const list = byType(type).filter((p) => !q || [p.title, p.authors, p.venue].join(" ").toLowerCase().includes(q));
      if (sortBy === "cited") {
        $("#year-nav").innerHTML = "";
        $("#pubs-by-year").innerHTML = list.length
          ? `<ol class="pubs">${[...list].sort((a, b) => (b.cited || 0) - (a.cited || 0)).map(pubItem).join("")}</ol>`
          : `<p class="empty">No publications match your search.</p>`;
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
        : `<p class="empty">No publications match your search.</p>`;
    };
    $("#pub-filter").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b) { type = b.dataset.t; render(); }
    });
    $("#pub-search").addEventListener("input", render);
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
    const counts = {};
    CURRENT_STUDENTS.forEach((s) => (counts[s.country] = (counts[s.country] || 0) + 1));
    let country = "", docs = {};
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
    const render = () => {
      $("#country-chips").innerHTML =
        `<button class="chip ${!country ? "on" : ""}" data-c="">All <small>${CURRENT_STUDENTS.length}</small></button>` +
        Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
          .map(([c, n]) => `<button class="chip ${country === c ? "on" : ""}" data-c="${esc(c)}">${FLAGS[c] || ""} ${esc(c)} <small>${n}</small></button>`).join("");
      $("#current-list").innerHTML = CURRENT_STUDENTS.filter((s) => !country || s.country === country)
        .map((s) => `<div class="cur-card">
          <div class="avatar g-cs">${esc(initials(s.name))}</div>
          <div><h3>${esc(s.name)}</h3>
            <p><span class="flag">${FLAGS[s.country] || ""}</span> ${esc(s.country)}${s.level !== "PhD" ? ` · <span class="badge b-project">${esc(s.level)}</span>` : ""}
            ${s.folder ? ` · <a href="${REPO}${esc(s.folder)}" target="_blank" rel="noopener">Folder</a>` : ""}</p>
            ${docsHtml(s.name)}</div>
        </div>`).join("");
    };
    $("#country-chips").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b) { country = b.dataset.c; render(); }
    });
    render();
    hubPromise.then((r) => { if (r) { docs = docsByName(r.items); render(); } });
  }

  if ($("#alumni-list")) {
    $("#alumni-list").innerHTML = alumni().map((s) => `<article class="card student">
        <div class="avatar g-${s.group}">${esc(initials(s.name))}</div>
        <div class="s-body">
          <div class="s-top"><h3>${esc(s.name)}</h3><span class="badge">PhD${s.group === "ss" ? " · Social Science" : " · Computer Science"}</span></div>
          <p class="s-title">${esc(s.title)}</p>
          <div class="s-links">
            ${s.files ? ext(s.files, "📄 Thesis files") : ""}
            ${s.folder ? ext(REPO + s.folder, "📁 Repo folder") : ""}
            <a href="${P("library")}?q=${encodeURIComponent(s.name)}">All their work →</a>
          </div>
        </div>
      </article>`).join("");
  }

  // ================================================================ LIBRARY
  const KINDS = [
    ["All", "All"], ["Current", "Shared by current students"], ["Proposal", "Proposals"], ["Thesis", "Theses"],
    ["Slides", "Slides"], ["Article", "Articles"], ["MSc", "MSc projects"], ["Guide", "Guides & resources"],
  ];
  const fromSubmission = (d) => {
    if (d.type === "DRAFT") return null; // drafts are never public
    const t = d.type;
    const kind = t === "FA_PROPOSAL" ? "Proposal" : /^THESIS/.test(t) ? "Thesis" : /SLIDES$/.test(t) ? "Slides" : "Article";
    return { kind, current: true, tag: shortLabel(d.typeLabel), title: d.title, who: d.name,
      meta: [d.version, d.date].filter(Boolean).join(" · "), links: d.link ? [[d.link, "Open"]] : [], titleOnly: !d.link };
  };
  function libraryItems(r) {
    const out = [];
    (r && r.items ? r.items : []).map(fromSubmission).filter(Boolean).forEach((x) => out.push(x));
    STUDENTS.forEach((s) => {
      const kind = s.group === "msc" ? "MSc" : s.group === "proposal" ? "Proposal" : "Thesis";
      const tag = kind === "Thesis" ? "PhD thesis" : kind === "Proposal" ? "PhD proposal" : "MSc project";
      const links = [];
      if (s.files) links.push([s.files, "Files"]);
      if (s.folder) links.push([REPO + s.folder, "Repo folder"]);
      out.push({ kind, tag, title: s.title, who: s.name, meta: s.note || "", links });
    });
    WORKSPACES.forEach((w) => out.push({ kind: "Guide", tag: "Repo folder", title: w.name, who: "", meta: "", links: [[REPO + w.folder, "Open folder"]] }));
    (r && r.resources ? r.resources : []).forEach((x) => out.push({
      kind: "Guide", tag: x.category || "Resource", title: x.title, who: "", meta: [x.description, x.stage].filter(Boolean).join(" · "),
      links: x.link ? [[x.link, "Open"]] : [] }));
    return out;
  }
  if ($("#lib-list")) {
    const params = new URLSearchParams(location.search);
    let kind = KINDS.some((k) => k[0] === params.get("k")) ? params.get("k") : "All";
    if (params.get("q")) $("#lib-search").value = params.get("q");
    let items = libraryItems(null);
    const match = (it, k) => k === "All" || (k === "Current" ? it.current : it.kind === k);
    const render = () => {
      const q = $("#lib-search").value.trim().toLowerCase();
      $("#lib-filter").innerHTML = KINDS.map(([k, l]) => {
        const n = items.filter((it) => match(it, k)).length;
        return n || k === "All" || k === "Current"
          ? `<button class="chip ${k === kind ? "on" : ""}" data-k="${k}">${esc(l)} <small>${n}</small></button>` : "";
      }).join("");
      const list = items.filter((it) => match(it, kind) && (!q || [it.title, it.who, it.tag, it.meta].join(" ").toLowerCase().includes(q)));
      $("#lib-count").textContent = list.length + (list.length === 1 ? " item" : " items");
      $("#lib-empty").hidden = list.length > 0;
      $("#lib-list").innerHTML = list.map((it) => `<article class="lib-item${it.current ? " is-current" : ""}">
          <div class="lib-tags"><span class="tag">${esc(it.tag)}</span>${it.current ? '<span class="tag new">Current student</span>' : ""}</div>
          <h3>${it.links.length ? ext(it.links[0][0], esc(it.title)) : esc(it.title)}</h3>
          ${it.who || it.meta ? `<p class="lib-meta">${it.who ? `<b>${esc(it.who)}</b>` : ""}${it.who && it.meta ? " · " : ""}${esc(it.meta)}</p>` : ""}
          <p class="lib-links">${it.links.map(([h, l]) => ext(h, esc(l))).join("")}${it.titleOnly ? '<span class="muted">Title only</span>' : ""}</p>
        </article>`).join("");
    };
    $("#lib-filter").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      kind = b.dataset.k;
      const u = new URL(location.href);
      kind === "All" ? u.searchParams.delete("k") : u.searchParams.set("k", kind);
      history.replaceState(null, "", u);
      render();
    });
    $("#lib-search").addEventListener("input", render);
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
