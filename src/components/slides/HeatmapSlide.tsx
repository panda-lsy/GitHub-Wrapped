"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Flame, TrendingUp, Zap } from "lucide-react";
import "@/app/custom-scrollbar.css";

interface Props {
  data: WrappedData;
}

export default function HeatmapSlide({ data }: Props) {
  // Group contributions by month
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = data.year;
  
  const monthlyContributions = monthNames.map((_, monthIndex) => {
    const monthContributions = data.stats.contributionCalendar.filter((day) => {
      const date = new Date(day.date);
      return date.getFullYear() === year && date.getMonth() === monthIndex;
    });
    
    const totalContributions = monthContributions.reduce((sum, day) => sum + day.count, 0);
    const daysWithContributions = monthContributions.filter(day => day.count > 0).length;
    const maxContribution = Math.max(...monthContributions.map(day => day.count), 0);
    
    return {
      month: monthIndex,
      name: monthNames[monthIndex],
      totalContributions,
      daysWithContributions,
      maxContribution,
      contributions: monthContributions
    };
  });

  // Calculate streak information for each month
  const monthlyStreaks = monthlyContributions.map(month => {
    const contributions = month.contributions;
    let longestStreak = 0;
    let currentStreak = 0;
    let maxStreakStart = 0;
    
    contributions.forEach((day, index) => {
      if (day.count > 0) {
        currentStreak++;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
          maxStreakStart = index;
        }
      } else {
        currentStreak = 0;
      }
    });
    
    return {
      month: month.month,
      longestStreak,
      maxStreakStart
    };
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-4xl h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {monthlyContributions.map((month, index) => {
              const streakInfo = monthlyStreaks.find(s => s.month === month.month);
              const streak = streakInfo?.longestStreak || 0;
              const streakDays = streakInfo?.maxStreakStart || 0;
              
              return (
                <motion.div
                  key={month.month}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className={`group p-4 md:p-5 rounded-xl md:rounded-2xl border transition-all ${
                    month.totalContributions > 0
                      ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 hover:border-green-500/50 shadow-lg hover:shadow-green-500/20'
                      : 'bg-gray-800/30 border-gray-700/30 hover:border-gray-600/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base md:text-lg font-bold text-white">{month.name}</h3>
                    {month.totalContributions > 0 && (
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400 animate-pulse" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-400">Contributions</span>
                      <span className={`text-base md:text-lg font-bold ${month.totalContributions > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                        {month.totalContributions}
                      </span>
                    </div>
                    
                    {month.totalContributions > 0 && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-xs md:text-sm text-gray-400">Active Days</span>
                          <span className="text-sm md:text-base font-semibold text-white">{month.daysWithContributions}</span>
                        </div>
                        
                        {streak > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs md:text-sm text-gray-400">Best Streak</span>
                            <span className="text-sm md:text-base font-semibold text-orange-400">{streak}d</span>
                          </div>
                        )}
                        
                        {month.maxContribution > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs md:text-sm text-gray-400">Best Day</span>
                            <span className="text-sm md:text-base font-semibold text-yellow-400">{month.maxContribution}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  
                  {month.totalContributions === 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-700/50 text-center">
                      <p className="text-xs md:text-sm text-gray-500">No contributions</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
        >
          <motion.div
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
