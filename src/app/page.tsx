"use client";

import { useState, useEffect } from "react";
import WrappedSlideShow from "@/components/WrappedSlideShow";
import LandingPage from "@/components/LandingPage";
import { WrappedData } from "@/types";
import { fetchGitHubData } from "@/lib/github";

export default function Home() {
  const [data, setData] = useState<WrappedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWrapped, setShowWrapped] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [selectedYear, setSelectedYear] = useState(() => {
    const now = new Date();
    return now.getMonth() < 2 ? now.getFullYear() - 1 : now.getFullYear();
  });

  useEffect(() => {
    setHasToken(!!localStorage.getItem('github_token'));
  }, []);

  const loadData = async (accessToken: string, year?: number) => {
    try {
      setError(null);
      setIsLoading(true);
      console.log("Starting data load...");

      const targetYear = year || selectedYear;
      console.log(`Fetching GitHub data for ${targetYear} with token...`);
      const githubData = await fetchGitHubData(accessToken, targetYear);
      setData(githubData);
      setIsLoading(false);
      setShowWrapped(true);
      console.log("Data loaded successfully!");
    } catch (err) {
      console.error("Error loading data:", err);
      setError(`Failed to load GitHub data: ${err instanceof Error ? err.message : 'Unknown error'}. Please check your token and try again.`);
      setIsLoading(false);
    }
  };

  const handleTokenSubmit = (token: string) => {
    localStorage.setItem('github_token', token);
    setHasToken(true);
    loadData(token, selectedYear);
  };

  const handleRefresh = async () => {
    const token = localStorage.getItem('github_token');
    if (token) {
      setIsRefreshing(true);
      await loadData(token, selectedYear);
      setIsRefreshing(false);
    } else {
      setError("No GitHub token found. Please enter your token again.");
    }
  };

  const handleShare = (platform: string) => {
    if (!data) return;

    const text = `🎁 Check out my GitHub ${data.year} Wrapped!\n\n` +
                `📊 ${data.stats.totalContributions.toLocaleString()} contributions\n` +
                `⭐ ${data.totalStarsEarned.toLocaleString()} stars earned\n` +
                `🔥 ${data.stats.longestStreak || 0} day longest streak\n\n` +
                `#GitHubWrapped`;

    const url = window.location.origin;

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleDownload = () => {
    if (!data) return;
    alert("Download feature coming soon! Use browser screenshot to save.");
  };

  if (!showWrapped) {
    return (
      <LandingPage
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        onTokenSubmit={handleTokenSubmit}
        isLoggedIn={hasToken}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-xl text-gray-300">Loading your GitHub Wrapped...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => {
              setShowWrapped(false);
              setError(null);
            }}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <WrappedSlideShow
        data={data}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onShare={handleShare}
        onDownload={() => {}}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />
    );
  }

  return null;
}
