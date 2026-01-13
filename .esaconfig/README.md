# ESA 容器模式部署指南

## 概述

本文档说明如何将 GitHub-Wrapped 应用部署到阿里云 ESA 平台的**容器模式**。

## 关键区别

**之前的失败原因：**
- ❌ 使用了"函数模式"，ESA 平台期望找到独立的函数文件
- ❌ Next.js App Router 的 API Routes 不是传统的函数文件，而是特殊的路由处理器
- ❌ 平台无法识别和运行 `.next/server` 目录中的文件

**新的解决方案：**
- ✅ 使用"容器模式"，运行完整的 Next.js HTTP 服务器
- ✅ 使用 Next.js 的 `standalone` 输出模式，生成自包含的应用包
- ✅ ESA 平台只需启动 HTTP 服务器，无需理解 Next.js 内部结构

## 部署步骤

### 1. 构建部署包

```bash
npm run build:esa-container
```

构建完成后，部署包位于 `.next/standalone/` 目录（约 42MB）

### 2. 在 ESA 平台创建应用

1. 登录阿里云 ESA 控制台
2. 创建新应用或选择现有应用
3. **重要**：选择"容器模式"而不是"函数模式"

### 3. 配置应用

**部署配置：**
- **部署方式**：容器模式 / Web Server 模式
- **上传目录**：上传 `.next/standalone/` 目录中的所有内容
- **启动命令**：`node esa-server.js`
- **端口**：使用环境变量 `$PORT`（平台自动注入）

**环境变量：**
```bash
NODE_ENV=production
PORT=$PORT
NEXTAUTH_URL=https://your-domain.ESA-domain.com
NEXTAUTH_SECRET=your-secret-here
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### 4. 部署流程

1. **打包部署文件**：
   ```bash
   cd .next/standalone
   zip -r ../esa-deployment.zip .
   cd ../..
   ```

2. **上传到 ESA 平台**：
   - 在 ESA 控制台上传 `esa-deployment.zip`
   - 或使用 ESA CLI 工具上传

3. **配置域名**：
   - 使用 ESA 平台提供的默认域名
   - 或配置自定义域名

### 5. 验证部署

部署完成后，访问应用的 URL：
- 主页：`https://your-app-domain.ESA-domain.com/`
- API 端点：`https://your-app-domain.ESA-domain.com/api/session`

## 目录结构

```
.next/standalone/
├── esa-server.js       ← HTTP 服务器启动文件
├── esa-container.json  ← ESA 配置文件
├── package.json        ← 依赖配置
├── node_modules/       ← Node.js 依赖包
├── .next/
│   ├── server/         ← Next.js 服务器代码
│   └── static/         ← Next.js 静态资源
└── public/             ← 公共静态文件
```

## 与之前的区别

| 配置项 | 之前的函数模式 | 现在的容器模式 |
|--------|---------------|---------------|
| 部署方式 | 函数模式 | 容器模式 |
| 上传目录 | 项目根目录 | `.next/standalone/` |
| 启动方式 | 自动查找函数文件 | 运行 HTTP 服务器 |
| 函数文件路径 | 需要配置 `api` | 不需要 |
| 构建命令 | `npm run build:esa` | `npm run build:esa-container` |
| ZIP 大小 | 7.22MB（不完整） | ~42MB（完整） |

## 工作原理

1. **Next.js Standalone 模式**：
   - 生成自包含的应用包，包含所有必要的依赖
   - 优化了包大小，只包含生产环境需要的文件

2. **ESA 服务器**（`esa-server.js`）：
   - 创建标准 Node.js HTTP 服务器
   - 使用 Next.js 实例处理所有请求
   - 支持所有 Next.js 功能（App Router、API Routes、中间件等）

3. **ESA 平台**：
   - 启动容器时运行 `node esa-server.js`
   - 通过环境变量 `$PORT` 传入监听端口
   - 平台的反向代理将 HTTP 请求转发到应用

## GitHub OAuth 配置

1. **创建 GitHub OAuth App**：
   - 前往 GitHub Settings → Developer settings → OAuth Apps
   - 点击 "New OAuth App"
   - 配置：
     - Application name: `GitHub Wrapped (ESA)`
     - Homepage URL: `https://your-app-domain.ESA-domain.com`
     - Authorization callback URL: `https://your-app-domain.ESA-domain.com/api/auth/callback/github`

2. **获取凭据**：
   - 记录 `Client ID`
   - 生成并记录 `Client Secret`

3. **配置环境变量**：
   - 在 ESA 平台配置上述环境变量
   - 或使用平台的环境变量配置功能

## 故障排查

### 1. 应用启动失败

**检查项**：
- ✅ 确保 `esa-server.js` 在上传目录的根目录
- ✅ 确保 `node_modules/` 目录完整
- ✅ 检查环境变量 `PORT` 是否正确配置

### 2. 404 错误

**可能原因**：
- 启动命令不正确
- 应用未成功启动
- 使用了错误的部署模式（函数模式 vs 容器模式）

**解决方法**：
- 检查 ESA 平台的日志，确认应用是否启动成功
- 确认使用的是"容器模式"而不是"函数模式"

### 3. GitHub 认证失败

**检查项**：
- ✅ GitHub OAuth App 的回调 URL 配置正确
- ✅ `NEXTAUTH_URL` 环境变量与实际部署域名匹配
- ✅ `NEXTAUTH_SECRET` 已配置（可以用随机字符串）

### 4. 静态资源加载失败

**检查项**：
- ✅ `public/` 目录已上传
- ✅ `.next/static/` 目录已上传

## 技术栈

- **Next.js**: 16.0.10 (App Router)
- **React**: 19.2.1
- **Node.js**: 20.x
- **NextAuth.js**: 4.24.13 (JWT 模式)
- **部署模式**: Standalone + 容器模式

## 相关文件

- `esa-server.js` - ESA 平台 HTTP 服务器
- `scripts/post-build-esa-container.js` - 构建后处理脚本
- `next.config.ts` - Next.js 配置（standalone 输出）
- `src/lib/auth.ts` - NextAuth 配置（JWT 会话策略）

## 支持

如遇到部署问题，请检查：
1. ESA 平台的应用日志
2. 构建日志（`npm run build:esa-container`）
3. 浏览器控制台错误
4. GitHub Issues: https://github.com/Freakz3z/GitHub-Wrapped/issues
