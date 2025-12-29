import { graphql } from "@octokit/graphql";
import { WrappedData, LanguageStat, Repository, ContributionDay, Milestone, Badge } from "@/types";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export async function fetchGitHubData(accessToken: string, year: number = new Date().getFullYear()): Promise<WrappedData> {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        login
        name
        bio
        company
        location
        avatarUrl
        url
        followers { totalCount }
        following { totalCount }
        starredRepositories {
          totalCount
        }
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalPullRequestReviewContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            name
            url
            stargazerCount
            description
            primaryLanguage {
              name
              color
            }
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
            createdAt
            updatedAt
            forkCount
            issues(states: OPEN) {
              totalCount
            }
          }
        }
      }
    }
  `;

  const userQuery = `
    query { 
      viewer { 
        login 
      } 
    }
  `;

  const { viewer } = await graphql<{ viewer: { login: string } }>(userQuery, {
    headers: {
      authorization: `token ${accessToken}`,
    },
  });

  const login = viewer.login;

  const data = await graphql<any>(query, {
    login,
    from,
    to,
    headers: {
      authorization: `token ${accessToken}`,
    },
  });

  const user = data.user;
  const contributions = user.contributionsCollection;
  
  // Process Contribution Calendar and calculate streaks
  const calendarDays: ContributionDay[] = [];
  contributions.contributionCalendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (day.contributionCount > 0) level = 1;
      if (day.contributionCount > 3) level = 2;
      if (day.contributionCount > 6) level = 3;
      if (day.contributionCount > 10) level = 4;

      calendarDays.push({
        date: day.date,
        count: day.contributionCount,
        level: level,
      });
    });
  });

  // Calculate streaks
  const { longestStreak, currentStreak, bestDay } = calculateStreaks(calendarDays);

  // Process Languages
  const languageMap = new Map<string, { size: number; color: string }>();
  let totalSize = 0;

  user.repositories.nodes.forEach((repo: any) => {
    if (repo.languages && repo.languages.edges) {
      repo.languages.edges.forEach((edge: any) => {
        const name = edge.node.name;
        const size = edge.size;
        const color = edge.node.color;
        
        if (languageMap.has(name)) {
          const current = languageMap.get(name)!;
          languageMap.set(name, { size: current.size + size, color });
        } else {
          languageMap.set(name, { size, color });
        }
        totalSize += size;
      });
    }
  });

  const topLanguages: LanguageStat[] = Array.from(languageMap.entries())
    .map(([name, { size, color }]) => ({
      name,
      color,
      count: size,
      percentage: totalSize > 0 ? (size / totalSize) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Process Top Repos
  const topRepos: Repository[] = user.repositories.nodes
    .slice(0, 8)
    .map((repo: any) => ({
      name: repo.name,
      url: repo.url,
      stargazerCount: repo.stargazerCount,
      primaryLanguage: repo.primaryLanguage,
      description: repo.description,
      createdAt: repo.createdAt,
      updatedAt: repo.updatedAt,
      forks: repo.forkCount,
      openIssues: repo.issues?.totalCount || 0,
    }));

  // Calculate Total Stars Earned
  const totalStarsEarned = user.repositories.nodes.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);

  // Generate Milestones
  const milestones = generateMilestones({
    totalContributions: contributions.contributionCalendar.totalContributions,
    totalCommits: contributions.totalCommitContributions,
    totalPullRequests: contributions.totalPullRequestContributions,
    totalStarsEarned,
    longestStreak: longestStreak || 0,
    repositoriesCount: user.repositories.nodes.length,
  }, year);

  // Generate Badges
  const badges = generateBadges({
    totalContributions: contributions.contributionCalendar.totalContributions,
    totalCommits: contributions.totalCommitContributions,
    totalPullRequests: contributions.totalPullRequestContributions,
    totalIssues: contributions.totalIssueContributions,
    totalReviews: contributions.totalPullRequestReviewContributions,
    totalStarsEarned,
    longestStreak: longestStreak || 0,
    languagesCount: topLanguages.length,
    followers: user.followers?.totalCount || 0,
  });

  return {
    user: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      url: user.url,
      bio: user.bio,
      company: user.company,
      location: user.location,
      followers: user.followers?.totalCount,
      following: user.following?.totalCount,
    },
    year,
    stats: {
      totalContributions: contributions.contributionCalendar.totalContributions,
      totalCommits: contributions.totalCommitContributions,
      totalPullRequests: contributions.totalPullRequestContributions,
      totalIssues: contributions.totalIssueContributions,
      totalReviews: contributions.totalPullRequestReviewContributions,
      contributionCalendar: calendarDays,
      longestStreak,
      currentStreak,
      bestDay,
    },
    topLanguages,
    topRepos,
    totalStarsEarned,
    totalStarsGiven: user.starredRepositories.totalCount,
    milestones,
    badges,
  };
}

function calculateStreaks(calendarDays: ContributionDay[]): {
  longestStreak: number;
  currentStreak: number;
  bestDay?: { date: string; count: number };
} {
  let longestStreak = 0;
  let currentStreak = 0;
  let bestDay: { date: string; count: number } | undefined;

  const sortedDays = [...calendarDays].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sortedDays.forEach((day, index) => {
    if (day.count > 0) {
      currentStreak++;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      
      if (!bestDay || day.count > bestDay.count) {
        bestDay = { date: day.date, count: day.count };
      }
    } else if (index > 0 && sortedDays[index - 1].count > 0) {
      currentStreak = 0;
    }
  });

  // Calculate current streak (consecutive days with contributions ending today)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  currentStreak = 0;
  
  for (let i = sortedDays.length - 1; i >= 0; i--) {
    const day = sortedDays[i];
    const dayDate = new Date(day.date);
    const diffTime = Math.abs(today.getTime() - dayDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (day.count > 0 && diffDays === currentStreak) {
      currentStreak++;
    } else if (diffDays > currentStreak) {
      break;
    }
  }

  return { longestStreak, currentStreak, bestDay };
}

function generateMilestones(stats: any, year: number): Milestone[] {
  const milestones: Milestone[] = [];
  const dateStr = `${year}-01-01`;

  // Contribution milestones
  if (stats.totalContributions >= 1000) {
    milestones.push({
      id: 'm1',
      title: '1K Contributions',
      description: `Achieved ${stats.totalContributions.toLocaleString()} total contributions in ${year}`,
      date: dateStr,
      icon: '🏆',
      achieved: true,
    });
  }

  if (stats.totalContributions >= 2500) {
    milestones.push({
      id: 'm2',
      title: '2.5K Contributions',
      description: `Amazing ${stats.totalContributions.toLocaleString()} contributions`,
      date: dateStr,
      icon: '⭐',
      achieved: true,
    });
  }

  if (stats.totalStarsEarned >= 100) {
    milestones.push({
      id: 'm3',
      title: '100 Stars',
      description: `Your repositories earned ${stats.totalStarsEarned} stars`,
      date: dateStr,
      icon: '💫',
      achieved: true,
    });
  }

  if (stats.longestStreak >= 30) {
    milestones.push({
      id: 'm4',
      title: '30-Day Streak',
      description: `Maintained a ${stats.longestStreak}-day contribution streak`,
      date: dateStr,
      icon: '🔥',
      achieved: true,
    });
  }

  if (stats.repositoriesCount >= 10) {
    milestones.push({
      id: 'm5',
      title: '10 Repositories',
      description: `Created or maintained ${stats.repositoriesCount} repositories`,
      date: dateStr,
      icon: '📦',
      achieved: true,
    });
  }

  return milestones;
}

function generateBadges(stats: any): Badge[] {
  const badges: Badge[] = [];

  // Contribution badges
  const contributionBadges = [
    { threshold: 100, name: 'Contributor', icon: '🌱', desc: '100 contributions' },
    { threshold: 500, name: 'Active Contributor', icon: '🌿', desc: '500 contributions' },
    { threshold: 1000, name: 'Super Contributor', icon: '🌳', desc: '1K contributions' },
    { threshold: 2500, name: 'Elite Contributor', icon: '🌲', desc: '2.5K contributions' },
  ];

  contributionBadges.forEach((badge, idx) => {
    const progress = Math.min(100, (stats.totalContributions / badge.threshold) * 100);
    badges.push({
      id: `cb${idx}`,
      name: badge.name,
      description: badge.desc,
      icon: badge.icon,
      unlocked: stats.totalContributions >= badge.threshold,
      progress,
      maxProgress: badge.threshold,
    });
  });

  // Streak badges
  const streakBadges = [
    { threshold: 7, name: 'Week Warrior', icon: '🔥', desc: '7-day streak' },
    { threshold: 30, name: 'Month Master', icon: '⚡', desc: '30-day streak' },
    { threshold: 100, name: 'Century Streak', icon: '💎', desc: '100-day streak' },
  ];

  streakBadges.forEach((badge, idx) => {
    const progress = Math.min(100, (stats.longestStreak / badge.threshold) * 100);
    badges.push({
      id: `sb${idx}`,
      name: badge.name,
      description: badge.desc,
      icon: badge.icon,
      unlocked: stats.longestStreak >= badge.threshold,
      progress,
      maxProgress: badge.threshold,
    });
  });

  // Star badges
  const starBadges = [
    { threshold: 10, name: 'Rising Star', icon: '⭐', desc: '10 stars earned' },
    { threshold: 50, name: 'Star Collector', icon: '🌟', desc: '50 stars earned' },
    { threshold: 100, name: 'Star Champion', icon: '💫', desc: '100 stars earned' },
    { threshold: 500, name: 'Star Legend', icon: '✨', desc: '500 stars earned' },
  ];

  starBadges.forEach((badge, idx) => {
    const progress = Math.min(100, (stats.totalStarsEarned / badge.threshold) * 100);
    badges.push({
      id: `stb${idx}`,
      name: badge.name,
      description: badge.desc,
      icon: badge.icon,
      unlocked: stats.totalStarsEarned >= badge.threshold,
      progress,
      maxProgress: badge.threshold,
    });
  });

  // PR badges
  const prBadges = [
    { threshold: 10, name: 'PR Starter', icon: '🔀', desc: '10 PRs' },
    { threshold: 50, name: 'PR Expert', icon: '🔄', desc: '50 PRs' },
    { threshold: 100, name: 'PR Master', icon: '🔧', desc: '100 PRs' },
  ];

  prBadges.forEach((badge, idx) => {
    const progress = Math.min(100, (stats.totalPullRequests / badge.threshold) * 100);
    badges.push({
      id: `prb${idx}`,
      name: badge.name,
      description: badge.desc,
      icon: badge.icon,
      unlocked: stats.totalPullRequests >= badge.threshold,
      progress,
      maxProgress: badge.threshold,
    });
  });

  // Language diversity badge
  badges.push({
    id: 'lb1',
    name: 'Polyglot',
    description: 'Used 5+ programming languages',
    icon: '🌐',
    unlocked: stats.languagesCount >= 5,
    progress: Math.min(100, (stats.languagesCount / 5) * 100),
    maxProgress: 5,
  });

  // Review badge
  badges.push({
    id: 'rvb1',
    name: 'Code Reviewer',
    description: 'Reviewed 100+ PRs',
    icon: '👀',
    unlocked: stats.totalReviews >= 100,
    progress: Math.min(100, (stats.totalReviews / 100) * 100),
    maxProgress: 100,
  });

  return badges;
}
