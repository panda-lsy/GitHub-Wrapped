<div align="center">

  <!-- Title & Logo -->
  <h1 align="center">
    <img src="image.png" alt="GitHub Wrapped" width="120" height="120">
    <br>
    GitHub Wrapped
  </h1>

  <!-- Badges -->
  <p align="center">
    <a href="https://github.com/Freakz3z/GitHub-Wrapped/stargazers">
      <img src="https://img.shields.io/github/stars/Freakz3z/GitHub-Wrapped?style=flat-square&logo=github&color=yellow" alt="Stars">
    </a>
    <a href="https://github.com/Freakz3z/GitHub-Wrapped/network/members">
      <img src="https://img.shields.io/github/forks/Freakz3z/GitHub-Wrapped?style=flat-square&logo=github&color=blue" alt="Forks">
    </a>
    <a href="https://github.com/Freakz3z/GitHub-Wrapped/issues">
      <img src="https://img.shields.io/github/issues/Freakz3z/GitHub-Wrapped?style=flat-square&logo=github&color=green" alt="Issues">
    </a>
    <a href="./LICENSE">
      <img src="https://img.shields.io/github/license/Freakz3z/GitHub-Wrapped?style=flat-square&logo=github&color=orange" alt="License">
    </a>
    <a href="https://githubwrapped-roan.vercel.app">
      <img src="https://img.shields.io/badge/deployment-online-success?style=flat-square&logo=vercel&logoColor=white" alt="Deployment">
    </a>
  </p>

  <!-- Subtitle -->
  <p align="center">
    <strong>Your Year in Code, Beautifully Visualized.</strong>
  </p>

  <!-- Description -->
  <p align="center">
    GitHub Wrapped 是一个为开发者打造的年度回顾工具，通过精美的幻灯片展示你的 GitHub 活动数据。
    <br>
    分析你过去一年的代码贡献，生成可分享的精美总结。
  </p>

  <!-- Links -->
  <p align="center">
    <a href="README_zh.md">中文文档</a> •
    <a href="https://githubwrapped-roan.vercel.app">🚀 在线体验</a> •
    <a href="#-技术栈">技术栈</a> •
    <a href="#-本地开发">本地开发</a>
  </p>

</div>

---

## Infrastructure Partner

<div align="center">

  <!-- ESA Badge -->
  <a href="https://www.aliyun.com/product/esa">
    <img src="ESA.png" alt="Aliyun ESA" width="200">
  </a>

  <p>
    <strong>本项目由阿里云 ESA 提供加速、计算和保护</strong>
    <br>
    <em>Powered by <a href="https://www.aliyun.com/product/esa">Aliyun Edge Secure Acceleration (ESA)</a></em>
  </p>

</div>

---

## Table of Contents

- [Features](#-features)
- [Slides Overview](#-slides-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## Features

### Immersive Experience

- **Smooth Transitions** - 使用 Framer Motion 实现流畅的幻灯片切换动画
- **Wheel Navigation** - 支持鼠标滚轮无缝导航
- **Progress Indicator** - 优雅的进度条显示当前位置
- **Responsive Design** - 完美适配桌面、平板和移动设备
- **Modern UI** - 玻璃拟态设计风格，渐变背景与自定义滚动条

### Analytics

#### Statistics Overview
- 总贡献数（提交、PR、Issue、代码审查）
- 获得的 Star 数量
- 提交的 Pull Request 数量
- 创建的 Issue 数量
- 代码审查数量
- 最长连续贡献天数
- 当前连续贡献天数
- 最佳贡献日

#### Monthly Journey
- 按月展示活动卡片
- 活跃月份绿色脉动指示器
- 每月统计：贡献总数、活跃天数、最佳连续天数、单日最佳贡献
- 非活跃月份灰色卡片显示
- 年度连续贡献总结

#### Achievement Badges

| Badge Type | Levels |
|------------|--------|
| Contributions | 100 🥉 / 500 🥈 / 1K 🥇 / 2.5K 💎 |
| Streak | 7 天 🔥 / 30 天 🚀 / 100 天 ⭐ |
| Stars | 10 ⭐ / 50 🌟 / 100 💫 / 500 🏆 |
| Pull Requests | 10 📝 / 50 📋 / 100 ✅ |
| Special | 多语言开发者 🌍 / 代码审查者 👀 |

#### Programming Languages
- 可视化语言分布图表
- 百分比细分与动画进度条
- 颜色编码语言指示器
- 语言多样性追踪

#### Top Repositories
- 仓库名称和描述
- 主要语言及颜色标识
- Star 数、Fork 数和 Issue 数
- 直接链接到 GitHub
- 紧凑优雅的卡片布局

### Security & Privacy

- **只读访问** - 仅请求读取公开数据的权限
- **无数据存储** - 你的数据永远不会存储在我们的服务器
- **安全认证** - 使用 GitHub OAuth 和 NextAuth.js
- **会话管理** - 安全的会话处理机制

---

## Slides Overview

| Slide | Description |
|-------|-------------|
| **1. Intro** | 个性化欢迎页面，展示 GitHub 资料和个人信息 |
| **2. Stats** | 6 个动画卡片显示关键指标 |
| **3. Heatmap** | 月度活动卡片，详细统计和连续贡献信息 |
| **4. Languages** | 交互式语言分布，进度条和图表 |
| **5. Repos** | 热门仓库的响应式网格布局 |
| **6. Badges** | 成就徽章的解锁和进度状态 |
| **7. Milestones** | 关键成就与图标和描述 |
| **8. Summary** | 感谢信息和总结统计 |

---

## Tech Stack

### Frontend

- **Framework** - [Next.js 16](https://nextjs.org/) (App Router + Turbopack)
- **UI Library** - [React 19](https://react.dev/)
- **Styling** - [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations** - [Framer Motion](https://www.framer.com/motion/)
- **Icons** - [Lucide React](https://lucide.dev/)

### Backend & Authentication

- **Authentication** - [NextAuth.js](https://next-auth.js.org/) (GitHub OAuth)
- **API** - [GitHub GraphQL API](https://docs.github.com/en/graphql)

### Data Visualization

- **Charts** - [Recharts](https://recharts.org/)
- **Calendar** - [react-activity-calendar](https://github.com/gr2m/react-activity-calendar)

### Development

- **Language** - [TypeScript](https://www.typescriptlang.org/)
- **Package Manager** - npm / pnpm
- **Deployment** - [Vercel](https://vercel.com/)

---

## Getting Started

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFreakz3z%2FGitHub-Wrapped)

### Prerequisites

- Node.js 18+ installed
- GitHub Account
- GitHub OAuth App

---

## Environment Variables

创建 `.env.local` 文件并配置以下环境变量：

```env
# GitHub OAuth App Credentials
# 获取方式：https://github.com/settings/developers
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# NextAuth Configuration
# 生成方式：openssl rand -base64 32
NEXTAUTH_SECRET=your_random_secret_string

# Application URL
NEXTAUTH_URL=http://localhost:3000
```

### GitHub OAuth App 设置

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写以下信息：
   - **Application name**: GitHub Wrapped
   - **Homepage URL**: `http://localhost:3000` (开发) 或你的域名 (生产)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. 获取 `Client ID` 并生成 `Client Secret`

---

## Development

### Installation

```bash
# 克隆仓库
git clone https://github.com/Freakz3z/GitHub-Wrapped.git
cd GitHub-Wrapped

# 安装依赖
npm install
```

### Run Development Server

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Run Linting

```bash
npm run lint
```

---

## Contributing

我们欢迎所有形式的贡献！

### How to Contribute

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### Contribution Areas

- [ ] 新增徽章类型和成就
- [ ] 创建新的幻灯片模板
- [ ] 改进 UI/UX 动画和过渡效果
- [ ] 添加更多社交分享平台
- [ ] 实现图片下载功能
- [ ] 添加更多语言支持
- [ ] 优化数据可视化
- [ ] 提升性能和加载速度
- [ ] 改进移动端响应式设计

---

## License

本项目采用 [Apache License 2.0](LICENSE) 开源协议。

```
Copyright 2024 GitHub Wrapped Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

<div align="center">

  Made with ❤️ by the developer community

  <!-- Share Badge -->
  [![](https://img.shields.io/badge/Share-%23GitHubWrapped-blue?style=for-the-badge&logo=github)](https://twitter.com/intent/tweet?text=Check%20out%20my%20GitHub%20Wrapped%20%F0%9F%8E%81&url=https%3A%2F%2Fgithub.com%2FFreakz3z%2FGitHub-Wrapped&hashtags=GitHubWrapped)

  <!-- Star History -->
  [![Star History Chart](https://api.star-history.com/svg?repos=Freakz3z/GitHub-Wrapped&type=Date)](https://star-history.com/#Freakz3z/GitHub-Wrapped&Date)

</div>
