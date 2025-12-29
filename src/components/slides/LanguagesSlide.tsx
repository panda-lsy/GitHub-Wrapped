"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import LanguageChart from "../LanguageChart";
import { Code2, Globe } from "lucide-react";
import "@/app/custom-scrollbar.css";

interface Props {
  data: WrappedData;
}

export default function LanguagesSlide({ data }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-6xl h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 md:mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3 md:mb-4">
            <Code2 className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Your Programming Languages
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 mt-2"
          >
            Top {data.topLanguages.length} languages in {data.year}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 flex-1 overflow-y-auto pb-20 custom-scrollbar" data-scrollable="true">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-blue-500/30 hover:border-blue-500/50 transition-all shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              <h3 className="text-xl md:text-2xl font-bold text-white">Distribution</h3>
            </div>
            <LanguageChart data={data.topLanguages} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            {data.topLanguages.slice(0, 6).map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="p-4 md:p-5 bg-gradient-to-r from-gray-800/60 to-gray-700/40 rounded-xl border border-gray-600/30 hover:border-blue-500/50 transition-all shadow-md hover:shadow-blue-500/10"
              >
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div
                      className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-base md:text-lg font-semibold text-white truncate">{lang.name}</span>
                  </div>
                  <span className="text-base md:text-xl font-bold text-white flex-shrink-0 ml-2">{lang.percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2 md:h-3 overflow-hidden">
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
    </div>
  );
}
