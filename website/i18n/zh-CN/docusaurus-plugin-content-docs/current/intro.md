---
sidebar_position: 1
title: spec-coding-skills 概览
description: 了解 spec-plan、spec-crlp 和 spec-index 如何组成规格驱动的 AI 编码工作流。
---

# spec-coding-skills 概览

`spec-coding-skills` 是一套小而专注的技能组合，用来让 agentic coding 工作更可重复。

它主要聚焦三个能力：

1. 把模糊请求整理成可直接实现的规格。
2. 使用 lint、测试、日志、CI 和评审反馈中的证据来纠正实现偏差。
3. 保存可复用的项目知识，避免后续任务重复踩坑。

## 技能

### `spec-plan`

把模糊请求整理成可实现的规格，输出内容包括：

- 范围边界
- 假设
- 验收标准
- 验证计划
- 执行护栏
- 实施步骤

### `spec-crlp`

通过组合以下信息，对现有代码运行一个规格驱动的纠偏闭环：

- 当前规格
- linter 输出
- 失败的测试
- 运行时日志
- CI 失败信息
- 评审反馈

### `spec-index`

捕获、检索并维护可持续复用的项目记忆：

- 决策
- 约束
- 根因
- 修复模式
- 环境与配置陷阱
- 验证规则

## 默认工作流

1. 如果目标仓库存在根目录 `SPEC.md`，先读取它。
2. 用 `spec-index` 取回相关记忆。
3. 用 `spec-plan` 定义范围、验收标准、验证方式和执行步骤。
4. 实施。
5. 如果实现偏离规格，用 `spec-crlp` 做纠偏。
6. 把可复用发现回写到 `spec-index`。
