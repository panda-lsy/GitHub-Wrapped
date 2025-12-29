"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import WrappedSlideShow from "@/components/WrappedSlideShow";
import { WrappedData } from "@/types";
import { fetchGitHubData } from "@/lib/github";

export default function Home() {
  const { data: session } = useSession();
  const [data, setData] = useState<WrappedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (accessToken?: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const token = accessToken || (session as any)?.accessToken;
      
      console.log("Loading data with token:", token ? "Token found" : "No token");
      console.log("Session:", session);

      if (!token) {
        setError("No access token. Please sign in with GitHub.");
        setIsLoading(false);
        return;
      }

      const githubData = await fetchGitHubData(token);
      setData(githubData);
      setIsLoading(false);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(`Failed to load GitHub data: ${err instanceof Error ? err.message : 'Unknown error'}. Please try signing in again.`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      // @ts-ignore
      const accessToken = (session as any).accessToken;
      if (accessToken) {
        loadData(accessToken);
      } else {
        setError("No access token in session. Please sign in again.");
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const handleShare = (platform: string) => {
    if (!data) return;

    const text = `🎁 Check out my GitHub ${data.year} Wrapped!\n\n` +
                `📊 ${data.stats.totalContributions.toLocaleString()} contributions\n` +
                `⭐ ${data.totalStarsEarned.toLocaleString()} stars earned\n` +
                `🔥 ${data.stats.longestStreak || 0} day longest streak\n\n` +
                `#GitHubWrapped`;
    
    const url = "https://githubwrapped-delta.vercel.app";
    
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
            onClick={() => signOut()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            Sign In with GitHub
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
        onDownload={handleDownload}
      />
    );
  }

  return null;
}
