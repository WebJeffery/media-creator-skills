# Media Creator Skills

媒体创作者技能管理工具，用于管理 `WebJeffery/media-creator-skills` 仓库中的技能包。

## 概述

Media Creator Skills 是一个命令行工具，帮助新媒体创作者快速安装和管理面向 **公众号、小红书、抖音** 的 AI 技能包。

## 核心特性

- **技能包管理** - 自动从 GitHub 同步最新技能包
- **智能筛选** - 按平台、创作阶段快速筛选所需技能
- **交互式安装** - 友好的命令行交互界面
- **离线支持** - 支持离线模式使用本地缓存
- **npx 支持** - 无需安装即可快速使用

## 快速开始

### 使用 npx（推荐）

```bash
# 列出所有可用技能
npx @baichuan-skill/media-creator-skills list

# 交互式安装技能
npx @baichuan-skill/media-creator-skills install

# 安装所有技能
npx @baichuan-skill/media-creator-skills install --all

# 查看帮助
npx @baichuan-skill/media-creator-skills --help
```

### 从 npm 安装

```bash
# 全局安装
npm install -g @baichuan-skill/media-creator-skills

# 查看所有命令
media-creator-skills --help
```

**工作原理：**
- **优先使用随包发布的技能**：CLI 内置了当前版本的技能包，无需联网即可使用。
- **本地开发**：如果检测到本地开发环境的 skills 目录，则直接使用本地版本。
- **GitHub 同步**：如果内置技能包不存在（如使用旧版本），会自动从 GitHub 同步或使用本地缓存。

## 命令详解

### list - 列出所有可用技能

```bash
# 列出所有技能（在线模式）
media-creator-skills list

# 离线模式，使用本地缓存
media-creator-skills list --offline
```

### install - 安装技能

```bash
# 交互式安装
media-creator-skills install

# 按平台安装
media-creator-skills install -p wechat

# 按平台和阶段安装
media-creator-skills install -p wechat -s 02-creation

# 安装所有技能
media-creator-skills install --all

# 离线模式安装
media-creator-skills install --offline
```

**参数说明：**

| 参数 | 简写 | 说明 |
|------|------|------|
| `--platform` | `-p` | 指定媒体平台（wechat/xiaohongshu/douyin） |
| `--stage` | `-s` | 指定创作阶段（01-planning/02-creation/03-optimization/04-analytics） |
| `--all` | `-a` | 安装所有技能 |
| `--offline` | | 离线模式，使用本地缓存 |

### info - 查看技能详情

```bash
media-creator-skills info wechat-article-writer
```

### search - 搜索技能

```bash
media-creator-skills search 标题
media-creator-skills search 优化
```

### sync - 同步技能包

从 GitHub 仓库同步最新的技能包到本地缓存。

```bash
# 同步最新版本
media-creator-skills sync

# 强制重新下载
media-creator-skills sync --force
```

**说明：** 技能包缓存位置为 `~/.media-creator-skills/cache/`

## 安装目标

技能默认安装到 `~/.claude/skills/` 目录，可在 Claude Code (CLI) 中使用。

### Claude Code 使用

安装后，在 Claude Code 交互中直接使用触发词即可激活对应技能。

## 当前可用技能

### 微信公众号

| 阶段 | 技能名称 | 描述 |
|------|----------|------|
| 策划 | wechat-topic-planner | 选题规划助手 |
| 创作 | wechat-article-writer | 长文写作助手 |
| 创作 | wechat-content-rewriter | 内容改写助手 |
| 优化 | wechat-title-generator | 标题生成器 |
| 优化 | wechat-layout-optimizer | 排版优化 |

### 小红书

| 阶段 | 技能名称 | 描述 |
|------|----------|------|
| 创作 | xiaohongshu-note-writer | 笔记写作助手 |
| 创作 | xiaohongshu-hook-writer | 开头金句生成器 |
| 优化 | xiaohongshu-title-generator | 标题生成 |
| 优化 | xiaohongshu-tag-optimizer | 话题标签优化 |
| 优化 | xiaohongshu-cover-advisor | 封面设计建议 |

### 抖音

| 阶段 | 技能名称 | 描述 |
|------|----------|------|
| 策划 | douyin-topic-finder | 热门选题发现 |
| 创作 | douyin-script-writer | 短视频脚本撰写 |
| 创作 | douyin-hook-generator | 黄金3秒开头生成器 |
| 优化 | douyin-title-generator | 标题和文案生成 |
| 优化 | douyin-seo-optimizer | SEO 优化 |

### 通用工具

| 技能名称 | 描述 |
|----------|------|
| common-audience-analyzer | 目标受众分析 |
| common-content-calendar | 多平台内容日历规划 |
| common-copywriting-formulas | 经典文案公式 |
| common-hot-topic-tracker | 全网热点追踪 |

## 常见问题

### 技能未生效怎么办？

1. 确认技能已正确安装到 `~/.claude/skills/`
2. 重启 Claude Desktop 或重新打开 Claude.ai
3. 检查 SKILL.md 文件格式是否正确

### 如何卸载技能？

```bash
rm -rf ~/.claude/skills/{skill-name}
```

### 如何更新已安装的技能？

```bash
# 同步最新技能包
media-creator-skills sync --force

# 重新安装技能
media-creator-skills install
```

