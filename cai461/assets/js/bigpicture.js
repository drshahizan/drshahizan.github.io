/* Big Picture page: ecosystem map details and the metric picker. */
(function () {
  "use strict";

  var MOD = {
    1: ["module-1-performing-well.html", "Module 1"],
    2: ["module-2-society-of-agents.html", "Module 2"],
    3: ["module-3-measuring-the-system.html", "Module 3"],
    4: ["module-4-agent-based-models.html", "Module 4"],
    5: ["module-5-llm-agents.html", "Module 5"],
    6: ["module-6-bringing-it-together.html", "Module 6"]
  };

  /* ---------- Ecosystem nodes ---------- */
  var NODES = {
    wooldridge: { name: "Utility and task specifications", kind: "Theory",
      what: "Wooldridge’s definitions: a run, a utility function over runs, expected utility, and task predicates Ψ for achievement and maintenance tasks.",
      why: "Every benchmark and every metric later in the chain is an estimate of one of these quantities.",
      layers: [1], mods: [1], link: null },
    rationality: { name: "Rationality and performance measures", kind: "Theory",
      what: "Russell and Norvig’s rational agent and PEAS. The designer chooses a performance measure over environment states.",
      why: "Decides what “good” means before any measuring starts. A bad measure gets gamed.",
      layers: [1], mods: [1], link: ["Book site", "https://aima.cs.berkeley.edu/"] },
    gametheory: { name: "Game theory and social choice", kind: "Theory",
      what: "Social welfare, Pareto efficiency, Nash equilibrium and the price of anarchy.",
      why: "The only way to judge outcomes that emerge between self-interested agents.",
      layers: [2], mods: [2], link: ["Free textbook", "http://www.masfoundations.org/"] },
    simmethod: { name: "Simulation methodology", kind: "Theory",
      what: "Verification, validation, replication and sensitivity analysis for agent-based models.",
      why: "Tells you when a simulation is trustworthy enough to base a decision on.",
      layers: [3, 4], mods: [4], link: null },

    jade: { name: "JADE", kind: "Platform",
      what: "A Java platform for FIPA-compliant multi-agent systems, used in the CAI 461 communication lab.",
      why: "Where classic message-passing agents such as Contract Net run.",
      layers: [2, 3], mods: [3], link: ["Website", "https://jade.tilab.com/"] },
    netlogo: { name: "NetLogo", kind: "Platform",
      what: "An agent-based modelling environment with thousands of simple agents on a grid.",
      why: "Where simulation models like Wolf Sheep Predation or a campus evacuation are built.",
      layers: [3, 4], mods: [4], link: ["Website", "https://ccl.northwestern.edu/netlogo/"] },
    llmframeworks: { name: "LLM agent frameworks", kind: "Platform",
      what: "Libraries for building teams of LLM agents with roles, tools and hand-offs, as in the Agent Architectures lab.",
      why: "Most of the systems MAST studied were built this way, so their design choices shape how they fail.",
      layers: [2, 3], mods: [5], link: null },
    marble: { name: "MARBLE", kind: "Platform",
      what: "The framework behind MultiAgentBench. It runs LLM agents in star, chain, tree and graph topologies.",
      why: "Lets you compare coordination topologies on the same tasks.",
      layers: [2], mods: [5], link: ["Code", "https://github.com/ulab-uiuc/MARBLE"] },

    fipa: { name: "FIPA-ACL correlation fields", kind: "Standard",
      what: "conversation-id, reply-with, in-reply-to and protocol in every agent message.",
      why: "With them you can rebuild one task’s full trace across agents from the logs.",
      layers: [3], mods: [3], link: ["Specification", "http://www.fipa.org/specs/fipa00061/"] },
    jadetools: { name: "JADE Sniffer and RMA", kind: "Tool",
      what: "The Sniffer draws message sequence diagrams; the Remote Monitoring Agent starts, suspends and kills agents.",
      why: "Count messages per task and run robustness tests without writing extra code.",
      layers: [2, 3], mods: [3], link: null },
    behaviorspace: { name: "BehaviorSpace", kind: "Tool",
      what: "NetLogo’s built-in tool for parameter sweeps with repetitions, exporting results to CSV.",
      why: "Turns one demo run into a proper experiment with 30 runs per setting.",
      layers: [3, 4], mods: [4], link: null },
    otel: { name: "OpenTelemetry GenAI conventions", kind: "Standard",
      what: "Standard span names (invoke_agent, execute_tool, chat) and gen_ai.* attributes such as agent name and token counts.",
      why: "The modern equivalent of FIPA correlation fields: one trace per request, readable by any tool.",
      layers: [3, 4], mods: [5], link: ["Specification", "https://opentelemetry.io/docs/specs/semconv/gen-ai/"] },
    langsmith: { name: "LangSmith", kind: "Tool",
      what: "A tracing and evaluation service with datasets, experiments and code, LLM-judge and pairwise evaluators.",
      why: "The example tool in the lecture and lab. Any OpenTelemetry-compatible tool can do the same job.",
      layers: [3, 4], mods: [5], link: ["Documentation", "https://docs.langchain.com/langsmith/evaluation-concepts"] },

    agentbench: { name: "AgentBench", kind: "Benchmark",
      what: "LLMs acting as agents in 8 environments, from operating systems and databases to games.",
      why: "Shows how broad an agent’s competence is, environment by environment.",
      layers: [1], mods: [5], link: ["Paper", "https://arxiv.org/abs/2308.03688"] },
    gaia: { name: "GAIA", kind: "Benchmark",
      what: "466 real-world assistant questions that need tools and browsing, scored by exact final answer.",
      why: "A clear success predicate on realistic tasks; humans scored about 92% at release.",
      layers: [1], mods: [5], link: ["Paper", "https://arxiv.org/abs/2311.12983"] },
    swebench: { name: "SWE-bench", kind: "Benchmark",
      what: "2,294 real GitHub issues; a fix counts only if the project’s unit tests pass.",
      why: "The success test is automatic and hard to game.",
      layers: [1], mods: [5], link: ["Leaderboard", "https://www.swebench.com/"] },
    taubench: { name: "τ-bench and τ²-bench", kind: "Benchmark",
      what: "Agents serve a simulated customer under a company policy in retail, airline and, in τ²-bench, telecom domains.",
      why: "Introduced pass^k, which measures whether an agent succeeds every time.",
      layers: [1, 4], mods: [5], link: ["Code", "https://github.com/sierra-research/tau2-bench"] },
    mab: { name: "MultiAgentBench", kind: "Benchmark",
      what: "Collaboration and competition tasks for LLM teams, scored by task, milestones and coordination.",
      why: "One of the few benchmarks that measures the interaction layer directly.",
      layers: [2], mods: [5], link: ["Paper", "https://aclanthology.org/2025.acl-long.421/"] },
    mastdata: { name: "MAST-Data", kind: "Dataset",
      what: "Over 1,600 multi-agent conversation traces from seven frameworks, labelled with MAST failure modes.",
      why: "Real failure examples to learn from before you label your own.",
      layers: [4], mods: [5], link: ["Code and data", "https://github.com/multi-agent-systems-failure-taxonomy/MAST"] },

    passk: { name: "pass^k reliability", kind: "Method",
      what: "The probability that all k repeated trials of the same task succeed.",
      why: "Matches what a real user experiences; often far lower than the single-try success rate.",
      layers: [4], mods: [5], link: null },
    judge: { name: "LLM-as-a-judge", kind: "Method",
      what: "A model scores open-ended outputs against a rubric. It has position, length and self-preference biases.",
      why: "Makes text outputs measurable at scale, as long as you validate it against human labels.",
      layers: [1, 4], mods: [5], link: ["Paper", "https://arxiv.org/abs/2306.05685"] },
    frontier: { name: "Cost-accuracy frontier", kind: "Method",
      what: "Plot accuracy against cost and keep only agents that no other agent beats on both.",
      why: "Stops a costly, complex agent from looking better than it is.",
      layers: [4], mods: [5], link: ["Paper", "https://arxiv.org/abs/2407.01502"] },
    mast: { name: "MAST taxonomy", kind: "Method",
      what: "14 failure modes in three categories: specification, inter-agent misalignment and task verification.",
      why: "Gives failures a name, so you fix the cause instead of the symptom.",
      layers: [2, 4], mods: [5], link: ["Paper", "https://arxiv.org/abs/2503.13657"] },
    hal: { name: "Holistic Agent Leaderboard", kind: "Leaderboard",
      what: "A third-party leaderboard that runs many benchmarks with one harness and reports cost next to accuracy.",
      why: "Its log analysis caught agents looking up benchmark answers instead of solving tasks.",
      layers: [4], mods: [5], link: ["Leaderboard", "https://hal.cs.princeton.edu/"] },

    students: { name: "You, in CAI 461", kind: "Decision maker",
      what: "Your lab report and project must justify design choices with evidence.",
      why: "The four-layer table is how you show the evidence.",
      layers: [1, 2, 3, 4], mods: [6], link: null },
    developers: { name: "Developers", kind: "Decision maker",
      what: "Choose a topology, a model and how much checking to add.",
      why: "They need comparisons on cost and reliability, not only accuracy.",
      layers: [3, 4], mods: [5, 6], link: null },
    organisations: { name: "Organisations deploying agents", kind: "Decision maker",
      what: "A university, airline or hospital deciding whether an agent is safe to put in front of people.",
      why: "They care about pass^k, policy violations and failure modes most.",
      layers: [4], mods: [5], link: null },
    researchers: { name: "Researchers", kind: "Decision maker",
      what: "Publish new agents, benchmarks and failure analyses.",
      why: "Their failures and new benchmarks feed back into the top of the ecosystem.",
      layers: [1, 2, 3, 4], mods: [3, 4], link: null }
  };

  var detail = document.getElementById("eco-detail");
  var chips = document.querySelectorAll(".chip[data-node]");
  function show(id, chip) {
    var n = NODES[id];
    if (!n || !detail) return;
    chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
    var layerTags = n.layers.map(function (l) { return '<span class="tag ' + ["", "", "", "blue", "ink"][l] + '">Layer ' + l + "</span>"; }).join(" ");
    var mods = n.mods.map(function (m) { return '<a href="' + MOD[m][0] + '">' + MOD[m][1] + "</a>"; }).join(", ");
    var link = n.link ? '<p><a href="' + n.link[1] + '">' + n.link[0] + "</a></p>" : "";
    detail.innerHTML =
      '<p class="eco-kind">' + n.kind + "</p>" +
      "<h3>" + n.name + "</h3>" +
      "<p>" + n.what + "</p>" +
      '<p><b>Why it matters:</b> ' + n.why + "</p>" +
      '<p class="eco-meta">Framework layers: ' + layerTags + "</p>" +
      '<p class="eco-meta">Learn it in: ' + mods + "</p>" + link;
  }
  var home = detail ? detail.parentNode : null;
  function place(chip) {
    if (!detail) return;
    if (window.innerWidth <= 960 && chip) {
      var band = chip.closest(".eco-band");
      if (band && band.nextSibling !== detail) band.parentNode.insertBefore(detail, band.nextSibling);
    } else if (home && detail.parentNode !== home) {
      home.appendChild(detail);
    }
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      show(c.dataset.node, c);
      place(c);
    });
  });
  window.addEventListener("resize", function () { place(document.querySelector('.chip[aria-pressed="true"]')); });
  if (chips.length) { show(chips[0].dataset.node, chips[0]); place(chips[0]); }

  /* ---------- Metric picker ---------- */
  var form = document.getElementById("picker");
  if (!form) return;
  var out = document.getElementById("picker-out");

  function val(name) {
    var c = form.querySelector('input[name="' + name + '"]:checked');
    return c ? c.value : null;
  }

  function rec() {
    var type = val("type"), rel = val("rel"), check = val("check"), users = val("users"), size = val("size");
    if (!type) { out.innerHTML = '<p class="muted">Answer the first question to see a recommendation.</p>'; return; }
    var multi = type === "classic" || type === "sim" || type === "llmteam";
    var llm = type === "llm1" || type === "llmteam";
    var sim = type === "sim";
    var L = { 1: [], 2: [], 3: [], 4: [] };
    var tools = [], baseline = "", fail = "";

    // Layer 1
    L[1].push(["Write the success predicate Ψ and report the success rate with a 95% confidence interval", 1]);
    if (check === "judgement") L[1].push([llm ? "Score open-ended outputs with a rubric and an LLM judge, validated on at least 20 human-labelled examples" : "Score outputs with a written rubric and two human markers, and report their agreement", llm ? 5 : 1]);
    else L[1].push(["Use an automatic exact check (tests pass, final state matches, answer matches)", 1]);
    if (!sim) L[1].push(["If outcomes differ in value, state a utility function and report expected utility", 1]);

    // Layer 2
    if (!multi) {
      L[2].push(["Single agent: skip most interaction metrics, but count tool calls or steps per task", 3]);
    } else {
      L[2].push(["Messages (or agent hand-offs) per task", 2]);
      if (rel === "self") {
        L[2].push(["Social welfare against the best possible outcome, and egalitarian welfare for fairness", 2]);
        L[2].push(["Stability: would any agent gain by deviating? Report the price of anarchy if you can compute the optimum", 2]);
      } else {
        L[2].push(["Duplicated work and conflicts between agents", 3]);
        L[2].push([llm ? "Milestones reached per agent and a coordination score, as in MultiAgentBench" : "Idle or waiting time per agent", llm ? 5 : 3]);
      }
      if (sim) L[2].push(["Emergent patterns at the group level, such as queues or clusters, measured every tick", 4]);
    }

    // Layer 3
    L[3].push(["Latency p50 and p95, and throughput", 3]);
    if (sim) L[3].push(["Sensitivity sweep: vary one parameter at a time with 30 runs each in BehaviorSpace", 4]);
    if (size === "large" || sim) L[3].push(["Scalability curve: the same metrics as the number of agents doubles; find the knee", 3]);
    if (multi && !sim) L[3].push(["Robustness: remove one agent or drop messages mid-run; record success and recovery time", 3]);

    // Layer 4
    if (users === "real") {
      L[4].push(["pass^k with k of at least 3 on the same tasks", 5]);
      L[4].push(["Policy or safety violations per 100 tasks", 3]);
    } else {
      L[4].push(["Repeat each setting with different seeds and report the spread, so others can trust your numbers", 3]);
    }
    if (llm) {
      L[4].push(["Cost per successful task, and accuracy against cost for every design you compare", 5]);
      L[4].push(["Label failed traces with MAST failure modes", 5]);
    }
    if (sim) {
      L[4].push(["Validate against real data, and describe the model with ODD so others can replicate it", 4]);
    }

    // Tools and baseline
    if (type === "classic" || type === "single") tools.push("JADE Sniffer and RMA, with FIPA conversation-id on every message");
    if (sim) tools.push("NetLogo BehaviorSpace, exporting to CSV");
    if (llm) tools.push("OpenTelemetry or LangSmith tracing, or the lab harness");
    if (!tools.length) tools.push("Timestamped logs with a task ID on every event");
    baseline = sim ? "A simple analytical estimate, or real recorded data"
      : llm ? (multi ? "A single LLM agent with the same tools, plus a retry or majority-vote baseline" : "The same model with no tools, plus a retry or majority-vote baseline")
      : multi ? "Random and greedy assignment" : "A random or rule-based agent";
    fail = llm ? "Step repetition or a checker that approves wrong answers. Detect with MAST labels on failed traces."
      : sim ? "Unrealistic micro-behaviour that produces the right totals for the wrong reason. Detect with extreme-value tests and per-agent logs."
      : multi ? "A task awarded but never completed when an agent fails. Detect by searching traces for an award with no result."
      : "Gaming the measure: high scores with no real progress. Detect by measuring the environment, not the behaviour.";

    var names = { 1: "Individual agent", 2: "Interaction", 3: "System", 4: "Trust and deployment" };
    var rows = "";
    [4, 3, 2, 1].forEach(function (l) {
      var items = L[l].map(function (x) { return '<li>' + x[0] + ' <a class="tag" href="' + MOD[x[1]][0] + '">' + MOD[x[1]][1] + "</a></li>"; }).join("");
      rows += '<div class="pick-layer l' + l + '"><h4>Layer ' + l + ": " + names[l] + "</h4><ul>" + items + "</ul></div>";
    });
    out.innerHTML = rows +
      '<div class="grid-3 mt-1">' +
      '<div class="panel teal"><h4>Trace with</h4><p>' + tools.join("; ") + ".</p></div>" +
      '<div class="panel blue"><h4>Compare against</h4><p>' + baseline + ".</p></div>" +
      '<div class="panel amber"><h4>Watch for</h4><p>' + fail + "</p></div></div>";
  }

  form.addEventListener("change", function (e) {
    if (e.target.name === "type") {
      var single = e.target.value === "single" || e.target.value === "llm1";
      var rel = form.querySelector('fieldset[data-q="rel"]');
      rel.disabled = single;
      rel.classList.toggle("off", single);
    }
    rec();
  });
  form.addEventListener("reset", function () { setTimeout(function () { form.querySelector('fieldset[data-q="rel"]').disabled = false; form.querySelector('fieldset[data-q="rel"]').classList.remove("off"); rec(); }, 0); });
  rec();
})();
