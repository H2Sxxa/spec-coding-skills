---
name: spec-plan
description: Turn ambiguous software requests into BDD-style implementation specs with clear scope, constraints, acceptance criteria, failure cases, validation steps, and an execution plan. Use this whenever the user is defining requirements, asking for a plan or spec, wants boundaries clarified before coding, mentions acceptance criteria or BDD, or when coding would be risky without first making done explicit.
---

# Spec Planning

Use this skill when the task is still fuzzy and the agent should define success before implementation begins.

This skill turns a request into a practical spec. The goal is not project-management theater. The goal is to make coding safer and faster by clarifying scope, constraints, edge cases, validation, and what counts as done.

## Repository preference override

Before doing anything else, look for a `SPEC.md` in the target repository root.

If it exists, treat it as the repository-specific preference layer for:

- shared validation rules
- setup expectations
- knowledge-base location
- cross-skill workflow conventions

If it is missing, use the built-in defaults for this skill series instead of blocking on the missing file.

If it is partial, use the fields it defines and fall back to defaults for the rest.

## Built-in defaults

When no repository root `SPEC.md` is available, use these defaults:

- validation behavior: prefer discoverable repository tooling; if no validation commands are discoverable, say validation is not configured yet
- setup document: `SETUP.md`
- knowledge-base location: `docs/knowledge-base/`

## Core responsibilities

- Convert the user's request into a concrete problem statement.
- Separate in-scope work from out-of-scope work.
- Make assumptions and constraints visible.
- Define acceptance criteria in observable, testable terms.
- Identify edge cases, dependencies, and setup prerequisites.
- Produce an execution plan that can guide implementation work.

## When this skill is not the right fit

- If the implementation already exists and the main need is debugging or fixing regressions, use `spec-crlp`.
- If the main need is to save or look up prior knowledge, use `spec-index`.
- If the user explicitly wants immediate implementation and the task is already well-bounded, keep planning lightweight.

## Planning workflow

1. Restate the request as a concrete objective.
2. Extract known constraints from the conversation, the repository, and the repository root `SPEC.md` when present.
3. Identify what is in scope and what is not.
4. Surface missing assumptions or dependencies that could change the solution.
5. Translate the request into acceptance criteria that can later be validated.
6. Call out failure modes, edge cases, setup requirements, and validation rules from the repository root `SPEC.md` when present, otherwise from the built-in defaults.
7. Break the work into a practical execution sequence.
8. Note open questions only when they are genuinely decision-shaping.

## Preferred spec structure

Prefer this shape unless the user asks for a different format:

```markdown
# Spec
## Goal
## Problem Statement
## In Scope
## Out Of Scope
## Constraints
## Assumptions
## Acceptance Criteria
## Edge Cases
## Validation Plan
## Execution Plan
## Open Questions
```

## Acceptance criteria guidance

Write acceptance criteria as behaviors that can be observed or validated.

Good acceptance criteria usually answer questions like:

- What should happen when the happy path succeeds?
- What should happen on invalid input or missing configuration?
- What should remain unchanged?
- How will we verify that the implementation is correct?

Avoid vague statements like "works well" or "is user friendly" unless you translate them into something observable.

## Good habits

- Prefer concrete boundaries over broad ambition.
- Make setup prerequisites explicit when they could block execution.
- Reuse the repository root `SPEC.md` when present, otherwise apply the built-in defaults instead of redefining conventions per task.
- Name the files, systems, or components likely to be affected when that is already knowable.
- Keep the plan implementation-oriented rather than managerial.
- Make reasonable assumptions when the risk is low, and label them clearly.

## Avoid

- Padding the plan with timelines, staffing, or resource-allocation language unless the user explicitly asked for that.
- Writing acceptance criteria that cannot be tested or observed.
- Smuggling implementation details into the spec when the user only needs requirements.
- Creating a long list of questions when a few explicit assumptions would keep momentum.

## Handoffs

- Hand the resulting spec to `spec-crlp` once implementation feedback starts coming in.
- Send durable constraints, setup rules, or project decisions to `spec-index` when they should be reusable later.
- Keep repository-level conventions in the repository root `SPEC.md` when one exists, not inside one task-specific spec.
- If the same repository preference keeps coming up, recommend creating or updating a repository root `SPEC.md`.

## Example requests

- "Before you code this, help me define the acceptance criteria and edge cases."
- "Turn this rough feature idea into a concrete spec and execution plan."
- "I do not want to jump into implementation yet. Clarify scope, assumptions, and validation first."
