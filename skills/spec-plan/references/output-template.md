# Implementation-Ready Spec Output Template

Use this template for persisted task specs and for conversation plans when the task is complex enough to need durable structure.

Small, self-contained tasks can use a shorter version, but should still preserve goal, acceptance criteria, validation, and execution steps.

````markdown
# Spec

## Goal

[What should be true after this work is done.]

## Problem Statement

[Why this work matters and what gap it closes.]

## Context From Memory

[Relevant decisions, constraints, setup gotchas, previous root causes, or "No relevant memory found."]

## In Scope

- [Included work]

## Out Of Scope

- [Explicitly excluded work]

## Constraints

- [Security, data, API, compatibility, UX, performance, validation, or repository constraints]

## Assumptions

- [Low-risk assumptions that allow planning to proceed]

## Blocking Questions

- [Questions that must be answered before implementation, or "None"]

## Acceptance Criteria

```gherkin
Scenario: [Behavior name]
  Given [initial state]
  When [action]
  Then [observable result]
```

Non-behavioral criteria:

- [Validation, security, compatibility, or documentation criteria that are clearer as bullets]

## Edge Cases

- [Invalid input, permission failure, missing config, concurrency, stale data, etc.]

## Validation Plan

- [How to verify the work without inventing unavailable commands]

## Execution Plan

1. [Implementation-oriented step]
2. [Implementation-oriented step]

## Open Questions

- [Decision-shaping but non-blocking questions]

## Self-Check

- Status: Ready for implementation | Needs decision | Planning only
- Blocking Questions: None | [list]
- Safe To Implement: Yes | No
- Notes: [brief reason]
````
