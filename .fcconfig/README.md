# 阿里云函数计算部署指南

本文档详细说明如何将 GitHub-Wrapped 项目部署到阿里云函数计算平台。

## 📋 目录

- [前置要求](#前置要求)
- [快速开始](#快速开始)
- [详细步骤](#详细步骤)
- [环境变量配置](#环境变量配置)
- [常见问题](#常见问题)
- [性能优化](#性能优化)

---

## 前置要求

### 必需条件

1. **阿里云账号**
   - 已开通[函数计算服务](https://www.aliyun.com/product/fc)
   - 账号余额充足（函数计算有免费额度）

2. **开发环境**
   - Node.js 18+ 和 npm
   - Git（可选）

3. **GitHub OAuth App**
   - 在 GitHub 创建 OAuth App
   - 获取 Client ID 和 Client Secret

### 可选工具

- **阿里云 CLI**（推荐）：简化部署流程
  ```bash
  # macOS
  brew install aliyun-cli

  # Windows
  # 下载安装包：https://help.aliyun.com/document_detail/110588.html
  ```

- **Fun CLI**：函数计算部署工具
  ```bash
  npm install -g @alicloud/fun
  ```

---

## 快速开始

### 方式 1：使用自动化脚本（推荐）

```bash
# 1. 运行部署脚本
npm run deploy:fc

# 2. 按照脚本指引：
#    - 检查依赖
#    - 构建项目
#    - 打包部署文件
#    - 上传到阿里云（手动或自动）
```

### 方式 2：手动部署

```bash
# 1. 构建函数计算包
npm run build:fc

# 2. 打包构建产物
cd .next/standalone
zip -r ../deploy-package.zip .

# 3. 登录阿里云控制台上传
# https://fc.console.aliyun.com/
```

---

## 详细步骤

### 步骤 1：创建 GitHub OAuth App

1. 访问 GitHub Settings：https://github.com/settings/developers
2. 点击「New OAuth App」
3. 填写应用信息：
   - **Application name**: GitHub Wrapped (your name)
   - **Homepage URL**: `https://your-service-id.cn-hangzhou.fc.aliyuncs.com/http-trigger/`
   - **Authorization callback URL**: `https://your-service-id.cn-hangzhou.fc.aliyuncs.com/http-trigger/api/auth/callback/github`
4. 创建后记录：
   - **Client ID**
   - **Client Secret**

> **提示**：部署后将 `your-service-id` 替换为实际的服务 ID。

### 步骤 2：生成 NEXTAUTH_SECRET

```bash
# 使用 OpenSSL 生成随机密钥
openssl rand -base64 32

# 或使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

保存生成的字符串，将用于 `NEXTAUTH_SECRET` 环境变量。

### 步骤 3：构建项目

```bash
# 安装依赖
npm install

# 构建函数计算版本
npm run build:fc
```

构建产物位于 `.next/standalone/` 目录。

### 步骤 4：在阿里云创建服务和函数

#### 4.1 创建服务

1. 登录[函数计算控制台](https://fc.console.aliyun.com/)
2. 选择地域（推荐：华东1-杭州）
3. 点击「创建服务」
4. 配置：
   - **服务名称**: `github-wrapped-service`
   - **描述**: GitHub Wrapped Application
   - **网络配置**: 按需配置（默认即可）
5. 点击「创建」

#### 4.2 创建函数

1. 进入刚创建的服务
2. 点击「创建函数」
3. 选择「使用内置运行时创建」
4. 配置函数：
   - **函数名称**: `nextjs-handler`
   - **请求处理程序**: `index.handler`
   - **运行时**: **Node.js 20**
   - **函数代码**: 选择「上传 ZIP 包」
   - **代码包**: 上传 `.next/standalone/` 的 ZIP 文件
   - **内存规格**: **1024 MB**（ShareCard 功能可能需要 1536 MB）
   - **超时时间**: **30 秒**（ShareCard 建议 60 秒）
   - **实例并发度**: 10
5. 点击「创建」

### 步骤 5：配置环境变量

在函数配置页面，点击「环境变量」，添加以下变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NODE_ENV` | `production` | 生产环境 |
| `NEXTAUTH_URL` | 函数计算访问地址 | 见下方说明 |
| `NEXTAUTH_SECRET` | 步骤 2 生成的密钥 | JWT 签名密钥 |
| `GITHUB_CLIENT_ID` | GitHub OAuth App ID | 步骤 1 获取 |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Secret | 步骤 1 获取 |

#### NEXTAUTH_URL 格式

```
https://<service-name>.<region>.fc.aliyuncs.com/http-trigger/
```

例如：
```
https://github-wrapped-service.cn-hangzhou.fc.aliyuncs.com/http-trigger/
```

### 步骤 6：创建 HTTP 触发器

1. 在函数详情页，点击「触发器管理」
2. 点击「创建触发器」
3. 配置触发器：
   - **触发器类型**: **HTTP 触发器**
   - **触发器名称**: `http-trigger`
   - **认证方式**: **anonymous**（匿名）
   - **请求方式**: 勾选 **GET, POST, PUT, DELETE, PATCH, OPTIONS**
   - **路径**: `/`（根路径）
4. 点击「确定」

### 步骤 7：获取访问地址

创建触发器后，在触发器列表中会显示「公共访问地址」，格式如下：

```
https://<account-id>.<region>.fc.aliyuncs.com/2016-08-15/proxy/<service-name>/<function-name>/
```

**重要**：将此地址填入 `NEXTAUTH_URL` 环境变量，然后**重启函数**使配置生效。

### 步骤 8：配置 GitHub OAuth 回调 URL

回到 GitHub OAuth App 设置，更新 Authorization callback URL：

```
https://<your-fc-url>/api/auth/callback/github
```

例如：
```
https://1234567890.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/github-wrapped-service/nextjs-handler/api/auth/callback/github
```

### 步骤 9：验证部署

访问函数计算公共地址，应该能看到 GitHub Wrapped 登录页面：

```
https://<your-fc-url>/
```

点击「Login with GitHub」测试认证流程。

---

## 环境变量配置

### 完整环境变量列表

参考 `.fcconfig/env.json` 文件。

### 生产环境建议

- **NEXTAUTH_SECRET**: 使用强随机密钥，不要泄露
- **GITHUB_CLIENT_SECRET**: 定期轮换
- **NODE_ENV**: 始终设置为 `production`

---

## 常见问题

### Q1: 函数执行超时

**原因**：ShareCard 图片生成需要更多时间。

**解决方案**：
1. 增加函数超时时间到 60 秒
2. 增加内存到 1536 MB
3. 或考虑将图片生成独立为单独函数

### Q2: 冷启动时间长

**原因**：Next.js 实例初始化需要时间。

**解决方案**：
1. 使用**预留实例**（函数计算高级功能）
2. 配置**实例并发度**提高资源利用率
3. 增加内存规格（加快启动速度）

### Q3: 认证失败

**原因**：`NEXTAUTH_URL` 配置错误。

**解决方案**：
1. 确保使用完整的函数计算 URL
2. URL 末尾必须包含 `/`
3. 配置后**重启函数**使环境变量生效

### Q4: GitHub OAuth 回调错误

**原因**：回调 URL 配置不正确。

**解决方案**：
1. 在 GitHub OAuth App 设置中检查回调 URL
2. 确保使用函数计算的实际访问地址
3. 路径格式：`/api/auth/callback/github`

### Q5: 静态资源 404

**原因**：standalone 模式下静态资源路径问题。

**解决方案**：
1. 确保构建脚本已复制 `public/` 和 `.next/static/` 目录
2. 检查函数代码包中是否包含这些目录
3. 参考 `package.json` 中的 `build:fc` 脚本

### Q6: 函数包过大

**原因**：standalone 构建包含所有依赖。

**解决方案**：
1. 使用 `output: 'standalone'` 自动优化（已配置）
2. 检查 `node_modules` 是否包含不必要的包
3. 考虑使用外部 CDN 托管静态资源

---

## 性能优化

### 1. 启用预留实例

避免冷启动，保持实例常驻：

```bash
# 使用阿里云 CLI 配置
aliyun fc PUT /services/<service-name>/functions/<function-name> \
  --body '{
    "reservedConcurrency": 1
  }'
```

### 2. 调整并发度

根据访问量调整实例并发度：

- **低流量**：5-10
- **中等流量**：10-20
- **高流量**：20-50

### 3. 分层部署

将不同功能拆分为独立函数：

- **主应用函数**：1024 MB，30 秒超时
- **ShareCard 函数**：1536 MB，60 秒超时
- **API 函数**：512 MB，10 秒超时

### 4. 使用 CDN 加速

将静态资源部署到 OSS + CDN：

```javascript
// next.config.ts
const nextConfig = {
  assetPrefix: 'https://your-cdn-domain.com',
  // ...
};
```

---

## 成本估算

阿里云函数计算定价（华东地域）：

| 资源 | 配置 | 单价 |
|------|------|------|
| 调用次数 | - | ¥1.33/百万次 |
| 执行时间 | 1024 MB | ¥0.00003167/秒 |
| 公网流量 | - | ¥0.50/GB |

**示例**：1000 次访问/天，平均执行时间 2 秒

- 调用费用：30,000 次/月 × ¥1.33/百万次 ≈ ¥0.04/月
- 执行费用：30,000 次 × 2 秒 × ¥0.00003167/秒 ≈ ¥1.90/月
- 流量费用：假设 1 GB/月 ≈ ¥0.50/月

**月成本**：约 ¥2.44（远低于免费额度）

---

## 监控和日志

### 查看函数日志

1. 进入函数详情页
2. 点击「日志查询」
3. 选择时间和日志级别
4. 查看实时日志和历史日志

### 监控指标

函数计算控制台提供以下监控：

- 调用次数
- 平均执行时间
- 错误率
- 内存使用
- 网络流量

### 配置告警

建议配置以下告警：

1. **错误率告警**：错误率 > 5%
2. **超时告警**：超时次数 > 10/小时
3. **内存告警**：内存使用 > 90%

---

## 回滚方案

如需回退到传统部署：

```bash
# 使用原有启动命令
npm run build
npm start
```

原有部署方式不受影响，可随时切换。

---

## 参考资源

- [阿里云函数计算文档](https://help.aliyun.com/product/50980.html)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [NextAuth.js 配置](https://next-auth.js.org/configuration/options)

---

## 技术支持

如有问题，请检查：

1. 函数日志（控制台 → 日志查询）
2. 环境变量配置
3. GitHub OAuth App 设置
4. NEXTAUTH_URL 是否正确

---

**部署成功后，别忘了在 GitHub OAuth App 中更新最终的回调 URL！** 🎉
