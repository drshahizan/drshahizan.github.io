"""
CAI 461 Topic 8 lab harness: instrument, trace, evaluate.

A small, dependency-free starting point for the Topic 8 practical.
It runs a coordinator + 2 workers multi-agent system in two topologies
(sequential chain and supervisor/star), records every step as a span with
OpenTelemetry-style GenAI attribute names, and reports metrics for the
four-layer evaluation framework.

As shipped, the agents are SIMULATED so the script runs anywhere in seconds.
Replace `call_llm()` with a real model call to evaluate your own system.

Usage:
    python lab_harness.py                     # 20 sample tasks, k = 3, both topologies
    python lab_harness.py --k 5 --seed 7
    python lab_harness.py --tasks my_tasks.csv  # CSV columns: id,question,expected

Outputs (in ./lab_output/):
    traces.jsonl   one JSON span per line (open it, or import into a tracing tool)
    results.csv    one row per task x trial x topology
    summary.md     four-layer summary table for your report
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import random
import statistics
import time
import uuid
from contextlib import contextmanager
from math import comb, sqrt
from typing import Callable

# ----------------------------------------------------------------------------
# 1. Instrumentation: a minimal span recorder
# ----------------------------------------------------------------------------

class Tracer:
    """Records spans as dicts. Attribute names follow the OpenTelemetry GenAI
    semantic conventions (gen_ai.operation.name, gen_ai.agent.name, ...)."""

    def __init__(self) -> None:
        self.spans: list[dict] = []
        self._stack: list[dict] = []
        self.trace_id: str | None = None

    def new_trace(self) -> str:
        self.trace_id = uuid.uuid4().hex
        return self.trace_id

    @contextmanager
    def span(self, name: str, **attributes):
        parent = self._stack[-1]["span_id"] if self._stack else None
        s = {
            "trace_id": self.trace_id,
            "span_id": uuid.uuid4().hex[:16],
            "parent_id": parent,
            "name": name,
            "start": time.perf_counter(),
            "attributes": dict(attributes),
            "status": "ok",
        }
        self._stack.append(s)
        try:
            yield s
        except Exception as exc:  # record the error, then re-raise
            s["status"] = "error"
            s["attributes"]["error.type"] = type(exc).__name__
            raise
        finally:
            s["end"] = time.perf_counter()
            s["duration_ms"] = round((s["end"] - s["start"]) * 1000, 2)
            self._stack.pop()
            self.spans.append(s)

    def dump(self, path: str) -> None:
        with open(path, "w", encoding="utf-8") as f:
            for s in self.spans:
                f.write(json.dumps({k: v for k, v in s.items() if k not in ("start", "end")}) + "\n")


TRACER = Tracer()

# ----------------------------------------------------------------------------
# 2. The system under test
# ----------------------------------------------------------------------------

def call_llm(agent: str, prompt: str, rng: random.Random, skill: float) -> tuple[str, int, int]:
    """SIMULATED model call. Replace with a real one, e.g. an API client.

    Returns (text, input_tokens, output_tokens). Here a worker "knows" the
    answer with probability `skill`; otherwise it returns a wrong answer.
    """
    time.sleep(rng.uniform(0.001, 0.004))            # pretend network latency
    in_tok = len(prompt.split()) + 40
    out_tok = rng.randint(20, 80)
    return prompt, in_tok, out_tok


def llm_step(agent: str, purpose: str, prompt: str, rng: random.Random, skill: float = 1.0) -> str:
    with TRACER.span("chat", **{
        "gen_ai.operation.name": "chat",
        "gen_ai.agent.name": agent,
        "purpose": purpose,
    }) as s:
        text, i, o = call_llm(agent, prompt, rng, skill)
        s["attributes"]["gen_ai.usage.input_tokens"] = i
        s["attributes"]["gen_ai.usage.output_tokens"] = o
        return text


def worker(name: str, task: dict, rng: random.Random, difficulty: float) -> str:
    """A worker agent: answers correctly with a probability that depends on
    task difficulty. Hard tasks fail repeatedly, as real agents do."""
    with TRACER.span(f"invoke_agent {name}", **{"gen_ai.operation.name": "invoke_agent", "gen_ai.agent.name": name}):
        with TRACER.span("execute_tool lookup", **{"gen_ai.operation.name": "execute_tool", "gen_ai.tool.name": "lookup"}):
            time.sleep(rng.uniform(0.0005, 0.002))
        llm_step(name, "answer", task["question"], rng)
        return task["expected"] if rng.random() > difficulty else "wrong answer"


def run_chain(task: dict, rng: random.Random, difficulty: float) -> str:
    """Sequential hand-off: coordinator -> worker A -> worker B (B refines A)."""
    with TRACER.span("invoke_agent Coordinator", **{"gen_ai.operation.name": "invoke_agent", "gen_ai.agent.name": "Coordinator"}):
        llm_step("Coordinator", "plan", task["question"], rng)
        a = worker("WorkerA", task, rng, difficulty)
        b = worker("WorkerB", task, rng, difficulty * (0.6 if a == task["expected"] else 1.0))
        return b


def run_star(task: dict, rng: random.Random, difficulty: float) -> str:
    """Supervisor (star): coordinator asks both workers and checks agreement."""
    with TRACER.span("invoke_agent Coordinator", **{"gen_ai.operation.name": "invoke_agent", "gen_ai.agent.name": "Coordinator"}):
        llm_step("Coordinator", "plan", task["question"], rng)
        a = worker("WorkerA", task, rng, difficulty)
        b = worker("WorkerB", task, rng, difficulty)
        llm_step("Coordinator", "verify", f"{a} | {b}", rng)
        if a == b:
            return a
        # disagreement: one more attempt by WorkerA (extra cost, better accuracy)
        return worker("WorkerA", task, rng, difficulty * 0.7)


TOPOLOGIES: dict[str, Callable] = {"chain": run_chain, "star": run_star}

# ----------------------------------------------------------------------------
# 3. Dataset and evaluators
# ----------------------------------------------------------------------------

SAMPLE_TASKS = [
    {"id": f"T{i:02d}", "question": f"Registration question {i}", "expected": f"answer-{i}"}
    for i in range(1, 21)
]


def load_tasks(path: str | None) -> list[dict]:
    if not path:
        return SAMPLE_TASKS
    with open(path, newline="", encoding="utf-8") as f:
        return [dict(r) for r in csv.DictReader(f)]


def exact_match(output: str, expected: str) -> bool:
    return output.strip().lower() == expected.strip().lower()


# Hook for an LLM-as-a-judge evaluator. Return a score in [0, 1].
def rubric_judge(question: str, output: str, expected: str) -> float | None:
    return None  # implement with a different model than the one under test


# ----------------------------------------------------------------------------
# 4. Metrics
# ----------------------------------------------------------------------------

def pass_hat_k(n: int, c: int, k: int) -> float:
    """Unbiased estimate of pass^k for one task (tau-bench): C(c,k)/C(n,k)."""
    return comb(c, k) / comb(n, k) if n >= k else float("nan")


def pass_at_k(n: int, c: int, k: int) -> float:
    """Unbiased estimate of pass@k for one task: 1 - C(n-c,k)/C(n,k)."""
    return 1 - comb(n - c, k) / comb(n, k) if n >= k else float("nan")


def ci95(p: float, n: int) -> float:
    return 1.96 * sqrt(p * (1 - p) / n) if n else float("nan")


def percentile(xs: list[float], q: float) -> float:
    xs = sorted(xs)
    if not xs:
        return float("nan")
    i = (len(xs) - 1) * q
    lo, hi = int(i), min(int(i) + 1, len(xs) - 1)
    return xs[lo] + (xs[hi] - xs[lo]) * (i - lo)

# ----------------------------------------------------------------------------
# 5. Experiment runner
# ----------------------------------------------------------------------------

def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--tasks", help="CSV with columns id,question,expected")
    ap.add_argument("--k", type=int, default=3, help="trials per task (default 3)")
    ap.add_argument("--seed", type=int, default=461)
    ap.add_argument("--out", default="lab_output")
    ap.add_argument("--price-in", type=float, default=0.15, help="US$ per 1M input tokens")
    ap.add_argument("--price-out", type=float, default=0.60, help="US$ per 1M output tokens")
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    tasks = load_tasks(args.tasks)
    rng = random.Random(args.seed)
    # Each task gets a fixed difficulty, so failures repeat on the same hard tasks.
    difficulty = {t["id"]: rng.choice([0.05, 0.1, 0.2, 0.4, 0.8]) for t in tasks}

    rows = []
    for topo, runner in TOPOLOGIES.items():
        for t in tasks:
            for trial in range(args.k):
                trial_rng = random.Random(f"{args.seed}-{topo}-{t['id']}-{trial}")
                trace_id = TRACER.new_trace()
                first = len(TRACER.spans)
                start = time.perf_counter()
                output = runner(t, trial_rng, difficulty[t["id"]])
                latency = (time.perf_counter() - start) * 1000
                spans = TRACER.spans[first:]
                tin = sum(s["attributes"].get("gen_ai.usage.input_tokens", 0) for s in spans)
                tout = sum(s["attributes"].get("gen_ai.usage.output_tokens", 0) for s in spans)
                rows.append({
                    "topology": topo, "task": t["id"], "trial": trial, "trace_id": trace_id,
                    "success": int(exact_match(output, t["expected"])),
                    "judge": rubric_judge(t["question"], output, t["expected"]),
                    "latency_ms": round(latency, 2),
                    "llm_calls": sum(1 for s in spans if s["name"] == "chat"),
                    "agent_invocations": sum(1 for s in spans if s["name"].startswith("invoke_agent")),
                    "input_tokens": tin, "output_tokens": tout,
                    "cost_usd": (tin * args.price_in + tout * args.price_out) / 1e6,
                })

    TRACER.dump(os.path.join(args.out, "traces.jsonl"))
    with open(os.path.join(args.out, "results.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    # ---- Summary per topology
    lines = [f"# Lab summary (k = {args.k}, {len(tasks)} tasks, seed {args.seed})", "",
             "| Layer | Metric | " + " | ".join(TOPOLOGIES) + " |",
             "|---|---|" + "---|" * len(TOPOLOGIES)]
    stats = {}
    for topo in TOPOLOGIES:
        r = [x for x in rows if x["topology"] == topo]
        n = len(r)
        sr = sum(x["success"] for x in r) / n
        per_task = {}
        for x in r:
            per_task.setdefault(x["task"], []).append(x["success"])
        ph = statistics.mean(pass_hat_k(len(v), sum(v), args.k) for v in per_task.values())
        pa = statistics.mean(pass_at_k(len(v), sum(v), args.k) for v in per_task.values())
        lat = [x["latency_ms"] for x in r]
        cost = sum(x["cost_usd"] for x in r)
        succ = sum(x["success"] for x in r)
        stats[topo] = {
            "Success rate P(Ψ) ± 95% CI": f"{sr:.1%} ± {ci95(sr, n):.1%}",
            "Messages (agent invocations) per task": f"{statistics.mean(x['agent_invocations'] for x in r):.2f}",
            "LLM calls per task": f"{statistics.mean(x['llm_calls'] for x in r):.2f}",
            "Latency p50 / p95 (ms)": f"{percentile(lat, .5):.1f} / {percentile(lat, .95):.1f}",
            f"pass@{args.k}": f"{pa:.1%}",
            f"pass^{args.k}": f"{ph:.1%}",
            "Cost per successful task (US$)": f"{cost / succ:.6f}" if succ else "n/a",
            "Tokens per task": f"{statistics.mean(x['input_tokens'] + x['output_tokens'] for x in r):.0f}",
        }
    layer = {
        "Success rate P(Ψ) ± 95% CI": "1 Agent",
        "Messages (agent invocations) per task": "2 Interaction",
        "LLM calls per task": "2 Interaction",
        "Latency p50 / p95 (ms)": "3 System",
        f"pass@{args.k}": "4 Trust",
        f"pass^{args.k}": "4 Trust",
        "Cost per successful task (US$)": "4 Trust",
        "Tokens per task": "4 Trust",
    }
    for metric, lay in layer.items():
        lines.append(f"| {lay} | {metric} | " + " | ".join(stats[t][metric] for t in TOPOLOGIES) + " |")

    # Tasks that never succeed are your best MAST case studies
    lines += ["", "## Tasks to inspect (label with MAST)", ""]
    for topo in TOPOLOGIES:
        always_fail = sorted({x["task"] for x in rows if x["topology"] == topo} -
                             {x["task"] for x in rows if x["topology"] == topo and x["success"]})
        flaky = sorted(t for t in {x["task"] for x in rows if x["topology"] == topo}
                       if 0 < sum(x["success"] for x in rows if x["topology"] == topo and x["task"] == t) < args.k)
        lines.append(f"- **{topo}**: always fail {always_fail or 'none'}; inconsistent {flaky or 'none'}")
    lines += ["", "Open traces.jsonl, filter by trace_id from results.csv, and read the failing traces."]

    summary = "\n".join(lines)
    with open(os.path.join(args.out, "summary.md"), "w", encoding="utf-8") as f:
        f.write(summary + "\n")
    print(summary)
    print(f"\nWrote {len(TRACER.spans)} spans, {len(rows)} results to ./{args.out}/")


if __name__ == "__main__":
    main()
