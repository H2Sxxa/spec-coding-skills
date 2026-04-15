# Spec Skill Defaults

This file documents the built-in defaults for the `spec-plan`, `spec-crlp`, and `spec-index` skill series.

Users can place their own `SPEC.md` in the root of a target repository to override these defaults with project-specific preferences. If a target repository does not define its own `SPEC.md`, the skills should fall back to the defaults described here.

## Preference Precedence

Apply configuration in this order:

1. Direct user instructions.
2. Target repository root `SPEC.md`, if present.
3. Built-in defaults from the skill series.
4. Repository tooling discovery when the default behavior explicitly allows it.

If a repository `SPEC.md` is partial, use the values it defines and fall back to defaults for the rest.

## Default Workflow

1. `spec-plan` turns an ambiguous request into a concrete, testable spec.
2. `spec-crlp` uses that spec plus implementation feedback to run a correction loop.
3. `spec-index` stores and retrieves durable knowledge that helps future planning and correction work.

## Default Context Retrieval Behavior

- Before planning non-trivial work, `spec-plan` should retrieve relevant memory from `spec-index`.
- Before debugging or correction work, `spec-crlp` should retrieve relevant memory from `spec-index`.
- Retrieval should be bounded and purposeful, not an open-ended research phase.
- Search first for decisions, constraints, setup rules, pitfalls, validation rules, root causes, and fix patterns.
- Build search terms from the user request, component names, file paths, tools, frameworks, symptoms, and error text.
- If relevant memory is found, incorporate it into the plan or correction summary with a short explanation of why it matters.
- If no relevant memory is found, say that no matching memory was found and continue with the normal workflow.
- Skip retrieval for tiny, self-contained tasks where there is no meaningful repository context to reuse.

## Default Task Spec Behavior

- Default task spec root: `docs/specs/`
- Default task spec file name: `<slug>.md`
- Persist a task spec when the work is multi-step, risky, likely to span turns, or needs future correction against stable acceptance criteria.
- Keep the plan in the conversation and move directly into task execution when the task is small, well-bounded, and the user clearly wants momentum.
- Use Markdown for the overall task spec.
- Use Gherkin only for behavior-oriented acceptance criteria or regression scenarios where `Given / When / Then` improves clarity.
- Do not force Gherkin onto setup notes, implementation steps, decisions, or generic planning prose.

## Default Validation Behavior

- Prefer validation commands declared in a target repository root `SPEC.md`.
- If no repository `SPEC.md` exists, or it does not define validation commands, discover them from repository tooling when possible.
- If commands still cannot be determined, state that validation is not configured yet.
- Never invent lint or test commands that are neither declared nor discoverable.
- Default validation order when both signals exist: lint first, then the narrowest relevant test scope, then additional checks only when the task needs them.

## Default Knowledge Base Behavior

- Default knowledge base root: `docs/knowledge-base/`
- Default knowledge base index: `docs/knowledge-base/index.md`
- Default entry format: Markdown with YAML frontmatter, one primary category, and retrieval-oriented trigger tags.
- Default indexing helper: use the `spec-index` bundled `scripts/index.py` when available.
- Save durable knowledge as concise Markdown entries linked from the index.
- Capture only validated, reusable knowledge.
- Support three memory modes: retrieve existing knowledge, capture new knowledge, and investigate or maintain existing knowledge.
- Investigation should check duplicates, stale entries, weak trigger tags, missing metadata, broken index links, and conflicting rules.
- Preferred capture categories: decisions, constraints, setup rules, root causes, fixes, patterns, and pitfalls.

## Default Setup Behavior

- Default user-facing setup document: `SETUP.md`
- Durable setup gotchas, missing prerequisites, and environment-specific lessons belong in the knowledge base.
- If setup is required but undocumented, call out the gap and recommend updating `SETUP.md`, the repository root `SPEC.md`, or the knowledge base.

## How Repositories Can Override

A target repository can define its own root `SPEC.md` with concrete preferences such as:

- validation commands and order
- knowledge-base location
- setup documentation paths
- cross-skill workflow conventions

Keep repository-specific `SPEC.md` files short and concrete. Missing fields should fall back to the defaults in this file instead of making the whole file unusable.
