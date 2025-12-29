"use client";

import { motion } from "framer-motion";
import { WrappedData } from "@/types";
import { Star, GitFork, MessageCircle, ExternalLink } from "lucide-react";

interface Props {
  data: WrappedData;
}

export default function ReposSlide({ data }: Props) {
  return (
    <div className="w-full max-w-5xl">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
      >
        Top Repositories
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="group p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                {repo.name}
              </h3>
              <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
            </div>

            {repo.description && (
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{repo.description}</p>
            )}

            <div className="flex items-center gap-4 text-sm">
              {repo.primaryLanguage && (
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  />
                  <span className="text-gray-300">{repo.primaryLanguage.name}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 mt-4 text-gray-400">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span className="font-semibold text-white">{repo.stargazerCount}</span>
              </div>
              {repo.forks && (
                <div className="flex items-center gap-2">
                  <GitFork className="w-4 h-4" />
                  <span className="font-semibold text-white">{repo.forks}</span>
                </div>
              )}
              {repo.openIssues && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-semibold text-white">{repo.openIssues}</span>
                </div>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
