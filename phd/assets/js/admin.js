/* Admin dashboard (pages/admin.html). Password is checked by Apps Script
   against the ADMIN_PASSWORD Script Property; the page keeps only a short-lived token. */
(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const TKEY = "phd-admin-token";
  const STATUSES = ["Pending", "Card", "Library", "Hidden"];
  const FORM_STATUSES = ["Pending", "Verified", "Returned"];
  const ST = { Pending: "st-pending", Card: "st-card", Approved: "st-card", Library: "st-library", Hidden: "st-hidden", Verified: "st-library", Returned: "st-returned" };
  const LBL = { Pending: "Pending", Card: "Card", Approved: "Card", Library: "Library", Hidden: "Hidden", Verified: "Verified", Returned: "Returned" };
  const chip = (s, priv) => priv ? '<span class="st st-private">Private</span>'
    : `<span class="st ${ST[s] || "st-pending"}">${LBL[s] || esc(s)}</span>`;
  const safeUrl = (u) => (/^https:\/\//i.test(u) ? u : "");

  let token = null, D = null;
  try { token = sessionStorage.getItem(TKEY); } catch (e) {}

  async function api(action, payload = {}) {
    const url = window.PHD_SUBMIT_API;
    if (!url || /PASTE/.test(url)) throw new Error("The service URL is not configured (assets/js/submit-config.js).");
    let res;
    try {
      res = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ action, ...payload }) });
    } catch (e) { throw new Error("Could not reach the server. Check your connection and try again."); }
    const r = await res.json().catch(() => ({ ok: false, error: "Unexpected server response." }));
    if (r.ok === false) {
      const m = r.message || r.error || "The request could not be completed.";
      if (m === "ADMIN_SESSION_EXPIRED") { signOut(true); throw new Error("Your session has expired. Please sign in again."); }
      if (/Invalid API action/i.test(m)) throw new Error("The Apps Script deployment is out of date. Deploy a new version with the latest Code.gs.");
      throw new Error(m);
    }
    return r;
  }
  const msg = (id, t, ok) => { const e = $(id); e.textContent = t || ""; e.className = "msg" + (t ? (ok ? " ok" : " err") : ""); };

  // ---------------- sign in / out
  $("a-pw-toggle").onclick = () => {
    const i = $("a-pw"), show = i.type === "password";
    i.type = show ? "text" : "password"; $("a-pw-toggle").textContent = show ? "Hide" : "Show";
  };
  $("a-form").onsubmit = async (ev) => {
    ev.preventDefault();
    const pw = $("a-pw").value;
    if (!pw) return msg("a-m", "Enter the admin password.");
    const b = $("a-btn"); b.disabled = true; b.textContent = "Signing in…"; msg("a-m", "");
    try {
      const r = await api("admin-login", { password: pw });
      token = r.token; try { sessionStorage.setItem(TKEY, token); } catch (e) {}
      $("a-pw").value = "";
      await load();
    } catch (e) { msg("a-m", e.message); }
    finally { b.disabled = false; b.textContent = "Sign in"; }
  };
  function signOut(expired) {
    if (token && !expired) api("admin-logout", { token }).catch(() => {});
    token = null; D = null; try { sessionStorage.removeItem(TKEY); } catch (e) {}
    $("a-dash").hidden = true; $("a-login").hidden = false; closeModal();
    if (expired) msg("a-m", "Your session has expired. Please sign in again.");
  }
  $("a-logout").onclick = () => signOut(false);
  $("a-refresh").onclick = () => load().catch((e) => msg("a-msg", e.message));

  async function load() {
    const b = $("a-refresh"); b.disabled = true;
    try {
      D = await api("admin-data", { token });
      D.tmap = {}; D.types.forEach((t) => (D.tmap[t.id] = t));
      D.types.sort((a, b) => (a.order || 99) - (b.order || 99));
      D.smap = {}; D.students.forEach((s) => (D.smap[s.id] = s));
      $("a-login").hidden = true; $("a-dash").hidden = false; msg("a-m", "");
      $("a-sheet").href = D.sheetUrl || "#";
      $("a-updated").textContent = "Updated " + (D.updated || new Date().toLocaleString());
      fillFilters(); render();
    } finally { b.disabled = false; }
  }

  // ---------------- helpers
  const sameStage = (a, b) => String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
  const stageOf = (name) => (D.stages || []).find((g) => sameStage(g.name, name));
  const isForm = (s) => /_FORM$/.test(String(s.type || ""));
  const isPriv = (s) => !isForm(s) && !!(D.tmap[s.type] && D.tmap[s.type].private);   // drafts only
  const optsFor = (s) => (isForm(s) ? FORM_STATUSES : STATUSES);
  const when = (s) => s.submittedAt || "";
  const tsOf = (s) => Date.parse(s.ts) || 0;
  const byNew = (a, b) => tsOf(b) - tsOf(a) || String(b.submittedAt).localeCompare(String(a.submittedAt));
  const sName = (id, fb) => (D.smap[id] ? D.smap[id].name : fb || id);
  const titleOf = (s) => s.label ? `${esc(s.label)}${s.title ? " — " + esc(s.title) : ""}` : esc(s.title || "(untitled)");
  const openBtn = (s) => safeUrl(s.link) ? `<a class="btn ghost sb-small" href="${esc(s.link)}" target="_blank" rel="noopener">Open</a>` : "";
  const stBtns = (s) => isPriv(s) ? "" :
    `<div class="adm-st" role="group" aria-label="Set status">${optsFor(s).map((x) =>
      `<button type="button" class="adm-stb ${x === s.status || (x === "Card" && s.status === "Approved") ? "on " + ST[x] : ""}" data-ref="${esc(s.reference)}" data-st="${x}">${x}</button>`).join("")}</div>`;

  function render() {
    const subs = D.submissions.slice().sort(byNew);
    const active = D.students.filter((s) => s.active);
    const weekAgo = Date.now() - 7 * 864e5;
    const pending = subs.filter((s) => !isPriv(s) && (s.status || "Pending") === "Pending");
    const withAny = new Set(subs.map((s) => s.studentId));
    const none = active.filter((s) => !withAny.has(s.id));
    const week = D.history.filter((h) => /^(New|Replaced)$/.test(h.action) && tsOf(h) >= weekAgo).length;

    const fa = stageOf("First Assessment");
    const faStu = fa ? active.filter((st) => sameStage(st.stage, fa.name)) : [];
    const faDone = faStu.filter((st) => fa.docs.every((id) => subs.some((x) => x.studentId === st.id && x.type === id && x.status !== "Returned"))).length;
    const faVer = faStu.filter((st) => fa.docs.every((id) => subs.some((x) => x.studentId === st.id && x.type === id && (x.status === "Verified" || !/_FORM$/.test(id))))).length;
    $("a-kpis").innerHTML = [
      [pending.length, "Waiting for review"], [week, "Submitted in the last 7 days"],
      ...(fa ? [[`${faDone}/${faStu.length}`, `First Assessment: all ${fa.docs.length} documents in${fa.deadline ? " · closes " + esc(fa.deadline) : ""}`],
                [`${faVer}/${faStu.length}`, "First Assessment: forms verified"]]
             : [[subs.length, "Documents (current)"], [`${active.length - none.length}/${active.length}`, "Students who have submitted"]]),
    ].map(([n, l]) => `<div class="stat"><strong>${n}</strong><span>${l}</span></div>`).join("");

    // queue
    $("a-queue-n").textContent = pending.length ? `(${pending.length})` : "";
    $("a-queue").innerHTML = pending.length ? pending.map(rowCard).join("")
      : '<p class="empty-note">Nothing waiting. All public documents have a status.</p>';

    // drafts
    const drafts = subs.filter(isPriv).slice(0, 8);
    $("a-drafts").innerHTML = drafts.length ? drafts.map(rowCard).join("") : '<p class="empty-note">No drafts yet.</p>';

    // matrix
    renderMatrix(active, subs);
    renderAll();
  }

  // ---------------- progress: compact overview, or one stage with only its documents
  let mview = "";
  function renderMatrix(active, subs) {
    const stagesL = (D.stages || []).slice();
    const known = new Set(stagesL.map((g) => g.name.toLowerCase()));
    const groupOf = (st) => stagesL.find((g) => sameStage(g.name, st.stage)) || { name: "No stage set", docs: [] };
    const counts = {};
    active.forEach((st) => { const g = groupOf(st).name; counts[g] = (counts[g] || 0) + 1; });
    const tabs = [["", "Overview", active.length]].concat(stagesL.filter((g) => counts[g.name]).map((g) => [g.name, g.name, counts[g.name]]));
    if (counts["No stage set"]) tabs.push(["No stage set", "No stage set", counts["No stage set"]]);
    if (!tabs.some(([v]) => v === mview)) mview = "";
    $("a-mtabs").innerHTML = tabs.map(([v, l, n]) => `<button type="button" class="chip ${v === mview ? "on" : ""}" data-mv="${esc(v)}">${esc(l)} <small>${n}</small></button>`).join("");

    const mineOf = (st) => subs.filter((x) => x.studentId === st.id);
    const done = (x) => x && x.status !== "Returned";
    const nameCell = (st) => `<th><button class="link-btn" type="button" data-stu="${esc(st.id)}">${esc(st.name)}</button><small>${esc(st.country || st.level)}${st.level && st.level !== "PhD" ? " · " + esc(st.level) : ""}</small></th>`;
    const lastCell = (mine) => `<td class="mx-last">${mine.length ? esc(when(mine[0]).split(",")[0]) : "—"}</td>`;
    const order = (st) => { const k = stagesL.findIndex((g) => sameStage(g.name, st.stage)); return k < 0 ? 99 : k; };

    if (!mview) {
      // one short row per student
      const rows = active.slice().sort((a, b) => order(a) - order(b) || a.name.localeCompare(b.name)).map((st) => {
        const g = groupOf(st), mine = mineOf(st);
        const req = g.docs || [];
        const n = req.filter((id) => done(mine.find((x) => x.type === id))).length;
        const prog = req.length
          ? `<div class="mx-prog"><span class="mx-bar"><i style="width:${Math.round((100 * n) / req.length)}%"></i></span><b>${n}/${req.length}</b></div>`
          : '<span class="muted">—</span>';
        const pend = mine.filter((x) => !isPriv(x) && x.status === "Pending").length;
        const drafts = mine.filter((x) => x.type === "DRAFT").length, arts = mine.filter((x) => x.type === "ARTICLE").length;
        return `<tr>${nameCell(st)}<td><span class="st st-req">${esc(g.name)}</span></td><td>${prog}</td>
          <td class="c">${pend ? `<span class="st st-pending">${pend}</span>` : '<span class="muted">0</span>'}</td>
          <td class="c">${drafts || '<span class="muted">0</span>'}</td><td class="c">${arts || '<span class="muted">0</span>'}</td>${lastCell(mine)}</tr>`;
      }).join("");
      $("a-matrix").className = "adm-matrix mx-overview";
      $("a-matrix").innerHTML = `<thead><tr><th>Student</th><th>Stage</th><th>Required documents</th><th class="c">To review</th><th class="c">Drafts</th><th class="c">Articles</th><th>Last</th></tr></thead><tbody>${rows}</tbody>`;
      return;
    }

    // one stage: only its required documents (plus drafts and articles when nothing is required)
    const g = stagesL.find((x) => x.name === mview) || { name: mview, docs: [] };
    const cols = (g.docs && g.docs.length ? g.docs : ["DRAFT", "ARTICLE"]).map((id) => D.tmap[id]).filter(Boolean);
    const list = active.filter((st) => groupOf(st).name === g.name).sort((a, b) => a.name.localeCompare(b.name));
    const rows = list.map((st) => {
      const mine = mineOf(st);
      const cells = cols.map((t) => {
        const it = mine.filter((x) => x.type === t.id);
        const req = (g.docs || []).includes(t.id);
        if (!it.length) return `<td class="c mx-empty${req ? " mx-req" : ""}">${req ? "✗" : "·"}</td>`;
        const x = it[0], draft = t.private && !t.verify;
        return `<td class="c"><span class="st ${draft ? "st-private" : ST[x.status] || "st-pending"}" title="${esc(x.title || x.label)}">${draft ? "Draft" : LBL[x.status] || esc(x.status)}${it.length > 1 ? " ×" + it.length : ""}</span></td>`;
      }).join("");
      const n = (g.docs || []).filter((id) => done(mine.find((x) => x.type === id))).length;
      return `<tr>${nameCell(st)}${cells}${g.docs && g.docs.length ? `<td class="c"><b>${n}/${g.docs.length}</b></td>` : ""}${lastCell(mine)}</tr>`;
    }).join("");
    $("a-matrix").className = "adm-matrix";
    $("a-matrix").innerHTML = `<caption class="mx-cap">${esc(g.name)}${g.deadline ? ` · deadline <b>${esc(g.deadline)}</b>` : ""}</caption>
      <thead><tr><th>Student</th>${cols.map((t) => `<th class="c" title="${esc(t.label)}">${esc(SHORT[t.id] || t.label)}</th>`).join("")}${g.docs && g.docs.length ? '<th class="c">Done</th>' : ""}<th>Last</th></tr></thead><tbody>${rows}</tbody>`;
  }
  $("a-mtabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-mv]");
    if (b && D) { mview = b.dataset.mv; renderMatrix(D.students.filter((x) => x.active), D.submissions.slice().sort(byNew)); }
  });
  const SHORT = { FA_PROPOSAL: "FA proposal", FA_SLIDES: "FA slides", ETHICS_FORM: "Ethics form", AI_FORM: "AI declaration", LOGBOOK_FORM: "Logbook", NHP_FORM: "NHP checklist", DRAFT: "Drafts", THESIS_EXAM: "Exam thesis",
    VIVA_SLIDES: "Viva slides", THESIS_FINAL: "Final thesis", ARTICLE: "Articles" };

  function rowCard(s) {
    return `<div class="adm-row">
      <div class="adm-main">
        <div class="adm-meta"><b>${esc(sName(s.studentId, s.name))}</b> · ${esc(s.typeLabel || s.type)}${s.version ? " · v" + esc(s.version) : ""} · <span class="muted">${esc(when(s))}</span></div>
        <div class="adm-title">${titleOf(s)}</div>
        ${s.note ? `<div class="adm-note">“${esc(s.note)}”</div>` : ""}
      </div>
      <div class="adm-side">${isPriv(s) ? chip("", true) : ""}${openBtn(s)}${stBtns(s)}</div>
    </div>`;
  }

  // ---------------- all submissions table
  function fillFilters() {
    const keep = (id) => $(id).value;
    const v = [keep("f-student"), keep("f-type"), keep("f-status"), keep("f-stage")];
    const stOpts = (all) => `<option value="">${all}</option>` + (D.stages || []).map((g) => `<option>${esc(g.name)}</option>`).join("");
    $("f-stage").innerHTML = stOpts("All stages");
    $("f-stage").value = v[3];
    $("f-student").innerHTML = '<option value="">All students</option>' +
      D.students.slice().sort((a, b) => a.name.localeCompare(b.name)).map((s) => `<option value="${esc(s.id)}">${esc(s.name)}</option>`).join("");
    $("f-type").innerHTML = '<option value="">All types</option>' + D.types.map((t) => `<option value="${esc(t.id)}">${esc(t.label)}</option>`).join("");
    $("f-status").innerHTML = '<option value="">All statuses</option>' + STATUSES.concat(["Verified", "Returned", "Private"]).map((x) => `<option>${x}</option>`).join("");
    $("f-student").value = v[0]; $("f-type").value = v[1]; $("f-status").value = v[2];
  }
  function filtered() {
    const fg = $("f-stage").value;
    const q = $("f-q").value.trim().toLowerCase(), fs = $("f-student").value, ft = $("f-type").value, fst = $("f-status").value;
    return D.submissions.slice().sort(byNew).filter((s) =>
      (!fs || s.studentId === fs) && (!fg || sameStage((D.smap[s.studentId] || {}).stage, fg)) && (!ft || s.type === ft) &&
      (!fst || (fst === "Private" ? isPriv(s) : !isPriv(s) && (s.status === fst || (fst === "Card" && s.status === "Approved")))) &&
      (!q || [s.title, s.label, s.note, s.name, sName(s.studentId), s.reference, s.typeLabel].join(" ").toLowerCase().includes(q)));
  }
  function renderAll() {
    const list = filtered();
    $("a-all-n").textContent = `(${list.length})`;
    $("a-all").innerHTML = `<thead><tr><th>Date</th><th>Student</th><th>Document</th><th>Title</th><th>Status</th><th></th></tr></thead><tbody>` +
      (list.length ? list.map((s) => `<tr>
        <td data-l="Date">${esc(when(s))}</td>
        <td data-l="Student"><button class="link-btn" type="button" data-stu="${esc(s.studentId)}">${esc(sName(s.studentId, s.name))}</button></td>
        <td data-l="Document">${esc(s.typeLabel || s.type)}${s.version ? ` <small>v${esc(s.version)}</small>` : ""}</td>
        <td data-l="Title">${titleOf(s)}</td>
        <td data-l="Status">${isPriv(s) ? chip("", true) : `<select class="t adm-sel" data-ref="${esc(s.reference)}" aria-label="Status">${optsFor(s).map((x) =>
          `<option${x === s.status || (x === "Card" && s.status === "Approved") ? " selected" : ""}>${x}</option>`).join("")}</select>`}</td>
        <td>${openBtn(s)}</td></tr>`).join("")
        : '<tr><td colspan="6" class="empty-note">No submissions match.</td></tr>') + "</tbody>";
  }
  ["f-q", "f-stage", "f-student", "f-type", "f-status"].forEach((id) => $(id).addEventListener("input", () => D && renderAll()));

  // ---------------- status changes
  async function setStatus(ref, status, el) {
    const s = D.submissions.find((x) => x.reference === ref);
    if (!s || s.status === status) return;
    const old = s.status;
    if (el) el.disabled = true;
    try {
      await api("admin-status", { token, reference: ref, status });
      s.status = status;
      D.history.push(Object.assign({}, s, { action: `Status → ${status} (admin)`, ts: new Date().toISOString(), submittedAt: "just now" }));
      msg("a-msg", `${sName(s.studentId, s.name)} · ${s.typeLabel}: set to ${status}.`, true);
      render(); if (!$("a-modal").hidden) showStudent(s.studentId);
    } catch (e) {
      s.status = old; msg("a-msg", e.message); render();
    } finally { if (el) el.disabled = false; }
  }
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest(".adm-stb");
    if (b && D) return setStatus(b.dataset.ref, b.dataset.st, b);
    const u = ev.target.closest("[data-stu]");
    if (u && D) return showStudent(u.dataset.stu);
  });
  document.addEventListener("change", (ev) => {
    const sel = ev.target.closest(".adm-sel");
    if (sel && D) setStatus(sel.dataset.ref, sel.value, sel);
  });

  // ---------------- student detail
  function showStudent(id) {
    const st = D.smap[id] || { id, name: id };
    const items = D.submissions.filter((s) => s.studentId === id).sort(byNew);
    const hist = D.history.filter((h) => h.studentId === id).sort(byNew);
    $("a-student").innerHTML = `
      <h2 id="a-st-name">${esc(st.name)}</h2>
      <p class="muted-p">${esc([st.level, st.country, st.email].filter(Boolean).join(" · "))}${st.stage ? ` · <span class="st st-req">${esc(st.stage)}</span>` : ""}</p>
      <p class="adm-rt"><b>Research title:</b> ${st.researchTitle ? esc(st.researchTitle) : '<span class="muted">not entered yet</span>'}</p>
      <h3>Current documents (${items.length})</h3>
      ${items.length ? items.map(rowCard).join("") : '<p class="empty-note">Nothing submitted yet.</p>'}
      <h3>History</h3>
      ${hist.length ? `<div class="hist-wrap"><table class="hist"><thead><tr><th>Date</th><th>Action</th><th>Document</th><th>Version</th><th></th></tr></thead><tbody>${hist.map((h) => `<tr>
        <td data-l="Date">${esc(when(h))}</td><td data-l="Action">${esc(h.action)}</td>
        <td data-l="Document">${esc(h.typeLabel)}${h.label || h.title ? `<br><small>${titleOf(h)}</small>` : ""}</td>
        <td data-l="Version">${esc(h.version)}</td><td>${openBtn(h)}</td></tr>`).join("")}</tbody></table></div>`
        : '<p class="empty-note">No history.</p>'}`;
    $("a-modal").hidden = false; document.body.classList.add("adm-noscroll");
    $("a-close").focus();
  }
  function closeModal() { $("a-modal").hidden = true; document.body.classList.remove("adm-noscroll"); }
  $("a-close").onclick = closeModal;
  $("a-modal").addEventListener("click", (ev) => { if (ev.target === $("a-modal")) closeModal(); });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape" && !$("a-modal").hidden) closeModal(); });

  // ---------------- CSV
  $("a-csv").onclick = () => {
    const cols = ["reference", "submittedAt", "studentId", "name", "typeLabel", "label", "title", "version", "status", "link", "note"];
    const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = filtered().map((s) => cols.map((c) => q(c === "name" ? sName(s.studentId, s.name) : c === "status" && isPriv(s) ? "Private" : s[c])).join(","));
    const blob = new Blob(["﻿" + [cols.join(",")].concat(rows).join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "phd-submissions-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  // resume a session in this tab
  if (token) load().catch((e) => { if (token) msg("a-m", e.message); });
})();
