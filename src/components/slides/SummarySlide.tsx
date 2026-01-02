"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";

interface Props {
  data: WrappedData;
}

export default function SummarySlide({ data }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight"
        >
          {data.year} Wrapped!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4"
        >
          Thank you for being part of the GitHub community. Keep coding, keep learning, and keep building amazing things!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16 w-full max-w-4xl px-4"
        >
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-4 md:p-6">
            <p className="text-2xl md:text-4xl font-bold text-purple-400 mb-1 md:mb-2">
              {data.contributions.totalContributions}
            </p>
            <p className="text-sm md:text-base text-gray-400">Contributions</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-4 md:p-6">
            <p className="text-2xl md:text-4xl font-bold text-blue-400 mb-1 md:mb-2">
              {data.repositories.length}
            </p>
            <p className="text-sm md:text-base text-gray-400">Repositories</p>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-green-500/30 p-4 md:p-6">
            <p className="text-2xl md:text-4xl font-bold text-green-400 mb-1 md:mb-2">
              {data.languages.length}
            </p>
            <p className="text-sm md:text-base text-gray-400">Languages</p>
          </div>

          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-4 md:p-6">
            <p className="text-2xl md:text-4xl font-bold text-orange-400 mb-1 md:mb-2">
              {data.badges.length}
            </p>
            <p className="text-sm md:text-base text-gray-400">Badges</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="text-6xl md:text-8xl"
          >
            ⭐
          </motion.div>
          <p className="text-lg md:text-xl text-gray-400">
            See you in {data.year + 1}! 🚀
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
