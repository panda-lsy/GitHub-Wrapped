# GitHub Wrapped 2025 🎁

探索你的年度代码之旅！GitHub Wrapped 为你生成一份精美、可分享的 GitHub 年度活动总结。

[**查看在线演示**](https://github-wrapped.vercel.app)

## ✨ 功能特性

- **📊 全面统计**：查看你的总贡献数、获得的 Star 数、合并的 PR 数等关键数据。
- **📅 贡献热力图**：以精美的可视化图表展示你每天的代码活动。
- **🏆 编程语言排行**：发现你今年最常用的编程语言。
- **🖼️ 分享卡片**：一键生成精美的年度总结图片，分享到朋友圈、Twitter 或 LinkedIn。
- **🔒 隐私优先**：我们仅请求只读权限。你的数据仅在本地处理，绝不会存储在我们的服务器上。

## 🚀 如何使用

1. 访问 [网站](https://github-wrapped.vercel.app)。
2. 点击 **"Connect with GitHub"** 进行登录。
3. 查看你的个性化年度总结仪表盘。
4. 点击 **下载** 按钮保存你的年度总结图片！

## 🛠️ 部署你自己的版本

想要托管你自己的版本？你可以通过 Vercel 在几分钟内免费完成部署。

### 准备工作
- 一个 GitHub 账号。
- 一个 Vercel 账号。

### 详细步骤指南

1. **Fork 本仓库** 到你的 GitHub 账号。

2. **创建 GitHub OAuth App**：
   - 前往 [GitHub Developer Settings](https://github.com/settings/developers)。
   - 点击 **New OAuth App**。
   - **Application Name**: `My GitHub Wrapped`
   - **Homepage URL**: `https://<your-project-name>.vercel.app` (部署后你会获得这个地址，现在可以先填个占位符)。
   - **Authorization callback URL**: `https://<your-project-name>.vercel.app/api/auth/callback/github`
   - 点击 **Register application**。
   - 复制 **Client ID** 并生成一个新的 **Client Secret**。

3. **部署到 Vercel**：
   - 点击下方按钮开始部署：
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fgithub-wrapped-app)

   - Vercel 会要求你输入环境变量。填入你从 GitHub 获得的信息：
     - `GITHUB_ID`: 你的 Client ID。
     - `GITHUB_SECRET`: 你的 Client Secret。
     - `NEXTAUTH_SECRET`: 生成一个随机字符串（例如使用 `openssl rand -base64 32` 或随便填一长串乱码）。
     - `NEXTAUTH_URL`: 你的 Vercel 域名（例如 `https://your-project.vercel.app`）。

4. **完成配置**：
   - 部署完成后，Vercel 会分配给你一个域名（例如 `project-name.vercel.app`）。
   - 回到你的 **GitHub OAuth App 设置页面**，将 **Homepage URL** 和 **Authorization callback URL** 更新为你真实的 Vercel 域名。

## 💻 本地开发

1. **克隆仓库**：
   ```bash
   git clone https://github.com/your-username/github-wrapped-app.git
   cd github-wrapped-app
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **配置环境变量**：
   - 将 `.env.local.example` 复制为 `.env.local`。
   - 填入新 OAuth App 的 `GITHUB_ID` 和 `GITHUB_SECRET` (回调地址设为 `http://localhost:3000/api/auth/callback/github`)。
   - 生成一个随机字符串作为 `NEXTAUTH_SECRET`。

4. **运行应用**：
   ```bash
   npm run dev
   ```

5. **在浏览器中打开 http://localhost:3000**。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **认证**: NextAuth.js
- **数据**: GitHub GraphQL API
- **图表**: Recharts, React Activity Calendar
- **图片生成**: html2canvas

