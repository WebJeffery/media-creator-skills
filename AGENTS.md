# CLAUDE.md

本文件为 Claude Code 和 claude.ai 提供本仓库的专用工作指引。通用 Agent 指引请参考 [AGENTS.md](AGENTS.md)。

## 仓库概述

新媒体创作者 AI Skills 精选仓库，收集面向**公众号、小红书、抖音**创作者的 AI 技能。Skills 是结构化的提示词和脚本包，用于扩展 AI Agent 的内容创作能力。

## Claude 使用指引

### 安装 Skills

```bash
# 安装单个 skill（新目录结构）
cp -r skills/{platform}/{stage}/{skill-name} ~/.claude/skills/

# 示例：安装公众号文章写作 skill
cp -r skills/wechat/02-creation/article-writer ~/.claude/skills/

# 安装某个平台的全部 skills
cp -r skills/wechat/**/* ~/.claude/skills/

# 安装所有 skills
find skills -name "SKILL.md" -exec dirname {} \; | xargs -I {} cp -r {} ~/.claude/skills/
```

### Claude Code 集成

Claude Code 是一款强大的 CLI 工具。技能包默认安装到 `~/.claude/skills` 目录后，Claude Code 会自动识别并加载这些技能。

1. **安装技能**：使用上述 `npx` 命令安装所需技能。
2. **使用技能**：在 Claude Code 交互界面中，直接通过自然语言触发。
   - 示例："帮我写一篇关于 AI 的公众号文章"（将自动调用 `wechat-article-writer`）

### claude.ai / Claude Desktop 集成

目前 Claude.ai 和 Claude Desktop 尚未支持自动读取本地 `~/.claude/skills` 目录。需要手动集成：

1. **Project Knowledge（推荐）**：
   - 在 claude.ai 或 Claude Desktop 中创建新 Project。
   - 将对应 Skill 的 `SKILL.md` 文件内容添加到 Project Knowledge 中。
   - 这样在这个 Project 的所有对话中都可以使用该技能。

2. **直接粘贴**：
   - 将 `SKILL.md` 的内容直接粘贴到对话框中作为上下文。


### 使用示例

```
帮我写一篇关于"2025年AI趋势"的公众号文章
```
```
生成5个小红书爆款标题，主题是"家居收纳"
```
```
写一个30秒的抖音短视频脚本，主题是"程序员的日常"
```

## 可用 Skills 列表

Skills 按创作流程四阶段组织：策划(01-planning) → 创作(02-creation) → 优化(03-optimization) → 分析(04-analytics)

### 公众号（wechat）

| 阶段 | Skill | 功能 |
|------|-------|------|
| 策划 | **topic-planner** | 选题规划助手，生成周/月内容日历 |
| 创作 | **article-writer** | 公众号长文写作助手，支持多种文章类型 |
| 创作 | **content-rewriter** | 内容改写助手，保持原意优化表达 |
| 优化 | **title-generator** | 爆款标题生成器，基于 10w+ 爆文标题规律 |
| 优化 | **layout-optimizer** | 公众号排版优化，提升阅读体验 |

### 小红书（xiaohongshu）

| 阶段 | Skill | 功能 |
|------|-------|------|
| 创作 | **note-writer** | 小红书笔记写作助手，自动适配平台风格 |
| 创作 | **hook-writer** | 开头金句生成器，提升笔记点击率 |
| 优化 | **title-generator** | 小红书爆款标题生成，含 emoji 和关键词优化 |
| 优化 | **tag-optimizer** | 话题标签优化，提升笔记曝光量 |
| 优化 | **cover-advisor** | 封面设计建议，基于热门笔记视觉分析 |

### 抖音（douyin）

| 阶段 | Skill | 功能 |
|------|-------|------|
| 策划 | **topic-finder** | 热门选题发现，追踪平台热点趋势 |
| 创作 | **script-writer** | 短视频脚本撰写，含分镜和口播稿 |
| 创作 | **hook-generator** | 黄金3秒开头生成器，提升完播率 |
| 优化 | **title-generator** | 抖音标题和文案生成，含热门话题适配 |
| 优化 | **seo-optimizer** | 抖音 SEO 优化，提升搜索排名 |

### 通用（common）
- **content-calendar** — 多平台内容日历规划
- **hot-topic-tracker** — 全网热点追踪
- **audience-analyzer** — 目标受众分析
- **copywriting-formulas** — 经典文案公式集合（AIDA、PAS、FAB 等）

## 创建新 Skill

详细的 Skill 创建规范如下：

### 目录结构

```
skills/
  {platform}/                   # wechat, xiaohongshu, douyin, common
    {stage}/                    # 01-planning, 02-creation, 03-optimization, 04-analytics
      {skill-name}/             # kebab-case 命名
        SKILL.md                # Skill 定义文件（必需）
        scripts/                # 模板和脚本（可选）
          templates.md          # 内容模板
          prompts.md            # AI 提示词
        references/             # 参考资料（可选）
          README.md             # 爆款研究、平台规则等
```

### 命名规范

- 目录名：使用 kebab-case（如 `article-writer`）
- 文件名：SKILL.md（必需）、templates.md、prompts.md 等
- 平台前缀：可选，如 `wechat-article-writer`

### SKILL.md 模板

```markdown
---
name: {skill-name}
description: {简短描述}。当用户说"{触发词1}"、"{触发词2}"时激活。
platform: {wechat/xiaohongshu/douyin/common}
category: {planning/writing/optimization/analytics}
---

# {Skill 名称}

{一句话介绍 Skill 的功能}

## 适用场景

- {场景1}
- {场景2}
- {场景3}

## 使用方法

{基础用法示例}

{进阶用法示例}

## 输出格式

{描述输出的结构和内容}

## 平台规则

{相关平台的限制和规范}

## 最佳实践

- {实践1}
- {实践2}
- {实践3}
```

### 内容创作 Skill 编写要点

1. **明确触发词**：在 description 中列出用户可能使用的触发词
2. **场景具体化**：适用场景要具体，帮助用户判断是否适用
3. **示例��富**：提供基础和进阶用法示例
4. **平台规则**：包含相关平台的字数、格式等限制
5. **最佳实践**：总结提升内容质量的关键技巧

### 上下文效率最佳实践

1. **精简内容**：SKILL.md 控制在 200 行以内
2. **结构清晰**：使用标题和列表组织内容
3. **避免冗余**：不重复平台通用规则
4. **模板分离**：复杂模板放在 scripts/ 目录
5. **参考分离**：详细参考资料放在 references/ 目录

## 平台速查

### 公众号

| 项目 | 限制 |
|------|------|
| 标题字数 | 最多 64 字符 |
| 摘要字数 | 最多 120 字符 |
| 正文字数 | 无硬性上限，建议 1500-5000 字 |
| 推送频率 | 订阅号每天 1 次，服务号每月 4 次 |
| 最佳发布时间 | 8:00、12:00、20:00 |

### 小红书

| 项目 | 限制 |
|------|------|
| 标题字数 | 最多 20 字符 |
| 正文字数 | 最多 1000 字 |
| 话题标签 | 最多 30 个 |
| 图片数量 | 最多 18 张（建议 6-9 张） |
| 最佳发布时间 | 12:00-14:00、18:00-22:00 |

### 抖音

| 项目 | 限制 |
|------|------|
| 视频时长 | 5 秒 - 15 分钟（建议 15-60 秒） |
| 视频比例 | 9:16 竖屏为主 |
| 分辨率 | 1080×1920 最佳 |
| 描述字数 | 建议 100 字以内 |
| 话题标签 | 建议 3-5 个 |
| 最佳发布时间 | 12:00-13:00、18:00-20:00 |
