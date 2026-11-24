/* Submit page: sign in → dashboard (research title + documents) → form → receipt.
   Backed by Google Apps Script (apps-script/Code.gs). */
(function () {
  const SVC_DOWN = "The submission service is not available yet. Please try again later or contact your supervisor.";
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  async function api(action, payload = {}) {
    const url = window.PHD_SUBMIT_API;
    if (!url || /PASTE/.test(url)) throw new Error(SVC_DOWN);
    let res;
    try {
      res = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action, ...payload }) });
    } catch (e) {
      throw new Error("Could not reach the server. Check your connection and try again.");
    }
    const r = await res.json().catch(() => ({ ok: false, error: "Unexpected server response." }));
    if (!res.ok || r.ok === false) {
      const m = r.message || r.error || "The request could not be completed.";
      throw new Error(/Invalid API action/i.test(m)
        ? "This page is out of date. Please refresh it (Ctrl+Shift+R, or Cmd+Shift+R on Mac) and try again."
        : m);
    }
    return r;
  }

  const msg = (id, t, ok) => { const e = $(id); e.textContent = t || ""; e.className = "msg" + (t ? (ok ? " ok" : " err") : ""); };
  const okLink = (u) => /^https:\/\/([a-z0-9-]+\.)*(drive\.google\.com|docs\.google\.com|onedrive\.live\.com|1drv\.ms|sharepoint\.com|github\.com|github\.io)(\/|$)/i.test(u);
  const initials = (n) => n.replace(/\b(binti|bin|bte)\b/gi, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const busy = (b, on, label) => { b.disabled = on; if (label) b.textContent = label; };
  const STATUS = {
    Pending: ["st-pending", "Pending"], Card: ["st-card", "On your card"], Approved: ["st-card", "On your card"],
    Library: ["st-library", "In Library"], Hidden: ["st-hidden", "Not shown"], Replaced: ["st-hidden", "Replaced"],
  };
  // Forms (type ID ends in _FORM) are verified by the supervisor and never shown publicly.
  const isForm = (id) => /_FORM$/.test(String(id || ""));
  const FORM_ST = {
    Verified: ["st-library", "Verified ✓"], Returned: ["st-returned", "Returned for correction"],
    Pending: ["st-pending", "Awaiting review"], Replaced: ["st-hidden", "Replaced"],
  };
  // review status shown to the student (from the supervisor's feedback)
  const REVIEW = {
    none: ["st-pending", "Awaiting review"], Reviewed: ["st-library", "Reviewed ✓"],
    Approved: ["st-library", "Approved ✓"], "Needs revision": ["st-returned", "Needs revision"],
  };
  const reviewOf = (x) => (x.feedback ? REVIEW[x.feedback.decision] || REVIEW.Reviewed : REVIEW.none);
  const chip = (it, ty) => {
    if (isForm(ty.id)) { const [c, l] = it.feedback ? reviewOf(it) : FORM_ST[it.status] || FORM_ST.Pending; return `<span class="st ${c}">${l}</span>`; }
    const [rc, rl] = reviewOf(it);
    const rev = `<span class="st ${rc}">${rl}</span>`;
    const web = !ty.private && /^(Card|Approved|Library)$/.test(it.status) ? ` <span class="st st-card">${STATUS[it.status][1]}</span>` : "";
    return rev + web;
  };

  let types = [], cred = null, me = null, current = null; // current = {type, item}

  // ---------------- sign in
  $("pw-toggle").onclick = () => {
    const i = $("matric"), show = i.type === "password";
    i.type = show ? "text" : "password";
    $("pw-toggle").textContent = show ? "Hide" : "Show";
  };
  try { const e = localStorage.getItem("phd-submit-email"); if (e) $("email").value = e; } catch (e) {}

  $("login").onsubmit = async (ev) => {
    ev.preventDefault();
    const email = $("email").value.trim().toLowerCase(), matric = $("matric").value.trim().toUpperCase().replace(/\s/g, "");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return msg("m1", "Enter your graduate email.");
    if (!matric) return msg("m1", "Enter your matric number.");
    const b = $("btn-login"); busy(b, true, "Signing in…"); msg("m1", "");
    try {
      if (!types.length) types = (await api("sub-config")).types;
      me = await api("sub-login", { email, matric });
      cred = { email, matric };
      try { localStorage.setItem("phd-submit-email", email); } catch (e) {}
      $("p1").hidden = true; $("p2").hidden = false;
      renderProfile(); renderTitle(); renderDocs(); renderHistory(); showTab("docs");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) { msg("m1", e.message); }
    finally { busy(b, false, "Sign in"); }
  };

  $("btn-logout").onclick = () => {
    cred = me = current = null;
    $("matric").value = ""; msg("m1", "");
    $("p2").hidden = true; $("p1").hidden = false;
    $("form").hidden = $("receipt").hidden = true;
  };

  // ---------------- profile + research title
  function renderProfile() {
    const s = me.student;
    $("me-initials").textContent = initials(s.name);
    $("me-name").textContent = s.name;
    $("me-meta").textContent = s.level + " · " + s.email;
    $("welcome").hidden = !s.registered;
    if (s.registered) $("welcome").textContent = "Your email " + s.email + " is now registered. Use it next time you sign in.";
  }

  function renderTitle(editing) {
    const t = me.student.researchTitle;
    const edit = editing || !t;
    $("title-text").hidden = edit;
    $("title-text").textContent = t || "";
    $("btn-edit-title").hidden = edit;
    $("title-form").hidden = !edit;
    $("btn-cancel-title").hidden = !t;
    if (edit) { $("f-rtitle").value = t || ""; if (!t) msg("m-title", "Save your research title before submitting a proposal, slides or thesis."); }
  }
  $("btn-edit-title").onclick = () => { msg("m-title", ""); renderTitle(true); $("f-rtitle").focus(); };
  $("btn-cancel-title").onclick = () => { msg("m-title", ""); renderTitle(false); };
  $("btn-save-title").onclick = async () => {
    const title = $("f-rtitle").value.trim().replace(/\s+/g, " ");
    if (title.length < 10) return msg("m-title", "Enter your full research title.");
    const b = $("btn-save-title"); busy(b, true, "Saving…");
    try {
      const r = await api("sub-title", { ...cred, title });
      me.student.researchTitle = r.researchTitle; me.items = r.items;
      renderTitle(false); renderDocs();
      msg("m-title", "Research title saved.", true);
    } catch (e) { msg("m-title", e.message); }
    finally { busy(b, false, "Save title"); }
  };

  // ---------------- stage panel (Students › Stage + Stages tab)
  const DAY = 864e5;
  function deadlineInfo(iso, text) {
    if (!/^\d{4}-\d\d-\d\d$/.test(iso || "")) {        // fall back to the display date, e.g. "24 Nov 2026"
      const t = Date.parse(text || "");
      if (!t) return null;
      const d = new Date(t); iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
    const end = new Date(iso + "T23:59:59+08:00").getTime();
    const todayMY = new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);   // calendar date in Malaysia
    const left = Math.round((Date.parse(iso) - Date.parse(todayMY)) / DAY);
    const nice = new Date(iso + "T12:00:00+08:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    return { nice, left, closed: Date.now() > end };
  }
  const isDone = (it) => it && it.status !== "Returned";
  function renderStage() {
    const st = me.stage, box = $("stage");
    if (!st) { box.hidden = true; return; }
    const docs = st.docs.map((id) => types.find((t) => t.id === id)).filter(Boolean);
    const rows = docs.map((t) => {
      const it = me.items.find((i) => i.type === t.id);
      return `<li class="${isDone(it) ? "done" : ""}"><span class="stg-tick" aria-hidden="true">${isDone(it) ? "✓" : ""}</span>
        <span class="stg-name">${esc(t.label.replace(/ · First Assessment$/, ""))}</span>
        ${it ? chip(it, t) : '<span class="st st-hidden">Not submitted</span>'}
        ${t.open ? `<button class="link-btn" data-open="${esc(t.id)}"${it && !t.multiple ? ` data-ref="${esc(it.reference)}"` : ""}>${it && !t.multiple ? "Replace" : "Submit"}</button>` : ""}</li>`;
    }).join("");
    const n = docs.filter((t) => isDone(me.items.find((i) => i.type === t.id))).length;
    const nr = docs.filter((t) => { const it = me.items.find((i) => i.type === t.id); return it && it.feedback && it.feedback.decision !== "Needs revision"; }).length;
    const d = deadlineInfo(st.deadlineIso, st.deadline);
    const dl = d ? `<p class="stg-dl ${d.closed ? "closed" : d.left <= 3 ? "soon" : ""}">${d.closed ? "Closed" : "Deadline"}: <b>${esc(d.nice)}</b>${d.closed ? "" : ` · ${d.left <= 0 ? "today" : d.left === 1 ? "1 day left" : d.left + " days left"}`}</p>` : "";
    box.innerHTML = `<div class="stg-head"><div><p class="stg-k">Your stage</p><h3>${esc(st.name)}</h3></div>
        ${docs.length ? `<div class="stg-prog"><b>${n}/${docs.length}</b><span>submitted</span></div><div class="stg-prog"><b>${nr}/${docs.length}</b><span>reviewed</span></div>` : ""}</div>
      ${(me.schedule || []).map((x) => `<p class="stg-sched">📅 <b>Your ${esc(x.event)}:</b> ${esc(x.date)}${x.time ? ", " + esc(x.time) : " (time to be confirmed)"}<br><span>📍 ${esc(x.venue)}</span></p>`).join("")}
      ${dl}${st.note ? `<p class="stg-note">${esc(st.note)}</p>` : ""}
      ${docs.length ? `<div class="stg-bar"><i style="width:${Math.round((100 * n) / docs.length)}%"></i></div><ul class="stg-list">${rows}</ul>` : ""}
      ${st.name === "First Assessment" ? '<p class="stg-more"><a href="first-assessment.html">Requirements, forms and Turnitin →</a></p>' : ""}`;
    box.hidden = false;
  }

  // ---------------- supervisor feedback
  const safe = (u) => (/^https:\/\//i.test(u || "") ? u : "");
  const fbBox = (f) => !f ? "" : f.decision === "Reviewed" && !f.note && !f.link
    ? `<div class="fb fb-ok"><p class="fb-h">✓ <b>Reviewed by your supervisor</b> · <small>${esc(String(f.at).split(",")[0])}</small></p></div>`
    : `<div class="fb ${f.decision === "Needs revision" ? "fb-rev" : "fb-ok"}">
      <p class="fb-h">💬 <b>Supervisor feedback</b> · <span>${esc(f.decision)}</span> · <small>${esc(String(f.at).split(",")[0])}</small></p>
      ${f.note ? `<p class="fb-note">${esc(f.note)}</p>` : ""}
      ${safe(f.link) ? `<a class="btn ghost sb-small" href="${esc(f.link)}" target="_blank" rel="noopener">Open commented file</a>` : ""}
      ${f.decision === "Needs revision" ? '<p class="fb-tip">Revise the document, then use <b>Replace</b> to submit the new version.</p>' : ""}
    </div>`;

  // ---------------- documents dashboard
  function renderDocs() {
    renderStage();
    const need = new Set((me.stage && me.stage.docs) || []);
    const ordered = types.filter((t) => need.has(t.id)).concat(types.filter((t) => !need.has(t.id)));
    $("docs").innerHTML = ordered.map((t) => {
      const items = me.items.filter((i) => i.type === t.id);
      const head = `<div class="doc-head"><h4>${esc(t.label)}</h4>${need.has(t.id) ? '<span class="st st-req">Your stage</span>' : ""}${t.open ? "" : '<span class="st st-hidden">Closed</span>'}</div>`;
      if (t.multiple) {
        const list = items.map((it) => `<li>
            <div><b>${esc(t.entry === "label" ? it.label : it.title)}</b>
            <small>${esc(it.submittedAt)}${it.version ? " · " + esc(it.version) : ""}</small></div>
            ${chip(it, t)}
            ${t.open ? `<button class="link-btn" data-open="${esc(t.id)}" data-ref="${esc(it.reference)}">Replace</button>` : ""}
            ${it.feedback ? `<div class="fb-wrap">${fbBox(it.feedback)}</div>` : ""}
          </li>`).join("");
        return `<div class="doc">${head}${list ? `<ul class="doc-items">${list}</ul>` : '<p class="doc-none">None yet.</p>'}
          ${t.open ? `<button class="btn ghost sb-small" data-open="${esc(t.id)}">+ Add ${t.entry === "label" ? "a draft" : "an article"}</button>` : ""}</div>`;
      }
      const it = items[0];
      return `<div class="doc">${head}
        <div class="doc-row">
          <div>${it ? `<small>Submitted ${esc(it.submittedAt)}${it.version ? " · " + esc(it.version) : ""}</small>` : '<small class="doc-none">Not submitted</small>'}</div>
          ${it ? chip(it, t) : ""}
          ${t.open ? `<button class="btn ${it ? "ghost" : "primary"} sb-small" data-open="${esc(t.id)}"${it ? ` data-ref="${esc(it.reference)}"` : ""}>${it ? "Replace" : "Submit"}</button>` : ""}
        </div>${it ? fbBox(it.feedback) : ""}</div>`;
    }).join("");
  }

  // ---------------- tabs + history (all versions)
  function showTab(which) {
    const docs = which === "docs";
    $("tab-docs").classList.toggle("on", docs); $("tab-docs").setAttribute("aria-selected", docs);
    $("tab-hist").classList.toggle("on", !docs); $("tab-hist").setAttribute("aria-selected", !docs);
    $("panel-docs").hidden = !docs; $("panel-hist").hidden = docs;
  }
  $("tab-docs").onclick = () => showTab("docs");
  $("tab-hist").onclick = () => showTab("hist");

  function renderHistory() {
    const h = me.history || [];
    $("hist-count").textContent = h.length ? "(" + h.length + ")" : "";
    if (!h.length) { $("hist").innerHTML = '<tbody><tr><td class="doc-none">Nothing submitted yet.</td></tr></tbody>'; return; }
    $("hist").innerHTML = `<thead><tr><th>Date</th><th>Document</th><th>Version</th><th>Review</th><th>Feedback</th><th>Reference</th><th></th></tr></thead><tbody>` +
      h.map((x, i) => {
        const what = x.type === "ARTICLE" ? x.title : x.type === "DRAFT" ? x.label : "";
        const [c, l] = !x.current && !x.feedback ? ["st-hidden", "Replaced"] : reviewOf(x);
        return `<tr class="${x.current ? "" : "old"}">
          <td data-l="Date">${esc(x.submittedAt)}</td>
          <td data-l="Document"><b>${esc(x.typeLabel)}</b>${what ? `<br><span class="muted">${esc(what)}</span>` : ""}</td>
          <td data-l="Version">${esc(x.version || "–")}</td>
          <td data-l="Review"><span class="st ${c}">${l}</span></td>
          <td data-l="Feedback">${x.feedback ? `${x.feedback.note ? `<span class="hist-note">${esc(x.feedback.note.slice(0, 80))}${x.feedback.note.length > 80 ? "…" : ""}</span>` : ""}${safe(x.feedback.link) ? ` <a href="${esc(x.feedback.link)}" target="_blank" rel="noopener">Commented file</a>` : ""}${!x.feedback.note && !safe(x.feedback.link) ? '<span class="muted">–</span>' : ""}` : '<span class="muted">–</span>'}</td>
          <td data-l="Reference"><code>${esc(x.reference)}</code></td>
          <td class="hist-act">${x.link ? `<a href="${esc(x.link)}" target="_blank" rel="noopener">Open</a>` : ""}<button type="button" class="link-btn" data-receipt="${i}">Receipt</button></td>
        </tr>`;
      }).join("") + "</tbody>";
  }
  $("hist").addEventListener("click", (e) => {
    const b = e.target.closest("[data-receipt]");
    if (!b) return;
    const x = me.history[+b.dataset.receipt];
    const what = x.type === "ARTICLE" ? ["Article title", x.title] : x.type === "DRAFT" ? ["Label", x.label] : ["Research title", x.title];
    $("receipt").innerHTML = `<h2>Submission receipt</h2><p class="muted-p">Reference number</p><p class="ref">${esc(x.reference)}</p>
      <dl><dt>Document</dt><dd>${esc(x.typeLabel)}</dd><dt>Submitted by</dt><dd>${esc(me.student.name)}</dd><dt>Time</dt><dd>${esc(x.submittedAt)}</dd>
      <dt>${what[0]}</dt><dd>${esc(what[1])}</dd><dt>Link</dt><dd>${esc(x.link)}</dd><dt>Version</dt><dd>${esc(x.version || "-")}</dd></dl>
      <div class="sb-actions no-print"><button class="btn primary sb-small" id="btn-done" type="button">Close</button>
      <button class="btn ghost sb-small" id="btn-print" type="button">Print or save receipt</button></div>`;
    $("form").hidden = true; $("receipt").hidden = false;
    $("btn-done").onclick = () => { $("receipt").hidden = true; };
    $("btn-print").onclick = () => window.print();
    $("receipt").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const onOpen = (e) => {
    const b = e.target.closest("[data-open]");
    if (!b) return;
    const t = types.find((x) => x.id === b.dataset.open);
    const it = b.dataset.ref ? me.items.find((i) => i.reference === b.dataset.ref) : null;
    if (t.entry === "research" && !me.student.researchTitle) {
      renderTitle(true); msg("m-title", "Save your research title first."); $("f-rtitle").focus(); return;
    }
    openForm(t, it);
  };
  $("docs").addEventListener("click", onOpen);
  $("stage").addEventListener("click", onOpen);

  function openForm(t, it) {
    current = { type: t, item: it };
    $("receipt").hidden = true;
    $("form-title").textContent = (it ? "Replace · " : "") + t.label;
    $("row-label").hidden = t.entry !== "label";
    $("row-atitle").hidden = t.entry !== "title";
    $("f-label").value = it && t.entry === "label" ? it.label : "";
    $("f-atitle").value = it && t.entry === "title" ? it.title : "";
    $("f-link").value = it ? it.link : "";
    $("f-form-help").hidden = !isForm(t.id);
    $("f-version").value = "";
    $("f-note").value = "";
    $("f-decl").checked = false;
    $("form-cur").hidden = !(t.entry === "research" || it);
    $("form-cur").innerHTML = t.entry === "research"
      ? `Research title: <b>${esc(me.student.researchTitle)}</b>`
      : it ? `Replacing the version submitted on ${esc(it.submittedAt)}.` : "";
    $("btn-submit").textContent = it ? "Submit and replace" : "Submit";
    msg("m2", "");
    $("form").hidden = false;
    $("form").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $("btn-close").onclick = () => { $("form").hidden = true; current = null; };

  $("btn-submit").onclick = async () => {
    const t = current.type;
    const data = {
      link: $("f-link").value.trim(), version: $("f-version").value.trim(), note: $("f-note").value.trim(),
      declaration: $("f-decl").checked,
    };
    if (t.entry === "label") { data.label = $("f-label").value.trim(); if (data.label.length < 2) return msg("m2", "Enter a short label, e.g. “Chapter 3”."); }
    if (t.entry === "title") { data.title = $("f-atitle").value.trim(); if (data.title.length < 5) return msg("m2", "Enter the article title."); }
    if (!okLink(data.link)) return msg("m2", "Enter a full Google Drive or OneDrive link that starts with https://");
    if (!data.declaration) return msg("m2", "Please tick the declaration.");
    const b = $("btn-submit"), label = b.textContent; busy(b, true, "Submitting…"); msg("m2", "");
    try {
      const r = await api("sub-submit", { ...cred, type: t.id, data });
      $("receipt").innerHTML = `<h2>✓ Submission received</h2><p class="muted-p">Reference number</p><p class="ref">${esc(r.reference)}</p>
        <dl><dt>Document</dt><dd>${esc(r.type)}</dd><dt>Submitted by</dt><dd>${esc(r.by)}</dd><dt>Time</dt><dd>${esc(r.submittedAt)}</dd>
        ${r.details.map((x) => `<dt>${esc(x.label)}</dt><dd>${esc(x.value)}</dd>`).join("")}</dl>
        <p class="muted-p">${isForm(t.id) ? "Your supervisor will verify this form. It is never shown on the website." : r.private ? "Drafts are seen by your supervisor only." : "Your supervisor will decide whether it is shown on the website."}</p>
        <div class="sb-actions no-print"><button class="btn primary sb-small" id="btn-done" type="button">Back to my documents</button>
        <button class="btn ghost sb-small" id="btn-print" type="button">Print or save receipt</button></div>`;
      $("form").hidden = true; $("receipt").hidden = false;
      $("btn-done").onclick = () => { $("receipt").hidden = true; window.scrollTo({ top: 0, behavior: "smooth" }); };
      $("btn-print").onclick = () => window.print();
      me = await api("sub-login", cred).catch(() => me);
      renderDocs(); renderHistory();
      $("receipt").scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) { msg("m2", e.message); }
    finally { busy(b, false, label); }
  };
})();
