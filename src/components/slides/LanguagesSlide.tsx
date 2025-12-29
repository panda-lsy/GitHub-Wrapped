"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import LanguageChart from "../LanguageChart";

interface Props {
  data: WrappedData;
}

export default function LanguagesSlide({ data }: Props) {
  return (
    <div className="w-full max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Your Programming Languages
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Distribution</h3>
          <LanguageChart data={data.topLanguages} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {data.topLanguages.slice(0, 6).map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-5 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-lg font-semibold text-white">{lang.name}</span>
                </div>
                <span className="text-xl font-bold text-white">{lang.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
