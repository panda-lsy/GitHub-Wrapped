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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 flex-1 overflow-y-auto pb-20 custom-scrollbar" data-scrollable="true">
          {data.topRepos.slice(0, 6).map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-3 md:p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-lg md:rounded-xl border border-gray-700/50 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm md:text-lg font-bold text-blue-400 group-hover:text-blue-300 transition-colors truncate flex-1">
                  {repo.name}
                </h3>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-500 group-hover:text-gray-300 transition-colors ml-2 flex-shrink-0" />
              </div>

              {repo.description && (
                <p className="text-gray-400 text-xs mb-2 md:mb-3 line-clamp-2">{repo.description}</p>
              )}

              <div className="flex items-center gap-2 md:gap-3 text-xs">
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

              <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3 text-gray-400 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {repo.stargazerCount > 0 && (
                    <span className="font-semibold text-white">{repo.stargazerCount}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  {repo.forks && repo.forks > 0 && (
                    <span className="font-semibold text-white">{repo.forks}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {repo.openIssues && repo.openIssues > 0 && (
                    <span className="font-semibold text-white">{repo.openIssues}</span>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
