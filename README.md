# spec-coding

Published skills for spec-driven coding workflows with planning, correction loops, and memory retrieval.

Default skill-series conventions live in [SPEC.md](./SPEC.md). Target repositories can override them by defining their own root `SPEC.md`.

The preferred implementation model in this repository is skill-first:

- Use `SKILL.md` for workflow and trigger guidance.
- Use bundled `scripts/` for deterministic or repetitive actions.
- Use bundled `references/` for project conventions, examples, and reusable context.

## Overview

This repository explores a simple operating model for AI-assisted software delivery:

1. Turn vague requests into a clear spec.
2. Implement against explicit acceptance criteria.
3. Use feedback from lint, tests, logs, and review to self-correct.
4. Store durable lessons so future work improves instead of repeating the same mistakes.

The project is centered on the idea that spec coding becomes much more reliable when planning, correction, and memory are treated as separate but connected skills.

## Project Goal

The current direction is defined by four core goals:

1. BDD-driven development with explicit requirement boundaries and acceptance criteria.
2. Agent self-correction loops based on linter and test feedback.
3. Agent self-improvement loops through local keyword indexing and retrieval.
4. Setup automation or guided environment configuration when required by the task.

See [GOAL.md](./GOAL.md) for the current high-level intent.

## Skills

### `spec-plan`

Converts ambiguous coding requests into a BDD-style implementation spec with scope, constraints, acceptance criteria, edge cases, validation steps, and an execution plan.

Use it when the work is still fuzzy and the agent should clarify what "done" means before writing code.

### `spec-crlp`

Runs a spec-driven correction loop using the current spec plus linter output, test failures, runtime logs, and review feedback.

Use it when code already exists but behavior is wrong, checks are failing, or implementation has drifted from acceptance criteria.

### `spec-index`

Captures and retrieves durable project memory such as decisions, setup steps, root causes, fixes, patterns, and reusable solutions.

Use it when the agent should save knowledge for later, look up prior solutions, or feed historical context back into future correction loops.

## Intended Workflow

The three skills are designed to work together:

1. Read the target repository root `SPEC.md` when present; otherwise use the built-in defaults from this skill series.
2. Retrieve relevant memory with `spec-index` when prior decisions, constraints, pitfalls, or fixes could affect the task.
3. Start with `spec-plan` to define the problem and acceptance criteria.
4. Execute the implementation work in the normal coding loop.
5. Use `spec-crlp` when feedback reveals gaps between the spec and the implementation.
6. Persist reusable findings with `spec-index` so later tasks can benefit from them.

This separation keeps each skill focused and reduces overlap between planning, fixing, and remembering.

## Repository Layout

```text
skills/
  spec-plan/
    SKILL.md
  spec-crlp/
    SKILL.md
  spec-index/
    SKILL.md
docs/
  knowledge-base/
    index.md
.agents/
  skills/
    skill-creator/
GOAL.md
SPEC.md
README.md
SETUP.md
```

## Current Status

This repository is in an early stage.

- The three primary skills now have draft instruction bodies and a documented default preference model.
- `SPEC.md` documents the built-in defaults that target repositories can override with their own root `SPEC.md`.
- The bundled `skill-creator` skill is available to help iterate on descriptions, evals, and packaging.

## Next Steps

Recommended improvements for this repository:

1. Add a concrete example repository-level `SPEC.md` template for users who want to override the defaults.
2. Add realistic eval prompts to verify skill triggering and behavior.
3. Bundle task-specific `scripts/` and `references/` where they reduce repeated work.
4. Start populating the knowledge base with the first real reusable entries.

## Development Notes

- Each skill is kept in its own folder under `skills/` so it can evolve independently.
- Descriptions should be explicit about trigger conditions, because description quality strongly affects whether a skill is selected.
- Keep the responsibilities narrow: planning in `spec-plan`, correction in `spec-crlp`, memory in `spec-index`.
