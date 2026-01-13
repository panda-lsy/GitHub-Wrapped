# ESA Index 模式部署指南

## 方案说明

这是专门为只能配置**安装命令**和**构建命令**的 ESA 平台设计的部署方案。

### 工作原理

1. **构建阶段**：
   - 运行 `npm run build:esa-index`（即 `next build`）
   - Next.js 生成 standalone 输出到 `.next/standalone/`
   - `index.js` 作为入口文件放在项目根目录

2. **运行阶段**：
   - ESA 平台加载 `index.js`
   - `index.js` 导出 `handler` 函数供平台调用
   - Handler 函数初始化 Next.js 并处理 HTTP 请求

### 关键特性

- ✅ 只需配置"函数文件路径"为 `index.js` 或 `./index.js`
- ✅ 自动处理 standalone 输出的依赖路径
- ✅ 支持函数模式和服务器模式
- ✅ 无需配置启动命令

---

## ESA 平台配置

### 配置参数

| 配置项 | 值 |
|--------|-----|
| **安装命令** | `npm install` |
| **构建命令** | `npm run build:esa-index` |
| **函数文件路径** | `index.js` 或 `./index.js` |
| **运行时/环境** | Node.js 20 |

### 环境变量

```bash
NODE_ENV=production
NEXTAUTH_URL=https://your-app-domain.esa-domain.com
NEXTAUTH_SECRET=your-random-secret-string
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---

## 技术细节

### index.js 入口文件

```javascript
// 模块路径解析（支持 standalone）
const standaloneModules = path.join(__dirname, '.next', 'standalone', 'node_modules');
if (require('fs').existsSync(standaloneModules)) {
  require('module').Module.globalPaths.push(standaloneModules);
}

// 创建 Next.js 实例
const next = require('next');
const app = next({ dev: false });
const handle = app.getRequestHandler();

// 导出 handler 供 ESA 平台调用
async function handler(event, context) {
  await app.prepare();
  // 处理请求并返回响应
  return { statusCode, headers, body };
}

module.exports = { handler, app, handle };
```

### 工作流程

1. **平台加载**：ESA 平台 require('./index.js')
2. **初始化**：index.js 添加模块搜索路径，加载 Next.js
3. **请求处理**：
   - 平台调用 `handler(event, context)`
   - Handler 确保应用已准备（`app.prepare()`）
   - Handler 将事件转换为 Node.js HTTP 请求对象
   - Next.js 处理请求并返回响应
   - Handler 将响应转换为 ESA 平台格式并返回

---

## 与其他方案对比

| 方案 | 构建命令 | 函数文件路径 | 启动命令 | 适用场景 |
|------|---------|------------|---------|---------|
| **Index 模式** ✅ | `npm run build:esa-index` | `index.js` | 不需要 | 只能配置安装+构建命令 |
| 容器模式 | `npm run build:esa-container` | - | `node esa-server.js` | 可配置启动命令 |
| 函数模式（失败） | `npm run build:esa` | `api` | 不需要 | - |

---

## 故障排查

### 1. "Cannot find module 'next'"

**原因**：index.js 无法找到 next 模块

**解决**：
- ✅ 确保运行了 `npm run build:esa-index`
- ✅ 确认 `.next/standalone/node_modules/next` 存在
- ✅ 检查 index.js 的模块路径解析代码

### 2. "Function file not found"

**原因**：平台无法找到指定的函数文件

**解决**：
- ✅ 确认 index.js 在项目根目录
- ✅ 确认"函数文件路径"配置为 `index.js` 或 `./index.js`
- ✅ 确认文件已提交到 Git（如果平台从 Git 拉取代码）

### 3. 404 错误

**原因**：handler 函数未正确处理请求

**解决**：
- ✅ 检查 ESA 平台的日志
- ✅ 确认 `handler` 函数正确导出（`module.exports.handler = handler`）
- ✅ 确认 Next.js 应用正确初始化

### 4. 超时错误

**原因**：Next.js 应用初始化时间过长

**解决**：
- ✅ 首次请求会触发 `app.prepare()`，可能较慢
- ✅ 后续请求会复用已初始化的应用
- ✅ 考虑增加平台的超时时间配置

---

## 验证部署

### 本地测试

```bash
# 1. 构建
npm run build:esa-index

# 2. 测试 index.js 能否加载
node -e "console.log('✅ index.js loaded:', Object.keys(require('./index.js')))"

# 预期输出：
# ✅ index.js loaded: [ 'handler', 'app', 'handle' ]
```

### 部署后测试

访问应用 URL 并测试：
- 主页：`https://your-app-domain.esa-domain.com/`
- API 端点：`https://your-app-domain.esa-domain.com/api/session`

---

## 文件说明

### 核心文件

| 文件 | 用途 |
|------|------|
| `index.js` | ESA 平台入口文件，导出 handler 函数 |
| `next.config.ts` | Next.js 配置（standalone 输出） |
| `package.json` | 包配置（包含 build:esa-index 命令） |
| `scripts/post-build-esa-index.js` | 构建后处理脚本（可选） |

### 不需要的文件

- ❌ `esa-server.js` - 容器模式使用
- ❌ `server.js` - 传统函数计算使用
- ❌ `fc-handler.js` - 阿里云函数计算使用

---

## 平台限制和注意事项

### ✅ 支持的功能

- 所有 Next.js 功能（App Router、API Routes、中间件等）
- GitHub OAuth 认证
- ShareCard 图片生成
- 静态资源服务

### ⚠️ 注意事项

1. **冷启动延迟**：首次请求会触发 Next.js 初始化，可能需要 2-5 秒
2. **内存限制**：确保平台配置的内存足够（建议 ≥512MB）
3. **超时配置**：建议设置 ≥30 秒的超时时间
4. **环境变量**：必须配置所有必需的环境变量

---

## 相关文档

- [Next.js Standalone 输出](https://nextjs.org/docs/deployment#standalone-output)
- [Next.js 在 Serverless 上运行](https://nextjs.org/docs/deployment#serverless-deployment)
- [.esaconfig/README.md](../.esaconfig/README.md) - 容器模式部署指南
- [.fcconfig/README.md](../.fcconfig/README.md) - 阿里云函数计算指南

---

## 支持

如遇到问题，请检查：
1. ESA 平台的应用日志
2. 构建日志（`npm run build:esa-index`）
3. 浏览器控制台错误
4. GitHub Issues: https://github.com/Freakz3z/GitHub-Wrapped/issues
