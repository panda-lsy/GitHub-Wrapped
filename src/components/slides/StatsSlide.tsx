"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { GitCommit, Star, GitPullRequest, Eye, Flame, Calendar } from "lucide-react";

interface Props {
  data: WrappedData;
}

export default function StatsSlide({ data }: Props) {
  const stats = [
    {
      value: data.stats.totalContributions.toLocaleString(),
      label: "Total Contributions",
      icon: GitCommit,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      value: data.totalStarsEarned.toLocaleString(),
      label: "Stars Earned",
      icon: Star,
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
    {
      value: data.stats.totalPullRequests.toLocaleString(),
      label: "Pull Requests",
      icon: GitPullRequest,
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      value: data.stats.totalIssues.toLocaleString(),
      label: "Issues Opened",
      icon: Eye,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      value: data.stats.longestStreak?.toLocaleString() || "0",
      label: "Longest Streak",
      icon: Flame,
      color: "from-red-400 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
    },
    {
      value: data.stats.totalReviews.toLocaleString(),
      label: "Code Reviews",
      icon: Eye,
      color: "from-indigo-400 to-violet-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          Your Impact in Numbers
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 md:p-6 rounded-xl md:rounded-2xl ${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} hover:border-opacity-50 transition-all cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">{data.year}</span>
              </div>
              <p className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">{stat.value}</p>
              <p className="text-gray-300 text-xs md:text-sm truncate">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {data.stats.bestDay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl md:rounded-2xl border border-blue-500/30"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-2 md:p-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg md:rounded-xl">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-400">Best Day</p>
                <p className="text-sm md:text-xl font-bold text-white">
                  {new Date(data.stats.bestDay.date).toLocaleDateString("en-US", { month: "long", day: "numeric" })} with {data.stats.bestDay.count} contributions
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
