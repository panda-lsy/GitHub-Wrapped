export interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  url: string;
}

export interface Repository {
  name: string;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  } | null;
}

export interface LanguageStat {
  name: string;
  color: string;
  count: number; // or size
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
}

export interface WrappedData {
  user: GitHubUser;
  year: number;
  stats: YearStats;
  topLanguages: LanguageStat[];
  topRepos: Repository[];
  totalStarsEarned: number;
  totalStarsGiven: number; // This might be hard to get efficiently for all time, usually just current count
}
