export interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  url: string;
  bio?: string;
  company?: string;
  location?: string;
  followers?: number;
  following?: number;
}

export interface Repository {
  name: string;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  description?: string;
  createdAt: string;
  updatedAt: string;
  forks?: number;
  openIssues?: number;
}

export interface LanguageStat {
  name: string;
  color: string;
  count: number;
  percentage: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface YearStats {
  totalContributions: number;
  totalCommits: number;
  totalPullRequests: number;
  totalIssues: number;
  totalReviews: number;
  contributionCalendar: ContributionDay[];
  longestStreak?: number;
  currentStreak?: number;
  bestDay?: { date: string; count: number };
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  achieved: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface WrappedData {
  user: GitHubUser;
  year: number;
  stats: YearStats;
  topLanguages: LanguageStat[];
  topRepos: Repository[];
  totalStarsEarned: number;
  totalStarsGiven: number;
  milestones: Milestone[];
  badges: Badge[];
}

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  theme: string;
  preview?: string;
}

export interface ShareCardOptions {
  template: CardTemplate;
  showAvatar: boolean;
  showStats: boolean;
  showHeatmap: boolean;
  showLanguages: boolean;
  showBadges: boolean;
  customTitle?: string;
  customMessage?: string;
}
