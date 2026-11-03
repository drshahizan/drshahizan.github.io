/* Shared behaviour: mobile nav, self-check quizzes, copy buttons, resource filter. */
(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  // Self-check quizzes: <form class="quiz"> with fieldsets; correct option has data-correct
  document.querySelectorAll("form.quiz").forEach(function (form) {
    var result = form.querySelector(".quiz-result");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var sets = form.querySelectorAll("fieldset");
      var score = 0;
      sets.forEach(function (fs) {
        fs.querySelectorAll("label").forEach(function (l) { l.classList.remove("correct", "wrong"); });
        var chosen = fs.querySelector("input:checked");
        var right = fs.querySelector("input[data-correct]");
        if (right) right.closest("label").classList.add("correct");
        if (chosen && chosen === right) score++;
        else if (chosen) chosen.closest("label").classList.add("wrong");
      });
      form.classList.add("checked");
      if (result) result.textContent = score + " of " + sets.length + " correct";
    });
    form.addEventListener("reset", function () {
      form.classList.remove("checked");
      form.querySelectorAll("label").forEach(function (l) { l.classList.remove("correct", "wrong"); });
      if (result) result.textContent = "";
    });
  });

  // Copy buttons on code blocks
  document.querySelectorAll("pre[data-copy]").forEach(function (pre) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var text = pre.querySelector("code") ? pre.querySelector("code").innerText : pre.innerText;
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { btn.textContent = "Select and copy"; });
      } else {
        btn.textContent = "Select and copy";
      }
    });
    pre.appendChild(btn);
  });

  // Resource search and category filter
  var search = document.getElementById("res-search");
  var filterButtons = document.querySelectorAll(".filter-row button");
  var items = document.querySelectorAll(".res-list li");
  var empty = document.querySelector(".empty-state");
  if (items.length) {
    var activeCat = "all";
    var apply = function () {
      var q = search ? search.value.trim().toLowerCase() : "";
      var shown = 0;
      items.forEach(function (li) {
        var catOk = activeCat === "all" || li.dataset.cat === activeCat;
        var textOk = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
        var show = catOk && textOk;
        li.hidden = !show;
        if (show) shown++;
      });
      document.querySelectorAll(".res-group").forEach(function (g) {
        g.hidden = !g.querySelector(".res-list li:not([hidden])");
      });
      if (empty) empty.style.display = shown ? "none" : "block";
    };
    if (search) search.addEventListener("input", apply);
    filterButtons.forEach(function (b) {
      b.addEventListener("click", function () {
        activeCat = b.dataset.cat;
        filterButtons.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        apply();
      });
    });
  }
})();
