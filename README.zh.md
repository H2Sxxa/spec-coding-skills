# spec-coding-skills

[English](./README.md)

一组用于 spec-driven coding 的 Agent Skills：先用验收标准规划任务，再根据真实反馈纠错，并把可复用的项目知识沉淀下来。

## 这个仓库提供什么

`spec-coding-skills` 让 Agent 的编码流程更稳定、更可复用：

1. 先定义清楚要做什么，再进入实现。
2. 用可观察的 acceptance criteria 验证实现。
3. 用 lint、test、log、CI、review feedback 修正行为。
4. 保存可复用的决策、根因、setup 规则和修复模式，供后续任务检索。

这个仓库采用 skill-first 的实现方式：

- `SKILL.md` 定义触发条件和工作流。
- `scripts/` 放确定性的重复动作。
- `references/` 放模板和可复用格式。

## 安装

从 GitHub 安装全部 skills：

```bash
npx skills add H2Sxxa/spec-coding-skills --all
```

只安装指定 skills：

```bash
npx skills add H2Sxxa/spec-coding-skills --skill spec-plan --skill spec-crlp --skill spec-index
```

本地开发时从当前目录安装：

```bash
npx skills add . --all
```

## Skills

### `spec-plan`

把模糊的软件需求转成 BDD 风格的实现 spec，包括范围、约束、验收标准、边界情况、验证步骤和执行计划。

适合在需求还不清晰、用户要求 plan/spec，或者直接写代码风险较高时使用。

### `spec-crlp`

针对已有代码运行 spec-driven correction loop：把实现和 spec 对齐，并结合 lint、测试、日志、CI、review feedback 定位问题。

适合在代码检查失败、实现偏离验收标准，或者需要 fix-verify-repeat 时使用。

### `spec-index`

保存和检索长期项目记忆，例如决策、约束、setup 步骤、问题根因、修复模式、已知坑点。

适合在 Agent 需要保存可复用知识、查找历史方案，或者把历史上下文注入 plan/correction 流程时使用。

## 默认工作流

三个 skills 会互相配合：

1. 如果目标仓库根目录存在 `SPEC.md`，优先读取；否则使用本仓库内置默认规则。
2. 当历史决策、约束、坑点或修复模式可能影响任务时，先用 `spec-index` 检索相关记忆。
3. 用 `spec-plan` 定义问题、验收标准、验证计划和执行步骤。
4. 进入正常实现流程。
5. 当反馈显示实现和 spec 不一致时，用 `spec-crlp` 进行纠错。
6. 把有复用价值的发现交给 `spec-index` 保存，供后续任务使用。

对于很小、上下文明确的任务，skills 可以保持轻量，不强制持久化或检索。

## 仓库级覆盖配置

这些 skills 不依赖项目配置也可以工作，默认规则记录在 [SPEC.md](./SPEC.md)。

如果目标仓库需要自定义 lint 命令、验证顺序、setup 文档、任务 spec 路径或知识库路径，可以把 [templates/repository-SPEC.md](./templates/repository-SPEC.md) 复制到目标仓库根目录，命名为 `SPEC.md` 后按需编辑。

优先级如下：

1. 用户直接指令。
2. 目标仓库根目录的 `SPEC.md`。
3. 本仓库内置默认规则。
4. 在默认规则允许时，从目标仓库工具文件中自动发现。

仓库级 `SPEC.md` 可以只写一部分字段，缺失字段会回退到内置默认规则。

## Knowledge Base

`spec-index` 使用带 YAML frontmatter 的 Markdown 文件保存长期项目记忆。

默认位置：

```text
docs/knowledge-base/
```

内置资源：

- [template.md](./skills/spec-index/references/template.md) 定义 memory entry 的标准格式。
- [index.py](./skills/spec-index/scripts/index.py) 提供确定性的 `add`、`search`、`rebuild` 操作。

这个 helper script 只使用 Python 标准库，不需要网络访问。

## Demo Benchmark

这个仓库包含一个覆盖三个核心 skills 的 3-prompt demo benchmark。在一次本地 Codex 运行中，使用 skills 的输出在 deterministic skill-aligned rubric 下通过率为 `100.0%`，普通 baseline 输出为 `11.1%`，差值为 `+88.9` 个百分点。

这是展示用 benchmark，不是严格统计结论。它每个 prompt 只跑一次，评分重点是输出是否包含这些 skills 设计目标中的结构，例如 `Context From Memory`、`Relevant Memory`、`Memory To Capture`、YAML frontmatter 和 `trigger_tags`。

已提交的 eval prompts 在 [evals/evals.json](./evals/evals.json)。复现流程和本地 review 页面生成方法见 [TESTING.md](./TESTING.md)。

## 仓库结构

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

- 扩展 eval 覆盖范围，不只停留在当前 3-prompt demo。
- 增加示例 memory entries，展示 trigger tags 的写法。
- 运行多样本 benchmark，得到更可靠的前后对比结论。
- 从真实项目中收集反馈并迭代。

## License

MIT License。见 [LICENSE](./LICENSE)。
