# GitHub Wrapped 🎁

**Your Year in Code, Visualized.**

GitHub Wrapped is a personalized year-in-review for developers. It analyzes your GitHub activity over the past year and generates a beautiful, shareable summary of your coding journey with an immersive slide-based experience.

[中文](README_zh.md) | [**🚀 Launch App**](https://githubwrapped-delta.vercel.app)

---

## ✨ Features

### 🎨 Immersive Experience
- **Interactive Slide Show**: Navigate through your year with smooth animations and transitions
- **Keyboard Support**: Use arrow keys to navigate between slides
- **Progress Indicator**: Track your journey through the slides

### 📊 Comprehensive Analytics
- **Total Contributions**: Commits, pull requests, issues, and reviews combined
- **Stars Earned**: Total stars across all your repositories
- **Pull Requests**: Track your PR contributions
- **Issues Opened**: See your impact through issue reports
- **Code Reviews**: Number of PRs you've reviewed
- **Longest Streak**: Your longest consecutive contribution days
- **Current Streak**: Your active contribution streak
- **Best Day**: Your most productive day with contribution count

### 🗓️ Contribution Heatmap
- Visualize your daily coding intensity with a stunning heatmap
- See streaks and patterns in your contribution history
- Interactive calendar view with contribution levels

### 🏆 Achievement Badges
- **Contribution Badges**: Unlock badges based on total contributions (100, 500, 1K, 2.5K)
- **Streak Badges**: Earn badges for maintaining streaks (7, 30, 100 days)
- **Star Badges**: Collect badges for stars earned (10, 50, 100, 500)
- **PR Badges**: Recognition for pull requests (10, 50, 100)
- **Special Badges**: Polyglot (5+ languages), Code Reviewer (100+ reviews)
- **Progress Tracking**: See your progress towards locked badges

### 🎯 Key Milestones
- **1K Contributions**: Celebrate reaching 1,000 contributions
- **2.5K Contributions**: Elite contributor achievement
- **100 Stars**: Recognition for repository popularity
- **30-Day Streak**: Commitment to consistent coding
- **10 Repositories**: Active repository creator

### 🌍 Top Languages
- Visual distribution of your programming languages
- Percentage breakdown by language
- Color-coded language indicators
- Track your language diversity

### 📦 Top Repositories
- Your most starred repositories
- Repository descriptions
- Primary language for each repo
- Star counts and fork information
- Open issues tracking

### 🔄 Quick Actions
- **Refresh Data**: Update your wrapped with the latest GitHub activity
- **Social Sharing**: Share directly to Twitter/X and LinkedIn
- **Download**: Save your wrapped as an image (coming soon)
- **Multi-language Support**: Switch between English and Chinese

### 🔒 Privacy First
- **Read-Only Access**: Only requests permission to read public data
- **No Data Storage**: Your data is never stored on our servers
- **Secure Authentication**: Uses GitHub OAuth with NextAuth

## 🚀 How to Use

1. **Connect**: Visit the [app](https://githubwrapped-delta.vercel.app) and sign in with your GitHub account
2. **Explore**: Navigate through interactive slides to discover your stats
   - Use left/right arrow keys or click navigation buttons
   - View your intro, stats, heatmap, languages, repos, badges, and milestones
3. **Share**: Share your achievements on social platforms
   - Click Twitter or LinkedIn buttons for direct sharing
   - Use `#GitHubWrapped` to join the community
4. **Refresh**: Click the refresh button to update your data with recent activity

## 🎯 Slides Overview

1. **Intro Slide**: Personal welcome with user profile and bio
2. **Stats Slide**: Key metrics and impact numbers
3. **Heatmap Slide**: Visual contribution calendar with streaks
4. **Languages Slide**: Programming language distribution
5. **Repos Slide**: Top repositories with details
6. **Badges Slide**: Achievement badges (unlocked & locked)
7. **Milestones Slide**: Key achievements and milestones
8. **Summary Slide**: Thank you and call to action

## 🛠️ For Developers: Deploy Your Own

Want to host your own version or contribute?

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FFreakz3z%2FGitHub-Wrapped)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Freakz3z/GitHub-Wrapped.git
   cd GitHub-Wrapped
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file with the following:
   ```env
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   NEXTAUTH_SECRET=your_random_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the app**:
   ```bash
   npm run dev
   ```

### Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19, Tailwind CSS 4
- **Authentication**: NextAuth with GitHub OAuth
- **Data**: GitHub GraphQL API
- **Animations**: Framer Motion
- **Charts**: Recharts, react-activity-calendar
- **Icons**: Lucide React

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

### Areas for Contribution

- Add new badge types and achievements
- Create additional slide templates
- Improve UI/UX animations
- Add more social sharing platforms
- Implement image download feature
- Add more language support
- Enhance data visualization

## 📄 License

This project is open source and available under the Apache License 2.0.

## 📝 Changelog

### Version 2.0.0 - Major Update

#### 🎨 UI/UX Improvements
- Completely redesigned interface with immersive slide-based experience
- Added smooth animations and transitions using Framer Motion
- Implemented modern glass-morphism design with gradient backgrounds
- Enhanced responsive layout for all screen sizes

#### 📑 New Slide System
- **Intro Slide**: Personalized welcome with user profile and bio
- **Stats Slide**: 6 key metrics with animated cards
- **Heatmap Slide**: Visual contribution calendar with streak stats
- **Languages Slide**: Interactive language distribution with progress bars
- **Repos Slide**: Detailed top repositories with hover effects
- **Badges Slide**: Achievement system with locked/unlocked states
- **Milestones Slide**: Key achievements celebration
- **Summary Slide**: Thank you and call to action

#### 🏆 Achievement System
- Contribution Badges (100, 500, 1K, 2.5K contributions)
- Streak Badges (7, 30, 100 day streaks)
- Star Badges (10, 50, 100, 500 stars earned)
- PR Badges (10, 50, 100 pull requests)
- Special Badges (Polyglot, Code Reviewer)
- Progress tracking for locked badges

#### 🎯 Milestones Feature
- 1K Contributions achievement
- 2.5K Contributions achievement
- 100 Stars achievement
- 30-Day Streak achievement
- 10 Repositories achievement

#### 🔄 Enhanced Features
- Refresh functionality to update data with latest GitHub activity
- Direct social sharing to Twitter/X and LinkedIn
- Keyboard navigation (arrow keys) support
- Progress indicator and slide counter
- Loading animations and error handling

#### 📊 Additional Data
- User bio, company, location, and followers count
- Longest and current contribution streaks
- Best day with contribution count
- Code review statistics
- Repository forks and open issues count
- Extended top repositories and languages (up to 8)

#### 🛠️ Technical Improvements
- Added session API route for client-side data fetching
- Improved TypeScript types for new features
- Enhanced data fetching with additional GraphQL fields
- Optimized component structure with slide separation
- Added index file for better module resolution

---

Made with ❤️ for the developer community. Share your Wrapped with `#GitHubWrapped`!
