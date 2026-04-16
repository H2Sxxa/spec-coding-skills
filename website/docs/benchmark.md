---
sidebar_position: 3
title: Demo Benchmark
---

# Demo Benchmark

This project includes a small 3-prompt demo benchmark comparing:

- baseline generic agent output
- output guided by `spec-coding-skills`

## Result summary

| Eval | Baseline | With skills |
| --- | ---: | ---: |
| Planning an existing feature | 33.3% | 100.0% |
| Correcting a failing test | 0.0% | 100.0% |
| Saving a reusable root cause | 0.0% | 100.0% |
| Overall mean | 11.1% | 100.0% |

## What this measures

This demo does **not** claim final code quality improved by the same amount.

It measures whether the agent produced the workflow artifacts that make real development safer:

- clear scope
- testable acceptance criteria
- explicit validation steps
- reusable project memory
- structured correction outputs

Use it as a demo signal, not a statistically rigorous benchmark.
