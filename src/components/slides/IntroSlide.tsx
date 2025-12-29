"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";

interface Props {
  data: WrappedData;
}

export default function IntroSlide({ data }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 md:mb-8"
        >
          <img
            src={data.user.avatarUrl}
            alt={data.user.name}
            className="w-28 h-28 md:w-40 md:h-40 rounded-full mx-auto border-4 border-purple-500/50 shadow-2xl"
            crossOrigin="anonymous"
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight"
        >
          {data.user.name || data.user.login}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-400 mb-4 md:mb-6"
        >
          @{data.user.login}
        </motion.p>

        {data.user.bio && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4"
          >
            {data.user.bio}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 text-base md:text-lg"
        >
          {data.user.company && (
            <span className="flex items-center gap-2 text-gray-300">
              <span>🏢</span> <span className="truncate">{data.user.company}</span>
            </span>
          )}
          {data.user.location && (
            <span className="flex items-center gap-2 text-gray-300">
              <span>📍</span> <span className="truncate">{data.user.location}</span>
            </span>
          )}
          {data.user.followers && (
            <span className="flex items-center gap-2 text-gray-300">
              <span>👥</span> {data.user.followers} followers
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 md:mt-16"
        >
          <div className="inline-block px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/30">
            <p className="text-lg md:text-xl text-gray-300">Your {data.year} in Code</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
