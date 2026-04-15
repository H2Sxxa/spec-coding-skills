# spec-coding-skills

[简体中文](./README.zh.md)

Spec-driven skills for agents that plan with acceptance criteria, correct against real feedback, and remember reusable project knowledge.

## What This Provides

`spec-coding-skills` is a small skill set for making agentic coding work more repeatable:

1. Define the work before implementation.
2. Validate implementation against observable acceptance criteria.
3. Use lint, tests, logs, CI, and review feedback to correct behavior.
4. Save reusable decisions, root causes, setup rules, and fix patterns for future tasks.

The repository is skill-first:

- `SKILL.md` files define workflow and trigger behavior.
- Bundled `scripts/` handle deterministic or repetitive actions.
- Bundled `references/` provide templates and reusable formats.

## Installation

Install all skills from GitHub:

```bash
npx skills add H2Sxxa/spec-coding-skills --all
```

Install selected skills:

```bash
npx skills add H2Sxxa/spec-coding-skills --skill spec-plan --skill spec-crlp --skill spec-index
```

Install from a local checkout while developing:

```bash
npx skills add . --all
```

## Skills

### `spec-plan`

Turns ambiguous software requests into BDD-style implementation specs with scope, constraints, acceptance criteria, edge cases, validation steps, and an execution plan.

Use it when requirements are fuzzy, the user asks for a plan or spec, or implementation would be risky without first making "done" explicit.

### `spec-crlp`

Runs a spec-driven correction loop for existing code by comparing the implementation against the spec and using linter output, tests, logs, CI, and review feedback to diagnose gaps.

Use it when code is failing checks, drifting from acceptance criteria, or needs a fix-verify-repeat loop.

### `spec-index`

Captures and retrieves durable project memory such as decisions, constraints, setup steps, root causes, fixes, patterns, and pitfalls.

Use it when the agent should save reusable knowledge, look up prior solutions, or feed historical context into planning and correction loops.

## Default Workflow

The three skills are designed to reinforce each other:

1. Read the target repository root `SPEC.md` when present; otherwise use the built-in defaults from this repository.
2. Retrieve relevant memory with `spec-index` when prior decisions, constraints, pitfalls, or fixes could affect the task.
3. Use `spec-plan` to define the problem, acceptance criteria, validation plan, and execution steps.
4. Implement in the normal coding loop.
5. Use `spec-crlp` when feedback reveals a mismatch between the implementation and the spec.
6. Persist reusable findings with `spec-index` so later tasks can benefit from them.

For small, self-contained tasks, the skills are allowed to stay lightweight and avoid unnecessary persistence or retrieval.

## Repository Overrides

The skills work without project-specific configuration. By default, they use the conventions in [SPEC.md](./SPEC.md).

For a target repository that needs custom lint commands, validation order, setup docs, task spec paths, or knowledge-base paths, copy [templates/repository-SPEC.md](./templates/repository-SPEC.md) into the target repository root as `SPEC.md` and edit it there.

Preference order:

1. Direct user instructions.
2. Target repository root `SPEC.md`.
3. Built-in defaults from this repository.
4. Tooling discovered from the target repository when allowed by the defaults.

Partial repository `SPEC.md` files are fine. Missing fields fall back to the built-in defaults.

## Knowledge Base

`spec-index` stores durable project memory as Markdown entries with YAML frontmatter.

Default location:

```text
docs/knowledge-base/
```

Bundled resources:

- [template.md](./skills/spec-index/references/template.md) defines the canonical memory entry format.
- [index.py](./skills/spec-index/scripts/index.py) provides deterministic `add`, `search`, and `rebuild` operations.

The helper script uses the Python standard library only and does not require network access.

## Demo Benchmark

This repository includes a small 3-prompt demo benchmark for the three core skills. In one local run with Codex, the skill-guided outputs passed a deterministic skill-aligned rubric at `100.0%`, compared with `11.1%` for baseline generic outputs: `+88.9` percentage points.

This is a demonstration benchmark, not a statistically rigorous claim. It uses one run per prompt and checks whether outputs include the structures these skills are designed to produce, such as `Context From Memory`, `Relevant Memory`, `Memory To Capture`, YAML frontmatter, and `trigger_tags`.

The committed eval prompts live in [evals/evals.json](./evals/evals.json). See [TESTING.md](./TESTING.md) for the reproducible workflow and local review-page generation.

## Repository Layout

```text
skills/
  spec-plan/
    SKILL.md
  spec-crlp/
    SKILL.md
  spec-index/
    SKILL.md
    references/
      template.md
    scripts/
      index.py
docs/
  knowledge-base/
    index.md
evals/
  evals.json
templates/
  repository-SPEC.md
TESTING.md
SPEC.md
README.md
README.zh.md
LICENSE
```

## Roadmap

- Expand eval coverage beyond the initial 3-prompt demo.
- Add example memory entries that demonstrate useful trigger tags.
- Run multi-sample benchmarks for more reliable before/after claims.
- Collect feedback from real projects.

## License

MIT License. See [LICENSE](./LICENSE).
