/* Interactive tools for CAI 461 Topic 8.
   Each tool initialises only if its container exists on the page. */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var NS = "http://www.w3.org/2000/svg";
  var fmt = function (x, d) { return Number(x).toFixed(d === undefined ? 2 : d); };
  var pct = function (x, d) { return (x * 100).toFixed(d === undefined ? 1 : d) + "%"; };

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(parent, x, y, s, anchor, extra) {
    var t = el("text", Object.assign({ x: x, y: y, "text-anchor": anchor || "middle" }, extra || {}), parent);
    t.textContent = s;
    return t;
  }
  function bindRange(id, out, fn) {
    var input = document.getElementById(id);
    var o = document.getElementById(out);
    if (!input) return;
    var update = function () { if (o) o.textContent = fn ? fn(input.value) : input.value; };
    input.addEventListener("input", update);
    update();
  }

  /* ---------- Generic line chart (linear axes) ---------- */
  function lineChart(svg, cfg) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var W = 600, H = 300, m = { l: 56, r: 18, t: 18, b: 44 };
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var xmin = cfg.xmin, xmax = cfg.xmax, ymin = cfg.ymin, ymax = cfg.ymax;
    var sx = function (x) { return m.l + (x - xmin) / (xmax - xmin) * (W - m.l - m.r); };
    var sy = function (y) { return H - m.b - (y - ymin) / (ymax - ymin) * (H - m.t - m.b); };
    (cfg.yticks || []).forEach(function (t) {
      el("line", { x1: m.l, x2: W - m.r, y1: sy(t), y2: sy(t), class: "grid" }, svg);
      txt(svg, m.l - 8, sy(t) + 4, cfg.yfmt ? cfg.yfmt(t) : t, "end");
    });
    (cfg.xticks || []).forEach(function (t) {
      txt(svg, sx(t), H - m.b + 18, cfg.xfmt ? cfg.xfmt(t) : t);
    });
    el("line", { x1: m.l, x2: W - m.r, y1: H - m.b, y2: H - m.b, class: "axis" }, svg);
    el("line", { x1: m.l, x2: m.l, y1: m.t, y2: H - m.b, class: "axis" }, svg);
    if (cfg.xlabel) txt(svg, (m.l + W - m.r) / 2, H - 6, cfg.xlabel, "middle", { "font-weight": 500 });
    if (cfg.ylabel) {
      var yl = txt(svg, 14, (m.t + H - m.b) / 2, cfg.ylabel, "middle", { "font-weight": 500 });
      yl.setAttribute("transform", "rotate(-90 14 " + (m.t + H - m.b) / 2 + ")");
    }
    cfg.series.forEach(function (s) {
      var d = s.points.map(function (p, i) { return (i ? "L" : "M") + sx(p[0]).toFixed(1) + " " + sy(p[1]).toFixed(1); }).join(" ");
      el("path", { d: d, fill: "none", stroke: s.color, "stroke-width": 2.5, "stroke-dasharray": s.dash || "" }, svg);
      if (s.dots) s.points.forEach(function (p) { el("circle", { cx: sx(p[0]), cy: sy(p[1]), r: 4, fill: s.color }, svg); });
    });
    (cfg.markers || []).forEach(function (mk) {
      el("circle", { cx: sx(mk.x), cy: sy(mk.y), r: 6, fill: mk.color, stroke: "#fff", "stroke-width": 2 }, svg);
      if (mk.label) txt(svg, sx(mk.x) + (mk.dx || 0), sy(mk.y) + (mk.dy || -12), mk.label, mk.anchor || "middle", { "font-weight": 600, fill: "#0f3446" });
    });
    return { sx: sx, sy: sy };
  }

  /* ---------- 1. Expected utility ---------- */
  function initEU() {
    var root = document.getElementById("tool-eu");
    if (!root) return;
    var ids = ["euA-p", "euA-u", "euA-f", "euB-p", "euB-u", "euB-f"];
    var calc = function () {
      var v = {};
      ids.forEach(function (id) { v[id] = parseFloat(document.getElementById(id).value) || 0; });
      var pA = Math.min(1, Math.max(0, v["euA-p"])), pB = Math.min(1, Math.max(0, v["euB-p"]));
      var euA = pA * v["euA-u"] + (1 - pA) * v["euA-f"];
      var euB = pB * v["euB-u"] + (1 - pB) * v["euB-f"];
      $("#euA-out").textContent = fmt(euA, 2);
      $("#euB-out").textContent = fmt(euB, 2);
      $("#euA-ps").textContent = pct(pA, 0);
      $("#euB-ps").textContent = pct(pB, 0);
      var v1 = $("#eu-verdict");
      var diff = Math.abs(euA - euB);
      if (diff < 1e-9) {
        v1.textContent = "Both agents have the same expected utility. Under this utility function you cannot separate them; a second criterion (cost, variance, safety) has to decide.";
      } else {
        var better = euA > euB ? "A" : "B";
        var moreReliable = pA > pB ? "A" : (pB > pA ? "B" : null);
        var msg = "Agent " + better + " is better by " + fmt(diff, 2) + " expected utility.";
        if (moreReliable && moreReliable !== better) msg += " Note that Agent " + moreReliable + " succeeds more often. Expected utility and success rate can disagree, which is why you report both.";
        v1.textContent = msg;
      }
    };
    ids.forEach(function (id) { document.getElementById(id).addEventListener("input", calc); });
    calc();
  }

  /* ---------- 2. Two-player game explorer ---------- */
  function initGame() {
    var root = document.getElementById("tool-game");
    if (!root) return;
    var presets = {
      pd: [[3, 3], [0, 5], [5, 0], [2, 2]],
      coord: [[4, 4], [0, 0], [0, 0], [2, 2]],
      chicken: [[3, 3], [1, 4], [4, 1], [0, 0]],
      harmony: [[4, 4], [3, 2], [2, 3], [1, 1]]
    };
    var cells = ["cc", "cd", "dc", "dd"]; // row i, col j: (C,C) (C,D) (D,C) (D,D)
    var names = { cc: "(Cooperate, Cooperate)", cd: "(Cooperate, Defect)", dc: "(Defect, Cooperate)", dd: "(Defect, Defect)" };
    var read = function () {
      return cells.map(function (c) {
        return [parseFloat($("#g-" + c + "-i").value) || 0, parseFloat($("#g-" + c + "-j").value) || 0];
      });
    };
    var calc = function () {
      var p = read(); // index 0 cc,1 cd,2 dc,3 dd
      // row player i chooses row (C=0,D=1); column j chooses col (C=0,D=1)
      var idx = function (r, c) { return r * 2 + c; };
      var nash = [], pareto = [];
      for (var r = 0; r < 2; r++) for (var c = 0; c < 2; c++) {
        var k = idx(r, c);
        var iOk = p[k][0] >= p[idx(1 - r, c)][0];
        var jOk = p[k][1] >= p[idx(r, 1 - c)][1];
        if (iOk && jOk) nash.push(k);
      }
      for (var a = 0; a < 4; a++) {
        var dominated = false;
        for (var b = 0; b < 4; b++) {
          if (a === b) continue;
          if (p[b][0] >= p[a][0] && p[b][1] >= p[a][1] && (p[b][0] > p[a][0] || p[b][1] > p[a][1])) dominated = true;
        }
        if (!dominated) pareto.push(a);
      }
      var sw = p.map(function (x) { return x[0] + x[1]; });
      var eg = p.map(function (x) { return Math.min(x[0], x[1]); });
      var maxSw = Math.max.apply(null, sw);
      cells.forEach(function (c, k) {
        var td = $("#g-" + c);
        td.classList.toggle("nash", nash.indexOf(k) !== -1);
        td.classList.toggle("pareto", pareto.indexOf(k) !== -1);
        var tags = [];
        tags.push("sw = " + sw[k]);
        if (nash.indexOf(k) !== -1) tags.push("Nash");
        if (pareto.indexOf(k) !== -1) tags.push("Pareto");
        $("#g-" + c + "-meta").textContent = tags.join(" · ");
      });
      var lines = [];
      if (!nash.length) lines.push("No pure-strategy Nash equilibrium. A mixed equilibrium exists, but this explorer only checks pure strategies.");
      else lines.push("Pure Nash equilibria: " + nash.map(function (k) { return names[cells[k]]; }).join(", ") + ".");
      var bestNashSw = nash.length ? Math.max.apply(null, nash.map(function (k) { return sw[k]; })) : null;
      var worstNashSw = nash.length ? Math.min.apply(null, nash.map(function (k) { return sw[k]; })) : null;
      lines.push("Highest social welfare is " + maxSw + ".");
      var inefficient = nash.filter(function (k) { return pareto.indexOf(k) === -1; });
      var warn = false;
      if (inefficient.length) {
        warn = true;
        lines.push("Warning: " + inefficient.map(function (k) { return names[cells[k]]; }).join(", ") + " is stable but not Pareto efficient. Stable does not mean good.");
      }
      if (worstNashSw !== null && worstNashSw > 0) {
        lines.push("Welfare ratio (best possible ÷ worst equilibrium) = " + fmt(maxSw / worstNashSw, 2) + ". This is the price of anarchy measured on welfare.");
      }
      var v = $("#game-verdict");
      v.textContent = lines.join(" ");
      v.classList.toggle("warn", warn);
      $("#game-eg").textContent = names[cells[eg.indexOf(Math.max.apply(null, eg))]];
    };
    root.querySelectorAll("input").forEach(function (i) { i.addEventListener("input", calc); });
    var sel = $("#game-preset");
    sel.addEventListener("change", function () {
      var pr = presets[sel.value];
      if (!pr) return;
      cells.forEach(function (c, k) { $("#g-" + c + "-i").value = pr[k][0]; $("#g-" + c + "-j").value = pr[k][1]; });
      calc();
    });
    calc();
  }

  /* ---------- 3. Pigou network / price of anarchy ---------- */
  function initPigou() {
    var root = document.getElementById("tool-pigou");
    if (!root) return;
    var share = $("#pg-share"), deg = $("#pg-deg");
    var svg = $("#pg-chart");
    var calc = function () {
      var x = parseFloat(share.value) / 100;
      var p = parseFloat(deg.value);
      $("#pg-share-out").textContent = Math.round(x * 100) + "% on Road 2";
      $("#pg-deg-out").textContent = p === 1 ? "x (linear)" : "x^" + p;
      var cost = function (s) { return (1 - s) * 1 + s * Math.pow(s, p); };
      var xOpt = Math.pow(1 / (p + 1), 1 / p);
      var cOpt = cost(xOpt), cNash = 1;
      $("#pg-cost").textContent = fmt(cost(x), 3);
      $("#pg-opt").textContent = fmt(cOpt, 3) + " at " + Math.round(xOpt * 100) + "%";
      $("#pg-poa").textContent = fmt(cNash / cOpt, 3);
      var pts = [];
      for (var i = 0; i <= 100; i++) pts.push([i / 100, cost(i / 100)]);
      lineChart(svg, {
        xmin: 0, xmax: 1, ymin: 0, ymax: 1.05,
        xticks: [0, 0.25, 0.5, 0.75, 1], xfmt: function (t) { return Math.round(t * 100) + "%"; },
        yticks: [0, 0.25, 0.5, 0.75, 1], yfmt: function (t) { return t.toFixed(2); },
        xlabel: "Share of traffic on Road 2", ylabel: "Average travel cost",
        series: [{ points: pts, color: "#04767f" }],
        markers: [
          { x: 1, y: cNash, color: "#e8962e", label: "Selfish (Nash)", anchor: "end", dx: -6 },
          { x: xOpt, y: cOpt, color: "#0070c0", label: "Optimal", dy: 22 },
          { x: x, y: cost(x), color: "#0f3446" }
        ]
      });
    };
    share.addEventListener("input", calc);
    deg.addEventListener("input", calc);
    calc();
  }

  /* ---------- 4. pass@k vs pass^k ---------- */
  function initPassK() {
    var root = document.getElementById("tool-passk");
    if (!root) return;
    var pIn = $("#pk-p"), kIn = $("#pk-k"), hIn = $("#pk-h");
    var svg = $("#pk-chart");
    var calc = function () {
      var p = parseFloat(pIn.value) / 100;
      var k = parseInt(kIn.value, 10);
      var h = hIn ? parseFloat(hIn.value) / 100 : 0;
      $("#pk-p-out").textContent = Math.round(p * 100) + "%";
      $("#pk-k-out").textContent = k;
      if (hIn) $("#pk-h-out").textContent = Math.round(h * 100) + "%";
      // Heterogeneous model: a share h of tasks are "always fail" (p = 0); the rest have p' so the mean stays p.
      var pEasy = h < 1 ? Math.min(1, p / (1 - h)) : 0;
      var feasible = h < 1 && p <= 1 - h + 1e-9;
      var passAt = function (kk) { return 1 - Math.pow(1 - p, kk); };
      var passHatInd = function (kk) { return Math.pow(p, kk); };
      var passHatHet = function (kk) { return (1 - h) * Math.pow(pEasy, kk); };
      $("#pk-at").textContent = pct(passAt(k));
      $("#pk-hat").textContent = pct(passHatInd(k));
      $("#pk-het").textContent = feasible ? pct(passHatHet(k)) : "n/a";
      var a = [], b = [], c = [];
      for (var i = 1; i <= 16; i++) { a.push([i, passAt(i)]); b.push([i, passHatInd(i)]); if (feasible) c.push([i, passHatHet(i)]); }
      var series = [
        { points: a, color: "#5b7380", dash: "6 4" },
        { points: b, color: "#04767f" }
      ];
      if (hIn && feasible && h > 0) series.push({ points: c, color: "#e8962e" });
      lineChart(svg, {
        xmin: 1, xmax: 16, ymin: 0, ymax: 1,
        xticks: [1, 2, 4, 8, 12, 16], yticks: [0, 0.25, 0.5, 0.75, 1],
        yfmt: function (t) { return Math.round(t * 100) + "%"; },
        xlabel: "k (number of trials)", ylabel: "Probability",
        series: series,
        markers: [{ x: k, y: passHatInd(k), color: "#04767f" }]
      });
      var v = $("#pk-verdict");
      if (v) {
        var msg = "With a " + Math.round(p * 100) + "% per-trial success rate, the agent solves a task at least once in " + k + " tries " + pct(passAt(k), 0) +
          " of the time, but solves it every time only " + pct(passHatInd(k), 0) + " of the time.";
        if (hIn && h > 0) {
          msg += feasible
            ? " If " + Math.round(h * 100) + "% of tasks are ones the agent never solves, pass^" + k + " becomes " + pct(passHatHet(k), 0) + ": failures that repeat on the same tasks change the curve's shape."
            : " That share of always-failing tasks is impossible with this average success rate; lower it.";
        }
        v.textContent = msg;
      }
    };
    [pIn, kIn, hIn].forEach(function (i) { if (i) i.addEventListener("input", calc); });
    calc();
  }

  /* ---------- 5. Contract Net message count ---------- */
  function initCNP() {
    var root = document.getElementById("tool-cnp");
    if (!root) return;
    var nIn = $("#cnp-n"), tIn = $("#cnp-t"), svg = $("#cnp-chart"), scaleIn = $("#cnp-scale");
    var calc = function () {
      var n = parseInt(nIn.value, 10), t = parseInt(tIn.value, 10);
      $("#cnp-n-out").textContent = n;
      $("#cnp-t-out").textContent = t;
      var perTask = 3 * n + 1;
      $("#cnp-per").textContent = perTask;
      $("#cnp-total").textContent = (perTask * t).toLocaleString();
      $("#cnp-central").textContent = (2 * t).toLocaleString();
      var log = scaleIn && scaleIn.value === "doubling";
      var xs = log ? [5, 10, 20, 40, 80, 160] : null;
      var a = [], b = [];
      if (log) {
        xs.forEach(function (v, i) { a.push([i, 3 * v + 1]); b.push([i, 2]); });
      } else {
        for (var i = 1; i <= 160; i++) { a.push([i, 3 * i + 1]); b.push([i, 2]); }
      }
      var ymax = 500;
      lineChart(svg, {
        xmin: log ? 0 : 0, xmax: log ? 5 : 160, ymin: 0, ymax: ymax,
        xticks: log ? [0, 1, 2, 3, 4, 5] : [0, 40, 80, 120, 160],
        xfmt: log ? function (t) { return xs[t]; } : null,
        yticks: [0, 100, 200, 300, 400, 500],
        xlabel: log ? "Contractors n (each tick doubles n)" : "Contractors n (evenly spaced)",
        ylabel: "Messages per task",
        series: [{ points: a, color: "#04767f", dots: log }, { points: b, color: "#e8962e", dots: log }],
        markers: log ? [] : [{ x: n, y: perTask, color: "#0f3446", label: perTask + " msgs", dy: -14 }]
      });
    };
    [nIn, tIn, scaleIn].forEach(function (i) { if (i) i.addEventListener("input", calc); });
    calc();
  }

  /* ---------- 6. Accuracy vs cost Pareto frontier ---------- */
  function initFrontier() {
    var root = document.getElementById("tool-frontier");
    if (!root) return;
    var tbody = $("#fr-body"), svg = $("#fr-chart");
    var defaults = [
      ["Single call", 0.04, 52], ["Retry ×3", 0.12, 61], ["Majority vote ×5", 0.3, 66],
      ["Reflexion-style loop", 0.4, 55], ["Planner + 2 workers", 0.6, 68], ["Debate, 3 agents", 0.9, 60],
      ["Planner + 4 workers", 1.1, 69], ["Large ensemble", 2.0, 70]
    ];
    var render = function (rows) {
      tbody.innerHTML = "";
      rows.forEach(function (r, i) {
        var tr = document.createElement("tr");
        tr.innerHTML = '<td><input type="text" aria-label="Agent name" value="' + r[0].replace(/"/g, "&quot;") + '"></td>' +
          '<td><input type="number" aria-label="Cost per task in US dollars" step="0.01" min="0" value="' + r[1] + '"></td>' +
          '<td><input type="number" aria-label="Accuracy percent" step="1" min="0" max="100" value="' + r[2] + '"></td>' +
          '<td class="status"></td>';
        tbody.appendChild(tr);
      });
      tbody.querySelectorAll("input").forEach(function (i) { i.addEventListener("input", calc); });
      calc();
    };
    var calc = function () {
      var rows = [];
      tbody.querySelectorAll("tr").forEach(function (tr) {
        var ins = tr.querySelectorAll("input");
        rows.push({ tr: tr, name: ins[0].value, cost: parseFloat(ins[1].value), acc: parseFloat(ins[2].value) });
      });
      rows = rows.filter(function (r) { return !isNaN(r.cost) && !isNaN(r.acc); });
      rows.forEach(function (a) {
        a.dom = rows.some(function (b) {
          return b !== a && b.cost <= a.cost && b.acc >= a.acc && (b.cost < a.cost || b.acc > a.acc);
        });
        a.tr.classList.toggle("dominated", a.dom);
        a.tr.classList.toggle("frontier", !a.dom);
        a.tr.querySelector(".status").textContent = a.dom ? "Dominated" : "On frontier";
      });
      var maxC = Math.max(0.5, Math.max.apply(null, rows.map(function (r) { return r.cost; })) * 1.1);
      var accs = rows.map(function (r) { return r.acc; });
      var minA = Math.max(0, Math.floor((Math.min.apply(null, accs) - 5) / 5) * 5);
      var maxA = Math.min(100, Math.ceil((Math.max.apply(null, accs) + 3) / 5) * 5);
      var front = rows.filter(function (r) { return !r.dom; }).sort(function (a, b) { return a.cost - b.cost; });
      var yt = [];
      var ystep = (maxA - minA) > 30 ? 10 : 5;
      for (var yv = minA; yv <= maxA; yv += ystep) yt.push(yv);
      var xt = [0, 1, 2, 3, 4].map(function (i) { return +(maxC * i / 4).toFixed(2); });
      var s = lineChart(svg, {
        xmin: 0, xmax: maxC, ymin: minA, ymax: maxA, xticks: xt, yticks: yt,
        xfmt: function (t) { return "$" + t; }, yfmt: function (t) { return t + "%"; },
        xlabel: "Cost per task (US$)", ylabel: "Accuracy",
        series: front.length > 1 ? [{ points: front.map(function (r) { return [r.cost, r.acc]; }), color: "#04767f", dash: "5 4" }] : []
      });
      rows.forEach(function (r) {
        el("circle", { cx: s.sx(r.cost), cy: s.sy(r.acc), r: 6, fill: r.dom ? "#aab9be" : "#04767f", stroke: "#fff", "stroke-width": 1.5 }, svg);
        var right = s.sx(r.cost) > 430;
        txt(svg, s.sx(r.cost) + (right ? -9 : 9), s.sy(r.acc) + (r.dom ? 4 : 18), r.name, right ? "end" : "start", { "font-size": 11, fill: r.dom ? "#7d929a" : "#0f3446" });
      });
      $("#fr-summary").textContent = front.length + " of " + rows.length + " agents are on the Pareto frontier. " +
        "A dominated agent is beaten by another that is at least as accurate and no more expensive.";
    };
    $("#fr-add").addEventListener("click", function () {
      var tr = document.createElement("tr");
      tr.innerHTML = '<td><input type="text" aria-label="Agent name" value="New agent"></td><td><input type="number" aria-label="Cost per task in US dollars" step="0.01" min="0" value="0.5"></td><td><input type="number" aria-label="Accuracy percent" step="1" min="0" max="100" value="60"></td><td class="status"></td>';
      tbody.appendChild(tr);
      tr.querySelectorAll("input").forEach(function (i) { i.addEventListener("input", calc); });
      calc();
      tr.querySelector("input").focus();
    });
    $("#fr-reset").addEventListener("click", function () { render(defaults); });
    render(defaults);
  }

  /* ---------- 7. Achievement vs maintenance sorter ---------- */
  function initSorter() {
    var root = document.getElementById("tool-sorter");
    if (!root) return;
    root.querySelectorAll("[data-answer]").forEach(function (row) {
      row.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          var ok = b.dataset.choice === row.dataset.answer;
          row.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
          var fb = row.querySelector(".fb");
          fb.textContent = (ok ? "Correct. " : "Not quite. ") + row.dataset.why;
          fb.style.color = ok ? "#1d6b43" : "#a2362a";
        });
      });
    });
  }

  initEU(); initGame(); initPigou(); initPassK(); initCNP(); initFrontier(); initSorter();
})();
