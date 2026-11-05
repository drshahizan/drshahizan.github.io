/* Materials page: QR code, slides/recording links and Q&A from assets/files/links.json */
(function () {
  "use strict";
  var root = document.body.dataset.root || "";

  /* ---- QR code for the site's home page ---- */
  var box = document.getElementById("qr-box");
  if (box && window.qrcode) {
    var url = new URL(root + "index.html", window.location.href).href.replace(/index\.html$/, "");
    var qr = window.qrcode(0, "M");
    qr.addData(url);
    qr.make();
    box.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
    document.getElementById("qr-url").textContent = url;
    // PNG download
    var n = qr.getModuleCount(), cell = 12, margin = 4, size = (n + margin * 2) * cell;
    var c = document.createElement("canvas"); c.width = c.height = size;
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, size, size); ctx.fillStyle = "#000";
    for (var r = 0; r < n; r++) for (var col = 0; col < n; col++) if (qr.isDark(r, col)) ctx.fillRect((col + margin) * cell, (r + margin) * cell, cell, cell);
    document.getElementById("qr-download").href = c.toDataURL("image/png");
  }

  /* ---- Slides, recording and Q&A ---- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  fetch(root + "assets/files/links.json", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (j) {
    if (j.slides) {
      var href = /^https?:/.test(j.slides) ? j.slides : root + j.slides;
      var page = j.slides_page ? '<a class="btn" href="' + esc(root + j.slides_page) + '">View slides online</a> ' : "";
      document.querySelector("#slides-card [data-pending]").outerHTML = '<p>All 54 slides from the session, to view online or download as a PDF.</p><p style="display:flex;gap:.5rem;flex-wrap:wrap">' + page + '<a class="btn ghost" href="' + esc(href) + '" download>Download PDF</a></p>';
    }
    if (j.recording) {
      document.querySelector("#recording-card [data-pending]").outerHTML = '<p>Recording of the Webex session.</p><a class="btn" href="' + esc(j.recording) + '" target="_blank" rel="noopener">Watch the recording</a>';
    }
    if (j.qa && j.qa.length) {
      document.getElementById("qa-empty").hidden = true;
      document.getElementById("qa-list").innerHTML = j.qa.map(function (x) { return "<details><summary>" + esc(x.q) + "</summary><p>" + esc(x.a) + "</p></details>"; }).join("");
    }
  }).catch(function () {});
})();
