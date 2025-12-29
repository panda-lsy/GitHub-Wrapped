"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Sparkles, Heart, ArrowRight } from "lucide-react";

interface Props {
  data: WrappedData;
}

export default function SummarySlide({ data }: Props) {
  return (
    <div className="w-full max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-block p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
            <Sparkles className="w-16 h-16 text-purple-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          Thank You, {data.user.name || data.user.login}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
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
          className="grid grid-cols-3 gap-6 mb-12"
        >
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/30">
            <p className="text-4xl font-bold text-white mb-2">{data.stats.totalContributions.toLocaleString()}</p>
            <p className="text-gray-400">Contributions</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/30">
            <p className="text-4xl font-bold text-white mb-2">{data.totalStarsEarned.toLocaleString()}</p>
            <p className="text-gray-400">Stars Earned</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30">
            <p className="text-4xl font-bold text-white mb-2">{data.topLanguages.length}</p>
            <p className="text-gray-400">Languages</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 text-gray-400">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Made with love for the developer community</span>
          </div>

          <motion.a
            href="https://github.com/Freakz3z/GitHub-Wrapped"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            Star the Project on GitHub
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          <div className="flex justify-center gap-6 mt-8 text-sm text-gray-500">
            <span>Share your Wrapped with</span>
            <span className="text-purple-400 font-semibold">#GitHubWrapped</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
