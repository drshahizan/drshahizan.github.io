# Topic 8 lab report: instrument, trace, evaluate

Student name and ID:
Date:
System: coordinator + 2 workers · topologies compared: sequential chain vs supervisor (star)

## 1. Setup (max 150 words)

- Model(s) and version(s):
- Tracing tool (LangSmith / OpenTelemetry / harness JSONL):
- Number of tasks: 20 · trials per task k = 3 · seed(s):

## 2. Dataset

Describe how the 20 tasks were written and how the expected outcome is checked.
Attach tasks.csv.

## 3. Evaluators

| Evaluator | Type (code / LLM judge / human) | What it checks | How it was validated |
|---|---|---|---|
| Exact match | code | | |
| Rubric judge | LLM | | agreement with your own labels on N tasks |
| Latency | code | | |
| Token cost | code | | |

## 4. Results: four-layer table

| Layer | Metric | Chain | Star |
|---|---|---|---|
| 1 Agent | Success rate ± 95% CI | | |
| 2 Interaction | Agent invocations / LLM calls per task | | |
| 3 System | Latency p50 / p95 | | |
| 4 Trust | pass^3 | | |
| 4 Trust | Cost per successful task | | |

## 5. One chart

Insert one chart, for example pass^k for k = 1..3 for both topologies, or accuracy against cost.
Write two sentences on what it shows.

## 6. Two failure cases labelled with MAST

For each: task ID, trace ID, what happened (3–5 sentences), MAST category and failure mode, and the fix you would try.

## 7. Conclusion (max 150 words)

Which topology would you deploy, and what evidence supports that choice?
