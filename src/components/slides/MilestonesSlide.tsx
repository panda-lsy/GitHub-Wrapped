"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Calendar, Trophy } from "lucide-react";
import "@/app/custom-scrollbar.css";

interface Props {
  data: WrappedData;
}

export default function MilestonesSlide({ data }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-5xl h-full flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
        >
          Key Milestones
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-base md:text-xl text-gray-400 mb-6 md:mb-12"
        >
          Celebrate your achievements in {data.year}
        </motion.p>

        {data.milestones.length > 0 ? (
          <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto pb-20 custom-scrollbar max-w-4xl mx-auto w-full" data-scrollable="true">
            {data.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-3 md:p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-lg md:rounded-xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <span className="text-xl md:text-2xl">{milestone.icon}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base md:text-xl font-bold text-white mb-1">{milestone.title}</h3>
                    <p className="text-xs md:text-sm text-gray-300 line-clamp-2">{milestone.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm font-semibold">{data.year}</span>
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
            className="text-center py-12 md:py-20"
          >
            <Trophy className="w-16 h-16 md:w-24 md:h-24 text-gray-600 mx-auto mb-4 md:mb-6" />
            <p className="text-xl md:text-2xl text-gray-400 mb-3 md:mb-4">Keep contributing!</p>
            <p className="text-sm md:text-base text-gray-500">
              You're on your way to achieving great milestones. More activity will unlock achievements here.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
