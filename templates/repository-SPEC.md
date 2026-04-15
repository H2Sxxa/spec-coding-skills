# Spec Coding Project Preferences

Copy this file to the root of a target repository as `SPEC.md` when the default `spec-coding-skills` conventions need project-specific overrides.

You can delete sections that do not apply. Missing fields fall back to the built-in defaults from the skill series.

## Validation

- Lint command: `Not configured`
- Test command: `Not configured`
- Build command: `Not configured`
- Validation order:
  1. lint
  2. targeted tests
  3. build when relevant

## Task Specs

- Task spec root: `docs/specs/`
- Persist task specs for multi-step, risky, review-heavy, or multi-turn work.
- Keep small, well-bounded plans in the conversation when speed matters.
- Use Markdown for task specs.
- Use Gherkin only for behavior-oriented acceptance criteria or regression scenarios.

## Knowledge Base

- Knowledge base root: `docs/knowledge-base/`
- Knowledge base index: `docs/knowledge-base/index.md`
- Entry format: Markdown with YAML frontmatter.
- Entry categories: `decision`, `constraint`, `setup`, `root-cause`, `fix-pattern`, `implementation-pattern`, `pitfall`, `validation`.
- Trigger tags should reflect future search terms, such as components, tools, symptoms, errors, files, frameworks, and environments.

## Setup

- Setup document: `SETUP.md`
- Store durable setup gotchas in the knowledge base.
- Keep one-off setup troubleshooting out of long-term memory unless it is likely to recur.

## Workflow Notes

- `spec-plan` should retrieve relevant memory before planning non-trivial existing-project work.
- `spec-crlp` should retrieve relevant memory before correction work.
- `spec-index` should capture validated, reusable findings after planning or correction.
