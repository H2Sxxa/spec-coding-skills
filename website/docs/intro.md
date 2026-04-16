---
sidebar_position: 1
title: spec-coding-skills overview
description: Overview of spec-plan, spec-crlp, and spec-index for spec-driven AI coding workflows.
---

# spec-coding-skills overview

`spec-coding-skills` is a small skill suite for making agentic coding work more repeatable.

It focuses on three capabilities:

1. Turn ambiguous requests into implementation-ready specs.
2. Correct implementation drift using evidence from lint, tests, logs, CI, and review feedback.
3. Save reusable project knowledge so later tasks do not repeat the same mistakes.

## Skills

### `spec-plan`

Turn fuzzy requests into implementation-ready specs with:

- scope boundaries
- assumptions
- acceptance criteria
- validation plans
- execution guardrails
- implementation steps

### `spec-crlp`

Run a spec-driven correction loop for existing code by combining:

- the current spec
- linter output
- failing tests
- runtime logs
- CI failures
- review feedback

### `spec-index`

Capture, retrieve, and maintain durable project memory:

- decisions
- constraints
- root causes
- fix patterns
- setup and environment gotchas
- validation rules

## Default workflow

1. Read the target repository root `SPEC.md` when present.
2. Retrieve relevant memory with `spec-index`.
3. Use `spec-plan` to define scope, acceptance criteria, validation, and execution steps.
4. Implement.
5. Use `spec-crlp` if implementation drifts from the spec.
6. Save reusable findings back into `spec-index`.
