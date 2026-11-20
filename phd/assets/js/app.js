/* Renders every page from data.js. Each block runs only if its element exists. */
(function () {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const btn = (href, label, cls = "") =>
    `<a class="btn ${cls}" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

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

  // ---------- Home: profile + stats
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
    const stats = [
      [phd.length, "Current PhD students", "students.html#current"],
      [STUDENTS.filter((s) => s.group === "msc").length, "MSc students", "students.html#msc"],
      [PUBLICATIONS.length, "Publications", "publications.html"],
      [SCHOLAR_STATS.citations.toLocaleString(), "Citations · h-index " + SCHOLAR_STATS.hIndex, "publications.html"],
    ];
    $("#stats").innerHTML = stats
      .map(([n, l, h]) => `<a class="stat" href="${h}"><strong>${n}</strong><span>${esc(l)}</span></a>`)
      .join("");
  }

  // ---------- Publications
  const pubItem = (p) => {
    const doiUrl = p.doi ? "https://doi.org/" + p.doi : null;
    const links = [];
    if (p.doi) links.push(`<a class="doi" href="${esc(doiUrl)}" target="_blank" rel="noopener">doi:${esc(p.doi)}</a>`);
    if (p.link && !p.doi) links.push(`<a href="${esc(p.link)}" target="_blank" rel="noopener">Google Scholar</a>`);
    else if (!p.doi)
      links.push(`<a href="https://scholar.google.com/scholar?q=${encodeURIComponent('"' + p.title + '"')}" target="_blank" rel="noopener">Find on Google Scholar</a>`);
    if (p.cited)
      links.push(`<a class="cites" href="${esc(p.citedLink || p.link || "#")}" target="_blank" rel="noopener">Cited by ${p.cited}</a>`);
    const main = doiUrl || p.link;
    return `<li>
      <div class="pub-meta"><span class="tag">${esc(p.type)}</span>${p.sjr ? `<span class="tag sjr sjr-${esc(p.sjr.toLowerCase())}" title="SCImago Journal Rank quartile">SJR ${esc(p.sjr)}</span>` : ""}<span>${p.year}</span></div>
      <h3>${main ? `<a class="t" href="${esc(main)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h3>
      <p class="authors">${esc(p.authors).replace(/Othman, M\. S\./g, "<b>Othman, M. S.</b>")}</p>
      ${p.venue ? `<p class="venue"><em>${esc(p.venue)}</em></p>` : ""}
      <p class="pub-links">${links.join("")}</p>
    </li>`;
  };

  if ($("#pubs")) {
    const n = +$("#pubs").dataset.limit || PUBLICATIONS.length;
    $("#pubs").innerHTML = PUBLICATIONS.slice(0, n).map(pubItem).join("");
  }

  if ($("#pubs-by-year")) {
    const types = ["All", ...["Journal", "Conference", "Book", "Book chapter", "Preprint", "Other"].filter((t) => PUBLICATIONS.some((p) => p.type === t)), "With DOI"];
    let type = "All";
    let sortBy = "year";
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
        .map((t) => `<button class="chip ${t === type ? "on" : ""}" data-t="${esc(t)}">${esc(t)} <small>${byType(t).length}</small></button>`)
        .join("");
      const list = byType(type).filter(
        (p) => !q || [p.title, p.authors, p.venue].join(" ").toLowerCase().includes(q)
      );
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

  // ---------- Research (full page)
  if ($("#areas-full")) {
    $("#areas-full").innerHTML = RESEARCH_AREAS.map((a, i) => {
      const people = (a.students || [])
        .map((name) => `<a class="person" href="students.html?q=${encodeURIComponent(name)}">${esc(name)}</a>`)
        .join("");
      return `<article class="area-row" id="${slug(a.title)}">
        <span class="num big">${String(i + 1).padStart(2, "0")}</span>
        <div>
          <h2>${esc(a.title)}</h2>
          <p>${esc(a.text)}</p>
          ${people ? `<p class="label">Students in this area</p><div class="people">${people}</div>` : ""}
        </div>
      </article>`;
    }).join("");
  }

  // ---------- Current students
  if ($("#current-list")) {
    $("#cur-session").textContent = "Session " + CURRENT_SESSION;
    const counts = {};
    CURRENT_STUDENTS.forEach((s) => (counts[s.country] = (counts[s.country] || 0) + 1));
    let country = "";
    const initials = (n) => n.replace(/\b(binti|bin|bte)\b/gi, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
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

    // Documents submitted through submit.html (Google Apps Script)
    const STAGES = [["PROPOSAL", "Proposal"], ["CH1", "Ch 1"], ["CH2", "Ch 2"], ["CH3", "Ch 3"], ["CH4", "Ch 4"], ["CH5", "Ch 5"], ["THESIS", "Full draft"], ["VIVA", "Viva"]];
    const key = (n) => String(n || "").toLowerCase().replace(/[^a-z]/g, "");
    let docs = {};
    function docsHtml(name) {
      const list = docs[key(name)];
      if (!list || !list.length) return "";
      const have = new Set(list.map((d) => d.type));
      const dots = `<div class="stages" aria-label="Progress">${STAGES.map(([id, l]) => `<span class="${have.has(id) ? "on" : ""}" title="${l}${have.has(id) ? " · submitted" : ""}"></span>`).join("")}</div>`;
      const items = list.sort((a, b) => a.order - b.order).map((d) => {
        const label = esc(d.typeLabel.replace(/^Chapter (\d) · /, "Ch $1 · "));
        const meta = [d.version, d.date].filter(Boolean).map(esc).join(" · ");
        return `<li>${d.link ? `<a href="${esc(d.link)}" target="_blank" rel="noopener" title="${esc(d.title)}">${label}</a>` : `<span title="${esc(d.title)}">${label}</span>`}${meta ? ` <small>${meta}</small>` : ""}</li>`;
      }).join("");
      return dots + `<ul class="docs">${items}</ul>`;
    }
    (async () => {
      const url = window.PHD_SUBMIT_API;
      if (!url || /PASTE/.test(url)) return;
      try {
        const res = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action: "sub-public" }) });
        const r = await res.json();
        if (r.ok === false) return;
        docs = {};
        (r.items || []).forEach((d) => (docs[key(d.name)] = docs[key(d.name)] || []).push(d));
        render();
      } catch (e) { /* service unavailable: show cards without documents */ }
    })();
    $("#country-chips").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b) { country = b.dataset.c; render(); }
    });
    render();
  }

  // ---------- Students
  if ($("#student-list")) {
    const params = new URLSearchParams(location.search);
    const fromHash = location.hash.slice(1);
    let group = GROUPS.some((g) => g.id === fromHash) ? fromHash : "all";
    if (params.get("q")) $("#search").value = params.get("q");

    const groupLabel = Object.fromEntries(GROUPS.map((g) => [g.id, g.label]));
    const initials = (n) =>
      n.replace(/@.*/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

    const render = () => {
      const q = $("#search").value.trim().toLowerCase();
      $("#group-filter").innerHTML = GROUPS.map((g) => {
        const n = g.id === "all" ? STUDENTS.length : STUDENTS.filter((s) => s.group === g.id).length;
        return `<button class="chip ${g.id === group ? "on" : ""}" role="tab" aria-selected="${g.id === group}" data-g="${g.id}">${esc(g.label)} <small>${n}</small></button>`;
      }).join("");
      const list = STUDENTS.filter(
        (s) => (group === "all" || s.group === group) && (!q || (s.name + " " + s.title).toLowerCase().includes(q))
      );
      $("#empty").hidden = list.length > 0;
      $("#student-list").innerHTML = list
        .map(
          (s) => `<article class="card student">
          <div class="avatar g-${s.group}">${esc(initials(s.name))}</div>
          <div class="s-body">
            <div class="s-top"><h3>${esc(s.name)}</h3><span class="badge b-${esc(s.status.toLowerCase())}">${esc(s.status)}</span></div>
            <p class="s-group">${esc(groupLabel[s.group])}${s.note ? " · " + esc(s.note) : ""}</p>
            <p class="s-title">${esc(s.title)}</p>
            <div class="s-links">
              ${s.files ? `<a href="${esc(s.files)}" target="_blank" rel="noopener">📄 Files</a>` : ""}
              ${s.folder ? `<a href="${REPO}${esc(s.folder)}" target="_blank" rel="noopener">📁 Repo folder</a>` : ""}
            </div>
          </div>
        </article>`
        )
        .join("");
    };
    $("#group-filter").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      group = b.dataset.g;
      history.replaceState(null, "", group === "all" ? location.pathname : "#" + group);
      render();
    });
    $("#search").addEventListener("input", render);
    render();
  }

  // ---------- Guide: workspaces
  if ($("#workspaces")) {
    $("#workspaces").innerHTML = WORKSPACES.map(
      (w) => `<a class="ws-item" href="${REPO}${esc(w.folder)}" target="_blank" rel="noopener">
        <span>📁</span><span>${esc(w.name)}</span><span class="arrow">→</span></a>`
    ).join("");
  }

  // ---------- Contact
  if ($("#contact-cards")) {
    const cards = [
      ["LinkedIn", "Questions, feedback and supervision enquiries.", PROFILE.links.linkedin, "Message on LinkedIn"],
      ["Google Scholar", "Full list of publications and citations.", PROFILE.links.scholar, "Open profile"],
      ["GitHub", "Report an error or suggest an improvement to this site.", PROFILE.links.issues, "Open an issue"],
    ];
    if (PROFILE.email) cards.unshift(["Email", PROFILE.email, "mailto:" + PROFILE.email, "Send email"]);
    $("#contact-cards").innerHTML = cards
      .map(
        ([t, d, h, l]) => `<div class="card contact"><h3>${esc(t)}</h3><p>${esc(d)}</p>
          <a class="btn ghost" href="${esc(h)}" target="_blank" rel="noopener">${esc(l)}</a></div>`
      )
      .join("");
    if (PROFILE.address) {
      $("#contact-cards").insertAdjacentHTML(
        "afterend",
        `<p class="address"><b>Office:</b> ${esc(PROFILE.address)}</p>`
      );
    }
  }
})();
