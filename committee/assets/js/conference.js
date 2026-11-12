/* Renders a conference page. The page sets <main data-conf="ICBIS2027">. */
(function () {
  const { C, esc, ICON } = window.Portal;
  const main = document.getElementById("main");
  const cf = Portal.conf(main.dataset.conf);
  if (!cf) { main.innerHTML = '<div class="wrap section"><p>Conference not found.</p></div>'; return; }
  document.title = `${cf.short} · Call for Committee Members`;

  main.innerHTML = `
    <section class="hero page-hero">
      <div class="wrap hero-grid">
        <div>
          <div class="crumbs"><a href="index.html">Home</a> / ${esc(cf.short)}</div>
          <span class="eyebrow">${esc(cf.short)} · ${esc(cf.edition)} edition</span>
          <h1 style="max-width:26ch">${esc(cf.name)}</h1>
          <div class="cta-row">
            <a href="apply.html?conf=${cf.id}" class="btn btn-gold">Apply for ${esc(cf.short)}</a>
            <a href="${esc(cf.website)}" class="btn btn-line" target="_blank" rel="noopener">Official website ↗</a>
          </div>
        </div>
        <aside class="facts">
          <div class="fact">${ICON.cal.replace(/15/g, "20")}<div><small>Date</small><strong>${esc(cf.date)}</strong></div></div>
          <div class="fact">${ICON.pin.replace(/15/g, "20")}<div><small>Location</small><strong>${esc(cf.city)}, ${esc(cf.country)}</strong></div></div>
          <div class="fact">${ICON.web.replace(/15/g, "20")}<div><small>Website</small><strong><a href="${esc(cf.website)}" target="_blank" rel="noopener" >${esc(cf.website.replace(/^https?:\/\/(www\.)?|\/$/g, ""))}</a></strong></div></div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div>
          <span class="eyebrow">Conference tracks</span>
          <h2>${cf.tracks.length} tracks</h2>
          <p class="muted">You will be asked to choose one or more tracks that match your expertise.</p>
          <ol class="tracks">${cf.tracks.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>
        </div>
        <div class="card">
          <span class="kicker">Open positions</span>
          <h3 style="margin-top:.4em">Committee positions</h3>
          <div id="slotList"></div>
        </div>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">Eligibility</span>
          <h2>Who can apply for each position</h2>
          <p>The role is advisory and flexible. See <a href="positions.html">Positions</a> for responsibilities and benefits.</p>
        </div>
        <div class="table-wrap"><table>
          <thead><tr><th>Position</th><th>Seats</th><th>Minimum title</th><th>Responsibility</th></tr></thead>
          <tbody>${cf.positions.map((p) => {
            const r = C.roles[p.role];
            return `<tr><td><strong>${esc(p.role)}</strong></td><td>${p.slots}</td><td>${esc(r.requirement)}</td><td class="muted">${esc(r.summary)}</td></tr>`;
          }).join("")}</tbody>
        </table></div>
      </div>
    </section>


    <section class="cta-band">
      <div class="wrap">
        <div><h2>Join the ${esc(cf.short)} committee</h2><p>${esc(cf.date)} · ${esc(cf.city)}, ${esc(cf.country)}</p></div>
        <a href="apply.html?conf=${cf.id}" class="btn btn-gold">Apply now</a>
      </div>
    </section>`;

  Portal.loadStats((stats) => { document.getElementById("slotList").innerHTML = Portal.slotList(cf, stats, true); });
})();
