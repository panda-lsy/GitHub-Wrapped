export type Locale = 'en' | 'zh';

export const dictionary = {
  en: {
    login: {
      button: "Connect with GitHub",
      loggedIn: "Logged in",
      signOut: "Sign out",
    },
    loading: {
      message: "Loading your GitHub Wrapped...",
    },
    home: {
      title: "GitHub Wrapped",
      subtitle: "Discover your coding journey over the past year. Visualize your contributions, top languages, and most active repositories in a beautiful summary.",
      error: "Error loading data",
      retry: "Please try signing out and signing in again.",
      features: {
        visualize: {
          title: "Visualize Stats",
          desc: "See your commits, PRs, and issues in a beautiful dashboard.",
        },
        share: {
          title: "Share Image",
          desc: "Generate a shareable image for Twitter, LinkedIn, and Instagram.",
        },
        insights: {
          title: "Deep Insights",
          desc: "Analyze your coding habits and language preferences.",
        },
      },
    },
    dashboard: {
      welcome: "Welcome back",
      title: "Your {{year}} Wrapped",
      download: "Download Image",
      generating: "Generating...",
      refresh: "Refresh Data",
      stats: {
        contributions: "Total Contributions",
        contributionsDesc: "Commits, PRs, Issues, Reviews",
        stars: "Stars Earned",
        starsDesc: "Across all your repositories",
        prs: "Pull Requests",
        prsDesc: "Merged & Open",
        activeRepos: "Active Repos",
        activeReposDesc: "Top repositories",
      },
      charts: {
        calendar: "Contribution Calendar",
        topRepos: "Top Repositories",
        topLanguages: "Top Languages",
        less: "Less",
        more: "More",
        totalCount: "{{count}} contributions in the last year",
      },
    },
    shareCard: {
      title: "Wrapped {{year}}",
      contributions: "Total Contributions",
      stars: "Stars Earned",
      prs: "Pull Requests",
      topLanguage: "Top Language",
      graph: "Contribution Graph",
    },
  },
  zh: {
    login: {
      button: "连接 GitHub",
      loggedIn: "已登录",
      signOut: "退出登录",
    },
    loading: {
      message: "正在加载你的 GitHub 年度总结...",
    },
    home: {
      title: "GitHub 年度总结",
      subtitle: "探索你过去一年的编程旅程。通过精美的总结可视化你的贡献、常用语言和最活跃的仓库。",
      error: "加载数据失败",
      retry: "请尝试退出并重新登录。",
      features: {
        visualize: {
          title: "可视化统计",
          desc: "在精美的仪表盘中查看你的提交、PR 和 Issue。",
        },
        share: {
          title: "分享图片",
          desc: "生成适合 Twitter、LinkedIn 和 Instagram 分享的图片。",
        },
        insights: {
          title: "深度洞察",
          desc: "分析你的编程习惯和语言偏好。",
        },
      },
    },
    dashboard: {
      welcome: "欢迎回来",
      title: "你的 {{year}} 年度总结",
      download: "下载图片",
      generating: "生成中...",
      refresh: "刷新数据",
      stats: {
        contributions: "总贡献",
        contributionsDesc: "提交, PR, Issue, Review",
        stars: "获得的 Star",
        starsDesc: "所有仓库总计",
        prs: "Pull Requests",
        prsDesc: "已合并 & 开启",
        activeRepos: "活跃仓库",
        activeReposDesc: "Top 仓库",
      },
      charts: {
        calendar: "贡献日历",
        topRepos: "热门仓库",
        topLanguages: "常用语言",
        less: "少",
        more: "多",
        totalCount: "过去一年共 {{count}} 次贡献",
      },
    },
    shareCard: {
      title: "{{year}} 年度总结",
      contributions: "总贡献",
      stars: "获得的 Star",
      prs: "Pull Requests",
      topLanguage: "主要语言",
      graph: "贡献趋势图",
    },
  },
};
