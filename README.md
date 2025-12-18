# GitHub Wrapped 2025 🎁

Discover your coding year in review! GitHub Wrapped generates a beautiful, shareable summary of your GitHub activity for the past year.

[**View Live Demo**](https://github-wrapped.vercel.app)

## ✨ Features

- **📊 Comprehensive Stats**: See your total contributions, stars earned, PRs merged, and more.
- **📅 Contribution Heatmap**: A beautiful visualization of your daily coding activity.
- **🏆 Top Languages**: Find out which languages you dominated this year.
- **🖼️ Shareable Card**: Generate a sleek image to share on Twitter, LinkedIn, or Bluesky.
- **🔒 Privacy First**: We only request read-only access. Your data is processed locally and never stored on our servers.

## 🚀 How to Use

1. Visit the [website](https://github-wrapped.vercel.app).
2. Click **"Connect with GitHub"**.
3. View your personalized dashboard.
4. Click the **Download** button to get your wrapped image!

## 🛠️ Deploy Your Own

Want to host your own version? You can deploy this project to Vercel in minutes for free.

### Prerequisites
- A GitHub account.
- A Vercel account.

### Step-by-Step Guide

1. **Fork this repository** to your GitHub account.

2. **Create a GitHub OAuth App**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers).
   - Click **New OAuth App**.
   - **Application Name**: `My GitHub Wrapped`
   - **Homepage URL**: `https://<your-project-name>.vercel.app` (You'll get this after deployment, for now you can use a placeholder or update it later).
   - **Authorization callback URL**: `https://<your-project-name>.vercel.app/api/auth/callback/github`
   - Click **Register application**.
   - Copy the **Client ID** and generate a new **Client Secret**.

3. **Deploy to Vercel**:
   - Click the button below to start deployment:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fgithub-wrapped-app)

   - Vercel will ask for Environment Variables. Enter the ones you got from GitHub:
     - `GITHUB_ID`: Your Client ID.
     - `GITHUB_SECRET`: Your Client Secret.
     - `NEXTAUTH_SECRET`: Generate a random string (e.g. `openssl rand -base64 32` or just a long random password).
     - `NEXTAUTH_URL`: Your Vercel URL (e.g., `https://your-project.vercel.app`).

4. **Finalize Configuration**:
   - Once deployed, Vercel will give you a domain (e.g., `project-name.vercel.app`).
   - Go back to your **GitHub OAuth App settings** and update the **Homepage URL** and **Authorization callback URL** with your actual Vercel domain.

## 💻 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/github-wrapped-app.git
   cd github-wrapped-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Copy `.env.local.example` to `.env.local`.
   - Fill in the `GITHUB_ID` and `GITHUB_SECRET` from your new OAuth App (set callback URL to `http://localhost:3000/api/auth/callback/github`).
   - Generate a random string for `NEXTAUTH_SECRET`.

4. **Run the application**:
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000** in your browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js
- **Data**: GitHub GraphQL API
- **Charts**: Recharts, React Activity Calendar
- **Image Gen**: html2canvas

