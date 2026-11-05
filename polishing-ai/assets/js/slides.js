/* Slide viewer */
(function () {
  "use strict";
  var T = window.SLIDE_TITLES || [], N = T.length, cur = 1;
  var img = document.getElementById("slide-img"), num = document.getElementById("slide-n"), ttl = document.getElementById("slide-title");
  if (!img || !N) return;
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function show(n, push) {
    cur = Math.max(1, Math.min(N, n));
    img.src = "assets/slides/slide-" + pad(cur) + ".jpg";
    img.alt = T[cur - 1];
    num.textContent = cur; ttl.textContent = T[cur - 1];
    document.querySelectorAll(".thumbs a").forEach(function (a) { a.classList.toggle("on", +a.dataset.n === cur); });
    if (push && history.replaceState) history.replaceState(null, "", "#slide-" + cur);
    [cur + 1, cur - 1].forEach(function (k) { if (k >= 1 && k <= N) { var p = new Image(); p.src = "assets/slides/slide-" + pad(k) + ".jpg"; } });
  }
  function fromHash() { var m = location.hash.match(/slide-(\d+)/); show(m ? +m[1] : 1, false); }
  document.getElementById("prev").addEventListener("click", function () { show(cur - 1, true); });
  document.getElementById("next").addEventListener("click", function () { show(cur + 1, true); });
  img.addEventListener("click", function () { show(cur + 1, true); });
  document.querySelectorAll(".thumbs a").forEach(function (a) {
    a.addEventListener("click", function (ev) {
      ev.preventDefault(); show(+a.dataset.n, true);
      document.getElementById("viewer").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  document.addEventListener("keydown", function (ev) {
    if (/input|textarea|select/i.test((document.activeElement || {}).tagName || "")) return;
    if (document.getElementById("search-dialog") && document.getElementById("search-dialog").open) return;
    if (ev.key === "ArrowRight" || ev.key === "PageDown" || ev.key === " ") { ev.preventDefault(); show(cur + 1, true); }
    if (ev.key === "ArrowLeft" || ev.key === "PageUp") { ev.preventDefault(); show(cur - 1, true); }
    if (ev.key === "Home") show(1, true);
    if (ev.key === "End") show(N, true);
  });
  var fs = document.getElementById("fullscreen"), stage = document.querySelector(".stage");
  fs.addEventListener("click", function () {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (stage.requestFullscreen) stage.requestFullscreen();
  });
  // swipe
  var x0 = null;
  stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1), true); x0 = null;
  });
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
