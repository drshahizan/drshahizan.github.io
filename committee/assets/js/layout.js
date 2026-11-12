/* Shared header, footer and helpers for every page.
   Each page sets <body data-page="home|icbis|icaife|positions|apply|faq">. */
(function () {
  const C = window.APP_CONFIG;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const page = document.body.dataset.page || "";

  const nav = [
    { id: "home", href: "index.html", label: "Home" },
    ...C.conferences.map((c) => ({ id: c.id, href: c.page, label: c.short })),
    { id: "positions", href: "positions.html", label: "Positions" },
    { id: "faq", href: "faq.html", label: "FAQ" }
  ];

  /* ---------- Header ---------- */
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <a class="skip" href="#main">Skip to main content</a>
    <div class="wrap header-inner">
      <a class="logo" href="index.html" aria-label="${esc(C.site.name)} home">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="22" height="22"><path d="M16 3 3 9.5 16 16l13-6.5L16 3Z" fill="currentColor"/><path d="M8 13v6.5c0 2.5 3.6 4.5 8 4.5s8-2 8-4.5V13l-8 4-8-4Z" fill="currentColor" opacity=".75"/><path d="M28 10v8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </span>
        <span class="logo-text"><strong>${esc(C.site.name)}</strong><small>${esc(C.site.tagline)}</small></span>
      </a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="siteNav" aria-label="Menu"><span></span><span></span><span></span></button>
      <nav id="siteNav" class="site-nav" aria-label="Main">
        ${nav.map((n) => `<a href="${n.href}" ${n.id === page ? 'aria-current="page"' : ""}>${esc(n.label)}</a>`).join("")}
        <a href="apply.html" class="btn btn-gold btn-sm" ${page === "apply" ? 'aria-current="page"' : ""}>Apply now</a>
      </nav>
    </div>`;
  document.body.prepend(header);
  const toggle = header.querySelector(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });

  /* ---------- Footer ---------- */
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <span class="logo-mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="22" height="22"><path d="M16 3 3 9.5 16 16l13-6.5L16 3Z" fill="currentColor"/><path d="M8 13v6.5c0 2.5 3.6 4.5 8 4.5s8-2 8-4.5V13l-8 4-8-4Z" fill="currentColor" opacity=".75"/></svg></span>
        <p><strong>${esc(C.site.name)}</strong><br>${esc(C.site.tagline)}</p>
      </div>
      <div>
        <h4>Conferences</h4>
        <ul>${C.conferences.map((c) => `<li><a href="${c.page}">${esc(c.short)}</a> <span>· ${esc(c.city)}</span></li>`).join("")}</ul>
      </div>
      <div>
        <h4>For applicants</h4>
        <ul>
          <li><a href="positions.html">Positions &amp; eligibility</a></li>
          <li><a href="apply.html">Application form</a></li>
          <li><a href="faq.html">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h4>Key dates</h4>
        <ul>${C.conferences.map((c) => `<li>${esc(c.date)}<br><span>${esc(c.city)}, ${esc(c.country)}</span></li>`).join("")}</ul>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <p>© ${C.site.year} ${esc(C.owner.name)}</p>
      <a href="${C.visitorBadge.link}" target="_blank" rel="noopener"><img src="${C.visitorBadge.img}" alt="${esc(C.visitorBadge.alt)}" height="20" loading="lazy"></a>
    </div>`;
  document.body.append(footer);

  /* ---------- Shared helpers ---------- */
  const STATS_KEY = "committee-stats-v1";
  window.Portal = {
    C, esc,
    rankOf: (title) => (C.titles.find((t) => t.value === title) || {}).rank || 0,
    conf: (id) => C.conferences.find((c) => c.id === id),
    // Loads approved counts from the Apps Script; calls cb(stats) once or twice (cache, then fresh).
    loadStats(cb) {
      let cached = null;
      try { cached = JSON.parse(sessionStorage.getItem(STATS_KEY) || "null"); } catch (e) {}
      cb(cached || {});
      if (!C.SCRIPT_URL) return;
      fetch(C.SCRIPT_URL + "?action=stats").then((r) => r.json()).then((j) => {
        if (!j.ok) return;
        try { sessionStorage.setItem(STATS_KEY, JSON.stringify(j.stats || {})); } catch (e) {}
        cb(j.stats || {});
      }).catch(() => {});
    },
    open(stats, confId, role, slots) {
      const filled = Math.min(((stats[confId] || {})[role]) || 0, slots);
      return { filled, open: slots - filled };
    }
  };
})();
