(function () {
  const C = window.APP_CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rankOf = (title) => (C.titles.find((t) => t.value === title) || {}).rank || 0;
  let stats = {}; // { confId: { role: approvedCount } }

  /* ---------- Static content ---------- */
  $("#orgName").textContent = C.organizer;
  $("#orgFoot").textContent = C.organizer;
  if (C.contactEmail) $("#contactLine").innerHTML = `Questions? <a href="mailto:${esc(C.contactEmail)}">${esc(C.contactEmail)}</a>`;
  $("#roleIntro").textContent = C.roleDescription.intro;
  $("#roleAsks").innerHTML = C.roleDescription.asks.map((a) => `<li>${esc(a)}</li>`).join("");
  $("#roleBenefits").innerHTML = C.roleDescription.benefits.map((a) => `<li>${esc(a)}</li>`).join("");
  $("#eligTable").innerHTML = Object.entries(C.roles)
    .map(([r, d]) => `<div><strong>${esc(r)}</strong><span class="muted">${esc(d.requirement)}</span></div>`).join("");
  $("#countries").innerHTML = ["Malaysia","China","Japan","Indonesia","Singapore","Thailand","Vietnam","Philippines","India","Pakistan","Bangladesh","South Korea","Taiwan","Hong Kong","Australia","New Zealand","United Kingdom","United States","Canada","Germany","France","Italy","Spain","Netherlands","Saudi Arabia","United Arab Emirates","Egypt","Turkey","Iran","Iraq","Nigeria","South Africa","Brazil"]
    .map((c) => `<option value="${c}">`).join("");
  if (!C.SCRIPT_URL) $("#demoBanner").hidden = false;

  function renderConfs() {
    $("#confList").innerHTML = C.conferences.map((cf) => {
      const rows = cf.positions.map((p) => {
        const filled = Math.min((stats[cf.id] || {})[p.role] || 0, p.slots);
        const full = filled >= p.slots;
        return `<div class="pos-row"><span>${esc(p.role)}</span>
          <span class="pill ${full ? "full" : ""}">${full ? "Filled" : `${p.slots - filled} of ${p.slots} open`}</span>
          <div class="bar"><span style="width:${(filled / p.slots) * 100}%"></span></div></div>`;
      }).join("");
      return `<article class="conf" style="--accent:${cf.accent}">
        <span class="tag">${esc(cf.short)}</span>
        <h3>${esc(cf.name)}</h3>
        <div class="meta"><span>📅 ${esc(cf.date)}</span><span>📍 ${esc(cf.location)}</span>
          <a href="${esc(cf.website)}" target="_blank" rel="noopener">Website ↗</a></div>
        <strong class="small">Tracks</strong>
        <ol>${cf.tracks.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>
        <div class="pos">${rows}</div>
        <a class="btn" href="#apply" data-pick="${cf.id}">Apply for ${esc(cf.short)}</a>
      </article>`;
    }).join("");
    document.querySelectorAll("[data-pick]").forEach((a) =>
      a.addEventListener("click", () => { $("#conference").value = a.dataset.pick; onChange(); }));
  }

  /* ---------- Form ---------- */
  const form = $("#appForm");
  $("#title").innerHTML = `<option value="">Select…</option>` + C.titles.map((t) => `<option value="${esc(t.value)}">${esc(t.label)}</option>`).join("");
  $("#conference").innerHTML = `<option value="">Select…</option>` + C.conferences.map((c) => `<option value="${c.id}">${esc(c.short)} · ${esc(c.location)}</option>`).join("");

  function onChange() {
    const conf = C.conferences.find((c) => c.id === $("#conference").value);
    const rank = rankOf($("#title").value);
    const prevRole = (form.querySelector("input[name=role]:checked") || {}).value;

    if (!conf) {
      $("#roleOptions").innerHTML = `<p class="muted small">Select your title and conference first.</p>`;
      $("#trackOptions").innerHTML = `<p class="muted small">Select a conference first.</p>`;
      return;
    }
    $("#roleOptions").innerHTML = conf.positions.map((p) => {
      const rule = C.roles[p.role];
      const eligible = rank && rank >= rule.minRank;
      const filled = ((stats[conf.id] || {})[p.role] || 0) >= p.slots;
      const why = !rank ? "Select your academic title first" : !eligible ? `Requires: ${rule.requirement}` : rule.requirement;
      return `<label class="role-opt ${eligible ? "" : "disabled"}">
        <input type="radio" name="role" value="${esc(p.role)}" ${eligible ? "" : "disabled"} ${eligible && prevRole === p.role ? "checked" : ""}>
        <span><b>${esc(p.role)}</b><span class="muted small">${esc(why)}${filled ? " · All positions filled — you may still apply as reserve" : ""}${rule.note ? "<br>" + esc(rule.note) : ""}</span></span>
      </label>`;
    }).join("");
    const prevTracks = [...form.querySelectorAll("input[name=tracks]:checked")].map((i) => i.value);
    $("#trackOptions").innerHTML = conf.tracks.map((t, i) =>
      `<label class="check"><input type="checkbox" name="tracks" value="Track ${i + 1}: ${esc(t)}" ${prevTracks.includes(`Track ${i + 1}: ${t}`) ? "checked" : ""}> Track ${i + 1}: ${esc(t)}</label>`).join("");
  }
  $("#title").addEventListener("change", onChange);
  $("#conference").addEventListener("change", onChange);

  // Photo: resize to max 600px JPEG
  let photoData = "";
  $("#photo").addEventListener("change", (e) => {
    const f = e.target.files[0];
    photoData = "";
    $("#photoPreview").hidden = true;
    if (!f) return;
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, 600 / Math.max(img.width, img.height));
      const cv = document.createElement("canvas");
      cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      photoData = cv.toDataURL("image/jpeg", 0.85);
      $("#photoPreview").src = photoData; $("#photoPreview").hidden = false;
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(f);
  });
  $("#webpage").addEventListener("input", (e) => { $("#photoReq").textContent = e.target.value.trim() ? "(optional)" : "* (required if no webpage)"; });

  function validate(d) {
    const errs = [];
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
    const need = { title: "Academic title", conference: "Conference", name: "Full name", nationality: "Nationality", affiliation: "University / Department", email: "Email", ieee: "IEEE membership" };
    for (const [k, l] of Object.entries(need)) if (!d[k]) { errs.push(`${l} is required.`); form.elements[k].classList.add("invalid"); }
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { errs.push("Please enter a valid email."); form.elements.email.classList.add("invalid"); }
    if (d.webpage && !/^https?:\/\/\S+\.\S+/.test(d.webpage)) { errs.push("Webpage must start with http:// or https://"); form.elements.webpage.classList.add("invalid"); }
    if (!d.role) errs.push("Please choose a position you are eligible for.");
    else if (rankOf(d.title) < C.roles[d.role].minRank) errs.push(`${d.role} requires: ${C.roles[d.role].requirement}.`);
    if (!d.tracks.length) errs.push("Please choose at least one track.");
    if (!d.webpage && !d.photo) errs.push("A photo is required if you do not have a personal webpage.");
    if (!d.consent) errs.push("Please tick the confirmation box.");
    return errs;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const conf = C.conferences.find((c) => c.id === fd.get("conference")) || {};
    const d = {
      title: fd.get("title") || "", conference: fd.get("conference") || "", conferenceName: conf.name || "",
      role: fd.get("role") || "", tracks: fd.getAll("tracks"),
      name: (fd.get("name") || "").trim(), nationality: (fd.get("nationality") || "").trim(),
      affiliation: (fd.get("affiliation") || "").trim(), email: (fd.get("email") || "").trim().toLowerCase(),
      webpage: (fd.get("webpage") || "").trim(), ieee: fd.get("ieee") || "", interests: (fd.get("interests") || "").trim(),
      consent: !!fd.get("consent"), photo: photoData
    };
    const errs = validate(d);
    const box = $("#formError");
    if (errs.length) { box.innerHTML = errs.map(esc).join("<br>"); box.hidden = false; box.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    box.hidden = true;

    const btn = $("#submitBtn");
    btn.disabled = true; btn.textContent = "Submitting…";
    try {
      if (C.SCRIPT_URL) {
        const res = await fetch(C.SCRIPT_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(d) });
        const out = await res.json();
        if (!out.ok) throw new Error(out.error || "Submission failed.");
      } else {
        console.log("[DEMO] Submission payload:", { ...d, photo: d.photo ? `(${d.photo.length} chars)` : "" });
        await new Promise((r) => setTimeout(r, 600));
      }
      form.hidden = true; $("#success").hidden = false;
      $("#success").scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      box.textContent = err.message || "Network error — please try again."; box.hidden = false;
    } finally {
      btn.disabled = false; btn.textContent = "Submit application";
    }
  });

  $("#againBtn").addEventListener("click", () => {
    form.reset(); photoData = ""; $("#photoPreview").hidden = true; onChange();
    form.hidden = false; $("#success").hidden = true;
  });

  /* ---------- Live stats ---------- */
  renderConfs();
  if (C.SCRIPT_URL) {
    fetch(C.SCRIPT_URL + "?action=stats").then((r) => r.json())
      .then((j) => { if (j.ok) { stats = j.stats || {}; renderConfs(); onChange(); } })
      .catch(() => {});
  }
})();
