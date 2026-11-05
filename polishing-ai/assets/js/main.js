/* Polishing Your Draft Article Using AI Tools: site scripts */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- Light / dark theme ---- */
  var THEME_KEY = "polish-theme";
  try { var t = localStorage.getItem(THEME_KEY); if (t) root.dataset.theme = t; } catch (e) {}
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var dark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = dark ? "light" : "dark";
      try { localStorage.setItem(THEME_KEY, root.dataset.theme); } catch (e) {}
    });
  }

  /* ---- Mobile menu ---- */
  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Checklists (module pages and pre-submission checklist) ---- */
  document.querySelectorAll("[data-checklist]").forEach(function (list) {
    var key = "polish-check-" + list.dataset.checklist;
    var state = {};
    try { state = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) {}
    var boxes = list.querySelectorAll("input[type=checkbox]");
    var counter = document.querySelector('[data-progress="' + list.dataset.checklist + '"]');

    function update() {
      var done = 0;
      boxes.forEach(function (b) { if (b.checked) done++; });
      if (counter) {
        counter.querySelector(".count").textContent = done + " of " + boxes.length + " completed";
        counter.querySelector(".bar span").style.width = (done / boxes.length * 100) + "%";
      }
    }
    boxes.forEach(function (b) {
      if (state[b.id]) { b.checked = true; b.closest("li").classList.add("done"); }
      b.addEventListener("change", function () {
        state[b.id] = b.checked;
        b.closest("li").classList.toggle("done", b.checked);
        try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
        update();
      });
    });
    var reset = document.querySelector('[data-reset="' + list.dataset.checklist + '"]');
    if (reset) reset.addEventListener("click", function () {
      state = {};
      try { localStorage.removeItem(key); } catch (e) {}
      boxes.forEach(function (b) { b.checked = false; b.closest("li").classList.remove("done"); });
      update();
    });
    update();
  });

  /* ---- Prompt copy buttons ---- */
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = document.getElementById(btn.dataset.target);
      if (!pre) return;
      var text = pre.innerText;
      function done() {
        btn.textContent = "Copied";
        btn.classList.add("ok");
        setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("ok"); }, 1800);
      }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---- Prompt filters ---- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.dataset.filter;
        chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
        document.querySelectorAll(".prompt[data-cat]").forEach(function (p) {
          p.hidden = !(f === "all" || p.dataset.cat === f);
        });
      });
    });
  }

  /* ---- Tools search and category filter ---- */
  var toolQ = document.getElementById("tool-q");
  var tChips = document.querySelectorAll(".chip[data-tfilter]");
  if (toolQ || tChips.length) {
    var cat = "all";
    function applyTools() {
      var q = toolQ ? toolQ.value.trim().toLowerCase() : "";
      var any = false;
      document.querySelectorAll(".tool-group[data-tcat]").forEach(function (g) {
        var shown = 0;
        var catOk = cat === "all" || g.dataset.tcat === cat;
        g.querySelectorAll(".tool").forEach(function (t) {
          var ok = catOk && (!q || t.dataset.search.indexOf(q) !== -1);
          t.hidden = !ok; if (ok) shown++;
        });
        g.hidden = shown === 0; if (shown) any = true;
      });
      var empty = document.getElementById("tool-empty");
      if (empty) empty.hidden = any;
    }
    if (toolQ) toolQ.addEventListener("input", applyTools);
    tChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        cat = chip.dataset.tfilter;
        tChips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
        applyTools();
      });
    });
  }

  /* ---- Copy single phrases ---- */
  document.querySelectorAll(".copy-inline").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var t = btn.dataset.copy;
      function ok() { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1500); }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(ok);
      else { var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {} document.body.removeChild(ta); }
    });
  });

  /* ---- Site-wide search ---- */
  var dlg = document.getElementById("search-dialog");
  var openBtn = document.getElementById("search-open");
  if (dlg && openBtn) {
    var rootPath = document.body.dataset.root || "";
    var index = null, q = document.getElementById("site-q");
    var out = document.getElementById("search-results"), status = document.getElementById("search-status");
    function load() {
      if (index) return Promise.resolve(index);
      return fetch(rootPath + "assets/search-index.json").then(function (r) { return r.json(); }).then(function (j) { index = j; return j; });
    }
    function escH(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function run() {
      var v = q.value.trim().toLowerCase();
      if (v.length < 2) { out.innerHTML = ""; status.textContent = "Type at least two letters."; return; }
      load().then(function (idx) {
        var terms = v.split(/\s+/);
        var res = idx.map(function (it) {
          var t = it.t.toLowerCase(), d = (it.d || "").toLowerCase(), sc = 0;
          for (var i = 0; i < terms.length; i++) {
            var w = terms[i];
            if (t.indexOf(w) !== -1) sc += (t.indexOf(w) === 0 ? 6 : 4);
            else if (d.indexOf(w) !== -1) sc += 1;
            else return null;
          }
          if (it.k === "Page") sc += 2;
          return { it: it, sc: sc };
        }).filter(Boolean).sort(function (a, b) { return b.sc - a.sc; }).slice(0, 25);
        status.textContent = res.length ? res.length + (res.length === 25 ? "+" : "") + " result" + (res.length === 1 ? "" : "s") : "No results. Try a different word.";
        out.innerHTML = res.map(function (r) {
          return '<li><a href="' + rootPath + r.it.u + '"><span class="kind">' + escH(r.it.k) + "</span><b>" + escH(r.it.t) + "</b><span>" + escH((r.it.d || "").slice(0, 140)) + "</span></a></li>";
        }).join("");
      }).catch(function () { status.textContent = "Search is available when the site is opened from a web server, such as GitHub Pages."; });
    }
    openBtn.addEventListener("click", function () { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); q.focus(); load().catch(function () {}); });
    q.addEventListener("input", run);
    dlg.addEventListener("click", function (ev) { if (ev.target === dlg) dlg.close(); });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "/" && !/input|textarea|select/i.test((document.activeElement || {}).tagName || "") && !dlg.open) { ev.preventDefault(); openBtn.click(); }
    });
  }

  /* ---- Print buttons ---- */
  document.querySelectorAll("[data-print]").forEach(function (b) {
    b.addEventListener("click", function () { window.print(); });
  });
})();
