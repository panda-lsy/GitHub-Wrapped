# 阿里云函数计算适配计划

**创建时间：** 2026-01-07 02:11:31
**任务描述：** 将 GitHub-Wrapped 项目改造为完全兼容阿里云函数计算平台
**方案选择：** 方案 1 - Next.js Standalone + 自定义适配器

## 任务概述

将基于 Next.js 16 的全栈 Web 应用适配到阿里云函数计算平台，保留所有功能包括 ShareCard 图片生成、GitHub OAuth 认证等。

## 技术栈

- **框架：** Next.js 16.0.10 + React 19.2.1
- **运行时：** Node.js 20 (阿里云函数计算)
- **认证：** NextAuth.js 4.24.13 + JWT 会话存储
- **部署方式：** 函数计算默认域名，静态资源由函数处理

## 实施方案

### 核心架构

```
阿里云 HTTP 触发器 → fc-handler.js (适配器) → Next.js Server (standalone) → 处理请求
```

### 关键文件

1. **server.js** - Next.js 实例包装器
2. **fc-handler.js** - 阿里云函数计算入口适配器
3. **.fcconfig/** - 函数计算配置目录
   - template.yml - 资源编排模板
   - env.json - 环境变量配置
   - deploy.sh - 部署脚本
   - README.md - 部署文档

## 实施步骤

### ✅ 步骤 1：创建 Next.js Server 包装器
- 文件：server.js
- 目的：导出 Next.js 实例供函数计算使用

### 🔄 步骤 2：创建函数计算入口适配器
- 文件：fc-handler.js
- 目的：将阿里云 HTTP 事件转换为 Node.js 请求/响应对象

### 🔄 步骤 3：修改 package.json
- 添加函数计算构建脚本
- 添加必要的依赖

### 🔄 步骤 4：确认 Next.js 配置
- 确保 output: "standalone" 配置正确

### 🔄 步骤 5：创建函数计算配置文件
- template.yml - 定义函数、触发器、环境变量
- env.json - 环境变量模板

### 🔄 步骤 6：创建部署脚本
- 自动化构建和部署流程

### 🔄 步骤 7：配置 NextAuth.js JWT 会话
- 修改 src/lib/auth.ts 配置 JWT 策略

### 🔄 步骤 8：创建部署文档
- 提供详细的部署指南

## 配置要点

### 函数规格
- **运行时：** nodejs20
- **内存：** 1024MB (ShareCard 可能需要 1536MB+)
- **超时：** 30秒 (ShareCard 建议 60秒)
- **入口：** index.handler

### 环境变量
```
NEXTAUTH_URL=https://your-function.fc.aliyuncs.com
NEXTAUTH_SECRET=生成的随机密钥
GITHUB_CLIENT_ID=GitHub OAuth App ID
GITHUB_CLIENT_SECRET=GitHub OAuth App Secret
```

### NextAuth 配置
- 使用 JWT 策略（无状态会话）
- 不依赖数据库存储

## 性能优化

1. **冷启动优化**
   - 预热 Next.js 实例
   - 合理设置内存规格
   - 考虑使用预留实例

2. **静态资源**
   - 暂由函数处理（未来可迁移到 OSS + CDN）

3. **ShareCard 优化**
   - 增加内存和超时配置
   - 考虑独立函数部署

## 成功标准

- ✅ 本地测试通过
- ✅ 构建产物完整
- ✅ 部署后可正常访问
- ✅ GitHub OAuth 认证正常
- ✅ ShareCard 功能正常
- ✅ 所有幻灯片正常渲染

## 回滚方案

原有构建和部署方式保持不变，可随时回退到传统部署。

## 工作量估算

总计 3-4 小时
- 核心适配器：60-90 分钟
- 构建配置：15-30 分钟
- 部署配置：30-45 分钟
- 文档编写：20-30 分钟
- 测试调试：30-60 分钟
