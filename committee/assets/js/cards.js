/* Shared renderers used by several pages. */
(function () {
  const { C, esc } = window.Portal;
  const ICON = {
    cal: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    pin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    web: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/></svg>'
  };

  Portal.ICON = ICON;

  Portal.slotList = (cf, stats, withApply) => `<ul class="slots">${cf.positions.map((p) => {
    const s = Portal.open(stats, cf.id, p.role, p.slots);
    const full = s.open <= 0;
    return `<li><span>${esc(p.role)}</span>
      <span>${full ? '<span class="badge full">Filled</span>' : `<span class="badge">${s.open} of ${p.slots} open</span>`}
      ${withApply ? ` <a class="btn btn-outline btn-sm" href="apply.html?conf=${cf.id}&role=${encodeURIComponent(p.role)}">Apply</a>` : ""}</span>
      <span class="meter"><span style="width:${(s.filled / p.slots) * 100}%"></span></span></li>`;
  }).join("")}</ul>`;

  Portal.confCard = (cf, stats) => `
    <article class="card conf-card">
      <div class="top">
        <span class="kicker">${esc(cf.short)} · ${esc(cf.edition)} edition</span>
        <h3>${esc(cf.name)}</h3>
        <div class="conf-meta"><span>${ICON.cal}${esc(cf.date)}</span><span>${ICON.pin}${esc(cf.city)}, ${esc(cf.country)}</span></div>
      </div>
      <div class="body">
        <span class="kicker" style="margin-bottom:6px">Committee positions</span>
        ${Portal.slotList(cf, stats, false)}
        <div class="actions">
          <a class="btn btn-navy btn-sm" href="${cf.page}">Conference details</a>
          <a class="btn btn-outline btn-sm" href="apply.html?conf=${cf.id}">Apply for ${esc(cf.short)}</a>
        </div>
      </div>
    </article>`;

  Portal.fillRole = () => {
    const rd = C.roleDescription;
    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    set("roleIntro", esc(rd.intro));
    set("roleAsks", rd.asks.map((a) => `<li>${esc(a)}</li>`).join(""));
    set("roleBenefits", rd.benefits.map((a) => `<li>${esc(a)}</li>`).join(""));
  };
})();
