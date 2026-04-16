---
sidebar_position: 2
title: Testing
---

# Testing

The repository includes a lightweight testing workflow for skill discovery, script smoke tests, and skill behavior evals.

## Core artifacts

- `evals/evals.json`
- `TESTING.md`
- `benchmarks/.gitignore`
- `test-workspaces/.gitignore`

## Useful commands

List published skills:

```bash
npx skills add H2Sxxa/spec-coding-skills --list
```

Smoke test the `spec-index` script:

```bash
python skills/spec-index/scripts/index.py --help
```

Search with match explanations:

```bash
python skills/spec-index/scripts/index.py --root test-workspaces/smoke-kb search "not found middleware" --explain
```

Audit a knowledge base:

```bash
python skills/spec-index/scripts/index.py --root test-workspaces/smoke-kb audit
```
