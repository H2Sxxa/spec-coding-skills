# Testing

This repository uses three levels of testing: discovery tests, deterministic script smoke tests, and skill behavior evals.

## Directory Roles

```text
test-workspaces/
  .gitignore
evals/
  evals.json
benchmarks/
  .gitignore
```

- `test-workspaces/` is for local throwaway repositories, install checks, and smoke-test outputs. Everything inside it is ignored except `.gitignore`.
- `evals/` stores committed eval prompts and expected behavior descriptions.
- `benchmarks/` is reserved for future quantitative benchmark outputs, viewer artifacts, timing data, and grading results. Everything inside it is ignored except `.gitignore`.

## Skill Discovery

Use a clean clone or the GitHub remote to verify that only the published skills are discovered:

```bash
npx skills add H2Sxxa/spec-coding-skills --list
```

Expected skills:

```text
spec-plan
spec-crlp
spec-index
```

If `git-commit`, `skill-creator`, or other local development skills appear, check whether `.agents/skills/`, `.claude/skills/`, or `skills-lock.json` were accidentally committed.

## Local Install Smoke Test

From a local checkout, install all published skills:

```bash
npx skills add . --all
```

Use a clean workspace for install smoke tests:

```bash
mkdir -p test-workspaces/local-install
```

Do not commit generated install artifacts from `test-workspaces/`.

## `spec-index` Script Smoke Test

The `spec-index` helper script uses only the Python standard library.

```bash
python skills/spec-index/scripts/index.py --help
```

Create a temporary knowledge-base entry:

```bash
python skills/spec-index/scripts/index.py --root test-workspaces/smoke-kb add \
  --title "Next Middleware Locale 404" \
  --type root-cause \
  --summary "Locale redirects returned 404 after middleware routing changed." \
  --context "A Next.js middleware routing change affected localized paths." \
  --applies-when "Use when locale redirects or middleware routing produce 404 responses." \
  --decision-or-root-cause "Middleware generated a localized path that did not match available routes." \
  --resolution-or-rule "Normalize locale path construction before redirecting." \
  --validation "Run routing smoke tests." \
  --tag framework:nextjs \
  --tag component:middleware \
  --tag symptom:404
```

Search the temporary knowledge base:

```bash
python skills/spec-index/scripts/index.py --root test-workspaces/smoke-kb search "nextjs middleware 404"
```

Expected result: the temporary entry should appear with a positive score.

## Skill Behavior Evals

The initial eval prompts live in [evals/evals.json](./evals/evals.json).

Use them to check:

- `spec-plan` reads repository preferences, retrieves relevant memory for non-trivial work, and produces acceptance criteria plus validation steps.
- `spec-crlp` retrieves relevant memory before correction, verifies root cause with local evidence, and outputs a fix-verify loop.
- `spec-index` classifies reusable knowledge, generates trigger tags, and creates or presents a normalized memory entry.

## Demo Benchmark Output

Generated benchmark artifacts should go under `benchmarks/`, which is ignored except for its `.gitignore` placeholder.

Recommended layout:

```text
benchmarks/
  iteration-1/
    benchmark.json
    benchmark.md
    review.html
    plan-existing-feature/
      eval_metadata.json
      baseline/
        outputs/
          output.md
      with_skill/
        outputs/
          output.md
```

Generate a static review page from a benchmark workspace:

```bash
python .agents/skills/skill-creator/eval-viewer/generate_review.py benchmarks/iteration-1 --skill-name spec-coding-skills --benchmark benchmarks/iteration-1/benchmark.json --static benchmarks/iteration-1/review.html
```

On Windows, set UTF-8 mode if template decoding fails:

```powershell
$env:PYTHONUTF8='1'
python .agents\skills\skill-creator\eval-viewer\generate_review.py benchmarks\iteration-1 --skill-name spec-coding-skills --benchmark benchmarks\iteration-1\benchmark.json --static benchmarks\iteration-1\review.html
```

When sharing benchmark results, describe them as a small demo unless there are multiple runs per prompt and a broader eval set.

## Release Checklist

- `npx skills add H2Sxxa/spec-coding-skills --list` shows only `spec-plan`, `spec-crlp`, and `spec-index`.
- `python skills/spec-index/scripts/index.py --help` succeeds.
- README install commands point to the current GitHub repository.
- `.agents/skills/`, `.claude/skills/`, and `skills-lock.json` are ignored and not tracked.
