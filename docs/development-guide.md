# Skill 开发指南

本文档介绍如何开发、调试和测试新媒体创作 Skills。

## 目录

- [快速开始](#快速开始)
- [开发环境](#开发环境)
- [Skill 结构](#skill-结构)
- [开发流程](#开发流程)
- [调试方法](#调试方法)
- [测试指南](#测试指南)
- [发布流程](#发布流程)

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/your-repo/media-creator-skills.git
cd media-creator-skills
```

### 2. 创建新 Skill

```bash
# 创建 Skill 目录
mkdir -p skills/{platform}/{stage}/{skill-name}

# 示例：创建小红书选题规划 Skill
mkdir -p skills/xiaohongshu/01-planning/topic-planner
```

### 3. 编写 SKILL.md

```bash
# 创建 SKILL.md 文件
touch skills/xiaohongshu/01-planning/topic-planner/SKILL.md
```

### 4. 本地测试

```bash
# 复制到 Claude Code skills 目录
cp -r skills/xiaohongshu/01-planning/topic-planner ~/.claude/skills/

# 或直接在 claude.ai 中粘贴 SKILL.md 内容测试
```

## 开发环境

### 推荐工具

| 工具 | 用途 | 安装方式 |
|------|------|----------|
| VS Code | 代码编辑 | [下载](https://code.visualstudio.com/) |
| Claude Code | 本地测试 | `npm install -g @anthropic-ai/claude-code` |
| Git | 版本控制 | `brew install git` |

### VS Code 插件推荐

- **Markdown All in One** - Markdown 编辑增强
- **Markdown Preview Enhanced** - Markdown 预览
- **Code Spell Checker** - 拼写检查
- **YAML** - YAML 语法支持

### 目录结构

```
media-creator-skills/
├── skills/                     # Skills 目录
│   ├── wechat/                # 公众号
│   │   ├── 01-planning/       # 策划阶段
│   │   ├── 02-creation/       # 创作阶段
│   │   ├── 03-optimization/   # 优化阶段
│   │   └── 04-analytics/      # 分析阶段
│   ├── xiaohongshu/           # 小红书
│   ├── douyin/                # 抖音
│   └── common/                # 通用
├── docs/                       # 文档目录
├── AGENTS.md                   # Agent 指引
├── CLAUDE.md -> AGENTS.md      # Claude 指引（符号链接）
├── README.md                   # 项目说明
└── SKILLS-STRUCTURE.md         # 分类结构设计
```

## Skill 结构

### 目录结构

```
{skill-name}/
├── SKILL.md                    # Skill 定义文件（必需）
├── scripts/                    # 模板和脚本（可选）
│   ├── templates.md           # 内容模板
│   ├── prompts.md             # AI 提示词
│   └── ...
└── references/                 # 参考资料（可选）
    └── README.md              # 爆款研究、平台规则等
```

### SKILL.md 结构

```markdown
---
name: {skill-name}
description: {描述}。当用户说"{触发词}"时激活。
platform: {platform}
category: {category}
---

# {Skill 名称}

{功能介绍}

## 适用场景
## 使用方法
## 输出格式
## 平台规则
## 最佳实践
```

### 字段说明

| 字段 | 必需 | 说明 |
|------|------|------|
| name | ✅ | Skill 唯一标识，kebab-case |
| description | ✅ | 简短描述，包含触发词 |
| platform | ✅ | 平台：wechat/xiaohongshu/douyin/common |
| category | ✅ | 类别：planning/writing/optimization/analytics |

## 开发流程

### 1. 需求分析

```markdown
## 需求分析清单

- [ ] 目标用户是谁？
- [ ] 解决什么问题？
- [ ] 属于哪个平台？
- [ ] 属于哪个创作阶段？
- [ ] 有哪些触发词？
- [ ] 输出格式是什么？
```

### 2. 设计 Skill

```markdown
## Skill 设计模板

### 基本信息
- 名称：{name}
- 平台：{platform}
- 阶段：{stage}
- 类别：{category}

### 功能设计
- 输入：{用户输入什么}
- 处理：{Skill 做什么}
- 输出：{返回什么结果}

### 触发词
- {触发词1}
- {触发词2}
- {触发词3}
```

### 3. 编写 SKILL.md

按照模板编写 SKILL.md，注意：

- **简洁明了**：控制在 200 行以内
- **示例丰富**：提供基础和进阶用法
- **规则完整**：包含平台限制和规范
- **实践总结**：提炼最佳实践要点

### 4. 添加辅助文件

```bash
# 创建 scripts 目录
mkdir -p {skill-path}/scripts
touch {skill-path}/scripts/templates.md
touch {skill-path}/scripts/prompts.md

# 创建 references 目录
mkdir -p {skill-path}/references
touch {skill-path}/references/README.md
```

### 5. 测试验证

详见 [调试方法](#调试方法) 和 [测试指南](#测试指南)。

## 调试方法

### 方法一：Claude Code 本地调试

```bash
# 1. 复制 Skill 到本地
cp -r skills/{platform}/{stage}/{skill-name} ~/.claude/skills/

# 2. 启动 Claude Code
claude

# 3. 测试 Skill
# 在对话中输入触发词，观察响应
```

### 方法二：claude.ai 在线调试

1. 打开 [claude.ai](https://claude.ai)
2. 创建新对话或项目
3. 将 SKILL.md 内容粘贴到对话中
4. 测试各种输入场景

### 方法三：Claude Desktop 调试

1. 打开 Claude Desktop
2. 进入项目设置
3. 添加 SKILL.md 到项目知识
4. 在对话中测试

### 调试技巧

#### 1. 增量调试

```markdown
# 先测试核心功能
1. 只保留 SKILL.md 的核心部分
2. 测试基本功能是否正常
3. 逐步添加更多内容
4. 每次添加后测试
```

#### 2. 边界测试

```markdown
# 测试边界情况
- 空输入
- 超长输入
- 特殊字符
- 多语言混合
- 格式错误的输入
```

#### 3. 对比测试

```markdown
# 对比不同版本
1. 保存当前版本
2. 修改 SKILL.md
3. 对比两个版本的输出
4. 选择更好的版本
```

### 常见问题排查

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| Skill 未触发 | 触发词不匹配 | 检查 description 中的触发词 |
| 输出格式错误 | 格式说明不清 | 完善"输出格式"部分 |
| 内容不符合预期 | 指令不够明确 | 添加更多示例和约束 |
| 违反平台规则 | 规则说明缺失 | 补充"平台规则"部分 |

## 测试指南

### 测试清单

```markdown
## Skill 测试清单

### 功能测试
- [ ] 基础功能正常
- [ ] 进阶功能正常
- [ ] 输出格式正确
- [ ] 平台规则遵守

### 触发测试
- [ ] 主触发词有效
- [ ] 备选触发词有效
- [ ] 相似表达能触发

### 边界测试
- [ ] 空输入处理
- [ ] 超长输入处理
- [ ] 特殊字符处理

### 质量测试
- [ ] 输出内容质量
- [ ] 输出一致性
- [ ] 响应速度
```

### 测试用例模板

```markdown
## 测试用例

### 用例1：基础功能
- **输入**：{测试输入}
- **预期输出**：{预期结果}
- **实际输出**：{实际结果}
- **结果**：✅ 通过 / ❌ 失败

### 用例2：边界情况
...
```

### 自动化测试（可选）

```bash
# 创建测试脚本
cat > test-skill.sh << 'EOF'
#!/bin/bash

SKILL_PATH=$1
TEST_INPUT=$2

# 复制 Skill
cp -r "$SKILL_PATH" ~/.claude/skills/

# 运行测试（需要 Claude Code CLI）
echo "$TEST_INPUT" | claude --skill $(basename $SKILL_PATH)
EOF

chmod +x test-skill.sh

# 运行测试
./test-skill.sh skills/wechat/02-creation/article-writer "写一篇关于AI的文章"
```

## 发布流程

### 1. 代码审查

```markdown
## 发布前检查清单

### 文件完整性
- [ ] SKILL.md 存在且格式正确
- [ ] scripts/ 目录文件完整（如有）
- [ ] references/ 目录文件完整（如有）

### 内容质量
- [ ] 功能描述清晰
- [ ] 示例丰富实用
- [ ] 平台规则完整
- [ ] 最佳实践有价值

### 测试通过
- [ ] 功能测试通过
- [ ] 边界测试通过
- [ ] 质量测试通过
```

### 2. 提交代码

```bash
# 添加文件
git add skills/{platform}/{stage}/{skill-name}/

# 提交
git commit -m "feat: add {skill-name} skill for {platform}

- Add SKILL.md with core functionality
- Add scripts/templates.md for content templates
- Add references/README.md for research data"

# 推送
git push origin feature/{skill-name}
```

### 3. 创建 Pull Request

```markdown
## PR 模板

### 描述
添加 {skill-name} Skill，用于 {功能描述}。

### 变更内容
- 新增 SKILL.md
- 新增 scripts/templates.md
- 新增 references/README.md

### 测试结果
- [x] 功能测试通过
- [x] 边界测试通过
- [x] 质量测试通过

### 截图/示例
{添加测试截图或示例输出}
```

### 4. 更新文档

发布后记得更新：

- [ ] README.md 中的 Skills 列表
- [ ] AGENTS.md/CLAUDE.md 中的 Skills 列表
- [ ] SKILLS-STRUCTURE.md 中的分类（如有变化）

## 附录

### A. 平台规则速查

| 平台 | 标题限制 | 正文限制 | 最佳发布时间 |
|------|----------|----------|--------------|
| 公众号 | 64字符 | 建议1500-5000字 | 8:00/12:00/20:00 |
| 小红书 | 20字符 | 1000字 | 12:00-14:00/18:00-22:00 |
| 抖音 | 100字以内 | 15-60秒视频 | 12:00-13:00/18:00-20:00 |

### B. 常用命令

```bash
# 创建新 Skill
mkdir -p skills/{platform}/{stage}/{skill-name}/{scripts,references}

# 复制 Skill 到本地
cp -r skills/{platform}/{stage}/{skill-name} ~/.claude/skills/

# 查看所有 Skills
find skills -name "SKILL.md" | wc -l

# 搜索 Skill 内容
grep -r "关键词" skills/
```

### C. 资源链接

- [Claude Code 文档](https://docs.anthropic.com/claude-code)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [Git 使用指南](https://git-scm.com/book/zh/v2)
