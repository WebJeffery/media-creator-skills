# npm 发布指南

本指南说明如何将 `media-creator-skills` 发布到 npm。


## 发布步骤

### 1. 登录 npm

```bash
npm login
```

### 2. 编译项目

```bash
cd packages/media-creator-cli
pnpm build
```

### 3. 测试包

```bash
# 在本地测试
node dist/cli.js --help

# 或使用 npm link 进行全局测试
npm link
media-creator-skills --help
```

### 4. 发布到 npm

```bash
npm publish --access public
```

## 使用 npm 包

### 全局安装

```bash
npm install -g media-creator-skills
```

### 使用命令

```bash
# 查看帮助
media-creator-skills --help

# 列出所有技能
media-creator-skills list

# 安装技能
media-creator-skills install

# 同步 GitHub 仓库
media-creator-skills sync

# 查看技能详情
media-creator-skills info wechat-article-writer

# 搜索技能
media-creator-skills search "标题"
```

## 版本管理

### 更新版本

修改 `package.json` 中的版本号：

```json
{
  "version": "1.1.0"
}
```

版本号遵循语义化版本规范：
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 发布新版本

```bash
# 1. 更新版本
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# 2. 发布
npm publish --access public

# 3. 推送 git tag
git push --tags
```

## 功能特性

### 自动同步 GitHub 仓库

CLI 工具会自动从 GitHub 克隆技能包：

```bash
# 首次使用会自动克隆
media-creator-skills list

# 手动同步
media-creator-skills sync

# 强制重新下载
media-creator-skills sync --force
```

技能包缓存位置：`~/.media-creator-skills/cache/`

### 离线模式

使用本地缓存，不联网：

```bash
media-creator-skills list --offline
media-creator-skills install --offline
```

## 故障排除

### 权限错误

如果遇到权限错误：

```bash
npm logout
npm login
npm publish --access public
```

### 包名已被占用

如果包名已被占用，需要修改 `package.json` 中的 `name` 字段：

```json
{
  "name": "media-creator-skills-cli"
}
```

### Git 不存在

确保系统已安装 Git：

```bash
git --version
```

## CI/CD 自动发布

可以使用 GitHub Actions 自动发布新版本：

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: cd packages/media-creator-cli && pnpm install
      - run: cd packages/media-creator-cli && pnpm build
      - run: cd packages/media-creator-cli && npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 参考链接

- [npm 发布文档](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [npm 组织](https://docs.npmjs.com/creating-and-managing-scope-for-packages)
- [语义化版本](https://semver.org/)
