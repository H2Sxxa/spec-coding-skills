---
sidebar_position: 2
title: 测试 spec-coding-skills
description: 了解如何通过发现检查、smoke 测试和小型 skill eval 来验证 spec-coding-skills。
---

# 测试 spec-coding-skills

这个仓库提供了一套轻量的测试流程，用来覆盖技能发现、脚本 smoke 测试和技能行为 eval。

## 核心产物

- `evals/evals.json`
- `TESTING.md`
- `benchmarks/.gitignore`
- `test-workspaces/.gitignore`

## 常用命令

列出已发布技能：

```bash
npx skills add H2Sxxa/spec-coding-skills --list
```

对 `spec-index` 脚本做 smoke 测试：

```bash
python skills/spec-index/scripts/index.py --help
```

带匹配解释的搜索：

```bash
python skills/spec-index/scripts/index.py --root test-workspaces/smoke-kb search "not found middleware" --explain
```

审计知识库：

```bash
python skills/spec-index/scripts/index.py --root test-workspaces/smoke-kb audit
```
