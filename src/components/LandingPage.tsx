"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import TokenInput from "@/components/TokenInput";

interface Props {
  selectedYear: number;
  onYearChange: (year: number) => void;
  onTokenSubmit?: (token: string) => void;
  isLoggedIn?: boolean;
}

export default function LandingPage({ selectedYear, onYearChange, onTokenSubmit, isLoggedIn }: Props) {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12 md:p-24 text-center relative overflow-hidden">
      {/* Enhanced Background Gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl px-3 py-1.5">
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Year</span>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer"
          >
            {years.map((year) => (
              <option key={year} value={year} className="bg-gray-800 text-white">
                {year}
              </option>
            ))}
          </select>
        </div>
        <LanguageSwitcher />
      </div>

      <div className="z-10 flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full blur-xl animate-pulse" />
            <div className="relative z-10 p-6 bg-gradient-to-br from-gray-800/80 to-gray-700/80 rounded-full border-2 border-purple-500/50 shadow-2xl">
              <Github className="w-20 h-20 md:w-28 md:h-28 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r via-purple-500 to-pink-500 via-red-500 bg-clip-text text-transparent"
        >
          {t.home.title}
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed"
        >
          {t.home.subtitle}
        </motion.p>

        {/* Animated Token Input / Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isLoggedIn ? (
            <button
              onClick={() => {
                const token = localStorage.getItem('github_token');
                if (token && onTokenSubmit) {
                  onTokenSubmit(token);
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-xl shadow-purple-500/20"
            >
              {t.home.enter}
            </button>
          ) : (
            <TokenInput onTokenSubmit={onTokenSubmit || (() => {})} />
          )}
        </motion.div>

        {/* Enhanced Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-gradient-to-br from-gray-800/60 to-gray-700/40 rounded-2xl border border-gray-600/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-xl">
                <div className="text-2xl md:text-3xl">📊</div>
              </div>
              <h3 className="text-lg font-bold text-blue-400">{t.home.features.visualize.title}</h3>
            </div>
            <p className="text-gray-400 text-sm">{t.home.features.visualize.desc}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-2xl border border-gray-600/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-400/10 rounded-xl">
                <div className="text-2xl md:text-3xl">🎨</div>
              </div>
              <h3 className="text-lg font-bold text-purple-400">{t.home.features.share.title}</h3>
            </div>
            <p className="text-gray-400 text-sm">{t.home.features.share.desc}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-400/10 rounded-2xl border border-gray-600/50 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-400/10 rounded-xl">
                <div className="text-2xl md:text-3xl">🏆</div>
              </div>
              <h3 className="text-lg font-bold text-green-400">{t.home.features.insights.title}</h3>
            </div>
            <p className="text-gray-400 text-sm">{t.home.features.insights.desc}</p>
          </motion.div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          <div className="p-4 bg-gradient-to-br from-gray-800/40 to-gray-700/30 rounded-xl border border-gray-600/30">
            <div className="text-3xl mb-1">🎯</div>
            <p className="text-sm text-gray-300">8 Slides</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-gray-800/40 to-gray-700/30 rounded-xl border border-gray-600/30">
            <div className="text-3xl mb-1">🏆</div>
            <p className="text-sm text-gray-300">15 Badges</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-gray-800/40 to-gray-700/30 rounded-xl border border-gray-600/30">
            <div className="text-3xl mb-1">🎉</div>
            <p className="text-sm text-gray-300">Milestones</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
