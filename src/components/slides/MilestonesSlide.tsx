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
          <div className="space-y-4 md:space-y-6 flex-1 overflow-y-auto pb-20 custom-scrollbar" data-scrollable="true">
            {data.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 md:p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl md:text-4xl">{milestone.icon}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{milestone.title}</h3>
                    <p className="text-xs md:text-base text-gray-300 line-clamp-2 md:line-clamp-none">{milestone.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-right md:order-last order-2">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5" />
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
