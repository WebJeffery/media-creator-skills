# 贡献指南

感谢你对新媒体创作者 AI Skills 项目的关注！本文档介绍如何为项目做出贡献。

## 贡献方式

### 1. 提交新 Skill

为项目添加新的创作技能。

### 2. 改进现有 Skill

优化现有 Skill 的功能、模板或参考资料。

### 3. 修复问题

修复 Bug、错别字或格式问题。

### 4. 完善文档

改进项目文档、添加示例或翻译。

## 贡献流程

### Step 1: Fork 仓库

1. 访问项目 GitHub 页面
2. 点击右上角 "Fork" 按钮
3. 将仓库 Fork 到你的账号下

### Step 2: 克隆仓库

```bash
git clone https://github.com/YOUR_USERNAME/media-creator-skills.git
cd media-creator-skills
```

### Step 3: 创建分支

```bash
# 新功能
git checkout -b feature/skill-name

# 修复问题
git checkout -b fix/issue-description

# 文档更新
git checkout -b docs/update-description
```

### Step 4: 开发和测试

参考 [开发指南](development-guide.md) 进行开发和测试。

### Step 5: 提交代码

```bash
# 添加文件
git add .

# 提交（遵循提交规范）
git commit -m "feat: add xiaohongshu topic-planner skill"

# 推送
git push origin feature/skill-name
```

### Step 6: 创建 Pull Request

1. 访问你 Fork 的仓库
2. 点击 "Compare & pull request"
3. 填写 PR 描述
4. 提交 PR

## 提交规范

### Commit Message 格式

```
<type>: <description>

[optional body]

[optional footer]
```

### Type 类型

| Type | 说明 |
|------|------|
| feat | 新功能（新 Skill、新特性） |
| fix | 修复问题 |
| docs | 文档更新 |
| style | 格式调整（不影响功能） |
| refactor | 重构（不新增功能、不修复问题） |
| test | 测试相关 |
| chore | 构建/工具相关 |

### 示例

```bash
# 新增 Skill
git commit -m "feat: add xiaohongshu topic-planner skill

- Add SKILL.md with core functionality
- Add scripts/templates.md for planning templates
- Add references/README.md for topic research"

# 修复问题
git commit -m "fix: correct title length limit in wechat article-writer

The previous limit was 60 characters, but WeChat allows 64."

# 文档更新
git commit -m "docs: add development guide

- Add docs/development-guide.md
- Add docs/best-practices.md"
```

## Pull Request 规范

### PR 标题

```
<type>: <short description>
```

### PR 描述模板

```markdown
## 描述

简要描述这个 PR 做了什么。

## 变更类型

- [ ] 新功能（新 Skill）
- [ ] 功能改进
- [ ] Bug 修复
- [ ] 文档更新
- [ ] 其他

## 变更内容

- 变更1
- 变更2
- 变更3

## 测试

- [ ] 已在 Claude Code 中测试
- [ ] 已在 claude.ai 中测试
- [ ] 已检查输出格式
- [ ] 已验证平台规则

## 截图/示例

（如适用，添加测试截图或示例输出）

## 相关 Issue

Closes #issue_number（如适用）
```

## 代码审查

### 审查标准

| 维度 | 检查点 |
|------|--------|
| 功能 | Skill 功能是否正常工作 |
| 质量 | 输出内容质量是否达标 |
| 规范 | 是否符合平台规则 |
| 文档 | SKILL.md 是否清晰完整 |
| 测试 | 是否经过充分测试 |

### 审查流程

1. 维护者审查代码
2. 提出修改建议（如有）
3. 贡献者修改代码
4. 维护者批准合并

## 新 Skill 贡献清单

提交新 Skill 前，请确认：

### 文件完整性

- [ ] 创建了正确的目录结构
- [ ] SKILL.md 文件存在且格式正确
- [ ] scripts/ 目录包含必要的模板（如适用）
- [ ] references/ 目录包含参考资料（如适用）

### 内容质量

- [ ] 功能描述清晰明了
- [ ] 触发词定义准确
- [ ] 使用示例丰富实用
- [ ] 输出格式说明清晰
- [ ] 平台规则完整准确
- [ ] 最佳实践有价值

### 测试验证

- [ ] 基础功能测试通过
- [ ] 进阶功能测试通过
- [ ] 边界情况测试通过
- [ ] 输出质量达标

### 文档更新

- [ ] 更新 README.md 中的 Skills 列表
- [ ] 更新 AGENTS.md 中的 Skills 列表（如需要）

## 行为准则

### 我们的承诺

我们致力于为每个人提供一个友好、安全、包容的环境。

### 期望行为

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情

### 不可接受的行为

- 使用性别化的语言或图像
- 人身攻击或政治攻击
- 公开或私下骚扰
- 未经许可发布他人私人信息

## 获取帮助

如果你在贡献过程中遇到问题：

1. 查阅 [开发指南](development-guide.md)
2. 查阅 [最佳实践](best-practices.md)
3. 在 GitHub Issues 中提问
4. 联系项目维护者

感谢你的贡献！🎉
