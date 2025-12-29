# GitHub Wrapped 🎁

**Your Year in Code, Beautifully Visualized.**

GitHub Wrapped is a personalized year-in-review for developers. It analyzes your GitHub activity over the past year and generates a stunning, shareable summary of your coding journey with an immersive slide-based experience.

[中文](README_zh.md) | [**🚀 Launch App**](https://githubwrapped-roan.vercel.app)

---

## ✨ Features

### 🎨 Immersive Experience
- **Smooth Slide Transitions**: Navigate through your year with beautiful animations using Framer Motion
- **Wheel Navigation**: Use your mouse wheel to seamlessly move between slides
- **Progress Indicator**: Track your journey with an elegant progress bar
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile devices
- **Modern UI**: Glass-morphism design with gradient backgrounds and custom scrollbars

### 📊 Comprehensive Analytics

#### Statistics Overview
- **Total Contributions**: All your commits, pull requests, issues, and reviews combined
- **Stars Earned**: Total stars across all your repositories
- **Pull Requests**: Track your PR contributions
- **Issues Opened**: See your impact through issue reports
- **Code Reviews**: Number of PRs you've reviewed
- **Longest Streak**: Your longest consecutive contribution days
- **Current Streak**: Your active contribution streak
- **Best Day**: Your most productive day with contribution count

### 🗓️ Monthly Journey
- **Monthly Activity Cards**: View your contributions organized by month
- **Activity Indicators**: Green pulsing dots for active months
- **Month Statistics**: 
  - Total contributions per month
  - Number of active days
  - Best streak within the month
  - Best single-day contributions
- **Inactive Months**: Gray cards for months with no activity
- **Yearly Streak Summary**: Longest streak, current streak, and best day

### 🏆 Achievement Badges
Unlock achievements and track your progress:

#### Contribution Badges
- 🥉 100 Contributions
- 🥈 500 Contributions  
- 🥇 1K Contributions
- 💎 2.5K Contributions

#### Streak Badges
- 🔥 7-Day Streak
- 🚀 30-Day Streak
- ⭐ 100-Day Streak

#### Star Badges
- ⭐ 10 Stars
- 🌟 50 Stars
- 💫 100 Stars
- 🏆 500 Stars

#### PR Badges
- 📝 10 Pull Requests
- 📋 50 Pull Requests
- ✅ 100 Pull Requests

#### Special Badges
- 🌍 Polyglot (5+ languages)
- 👀 Code Reviewer (100+ reviews)

#### Progress Tracking
- See your progress towards locked badges
- Track percentage completion
- Visual progress bars

### 🎯 Key Milestones
Celebrate your major achievements:
- 🎉 1K Contributions
- 🏆 2.5K Contributions
- ⭐ 100 Stars
- 🔥 30-Day Streak
- 📦 10 Repositories

### 🌍 Programming Languages
- Visual distribution of your top languages
- Percentage breakdown with animated progress bars
- Color-coded language indicators
- Track your language diversity

### 📦 Top Repositories
Your most starred and active repositories:
- Repository names and descriptions
- Primary language with color indicators
- Star counts, forks, and open issues
- Direct links to GitHub
- Compact, elegant card layout

### 🔄 Quick Actions
- **Refresh Data**: Update your wrapped with latest GitHub activity
- **Social Sharing**: Share directly to Twitter/X and LinkedIn
- **Download**: Save your wrapped as an image (coming soon)
- **Keyboard Support**: Use arrow keys for navigation

### 🔒 Privacy & Security
- **Read-Only Access**: Only requests permission to read public data
- **No Data Storage**: Your data is never stored on our servers
- **Secure Authentication**: Uses GitHub OAuth with NextAuth
- **Session Management**: Secure session handling with NextAuth

## 🚀 How to Use

1. **Connect**: Visit the [app](https://githubwrapped-roan.vercel.app) and sign in with your GitHub account
2. **Explore**: Navigate through interactive slides to discover your stats
   - Scroll with your mouse wheel to move between slides
   - Use arrow keys for keyboard navigation
   - Click on progress indicators to jump to specific slides
3. **Discover**: View your intro, stats, monthly journey, languages, repos, badges, and milestones
4. **Share**: Share your achievements on social platforms
   - Click Twitter or LinkedIn buttons for direct sharing
   - Use `#GitHubWrapped` to join the community
5. **Refresh**: Click the refresh button to update your data with recent activity

## 🎯 Slides Overview

1. **Intro Slide**: Personalized welcome with your GitHub profile, bio, and social stats
2. **Stats Slide**: 6 animated cards displaying your key metrics
3. **Heatmap Slide**: Monthly activity cards with detailed statistics and streak information
4. **Languages Slide**: Interactive language distribution with progress bars and charts
5. **Repos Slide**: Your top repositories in a compact, responsive grid layout
6. **Badges Slide**: Achievement badges with unlocked and progress states
7. **Milestones Slide**: Key achievements with icons and descriptions
8. **Summary Slide**: Thank you message with call-to-action

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

3. **Configure environment variables**:
   Create a `.env.local` file with the following:
   ```env
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   NEXTAUTH_SECRET=your_random_secret_string
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Tech Stack

- **Framework**: Next.js 16 with App Router and Turbopack
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js with GitHub OAuth
- **Data Fetching**: GitHub GraphQL API
- **Animations**: Framer Motion for smooth transitions
- **Charts & Visualizations**: 
  - Recharts for language distribution
  - react-activity-calendar for contribution data
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

### Areas for Contribution

- Add new badge types and achievements
- Create additional slide templates
- Improve UI/UX animations and transitions
- Add more social sharing platforms
- Implement image download feature
- Add more language support
- Enhance data visualization
- Optimize performance and loading times
- Improve mobile responsiveness

## 📄 License

This project is open source and available under the [Apache License 2.0](LICENSE).

## 📝 Recent Updates

### Latest Release

#### 🎨 UI/UX Enhancements
- Removed navigation buttons for cleaner interface (wheel-only navigation)
- Reduced card sizes for better space utilization
- Improved content centering on all slides
- Enhanced mobile responsiveness with optimized layouts

#### 🗓️ Heatmap Redesign
- Replaced traditional GitHub-style heatmap with monthly activity cards
- Added monthly streak and best-day statistics
- Visual indicators for active/inactive months
- More intuitive and data-rich presentation

#### 📦 Repositories Slide
- Compact three-column layout for better space usage
- Icons always visible, numbers shown only when > 0
- Optimized padding and spacing for mobile devices

#### 🎯 Milestones Slide
- Reduced card sizes for better content fit
- Centered content layout for visual balance
- Improved mobile experience

#### 🌐 All Slides
- Applied custom scrollbar styling across all components
- Ensured consistent mobile adaptation
- Enhanced hover effects and transitions
- Improved accessibility with better contrast and sizing

---

Made with ❤️ for the developer community. 

Share your Wrapped with **#GitHubWrapped**!
