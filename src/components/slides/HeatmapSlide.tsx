"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import ContributionHeatmap from "../ContributionHeatmap";
import { Flame, TrendingUp, Zap } from "lucide-react";
import "@/app/custom-scrollbar.css";

interface Props {
  data: WrappedData;
}

export default function HeatmapSlide({ data }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-6xl h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 md:mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Your Coding Journey
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-400"
          >
            <span className="text-green-400 font-bold">{data.stats.totalContributions.toLocaleString()}</span> contributions in {data.year}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 overflow-y-auto pb-24 custom-scrollbar" data-scrollable="true"
        >
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-gray-700/50 shadow-2xl">
            <ContributionHeatmap 
              data={data.stats.contributionCalendar} 
              labels={{
                less: "Less",
                more: "More",
                totalCount: `${data.stats.totalContributions.toLocaleString()} contributions in ${data.year}`,
              }}
              blockSize={10}
              blockMargin={2}
              fontSize={11}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="group p-4 md:p-5 bg-gradient-to-br from-green-500/15 to-emerald-500/10 rounded-xl md:rounded-2xl border border-green-500/30 hover:border-green-500/50 transition-all shadow-lg hover:shadow-green-500/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              <p className="text-xs md:text-sm text-gray-400">Longest Streak</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white group-hover:text-green-300 transition-colors">
              {data.stats.longestStreak || 0}
              <span className="text-base md:text-lg font-normal text-gray-400 ml-1">days</span>
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="group p-4 md:p-5 bg-gradient-to-br from-orange-500/15 to-red-500/10 rounded-xl md:rounded-2xl border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg hover:shadow-orange-500/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
              <p className="text-xs md:text-sm text-gray-400">Current Streak</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white group-hover:text-orange-300 transition-colors">
              {data.stats.currentStreak || 0}
              <span className="text-base md:text-lg font-normal text-gray-400 ml-1">days</span>
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="group p-4 md:p-5 bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-xl md:rounded-2xl border border-blue-500/30 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              <p className="text-xs md:text-sm text-gray-400">Best Day</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {data.stats.bestDay?.count || 0}
              <span className="text-base md:text-lg font-normal text-gray-400 ml-1">contribs</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
