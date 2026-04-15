---
name: spec-index
description: Capture and retrieve durable project memory for spec-driven engineering, including decisions, constraints, setup steps, root causes, fixes, patterns, and reusable snippets through lightweight local indexing and keyword retrieval. Use this whenever the user wants to save knowledge for later, look up prior solutions, avoid re-solving the same problem, onboard future work, or feed historical context into planning and correction loops.
---

# Spec Memory Index

Use this skill to turn one-off discoveries into durable project memory and to retrieve that memory when a later task would benefit from it.

This skill is about memory with reuse value, not generic note taking. Capture decisions, setup knowledge, root causes, fix patterns, and constraints in a form that future planning and correction work can actually use.

## Repository preference override

Before retrieving or saving memory, look for a `SPEC.md` in the target repository root.

If it exists, treat it as the repository-specific preference layer for:

- the knowledge-base location
- capture categories and storage expectations
- setup documentation boundaries
- cross-skill workflow conventions

If it is missing, use the built-in defaults for this skill series instead of blocking on the missing file.

If it is partial, use the fields it defines and fall back to defaults for the rest.

## Built-in defaults

When no repository root `SPEC.md` is available, use these defaults:

- knowledge-base root: `docs/knowledge-base/`
- knowledge-base index: `docs/knowledge-base/index.md`
- setup document: `SETUP.md`

## Core responsibilities

- Save durable knowledge in a normalized, retrieval-friendly form.
- Retrieve relevant past knowledge using concrete keywords and context clues.
- Reduce repeated debugging and repeated planning by surfacing what is already known.
- Feed high-value context back into `spec-plan` and `spec-crlp`.

## What belongs in the index

- Architecture or product decisions and the reason behind them.
- Requirement constraints and non-obvious boundaries.
- Setup steps, environment prerequisites, and configuration gotchas.
- Confirmed root causes and the fixes that resolved them.
- Reusable implementation patterns, migration rules, or troubleshooting heuristics.
- Known pitfalls, edge cases, and lessons learned from previous work.

## What does not belong in the index

- Raw chatter with no future reuse value.
- Large unstructured logs when a concise summary would do.
- Temporary guesses that have not been validated.
- Duplicate entries that say the same thing in different words.

## Retrieval workflow

1. Identify what question you are trying to answer.
2. Build search terms from the problem domain, component name, symptom, tool, environment, and error wording.
3. Retrieve the most relevant matches from the location defined in the repository root `SPEC.md` when present, otherwise use the built-in default location.
4. Rank them by closeness to the current task.
5. Return concise takeaways, why they matter, and what action they suggest.
6. If nothing relevant is found, say so plainly instead of pretending there is memory that does not exist.

## Capture workflow

1. Decide whether the new information is likely to help with future work.
2. Normalize it into a compact entry with stable fields.
3. Preserve the context that explains when the entry applies.
4. Include the evidence, resolution, or decision rationale.
5. Tag it with keywords that future retrieval will likely use.
6. Avoid creating a second entry when an update to an existing one would be cleaner.

## Preferred entry shape

Prefer a structure like this when saving or presenting memory:

```markdown
# Memory Entry
## Title
## Context
## Applies When
## Decision Or Root Cause
## Resolution Or Rule
## Validation
## Tags
## Related Files Or Systems
```

## Preferred retrieval shape

Prefer a structure like this when returning matches:

```markdown
# Relevant Memory
## Match
## Why It Matters
## Key Takeaway
## Recommended Next Step
```

## Storage guidance

Use the storage location defined in the repository root `SPEC.md` when present.

If no repository root `SPEC.md` is available, default to `docs/knowledge-base/` and `docs/knowledge-base/index.md`.

If the default storage location is clearly unsuitable for the task or the repository is read-only, present the normalized memory entry in the response and explain that persistent storage could not be updated.

## Handoffs

- Accept decisions, assumptions, and constraints from `spec-plan` when they are worth preserving.
- Accept confirmed root causes, setup fixes, and troubleshooting patterns from `spec-crlp`.
- Return relevant memory to `spec-plan` when planning a new task with similar constraints.
- Return relevant memory to `spec-crlp` when debugging a failure that resembles a known issue.
- Recommend creating or updating a repository root `SPEC.md` when repeated memory entries reveal a repository-specific convention that should become explicit.

## Example requests

- "Save this root cause so we do not lose it after this session."
- "Have we solved something like this migration issue before?"
- "Index the setup steps and env gotchas from today's work so future tasks can retrieve them."
