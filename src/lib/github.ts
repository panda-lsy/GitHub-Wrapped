import { graphql } from "@octokit/graphql";
import { WrappedData, LanguageStat, Repository, ContributionDay } from "@/types";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

export async function fetchGitHubData(accessToken: string, year: number = new Date().getFullYear()): Promise<WrappedData> {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        login
        name
        avatarUrl
        url
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
          }
        }
      }
    }
  `;

  // First, get the user login
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
  
  // Process Contribution Calendar
  const calendarDays: ContributionDay[] = [];
  contributions.contributionCalendar.weeks.forEach((week: any) => {
    week.contributionDays.forEach((day: any) => {
      // Map color/count to level (0-4) approximation if needed, or just use count
      // react-activity-calendar uses count and level. We'll calculate level later or let the lib handle it.
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
    .slice(0, 5);

  // Process Top Repos
  const topRepos: Repository[] = user.repositories.nodes
    .slice(0, 5)
    .map((repo: any) => ({
      name: repo.name,
      url: repo.url,
      stargazerCount: repo.stargazerCount,
      primaryLanguage: repo.primaryLanguage,
      defaultBranchRef: null, // Simplified for now
    }));

  // Calculate Total Stars Earned
  const totalStarsEarned = user.repositories.nodes.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);

  return {
    user: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      url: user.url,
    },
    year,
    stats: {
      totalContributions: contributions.contributionCalendar.totalContributions,
      totalCommits: contributions.totalCommitContributions,
      totalPullRequests: contributions.totalPullRequestContributions,
      totalIssues: contributions.totalIssueContributions,
      totalReviews: contributions.totalPullRequestReviewContributions,
      contributionCalendar: calendarDays,
    },
    topLanguages,
    topRepos,
    totalStarsEarned,
    totalStarsGiven: user.starredRepositories.totalCount,
  };
}
