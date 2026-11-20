/* Submit page: Sign in (graduate email + matric) → Fill in → Receipt.
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
  const step = (n) => {
    ["p1", "p2", "p3"].forEach((p, i) => ($(p).hidden = i !== n - 1));
    ["st1", "st2", "st3"].forEach((s, i) => ($(s).className = i < n - 1 ? "done" : i === n - 1 ? "on" : ""));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const okLink = (u) => /^https:\/\/([a-z0-9-]+\.)*(drive\.google\.com|docs\.google\.com|onedrive\.live\.com|1drv\.ms|sharepoint\.com|github\.com|github\.io)(\/|$)/i.test(u);

  let types = [], cred = null, me = null;

  // ---- Step 1: sign in
  $("pw-toggle").onclick = () => {
    const i = $("matric"), show = i.type === "password";
    i.type = show ? "text" : "password";
    $("pw-toggle").textContent = show ? "Hide" : "Show";
  };
  try { const e = localStorage.getItem("phd-submit-email"); if (e) $("email").value = e; } catch (e) {}

  async function signIn() {
    const email = $("email").value.trim().toLowerCase(), matric = $("matric").value.trim().toUpperCase().replace(/\s/g, "");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return msg("m1", "Enter your graduate email.");
    if (!matric) return msg("m1", "Enter your matric number.");
    const b = $("btn-next"); b.disabled = true; b.textContent = "Signing in…"; msg("m1", "");
    try {
      if (!types.length) types = (await api("sub-config")).types;
      me = await api("sub-login", { email, matric });
      cred = { email, matric };
      try { localStorage.setItem("phd-submit-email", email); } catch (e) {}
      showDashboard(); step(2);
    } catch (e) { msg("m1", e.message); }
    finally { b.disabled = false; b.textContent = "Sign in"; }
  }
  $("login").onsubmit = (e) => { e.preventDefault(); signIn(); };

  // ---- Step 2: choose document + fill in
  function showDashboard() {
    const s = me.student;
    $("who").innerHTML = `<span class="code">${esc(s.level)}</span><h3>${esc(s.name)}</h3><span class="muted-p">${esc(s.email)}</span>`;
    $("welcome").innerHTML = s.registered
      ? `<p class="msg ok">Your email ${esc(s.email)} is now registered. Use it next time you sign in.</p>` : "";
    const done = {};
    me.items.forEach((i) => (done[i.type] = (done[i.type] || 0) + 1));
    $("type").innerHTML = '<option value="">Choose a document…</option>' +
      types.map((t) => `<option value="${esc(t.id)}"${t.open ? "" : " disabled"}>${esc(t.label)}${done[t.id] ? " ✓" : ""}${t.open ? "" : " — closed"}</option>`).join("");
    $("mine").innerHTML = me.items.length
      ? `<details class="mine"><summary>Your submissions (${me.items.length})</summary><ul>${me.items.map((i) =>
          `<li><b>${esc(i.typeLabel)}</b> · ${esc(i.title)}${i.version ? " · " + esc(i.version) : ""} <small>${esc(i.submittedAt)}${i.status !== "Approved" ? " · " + esc(i.status) : ""}</small></li>`).join("")}</ul></details>`
      : `<p class="muted-p">You have not submitted anything yet.</p>`;
    $("form2").hidden = true;
    msg("m2", "");
  }

  $("type").onchange = () => {
    const t = types.find((x) => x.id === $("type").value);
    if (!t) { $("form2").hidden = true; return; }
    const cur = me.items.filter((i) => i.type === t.id);
    const one = !t.multiple && cur[0];
    $("p2-title").textContent = t.label;
    $("cur").innerHTML = cur.length
      ? `<div class="cur">${one
          ? `<b>Already submitted</b> on ${esc(one.submittedAt)} (ref. ${esc(one.reference)}). Submitting again replaces it.`
          : `<b>Already submitted:</b> ${cur.map((c) => esc(c.title)).join("; ")}. The same title is replaced; a new title is added.`}</div>`
      : "";
    $("f-title").value = one ? one.title : "";
    $("f-link").value = one ? one.link : "";
    $("f-version").value = one ? one.version : "";
    $("f-note").value = "";
    $("f-decl").checked = false;
    document.querySelectorAll('input[name="vis"]').forEach((r) => (r.checked = r.value === ((one && one.visibility) || "Public link")));
    $("btn-submit").textContent = one ? "Submit again (replace)" : "Submit";
    $("form2").hidden = false;
    msg("m2", "");
  };

  $("btn-back").onclick = () => { cred = me = null; $("matric").value = ""; msg("m1", ""); step(1); };

  $("btn-submit").onclick = async () => {
    const type = $("type").value;
    const data = {
      title: $("f-title").value.trim(), link: $("f-link").value.trim(), version: $("f-version").value.trim(),
      note: $("f-note").value.trim(), declaration: $("f-decl").checked,
      visibility: (document.querySelector('input[name="vis"]:checked') || {}).value || "Public link",
    };
    if (!type) return msg("m2", "Choose a document.");
    if (data.title.length < 5) return msg("m2", "Enter the document title.");
    if (!okLink(data.link)) return msg("m2", "Enter a full Google Drive or OneDrive link that starts with https://");
    if (!data.declaration) return msg("m2", "Please tick the declaration.");
    const replacing = /replace/i.test($("btn-submit").textContent);
    if (replacing && !confirm("Replace your earlier submission?")) return;
    const b = $("btn-submit"), t = b.textContent; b.disabled = true; b.textContent = "Submitting…"; msg("m2", "");
    try {
      const r = await api("sub-submit", { ...cred, type, data });
      $("receipt").innerHTML = `<h2>✓ Submission received</h2><p class="muted-p">Reference number</p><p class="ref">${esc(r.reference)}</p>
        <dl><dt>Document</dt><dd>${esc(r.type)}</dd><dt>Submitted by</dt><dd>${esc(r.by)}</dd><dt>Time</dt><dd>${esc(r.submittedAt)}</dd>
        ${r.details.map((x) => `<dt>${esc(x.label)}</dt><dd>${esc(x.value)}</dd>`).join("")}</dl>
        <p class="muted-p">${r.status === "Approved" ? "It will appear on the Students page within a few minutes." : "It will appear on the website after your supervisor approves it."}</p>`;
      me = await api("sub-login", cred).catch(() => me);
      step(3);
    } catch (e) { msg("m2", e.message); }
    finally { b.disabled = false; b.textContent = t; }
  };

  $("btn-another").onclick = () => { $("type").value = ""; showDashboard(); step(2); };
  $("btn-print").onclick = () => window.print();
})();
