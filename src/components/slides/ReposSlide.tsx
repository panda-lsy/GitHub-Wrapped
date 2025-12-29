"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Star, GitFork, MessageCircle, ExternalLink } from "lucide-react";
import "@/app/custom-scrollbar.css";

interface Props {
  data: WrappedData;
}

export default function ReposSlide({ data }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-5xl h-full flex flex-col">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 md:mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
        >
          Top Repositories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 flex-1 overflow-y-auto pb-20 custom-scrollbar" data-scrollable="true">
          {data.topRepos.slice(0, 6).map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group p-4 md:p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-2 md:mb-3">
                <h3 className="text-base md:text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors truncate flex-1">
                  {repo.name}
                </h3>
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-gray-300 transition-colors ml-2 flex-shrink-0" />
              </div>

              {repo.description && (
                <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{repo.description}</p>
              )}

              <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                {repo.primaryLanguage && (
                  <div className="flex items-center gap-1 md:gap-2">
                    <div
                      className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: repo.primaryLanguage.color }}
                    />
                    <span className="text-gray-300 truncate">{repo.primaryLanguage.name}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 md:gap-6 mt-3 md:mt-4 text-gray-400 text-xs md:text-sm">
                <div className="flex items-center gap-1 md:gap-2">
                  <Star className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-semibold text-white">{repo.stargazerCount}</span>
                </div>
                {repo.forks && repo.forks > 0 && (
                  <div className="flex items-center gap-1 md:gap-2">
                    <GitFork className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-semibold text-white">{repo.forks}</span>
                  </div>
                )}
                {repo.openIssues && repo.openIssues > 0 && (
                  <div className="flex items-center gap-1 md:gap-2">
                    <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-semibold text-white">{repo.openIssues}</span>
                  </div>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
