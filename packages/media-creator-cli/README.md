# Media Creator Skills CLI

媒体创作者技能管理工具，用于管理 `media-creator-skills` 仓库中的技能包。

## 安装

```bash
cd packages/media-creator-cli
pnpm install
```

## 使用

### 列出所有可用技能

```bash
pnpm run dev list
```

### 安装技能

#### 交互式安装（推荐）

```bash
pnpm run dev install
```

然后按照提示选择：
1. 媒体平台（公众号、小红书、抖音、通用工具）
2. 创作阶段（策划、创作、优化、分析）
3. 选择具体技能

#### 按平台和阶段安装

```bash
# 安装公众号创作阶段的技能
pnpm run dev install -p wechat -s 02-creation

# 安装小红书优化阶段的技能
pnpm run dev install -p xiaohongshu -s 03-optimization

# 安装抖音全部技能
pnpm run dev install -p douyin
```

#### 安装所有技能

```bash
pnpm run dev install --all
```

### 查看技能详情

```bash
pnpm run dev info <skill-name>
```

例如：
```bash
pnpm run dev info wechat-article-writer
```

### 搜索技能

```bash
pnpm run dev search <keyword>
```

例如：
```bash
pnpm run dev search 标题
```

## 编译

```bash
pnpm run build
```

编译后生成的可执行文件位于 `dist/cli.js`。

## 全局安装（可选）

编译后可以全局安装：

```bash
cd packages/media-creator-cli
pnpm build
npm link
```

然后可以在任何地方使用：

```bash
media-creator-skills list
media-creator-skills install
```

## 技能目录结构

```
skills/
  {platform}/                   # wechat, xiaohongshu, douyin, common
    {stage}/                    # 01-planning, 02-creation, 03-optimization, 04-analytics
      {platform}-{skill-name}/   # 技能目录名包含平台前缀
        SKILL.md                # Skill 定义文件（必需）
        scripts/                # 模板和脚本（可选）
        references/             # 参考资料（可选）
```

### 目录命名规则

- 技能目录名采用 `{platform}-{skill-name}` 格式
- 例如：`wechat-article-writer`、`xiaohongshu-note-writer`、`douyin-script-writer`
- 通用工具使用 `common-{skill-name}` 格式
- 例如：`common-audience-analyzer`、`common-content-calendar`

## 安装目标

默认情况下，技能会被安装到 `~/.claude/skills/` 目录，这是 Claude Desktop 和 Claude.ai 的技能目录。

可以在安装时自定义目标目录。

## 示例

### 场景 1：新手创作者，专注公众号

```bash
# 只安装公众号相关技能
media-creator-skills install
# 选择：📱 微信公众号
# 选择：全部阶段
# 选择：全部选中
```

### 场景 2：全平台运营

```bash
# 安装所有技能
media-creator-skills install --all
```

### 场景 3：只需要优化工具

```bash
# 只安装各平台的优化阶段技能
media-creator-skills install -p wechat -s 03-optimization
media-creator-skills install -p xiaohongshu -s 03-optimization
media-creator-skills install -p douyin -s 03-optimization
```

## 技能列表

当前支持的技能：

### 微信公众号
- **策划阶段**: wechat-topic-planner - 选题规划助手
- **创作阶段**: wechat-article-writer - 长文写作助手, wechat-content-rewriter - 内容改写助手
- **优化阶段**: wechat-title-generator - 标题生成器, wechat-layout-optimizer - 排版优化

### 小红书
- **创作阶段**: xiaohongshu-note-writer - 笔记写作助手, xiaohongshu-hook-writer - 开头金句生成器
- **优化阶段**: xiaohongshu-title-generator - 标题生成, xiaohongshu-tag-optimizer - 话题标签优化, xiaohongshu-cover-advisor - 封面设计建议

### 抖音
- **策划阶段**: douyin-topic-finder - 热门选题发现
- **创作阶段**: douyin-script-writer - 短视频脚本撰写, douyin-hook-generator - 黄金3秒开头生成器
- **优化阶段**: douyin-title-generator - 标题和文案生成, douyin-seo-optimizer - SEO优化

### 通用工具
- common-audience-analyzer - 目标受众分析
- common-content-calendar - 多平台内容日历规划
- common-copywriting-formulas - 经典文案公式
- common-hot-topic-tracker - 全网热点追踪
