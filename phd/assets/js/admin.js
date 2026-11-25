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
      const [ad, pub] = await Promise.all([api("admin-data", { token }), api("sub-public").catch(() => ({}))]);
      D = ad; D.schedule = pub.schedule || [];
      D.tmap = {}; D.types.forEach((t) => (D.tmap[t.id] = t));
      D.types.sort((a, b) => (a.order || 99) - (b.order || 99));
      D.smap = {}; D.students.forEach((s) => (D.smap[s.id] = s));
      $("a-login").hidden = true; $("a-dash").hidden = false; msg("a-m", "");
      $("a-sheet").href = D.sheetUrl || "#";
      $("a-updated").textContent = "Updated " + fmtD(D.updated || new Date().toISOString(), true);
      fillFilters(); render();
    } finally { b.disabled = false; }
  }

  // ---------------- helpers
  const sameStage = (a, b) => String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
  const stageOf = (name) => (D.stages || []).find((g) => sameStage(g.name, name));
  const isForm = (s) => /_FORM$/.test(String(s.type || ""));
  const isPriv = (s) => !isForm(s) && !!(D.tmap[s.type] && D.tmap[s.type].private);   // drafts only
  const optsFor = (s) => (isForm(s) ? FORM_STATUSES : STATUSES);
  // dates: show DD/MM/YYYY whatever the sheet stored (ISO timestamp, "24 Nov 2026, 1:28 PM", or a Date string)
  const MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  function toDate(v) {
    if (!v) return null;
    const t = String(v), m = t.match(/^(\d{1,2}) (\w{3})\w* (\d{4})(?:,? (\d{1,2}):(\d{2})\s*([AP]M))?/i);
    if (m && MON[m[2].toLowerCase()] != null) {
      let h = +(m[4] || 0); if (m[6]) h = (h % 12) + (/p/i.test(m[6]) ? 12 : 0);
      return new Date(Date.UTC(+m[3], MON[m[2].toLowerCase()], +m[1], h - 8, +(m[5] || 0)));
    }
    const d = new Date(t.replace(/\s*\(.*\)$/, ""));
    return isNaN(d) ? null : d;
  }
  const pad = (n) => String(n).padStart(2, "0");
  function fmtD(v, withTime) {
    const d = toDate(v); if (!d) return String(v || "");
    const my = new Date(d.getTime() + 8 * 3600e3);          // Malaysia time
    const out = `${pad(my.getUTCDate())}/${pad(my.getUTCMonth() + 1)}/${my.getUTCFullYear()}`;
    return withTime ? `${out} ${pad(my.getUTCHours())}:${pad(my.getUTCMinutes())}` : out;
  }
  const when = (s) => fmtD(s.ts && toDate(s.ts) ? s.ts : s.submittedAt);
  const whenT = (s) => fmtD(s.ts && toDate(s.ts) ? s.ts : s.submittedAt, true);
  const ver = (v) => { const x = String(v || "").trim().replace(/^(version|ver\.?|v)\s*/i, ""); return x ? "v" + x : ""; };
  // titles in UPPER CASE are shown in title case (small words lower, known acronyms kept)
  const SMALL = new Set("a an and as at but by for from in into nor of on or per the to via vs with within".split(" "));
  const ACR = new Set("AI IOT NLP LLM LLMS CNN RNN LSTM NMT ML DL UTM GPU API IT ICT SME SMES BIM GIS UAV RFID ERP CRM KPI ESG STEM TVET 5G 6G".split(" "));
  function titleCase(t) {
    t = String(t || "").trim();
    if (!t || /[a-z]/.test(t)) return t;                     // already mixed case: keep the student's casing
    let i = 0;
    return t.toLowerCase().replace(/[A-Za-z0-9][\w']*/g, (w, off) => {
      const up = w.toUpperCase(), first = i++ === 0, afterBreak = /[:–—-]\s*$/.test(t.slice(Math.max(0, off - 2), off)) && t[off - 1] !== "-";
      if (ACR.has(up)) return up === "IOT" ? "IoT" : up === "LLMS" ? "LLMs" : up === "SMES" ? "SMEs" : up;
      if (!first && !afterBreak && SMALL.has(w)) return w;
      return w[0].toUpperCase() + w.slice(1);
    });
  }
  const tsOf = (s) => Date.parse(s.ts) || 0;
  const byNew = (a, b) => tsOf(b) - tsOf(a) || String(b.submittedAt).localeCompare(String(a.submittedAt));
  const sName = (id, fb) => (D.smap[id] ? D.smap[id].name : fb || id);
  const titleOf = (s) => s.label ? `${esc(s.label)}${s.title ? " — " + esc(titleCase(s.title)) : ""}` : esc(titleCase(s.title) || "(untitled)");
  const openBtn = (s) => safeUrl(s.link) ? `<a class="btn ghost sb-small" href="${esc(s.link)}" target="_blank" rel="noopener">Open</a>` : "";
  // review state (from feedback) and website display (Status column) are shown separately
  const REV = { Reviewed: ["st-library", "✓ Reviewed"], Approved: ["st-library", "✓ Approved"], "Needs revision": ["st-returned", "Needs revision"] };
  const revChip = (s) => { const [c, l] = s.feedback ? REV[s.feedback.decision] || REV.Reviewed : ["st-hidden", "Not reviewed"]; return `<span class="st ${c}">${l}</span>`; };
  const WEB = { Pending: "Not decided", Card: "Title only", Approved: "Title only", Library: "In Library", Hidden: "Not shown" };
  const showsOnWeb = (s) => !isPriv(s) && !isForm(s);       // drafts and forms are never public
  const webSel = (s) => !showsOnWeb(s) ? "" :
    `<label class="web-sel"><span>Website</span><select class="t adm-sel" data-ref="${esc(s.reference)}" aria-label="Display on the website">${STATUSES.filter((x) => WEB[x]).map((x) =>
      `<option value="${x}"${x === s.status || (x === "Card" && s.status === "Approved") ? " selected" : ""}>${WEB[x]}</option>`).join("")}</select></label>`;
  const revBtns = (s) => `${s.feedback ? "" : `<button type="button" class="btn primary sb-small" data-rev="${esc(s.reference)}">✓ Mark as reviewed</button>`}<button type="button" class="btn ghost sb-small" data-fb="${esc(s.reference)}">💬 ${s.feedback ? "Update feedback" : "Feedback"}</button>`;

  function render() {
    const subs = D.submissions.slice().sort(byNew);
    const active = D.students.filter((s) => s.active);
    const weekAgo = Date.now() - 7 * 864e5;
    const pending = subs.filter((s) => !s.feedback && (isPriv(s) || (s.status || "Pending") === "Pending"));
    const withAny = new Set(subs.map((s) => s.studentId));
    const none = active.filter((s) => !withAny.has(s.id));
    const week = D.history.filter((h) => /^(New|Replaced)$/.test(h.action) && tsOf(h) >= weekAgo).length;

    const fa = stageOf("First Assessment");
    const faStu = fa ? active.filter((st) => sameStage(st.stage, fa.name)) : [];
    const faDone = faStu.filter((st) => fa.docs.every((id) => subs.some((x) => x.studentId === st.id && x.type === id && x.status !== "Returned"))).length;
    const faVer = faStu.filter((st) => fa.docs.every((id) => subs.some((x) => x.studentId === st.id && x.type === id && (x.status === "Verified" || !/_FORM$/.test(id))))).length;
    renderSessions(subs);
    $("a-kpis").innerHTML = [
      [pending.length, "Waiting for review"], [week, "Submitted in the last 7 days"],
      ...(fa ? [[`${faDone}/${faStu.length}`, `First Assessment: all ${fa.docs.length} documents in${fa.deadline ? " · closes " + esc(fa.deadline) : ""}`],
                [`${faVer}/${faStu.length}`, "First Assessment: forms verified"]]
             : [[subs.length, "Documents (current)"], [`${active.length - none.length}/${active.length}`, "Students who have submitted"]]),
    ].map(([n, l]) => `<div class="stat"><strong>${n}</strong><span>${l}</span></div>`).join("");

    // queue, grouped by student (newest activity first)
    $("a-queue-n").textContent = pending.length || "";
    const byStu = {};
    pending.forEach((x) => (byStu[x.studentId] = byStu[x.studentId] || []).push(x));
    const groups = Object.entries(byStu).sort((a, b) => tsOf(b[1][0]) - tsOf(a[1][0]));
    $("a-queue").innerHTML = groups.length ? groups.map(([id, l], i) => {
      const st = D.smap[id] || {};
      return `<details class="q-group" data-stu-q="${esc(id)}"${openQ.has(id) || (openQ.size === 0 && i === 0) ? " open" : ""}>
        <summary><span class="q-name">${esc(sName(id, l[0].name))}</span>${st.stage ? `<span class="st st-req">${esc(st.stage)}</span>` : ""}
          <span class="q-count">${l.length} item${l.length > 1 ? "s" : ""}</span>${waitTag(l[l.length - 1], "oldest ")}<span class="q-last">latest ${esc(when(l[0]))}</span></summary>
        <div class="q-tools"><button type="button" class="btn ghost sb-small" data-all="${esc(id)}" data-n="${l.length}">✓ Approve all ${l.length}</button><span class="muted">No emails are sent for bulk approval.</span></div>
        ${st.researchTitle ? `<p class="q-rt">${esc(titleCase(st.researchTitle))}</p>` : ""}
        ${l.map(rowCard).join("")}</details>`;
    }).join("") : '<p class="empty-note">Nothing waiting. Every document has feedback or a status.</p>';

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
    const lastCell = (mine) => `<td class="mx-last">${mine.length ? esc(when(mine[0])) : "—"}</td>`;
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
        const pend = mine.filter((x) => !x.feedback).length;
        const drafts = mine.filter((x) => x.type === "DRAFT").length, arts = mine.filter((x) => x.type === "ARTICLE").length;
        return `<tr>${nameCell(st)}<td><span class="st st-req">${esc(g.name)}</span></td><td>${prog}</td>
          <td class="c">${pend ? `<span class="st st-pending">${pend}</span>` : '<span class="muted">0</span>'}</td>
          <td class="c">${drafts || '<span class="muted">0</span>'}</td><td class="c">${arts || '<span class="muted">0</span>'}</td>${lastCell(mine)}</tr>`;
      }).join("");
      $("a-matrix").className = "adm-matrix mx-overview";
      $("a-matrix").innerHTML = `<thead><tr><th>Student</th><th>Stage</th><th>Required documents</th><th class="c">Not reviewed</th><th class="c">Drafts</th><th class="c">Articles</th><th>Last</th></tr></thead><tbody>${rows}</tbody>`;
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
        const x = it[0];
        const [c, l] = x.feedback ? (x.feedback.decision === "Needs revision" ? ["st-returned", "Revise"] : ["st-library", "✓ Reviewed"]) : ["st-pending", "Not yet"];
        return `<td class="c"><span class="st ${c}" title="${esc(x.typeLabel)}">${l}${it.length > 1 ? " ×" + it.length : ""}</span></td>`;
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

  // ---------------- waiting time
  const daysSince = (x) => { const d = toDate(x.ts) || toDate(x.submittedAt); return d ? Math.floor((Date.now() - d.getTime()) / 864e5) : null; };
  function waitTag(x, prefix = "") {
    if (!x || x.feedback) return "";
    const n = daysSince(x); if (n == null) return "";
    const cls = n > 7 ? "w-late" : n >= 3 ? "w-mid" : "w-new";
    return ` <span class="wait ${cls}" title="Submitted ${esc(whenT(x))}">${prefix}${n === 0 ? "today" : n === 1 ? "waiting 1 day" : "waiting " + n + " days"}</span>`;
  }

  // ---------------- upcoming sessions and readiness
  function renderSessions(subs) {
    const box = $("a-sessions");
    if (!box) return;                       // older admin.html without the sessions panel
    const today = new Date(Date.now() + 8 * 3600e3).toISOString().slice(0, 10);
    const up = (D.schedule || []).filter((x) => !x.dateIso || x.dateIso >= today);
    if (!up.length) { box.hidden = true; return; }
    const ok = (x) => x && x.feedback && x.feedback.decision !== "Needs revision";
    box.hidden = false;
    box.innerHTML = `<h3>Upcoming sessions</h3><div class="ses-list">${up.map((x) => {
      const st = D.students.find((y) => sameStage(y.name, x.student)) || {};
      const g = stageOf(x.event) || stageOf(st.stage) || { docs: [] };
      const mine = subs.filter((y) => y.studentId === st.id);
      const items = g.docs.map((id) => mine.find((y) => y.type === id));
      const sub = items.filter((y) => y && y.status !== "Returned").length, rev = items.filter(ok).length, n = g.docs.length;
      const fix = items.filter((y) => y && y.feedback && y.feedback.decision === "Needs revision").length;
      const days = x.dateIso ? Math.round((Date.parse(x.dateIso) - Date.parse(today)) / 864e5) : null;
      const ready = n && rev === n;
      const miss = g.docs.filter((id, i) => !items[i]).map((id) => SHORT[id] || id);
      return `<div class="ses ${ready ? "ready" : days != null && days <= 7 ? "soon" : ""}">
        <div class="ses-when"><b>${esc(x.date ? x.date.replace(/,? \d{4}$/, "") : "TBC")}</b><span>${esc(x.time || "time TBC")}</span>${days != null ? `<small>${days === 0 ? "today" : days === 1 ? "tomorrow" : "in " + days + " days"}</small>` : ""}</div>
        <div class="ses-body"><button class="link-btn" type="button" data-stu="${esc(st.id || "")}">${esc(x.student)}</button> <span class="muted">· ${esc(x.event)}</span>
          ${n ? `<div class="ses-bars"><span>Submitted <b>${sub}/${n}</b></span><span class="mx-bar"><i style="width:${Math.round((100 * sub) / n)}%"></i></span>
            <span>Reviewed <b>${rev}/${n}</b></span><span class="mx-bar"><i style="width:${Math.round((100 * rev) / n)}%"></i></span></div>` : ""}
          <p class="ses-note">${ready ? "✓ Ready: every document has been reviewed." : [miss.length ? "Missing: " + esc(miss.join(", ")) : "", fix ? fix + " need revision" : "", sub - rev - fix > 0 ? (sub - rev - fix) + " waiting for your review" : ""].filter(Boolean).join(" · ")}</p>
        </div></div>`;
    }).join("")}</div>`;
  }

  // ---------------- approve all for one student (two clicks)
  async function approveAll(btn) {
    const id = btn.dataset.all;
    if (!btn.classList.contains("confirm")) {
      btn.classList.add("confirm"); btn.textContent = `Click again to approve ${btn.dataset.n}`;
      setTimeout(() => { if (btn.isConnected && btn.classList.contains("confirm")) { btn.classList.remove("confirm"); btn.textContent = `✓ Approve all ${btn.dataset.n}`; } }, 5000);
      return;
    }
    const list = D.submissions.filter((x) => x.studentId === id && !x.feedback);
    btn.disabled = true; let done = 0;
    for (const s of list) {
      btn.textContent = `Approving ${done + 1}/${list.length}…`;
      try {
        const r = await api("admin-feedback", { token, reference: s.reference, decision: "Approved", link: "", note: "", notify: false });
        s.feedback = r.feedback; if (r.status) s.status = r.status; done++;
      } catch (e) { msg("a-msg", e.message); break; }
    }
    msg("a-msg", `${sName(id)}: ${done} document${done === 1 ? "" : "s"} approved.`, done === list.length);
    render();
  }

  function rowCard(s) {
    return `<div class="adm-row">
      <div class="adm-main">
        <div class="adm-meta"><b>${esc(s.typeLabel || s.type)}</b>${ver(s.version) ? " · " + esc(ver(s.version)) : ""} · <span class="muted" title="${esc(whenT(s))}">${esc(when(s))}</span>${waitTag(s)}</div>
        ${s.label || s.type === "ARTICLE" ? `<div class="adm-title">${titleOf(s)}</div>` : ""}
        ${s.note ? `<div class="adm-note">“${esc(s.note)}”</div>` : ""}
        ${s.feedback ? `<div class="adm-fbline">💬 <span class="st ${s.feedback.decision === "Approved" ? "st-library" : "st-returned"}">${esc(s.feedback.decision)}</span> <small>${esc(fmtD(s.feedback.ts || s.feedback.at))}</small>${safeUrl(s.feedback.link) ? ` · <a href="${esc(s.feedback.link)}" target="_blank" rel="noopener">commented file</a>` : ""}${s.feedback.note ? ` · <span class="muted">${esc(s.feedback.note.slice(0, 90))}${s.feedback.note.length > 90 ? "…" : ""}</span>` : ""}</div>` : ""}
      </div>
      <div class="adm-side">${revChip(s)}${openBtn(s)}${revBtns(s)}${webSel(s)}</div>
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
    $("f-status").innerHTML = '<option value="">All</option><optgroup label="Review"><option value="rev:no">Not reviewed</option><option value="rev:yes">Reviewed</option><option value="rev:fix">Needs revision</option></optgroup>' +
      '<optgroup label="Website">' + ["Pending", "Card", "Library", "Hidden"].map((x) => `<option value="${x}">${WEB[x]}</option>`).join("") + "</optgroup>";
    $("f-student").value = v[0]; $("f-type").value = v[1]; $("f-status").value = v[2];
  }
  function filtered() {
    const fg = $("f-stage").value;
    const q = $("f-q").value.trim().toLowerCase(), fs = $("f-student").value, ft = $("f-type").value, fst = $("f-status").value;
    return D.submissions.slice().sort(byNew).filter((s) =>
      (!fs || s.studentId === fs) && (!fg || sameStage((D.smap[s.studentId] || {}).stage, fg)) && (!ft || s.type === ft) &&
      (!fst || (fst === "rev:no" ? !s.feedback : fst === "rev:yes" ? s.feedback && s.feedback.decision !== "Needs revision" : fst === "rev:fix" ? s.feedback && s.feedback.decision === "Needs revision"
        : showsOnWeb(s) && (s.status === fst || (fst === "Card" && s.status === "Approved")))) &&
      (!q || [s.title, s.label, s.note, s.name, sName(s.studentId), s.reference, s.typeLabel].join(" ").toLowerCase().includes(q)));
  }
  let page = 1; const PER = 20;
  function renderAll() {
    const all = filtered();
    $("a-all-n").textContent = D.submissions.length || "";
    const pages = Math.max(1, Math.ceil(all.length / PER)); if (page > pages) page = pages;
    const list = all.slice((page - 1) * PER, page * PER);
    $("a-pager").innerHTML = all.length > PER ? `<button class="btn ghost sb-small" data-pg="${page - 1}"${page === 1 ? " disabled" : ""}>‹ Prev</button>
      <span>${(page - 1) * PER + 1}–${Math.min(page * PER, all.length)} of ${all.length}</span>
      <button class="btn ghost sb-small" data-pg="${page + 1}"${page === pages ? " disabled" : ""}>Next ›</button>` : all.length ? `<span>${all.length} submission${all.length > 1 ? "s" : ""}</span>` : "";
    $("a-all").innerHTML = `<thead><tr><th>Date</th><th>Student</th><th>Document</th><th>Review</th><th>Website</th><th></th></tr></thead><tbody>` +
      (list.length ? list.map((s) => `<tr>
        <td data-l="Date" title="${esc(whenT(s))}">${esc(when(s))}</td>
        <td data-l="Student"><button class="link-btn" type="button" data-stu="${esc(s.studentId)}">${esc(sName(s.studentId, s.name))}</button></td>
        <td data-l="Document" title="${esc(s.typeLabel)}">${esc(SHORT[s.type] === "Drafts" ? "Draft" : SHORT[s.type] === "Articles" ? "Article" : SHORT[s.type] || s.typeLabel || s.type)}${ver(s.version) ? ` <small>${esc(ver(s.version))}</small>` : ""}${s.label ? `<br><small class="muted">${esc(s.label)}</small>` : s.type === "ARTICLE" && s.title ? `<br><small class="muted">${esc(titleCase(s.title))}</small>` : ""}</td>
        <td data-l="Review">${revChip(s)}${s.feedback ? "" : ` <button type="button" class="link-btn" data-rev="${esc(s.reference)}" title="Mark as reviewed">✓</button>`}</td>
        <td data-l="Website">${showsOnWeb(s) ? webSel(s) : '<span class="muted">—</span>'}</td>
        <td class="adm-acts">${openBtn(s)}<button type="button" class="link-btn" data-fb="${esc(s.reference)}" title="Feedback">💬</button></td></tr>`).join("")
        : '<tr><td colspan="6" class="empty-note">No submissions match.</td></tr>') + "</tbody>";
  }
  ["f-q", "f-stage", "f-student", "f-type", "f-status"].forEach((id) => $(id).addEventListener("input", () => { page = 1; if (D) renderAll(); }));
  $("a-pager").addEventListener("click", (e) => { const b = e.target.closest("[data-pg]"); if (b && !b.disabled) { page = +b.dataset.pg; renderAll(); $("v-submissions").scrollIntoView({ block: "start" }); } });

  // ---------------- pages (hash): #review · #students · #submissions
  const VIEWS = ["review", "students", "submissions"];
  function showView() {
    const v = VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "review";
    VIEWS.forEach((x) => { $("v-" + x).hidden = x !== v; });
    document.querySelectorAll(".adm-nav [data-view]").forEach((a) => { const on = a.dataset.view === v; a.classList.toggle("on", on); a.setAttribute("aria-selected", on); });
  }
  window.addEventListener("hashchange", showView); showView();

  // remember which student groups are open in the review list
  const openQ = new Set();
  $("a-queue").addEventListener("toggle", (e) => { const d = e.target; if (d.dataset && d.dataset.stuQ) d.open ? openQ.add(d.dataset.stuQ) : openQ.delete(d.dataset.stuQ); }, true);
  $("q-expand").onclick = () => document.querySelectorAll(".q-group").forEach((d) => (d.open = true));
  $("q-collapse").onclick = () => document.querySelectorAll(".q-group").forEach((d) => (d.open = false));

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
      msg("a-msg", `${sName(s.studentId, s.name)} · ${s.typeLabel}: website → ${WEB[status] || status}.`, true);
      render(); if (!$("a-modal").hidden) showStudent(s.studentId);
    } catch (e) {
      s.status = old; msg("a-msg", e.message); render();
    } finally { if (el) el.disabled = false; }
  }
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest(".adm-stb");
    if (b && D) return setStatus(b.dataset.ref, b.dataset.st, b);
    const al = ev.target.closest("[data-all]");
    if (al && D) { ev.preventDefault(); return approveAll(al); }
    const rv = ev.target.closest("[data-rev]");
    if (rv && D) return markReviewed(rv.dataset.rev, rv);
    const f = ev.target.closest("[data-fb]");
    if (f && D) return openFeedback(f.dataset.fb);
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
      <p class="adm-rt"><b>Research title:</b> ${st.researchTitle ? esc(titleCase(st.researchTitle)) : '<span class="muted">not entered yet</span>'}</p>
      <h3>Current documents (${items.length})</h3>
      ${items.length ? items.map(rowCard).join("") : '<p class="empty-note">Nothing submitted yet.</p>'}
      <h3>History</h3>
      ${hist.length ? `<div class="hist-wrap"><table class="hist"><thead><tr><th>Date</th><th>Action</th><th>Document</th><th>Version</th><th></th></tr></thead><tbody>${hist.map((h) => `<tr>
        <td data-l="Date">${esc(when(h))}</td><td data-l="Action">${esc(h.action)}</td>
        <td data-l="Document">${esc(h.typeLabel)}${h.label ? `<br><small class="muted">${esc(h.label)}</small>` : h.type === "ARTICLE" && h.title ? `<br><small class="muted">${esc(titleCase(h.title))}</small>` : ""}</td>
        <td data-l="Version">${esc(h.version)}</td><td>${openBtn(h)}</td></tr>`).join("")}</tbody></table></div>`
        : '<p class="empty-note">No history.</p>'}`;
    $("a-modal").hidden = false; document.body.classList.add("adm-noscroll");
    $("a-close").focus();
  }
  function closeModal() { $("a-modal").hidden = true; document.body.classList.remove("adm-noscroll"); }
  $("a-close").onclick = closeModal;
  $("a-modal").addEventListener("click", (ev) => { if (ev.target === $("a-modal")) closeModal(); });
  document.addEventListener("keydown", (ev) => { if (ev.key !== "Escape") return; if (!$("a-fb-modal").hidden) closeFb(); else if (!$("a-modal").hidden) closeModal(); });

  // ---------------- feedback
  let fbRef = null;
  function openFeedback(ref) {
    const s = D.submissions.find((x) => x.reference === ref);
    if (!s) return;
    fbRef = ref;
    $("fb-doc").textContent = `${sName(s.studentId, s.name)} · ${s.typeLabel}${s.version ? " · v" + s.version : ""}${s.label ? " · " + s.label : ""}`;
    $("fb-link").value = (s.feedback && s.feedback.link) || "";
    $("fb-note").value = (s.feedback && s.feedback.note) || "";
    const dec = (s.feedback && s.feedback.decision) || "Needs revision";
    document.querySelectorAll('input[name="fb-dec"]').forEach((r) => (r.checked = r.value === dec));
    $("fb-notify").checked = true; msg("fb-m", "");
    $("a-fb-modal").hidden = false; document.body.classList.add("adm-noscroll"); $("fb-link").focus();
  }
  const closeFb = () => { $("a-fb-modal").hidden = true; if ($("a-modal").hidden) document.body.classList.remove("adm-noscroll"); };
  $("fb-close").onclick = closeFb;
  $("a-fb-modal").addEventListener("click", (ev) => { if (ev.target === $("a-fb-modal")) closeFb(); });
  $("fb-form").onsubmit = async (ev) => {
    ev.preventDefault();
    const link = $("fb-link").value.trim(), note = $("fb-note").value.trim();
    const decision = (document.querySelector('input[name="fb-dec"]:checked') || {}).value;
    if (!link && !note && decision === "Needs revision") return msg("fb-m", "Add the link to the commented file or a note explaining what to revise.");
    if (link && !/^https:\/\//i.test(link)) return msg("fb-m", "The link must start with https://");
    const b = $("fb-btn"); b.disabled = true; b.textContent = "Sending…"; msg("fb-m", "");
    try {
      const r = await api("admin-feedback", { token, reference: fbRef, link, note, decision, notify: $("fb-notify").checked });
      const s = D.submissions.find((x) => x.reference === fbRef);
      s.feedback = r.feedback; if (r.status) s.status = r.status;
      D.history.push(Object.assign({}, s, { action: `Feedback → ${decision} (admin)`, ts: new Date().toISOString(), submittedAt: "just now" }));
      closeFb(); render(); if (!$("a-modal").hidden) showStudent(s.studentId);
      msg("a-msg", `Feedback sent to ${sName(s.studentId, s.name)} (${decision}).` +
        (r.emailed ? " The student has been emailed." : r.emailError ? " Email not sent: " + r.emailError : ""), !r.emailError);
    } catch (e) { msg("fb-m", e.message); }
    finally { b.disabled = false; b.textContent = "Send feedback"; }
  };

  async function markReviewed(ref, el) {
    const s = D.submissions.find((x) => x.reference === ref); if (!s) return;
    el.disabled = true;
    try {
      const r = await api("admin-feedback", { token, reference: ref, decision: "Reviewed", link: "", note: "", notify: false });
      s.feedback = r.feedback; if (r.status) s.status = r.status;
      D.history.push(Object.assign({}, s, { action: "Feedback → Reviewed (admin)", ts: new Date().toISOString() }));
      msg("a-msg", `${sName(s.studentId, s.name)} · ${s.typeLabel}: marked as reviewed.`, true);
      render(); if (!$("a-modal").hidden) showStudent(s.studentId);
    } catch (e) { msg("a-msg", e.message); el.disabled = false; }
  }

  // ---------------- CSV
  $("a-csv").onclick = () => {
    const cols = ["reference", "submittedAt", "studentId", "name", "typeLabel", "label", "title", "version", "status", "link", "note", "feedback"];
    const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = filtered().map((s) => cols.map((c) => q(c === "name" ? sName(s.studentId, s.name) : c === "status" && isPriv(s) ? "Private" : c === "feedback" ? (s.feedback ? s.feedback.decision + " " + (s.feedback.link || "") : "") : s[c])).join(","));
    const blob = new Blob(["﻿" + [cols.join(",")].concat(rows).join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "phd-submissions-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  // resume a session in this tab
  if (token) load().catch((e) => { if (token) msg("a-m", e.message); });
})();
