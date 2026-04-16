# Spec Plan Self-Check

Use this reference before finalizing a persisted task spec or handing a conversation plan to implementation.

The purpose is to reduce execution-time guessing. Implementation can still choose internal details, but it should not silently change scope, behavior, acceptance criteria, validation, or project constraints.

## Ambiguity Handling

Classify every meaningful ambiguity as one of:

- Assumption: Low-risk and reasonable to proceed with. Write it explicitly in `Assumptions`.
- Open Question: Decision-shaping but not blocking the current planning output. Write it in `Open Questions`.
- Blocking Question: Cannot safely proceed to implementation until answered. Write it in `Blocking Questions` and do not hand off to implementation.

Prefer assumptions over questions when the risk is low and the assumption is easy to revise later. Prefer blocking questions when a wrong guess would cause rework, security risk, data migration risk, or user-visible behavior changes.

## Blocking Question Triggers

A question is blocking if the answer could change:

- user-visible behavior
- product scope
- permissions, roles, or security model
- data model, persistence, or migration strategy
- public API contract
- billing, compliance, privacy, or audit behavior
- acceptance criteria
- validation strategy
- rollout or backwards compatibility requirements

## Execution Guardrails

Implementation may choose these details without updating the spec when they stay inside existing project conventions:

- helper names
- local function boundaries
- file organization within established patterns
- small refactor shape
- test fixture organization
- internal error handling structure that does not change user-visible behavior

Implementation must not change these without updating the spec or asking the user:

- goal
- in-scope or out-of-scope work
- user-visible behavior
- permissions or security behavior
- data model or persistence rules
- public API contract
- acceptance criteria
- validation plan
- documented assumptions
- repository-level preferences from `SPEC.md`

## Change Control

If implementation reveals that the spec is wrong, incomplete, or incompatible with the codebase:

1. Stop treating the current plan as final.
2. Identify the exact spec section that needs to change.
3. State whether the issue is a new fact, a wrong assumption, a codebase constraint, or a requirement change.
4. Update the spec before continuing if the change affects scope, behavior, acceptance criteria, validation, or project constraints.
5. Hand off to `spec-crlp` when the issue is implementation drift, a failing check, or a behavior gap against an otherwise valid spec.

Never change acceptance criteria merely to make implementation easier or tests pass unless the user confirms that the requirement has changed.

## Self-Check Checklist

Before finalizing, verify:

- The goal is specific and user-visible.
- The problem statement explains why the work matters.
- `Context From Memory` is present for non-trivial existing-project work.
- `In Scope` and `Out Of Scope` do not conflict.
- Constraints are explicit and actionable.
- Assumptions are visible and not secretly blocking.
- Blocking questions are either absent or clearly marked.
- Acceptance criteria are observable and testable.
- Gherkin is used only where behavior scenarios benefit from it.
- Edge cases include invalid input, permission failures, state conflicts, and missing configuration where relevant.
- Validation plan exists and does not invent commands.
- Execution plan is ordered and implementation-oriented.
- Handoffs to `spec-crlp` and `spec-index` are clear when needed.

## Self-Check Result

When useful, append a short self-check result:

```markdown
## Self-Check

- Status: Ready for implementation | Needs decision | Planning only
- Blocking Questions: None | [list]
- Safe To Implement: Yes | No
- Notes: [brief reason]
```
