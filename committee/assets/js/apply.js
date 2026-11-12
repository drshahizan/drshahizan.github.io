(function () {
  const { C, esc, rankOf } = window.Portal;
  const $ = (s) => document.querySelector(s);
  const form = $("#appForm");
  let stats = {};
  let photoData = "";

  if (!C.SCRIPT_URL) $("#demoBanner").hidden = false;

  $("#eligList").innerHTML = Object.entries(C.roles).map(([n, r]) => `<li><strong>${esc(n)}</strong><br>${esc(r.requirement)}</li>`).join("");
  $("#countries").innerHTML = ["Malaysia","China","Japan","Indonesia","Singapore","Thailand","Vietnam","Philippines","Brunei","India","Pakistan","Bangladesh","Sri Lanka","South Korea","Taiwan","Hong Kong","Australia","New Zealand","United Kingdom","Ireland","United States","Canada","Germany","France","Italy","Spain","Portugal","Netherlands","Sweden","Norway","Finland","Poland","Saudi Arabia","United Arab Emirates","Qatar","Jordan","Egypt","Turkey","Iran","Iraq","Nigeria","Kenya","South Africa","Brazil","Mexico"]
    .map((c) => `<option value="${c}">`).join("");
  $("#title").innerHTML = `<option value="">Select…</option>` + C.titles.map((t) => `<option value="${esc(t.value)}">${esc(t.label)}</option>`).join("");
  $("#conference").innerHTML = `<option value="">Select…</option>` + C.conferences.map((c) => `<option value="${c.id}">${esc(c.short)} · ${esc(c.city)}, ${esc(c.date)}</option>`).join("");

  // Pre-select from URL: apply.html?conf=ICBIS2027&role=General%20Chair
  const qs = new URLSearchParams(location.search);
  let wantedRole = qs.get("role") || "";
  if (Portal.conf(qs.get("conf"))) $("#conference").value = qs.get("conf");

  function render() {
    const cf = Portal.conf($("#conference").value);
    const rank = rankOf($("#title").value);
    const prevRole = (form.querySelector("input[name=role]:checked") || {}).value || wantedRole;
    if (!cf) {
      $("#roleOptions").innerHTML = '<p class="hint">Select your academic title and conference first.</p>';
      $("#trackOptions").innerHTML = '<p class="hint">Select a conference first.</p>';
      return;
    }
    $("#roleOptions").innerHTML = cf.positions.map((p) => {
      const rule = C.roles[p.role];
      const ok = rank && rank >= rule.minRank;
      const s = Portal.open(stats, cf.id, p.role, p.slots);
      const why = !rank ? "Select your academic title first" : ok ? rule.requirement : `Requires ${rule.requirement}`;
      const seat = s.open > 0 ? `${s.open} of ${p.slots} open` : "Filled · reserve list";
      return `<label class="role-opt ${ok ? "" : "disabled"}">
        <input type="radio" name="role" value="${esc(p.role)}" ${ok ? "" : "disabled"} ${ok && prevRole === p.role ? "checked" : ""}>
        <span style="flex:1"><b>${esc(p.role)}</b><span class="hint">${esc(why)}${rule.note ? "<br>" + esc(rule.note) : ""}</span></span>
        <span class="badge ${s.open > 0 ? "" : "full"}">${seat}</span>
      </label>`;
    }).join("");
    const prev = [...form.querySelectorAll("input[name=tracks]:checked")].map((i) => i.value);
    $("#trackOptions").innerHTML = cf.tracks.map((t, i) => {
      const v = `Track ${i + 1}: ${t}`;
      return `<label class="check"><input type="checkbox" name="tracks" value="${esc(v)}" ${prev.includes(v) ? "checked" : ""}> ${esc(v)}</label>`;
    }).join("");
  }
  $("#title").addEventListener("change", render);
  $("#conference").addEventListener("change", () => { wantedRole = ""; render(); });

  // Photo: resize to max 600px JPEG.
  $("#photo").addEventListener("change", (e) => {
    const f = e.target.files[0];
    photoData = ""; $("#photoPreview").hidden = true;
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
  $("#webpage").addEventListener("input", (e) => {
    $("#photoReq").textContent = e.target.value.trim() ? "(optional)" : "* required if you have no webpage";
  });

  function validate(d) {
    const errs = [];
    form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
    const need = { title: "Academic title", conference: "Conference", name: "Full name", nationality: "Nationality", affiliation: "University / Department", email: "Email", ieee: "IEEE membership" };
    for (const [k, l] of Object.entries(need)) if (!d[k]) { errs.push(`${l} is required.`); form.elements[k].classList.add("invalid"); }
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { errs.push("Please enter a valid email address."); form.elements.email.classList.add("invalid"); }
    if (d.webpage && !/^https?:\/\/\S+\.\S+/.test(d.webpage)) { errs.push("Webpage must start with http:// or https://"); form.elements.webpage.classList.add("invalid"); }
    if (!d.role) errs.push("Please choose a position you are eligible for.");
    else if (rankOf(d.title) < C.roles[d.role].minRank) errs.push(`${d.role} requires ${C.roles[d.role].requirement}.`);
    if (!d.tracks.length) errs.push("Please choose at least one track.");
    if (!d.webpage && !d.photo) errs.push("Please upload a photo, or provide a personal webpage.");
    if (!d.consent) errs.push("Please tick the confirmation box.");
    return errs;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const cf = Portal.conf(fd.get("conference")) || {};
    const d = {
      title: fd.get("title") || "", conference: fd.get("conference") || "", conferenceName: cf.name || "",
      role: fd.get("role") || "", tracks: fd.getAll("tracks"),
      name: (fd.get("name") || "").trim(), nationality: (fd.get("nationality") || "").trim(),
      affiliation: (fd.get("affiliation") || "").trim(), email: (fd.get("email") || "").trim().toLowerCase(),
      webpage: (fd.get("webpage") || "").trim(), ieee: fd.get("ieee") || "", interests: (fd.get("interests") || "").trim(),
      consent: !!fd.get("consent"), photo: photoData
    };
    const box = $("#formError");
    const errs = validate(d);
    if (errs.length) {
      box.innerHTML = "<strong>Please check the following:</strong><br>" + errs.map(esc).join("<br>");
      box.hidden = false; box.scrollIntoView({ behavior: "smooth", block: "center" }); return;
    }
    box.hidden = true;
    const btn = $("#submitBtn");
    btn.disabled = true; btn.textContent = "Submitting…";
    try {
      if (C.SCRIPT_URL) {
        const res = await fetch(C.SCRIPT_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(d) });
        const out = await res.json();
        if (!out.ok) throw new Error(out.error || "Submission failed.");
      } else {
        console.log("[DEMO] payload", { ...d, photo: d.photo ? `(${d.photo.length} chars)` : "" });
        await new Promise((r) => setTimeout(r, 500));
      }
      try { sessionStorage.removeItem("committee-stats-v1"); } catch (err) {}
      form.hidden = true; $("#success").hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      box.textContent = err.message || "Network error. Please try again."; box.hidden = false;
    } finally {
      btn.disabled = false; btn.textContent = "Submit application";
    }
  });

  $("#againBtn").addEventListener("click", () => {
    form.reset(); photoData = ""; $("#photoPreview").hidden = true; wantedRole = ""; render();
    form.hidden = false; $("#success").hidden = true;
  });

  render();
  Portal.loadStats((s) => { stats = s; render(); });
})();
