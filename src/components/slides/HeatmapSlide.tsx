"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import ContributionHeatmap from "../ContributionHeatmap";

interface Props {
  data: WrappedData;
}

export default function HeatmapSlide({ data }: Props) {
  return (
    <div className="w-full max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Your Coding Journey
        </h2>
        <p className="text-xl text-gray-400">
          {data.stats.totalContributions.toLocaleString()} contributions across the year
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50"
      >
        <ContributionHeatmap 
          data={data.stats.contributionCalendar} 
          labels={{
            less: "Less",
            more: "More",
            totalCount: `${data.stats.totalContributions.toLocaleString()} contributions`,
          }}
          blockSize={16}
          blockMargin={5}
          fontSize={14}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid grid-cols-3 gap-4"
      >
        <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
          <p className="text-sm text-gray-400 mb-1">Longest Streak</p>
          <p className="text-3xl font-bold text-white">{data.stats.longestStreak || 0} days</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/30">
          <p className="text-sm text-gray-400 mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-white">{data.stats.currentStreak || 0} days</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/30">
          <p className="text-sm text-gray-400 mb-1">Best Day</p>
          <p className="text-3xl font-bold text-white">{data.stats.bestDay?.count || 0}</p>
        </div>
      </motion.div>
    </div>
  );
}
