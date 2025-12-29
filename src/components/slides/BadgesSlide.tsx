"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Lock, Unlock } from "lucide-react";

interface Props {
  data: WrappedData;
}

export default function BadgesSlide({ data }: Props) {
  const unlockedBadges = data.badges.filter(b => b.unlocked);
  const lockedBadges = data.badges.filter(b => !b.unlocked);

  return (
    <div className="w-full max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
      >
        Achievement Badges
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-xl text-gray-400 mb-12"
      >
        {unlockedBadges.length} / {data.badges.length} Unlocked
      </motion.p>

      {/* Unlocked Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-yellow-400">🏆</span> Unlocked Badges
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {unlockedBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-5 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/50 cursor-pointer"
            >
              <div className="text-4xl mb-2 text-center">{badge.icon}</div>
              <h4 className="text-lg font-bold text-white text-center mb-1">{badge.name}</h4>
              <p className="text-sm text-gray-300 text-center">{badge.description}</p>
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
          <h3 className="text-2xl font-bold text-gray-400 mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" /> Locked Badges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="p-5 bg-gradient-to-br from-gray-700/30 to-gray-600/20 backdrop-blur-sm rounded-2xl border border-gray-600/30"
              >
                <div className="text-4xl mb-2 text-center opacity-30 grayscale">{badge.icon}</div>
                <h4 className="text-lg font-bold text-gray-400 text-center mb-1">{badge.name}</h4>
                <p className="text-sm text-gray-500 text-center mb-2">{badge.description}</p>
                {badge.progress !== undefined && badge.maxProgress && (
                  <div className="mt-3">
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
  );
}
