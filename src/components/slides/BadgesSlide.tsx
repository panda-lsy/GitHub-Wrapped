"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Lock, Unlock, Trophy, Target } from "lucide-react";
import "@/app/custom-scrollbar.css";

interface Props {
  data: WrappedData;
}

export default function BadgesSlide({ data }: Props) {
  const unlockedBadges = data.badges.filter(b => b.unlocked);
  const lockedBadges = data.badges.filter(b => !b.unlocked);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-6xl mx-auto max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden pb-20 custom-scrollbar" data-scrollable="true">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 md:mb-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3 md:mb-4">
            <Trophy className="w-7 h-7 md:w-9 md:h-9 text-purple-400" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Achievement Badges
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 mt-2"
          >
            <span className="text-purple-400 font-bold">{unlockedBadges.length}</span> / {data.badges.length} Unlocked
          </motion.p>
        </motion.div>

        {/* Unlocked Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <h3 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center justify-center gap-2">
            <Unlock className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" /> Unlocked Badges
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {unlockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5, rotate: 2 }}
                className="p-4 md:p-5 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-yellow-500/50 cursor-pointer shadow-lg hover:shadow-yellow-500/20 transition-all"
              >
                <div className="text-3xl md:text-4xl mb-2 text-center">{badge.icon}</div>
                <h4 className="text-sm md:text-lg font-bold text-white text-center mb-1 truncate">{badge.name}</h4>
                <p className="text-xs md:text-sm text-gray-300 text-center line-clamp-2">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg md:text-2xl font-bold text-gray-400 mb-4 md:mb-6 flex items-center justify-center gap-2">
              <Target className="w-5 h-5 md:w-6 md:h-6" /> In Progress
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {lockedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="p-4 md:p-5 bg-gradient-to-br from-gray-700/30 to-gray-600/20 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-600/30"
                >
                  <div className="flex items-center justify-center mb-2">
                    <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mr-1" />
                    <span className="text-3xl md:text-4xl opacity-30 grayscale">{badge.icon}</span>
                  </div>
                  <h4 className="text-sm md:text-lg font-bold text-gray-400 text-center mb-1 truncate">{badge.name}</h4>
                  <p className="text-xs md:text-sm text-gray-500 text-center mb-2 line-clamp-2">{badge.description}</p>
                  {badge.progress !== undefined && badge.maxProgress && (
                    <div className="mt-2 md:mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.min(100, Math.round(badge.progress))}%</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, badge.progress)}%` }}
                          transition={{ delay: 0.8 + index * 0.05, duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
