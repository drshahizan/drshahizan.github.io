/* Polishing Your Draft Article Using AI Tools: site scripts */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- Tema gelap / terang ---- */
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

  /* ---- Menu mudah alih ---- */
  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Kotak semak (halaman modul & senarai semak) ---- */
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

  /* ---- Butang salin prompt ---- */
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

  /* ---- Penapis prompt ---- */
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

  /* ---- Butang cetak ---- */
  document.querySelectorAll("[data-print]").forEach(function (b) {
    b.addEventListener("click", function () { window.print(); });
  });
})();
