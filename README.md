# 🎨 新媒体创作者 AI Skills

<p align="center">
  <strong>新媒体人的 AI 技能精选仓库</strong><br>
  为公众号、小红书、抖音创作者打造的 AI Agent Skills 集合
</p>

<p align="center">
  <a href="#公众号-skills">公众号</a> •
  <a href="#小红书-skills">小红书</a> •
  <a href="#抖音-skills">抖音</a> •
  <a href="#通用-skills">通用技能</a> •
  <a href="#安装使用">安装使用</a>
</p>

---

## 项目简介

本仓库收集和整理面向**新媒体创作者**的 AI Skills，帮助你用 AI 提升内容创作效率。每个 Skill 都是一组结构化的提示词和脚本，可以被 Claude、Cursor、Windsurf 等 AI 工具直接加载使用。

**核心价值：**
- 📝 **内容创作** — 标题生成、文案撰写、内容改写
- 🎯 **平台适配** — 针对不同平台的规则和算法优化
- 📊 **数据分析** — 选题分析、热点追踪、竞品研究
- 🖼️ **视觉设计** — 封面设计建议、排版优化、视觉风格

## 创作流程

Skills 按内容创作 SOP 四阶段组织，便于按工作流程选择使用：

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────┐
│  01-策划     │───▶│  02-创作     │───▶│  03-优化     │───▶│ 04-分析   │
│  Planning    │    │  Creation    │    │ Optimization │    │ Analytics │
└──────────────┘    └──────────────┘    └──────────────┘    └───────────┘
     选题规划           内容撰写           标题/SEO优化        数据追踪
     受众分析           脚本编写           排版/标签优化       效果分析
```

## 平台 Skills 总览

### 公众号 Skills

面向微信公众号创作者的技能集合。

| 阶段 | Skill | 描述 | 路径 |
|------|-------|------|------|
| 策划 | wechat-topic-planner | 选题规划助手，生成周/月内容日历 | [01-planning/wechat-topic-planner](skills/wechat/01-planning/wechat-topic-planner/) |
| 创作 | wechat-article-writer | 公众号长文写作助手，支持多种文章类型 | [02-creation/wechat-article-writer](skills/wechat/02-creation/wechat-article-writer/) |
| 创作 | wechat-content-rewriter | 内容改写与洗稿，保持原意优化表达 | [02-creation/wechat-content-rewriter](skills/wechat/02-creation/wechat-content-rewriter/) |
| 优化 | wechat-title-generator | 爆款标题生成器，基于 10w+ 爆文规律 | [03-optimization/wechat-title-generator](skills/wechat/03-optimization/wechat-title-generator/) |
| 优化 | wechat-layout-optimizer | 公众号排版优化，提升阅读体验 | [03-optimization/wechat-layout-optimizer](skills/wechat/03-optimization/wechat-layout-optimizer/) |

### 小红书 Skills

面向小红书创作者的技能集合。

| 阶段 | Skill | 描述 | 路径 |
|------|-------|------|------|
| 创作 | xiaohongshu-note-writer | 小红书笔记写作助手，自动适配平台风格 | [02-creation/xiaohongshu-note-writer](skills/xiaohongshu/02-creation/xiaohongshu-note-writer/) |
| 创作 | xiaohongshu-hook-writer | 开头金句生成器，提升笔记点击率 | [02-creation/xiaohongshu-hook-writer](skills/xiaohongshu/02-creation/xiaohongshu-hook-writer/) |
| 优化 | xiaohongshu-title-generator | 小红书爆款标题生成，含 emoji 优化 | [03-optimization/xiaohongshu-title-generator](skills/xiaohongshu/03-optimization/xiaohongshu-title-generator/) |
| 优化 | xiaohongshu-tag-optimizer | 话题标签优化，提升笔记曝光量 | [03-optimization/xiaohongshu-tag-optimizer](skills/xiaohongshu/03-optimization/xiaohongshu-tag-optimizer/) |
| 优化 | xiaohongshu-cover-advisor | 封面设计建议，基于热门笔记分析 | [03-optimization/xiaohongshu-cover-advisor](skills/xiaohongshu/03-optimization/xiaohongshu-cover-advisor/) |

### 抖音 Skills

面向抖音/短视频创作者的技能集合。

| 阶段 | Skill | 描述 | 路径 |
|------|-------|------|------|
| 策划 | douyin-topic-finder | 热门选题发现，追踪平台热点趋势 | [01-planning/douyin-topic-finder](skills/douyin/01-planning/douyin-topic-finder/) |
| 创作 | douyin-script-writer | 短视频脚本撰写，含分镜和口播稿 | [02-creation/douyin-script-writer](skills/douyin/02-creation/douyin-script-writer/) |
| 创作 | douyin-hook-generator | 黄金3秒开头生成器，提升完播率 | [02-creation/douyin-hook-generator](skills/douyin/02-creation/douyin-hook-generator/) |
| 优化 | douyin-title-generator | 抖音标题和文案生成，含热门话题适配 | [03-optimization/douyin-title-generator](skills/douyin/03-optimization/douyin-title-generator/) |
| 优化 | douyin-seo-optimizer | 抖音 SEO 优化，提升搜索排名 | [03-optimization/douyin-seo-optimizer](skills/douyin/03-optimization/douyin-seo-optimizer/) |

### 通用 Skills

跨平台通用的新媒体创作技能。

| Skill | 描述 | 路径 |
|-------|------|------|
| common-content-calendar | 多平台内容日历规划，统一管理发布节奏 | [common-content-calendar](skills/common/common-content-calendar/) |
| common-hot-topic-tracker | 全网热点追踪，快速生成追热内容 | [common-hot-topic-tracker](skills/common/common-hot-topic-tracker/) |
| common-audience-analyzer | 目标受众分析，精准定位内容方向 | [common-audience-analyzer](skills/common/common-audience-analyzer/) |
| common-copywriting-formulas | 经典文案公式集合（AIDA、PAS、FAB 等） | [common-copywriting-formulas](skills/common/common-copywriting-formulas/) |

## 安装使用

使用 npm 官方包（无需安装，直接运行）：

```bash
# 列出所有可用技能
npx @baichuan-skill/media-creator-skills list

# 交互式安装
npx @baichuan-skill/media-creator-skills install

# 按平台和阶段安装
npx @baichuan-skill/media-creator-skills install -p wechat -s 02-creation

# 查看技能详情
npx @baichuan-skill/media-creator-skills info wechat-article-writer

# 搜索技能
npx @baichuan-skill/media-creator-skills search 标题
```

或者全局安装：

```bash
# 全局安装
npm install -g @baichuan-skill/media-creator-skills

# 使用命令
media-creator-skills list
media-creator-skills install
```

详见 [CLI 工具文档](packages/media-creator-cli/README.md)。

## 使用示例

```
帮我写一篇关于"2026年AI趋势"的公众号文章
```
```
生成5个小红书爆款标题，主题是"家居收纳"
```
```
写一个30秒的抖音短视频脚本，主题是"程序员的日常"
```
```
分析一下最近小红书上"露营"话题的热度趋势
```

## Skill 结构

每个 Skill 包含：

```
skills/
  {platform}/                    # wechat, xiaohongshu, douyin, common
    {stage}/                      # 01-planning, 02-creation, 03-optimization, 04-analytics
      {platform}-{skill-name}/    # 技能目录名包含平台前缀
        SKILL.md                  # Skill 定义文件（必需）
        scripts/                  # 模板和脚本（可选）
          templates.md            # 内容模板
          prompts.md              # AI 提示词
        references/               # 参考资料（可选）
          README.md               # 爆款研究、平台规则等
```

### 目录命名规则

- 技能目录名采用 `{platform}-{skill-name}` 格式
- 例如：`wechat-article-writer`、`xiaohongshu-note-writer`、`douyin-script-writer`
- 通用工具使用 `common-{skill-name}` 格式
- 例如：`common-audience-analyzer`、`common-content-calendar`

## 平台速查

| 平台 | 标题限制 | 正文限制 | 最佳发布时间 |
|------|----------|----------|--------------|
| 公众号 | 64字符 | 建议1500-5000字 | 8:00/12:00/20:00 |
| 小红书 | 20字符 | 1000字 | 12:00-14:00/18:00-22:00 |
| 抖音 | 100字以内 | 15-60秒视频 | 12:00-13:00/18:00-20:00 |

## 贡献指南

欢迎提交新的 Skill！请参考 [AGENTS.md](AGENTS.md) 了解 Skill 的创建规范。

**贡献流程：**
1. Fork 本仓库
2. 在对应平台和阶段目录下创建新的 Skill（目录名需包含平台前缀）
3. 编写 `SKILL.md` 并测试
4. 可选：添加 `scripts/` 和 `references/` 目录
5. 提交 Pull Request

## License

MIT
