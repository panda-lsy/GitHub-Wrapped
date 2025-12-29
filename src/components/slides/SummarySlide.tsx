"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Sparkles, Heart, ArrowRight } from "lucide-react";

interface Props {
  data: WrappedData;
}

export default function SummarySlide({ data }: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 md:mb-8"
        >
          <div className="inline-block p-4 md:p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-purple-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight"
        >
          Thank You, {data.user.name || data.user.login}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto px-4"
        >
          Your {data.year} was incredible. With{" "}
          <span className="font-bold text-purple-400">{data.stats.totalContributions.toLocaleString()}</span>{" "}
          contributions, you've made a lasting impact on the open-source community.
        </motion.p>

        {/* Quick Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 w-full max-w-3xl"
        >
          <div className="p-4 md:p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/30">
            <p className="text-3xl md:text-4xl font-bold text-white mb-2">{data.stats.totalContributions.toLocaleString()}</p>
            <p className="text-sm md:text-base text-gray-400">Contributions</p>
          </div>
          <div className="p-4 md:p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/30">
            <p className="text-3xl md:text-4xl font-bold text-white mb-2">{data.totalStarsEarned.toLocaleString()}</p>
            <p className="text-sm md:text-base text-gray-400">Stars Earned</p>
          </div>
          <div className="p-4 md:p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30">
            <p className="text-3xl md:text-4xl font-bold text-white mb-2">{data.topLanguages.length}</p>
            <p className="text-sm md:text-base text-gray-400">Languages</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4 md:space-y-6 w-full max-w-md"
        >
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm md:text-base">
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
            <span>Made with love for the developer community</span>
          </div>

          <motion.a
            href="https://github.com/Freakz3z/GitHub-Wrapped"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm md:text-base rounded-full font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            Star the Project on GitHub
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.a>

          <div className="flex flex-wrap justify-center gap-2 md:gap-6 text-xs md:text-sm text-gray-500">
            <span>Share your Wrapped with</span>
            <span className="text-purple-400 font-semibold">#GitHubWrapped</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
