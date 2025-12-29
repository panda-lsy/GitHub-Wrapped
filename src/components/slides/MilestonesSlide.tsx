"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Calendar, Trophy } from "lucide-react";

interface Props {
  data: WrappedData;
}

export default function MilestonesSlide({ data }: Props) {
  return (
    <div className="w-full max-w-5xl">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
      >
        Key Milestones
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-xl text-gray-400 mb-12"
      >
        Celebrate your achievements in {data.year}
      </motion.p>

      {data.milestones.length > 0 ? (
        <div className="space-y-6">
          {data.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-4xl">{milestone.icon}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-semibold">{data.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-20"
        >
          <Trophy className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <p className="text-2xl text-gray-400 mb-4">Keep contributing!</p>
          <p className="text-gray-500">
            You're on your way to achieving great milestones. More activity will unlock achievements here.
          </p>
        </motion.div>
      )}
    </div>
  );
}
