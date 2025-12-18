"use client";

import { forwardRef } from "react";
import { WrappedData } from "@/types";
import ContributionHeatmap from "./ContributionHeatmap";
import { Github, Star, GitCommit, GitPullRequest, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  data: WrappedData;
}

const ShareCard = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { t } = useLanguage();

  return (
    <div
      ref={ref}
      className="w-[1080px] h-[1350px] bg-[#0d1117] text-[#ffffff] p-12 flex flex-col relative overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[rgba(34,197,94,0.1)] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[rgba(59,130,246,0.1)] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

      {/* Header */}
      <div className="flex items-center gap-8 mb-10 z-10">
        <img
          src={data.user.avatarUrl}
          alt={data.user.name}
          crossOrigin="anonymous"
          className="w-28 h-28 rounded-full border-4 border-[#374151]"
          style={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        />
        <div>
          <h1 
            className="text-5xl font-bold mb-2"
            style={{ 
              background: "linear-gradient(to right, #ffffff, #9ca3af)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent" 
            }}
          >
            {data.user.name || data.user.login}
          </h1>
          <p className="text-2xl text-[#9ca3af]">@{data.user.login}</p>
        </div>
        <div className="ml-auto">
          <div className="flex items-center gap-3 bg-[rgba(31,41,55,0.5)] px-6 py-3 rounded-full border border-[#374151]">
            <Github className="w-8 h-8" />
            <span className="text-2xl font-bold">{t.shareCard.title.replace("{{year}}", data.year.toString())}</span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-6 mb-10 z-10">
        <div className="bg-[rgba(31,41,55,0.4)] backdrop-blur-md border border-[rgba(55,65,81,0.5)] rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4 text-[#4ade80]">
            <GitCommit className="w-10 h-10" />
            <span className="text-2xl font-medium">{t.shareCard.contributions}</span>
          </div>
          <p className="text-6xl font-bold">{data.stats.totalContributions.toLocaleString()}</p>
        </div>
        
        <div className="bg-[rgba(31,41,55,0.4)] backdrop-blur-md border border-[rgba(55,65,81,0.5)] rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4 text-[#facc15]">
            <Star className="w-10 h-10" />
            <span className="text-2xl font-medium">{t.shareCard.stars}</span>
          </div>
          <p className="text-6xl font-bold">{data.totalStarsEarned.toLocaleString()}</p>
        </div>

        <div className="bg-[rgba(31,41,55,0.4)] backdrop-blur-md border border-[rgba(55,65,81,0.5)] rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4 text-[#c084fc]">
            <GitPullRequest className="w-10 h-10" />
            <span className="text-2xl font-medium">{t.shareCard.prs}</span>
          </div>
          <p className="text-6xl font-bold">{data.stats.totalPullRequests.toLocaleString()}</p>
        </div>

        <div className="bg-[rgba(31,41,55,0.4)] backdrop-blur-md border border-[rgba(55,65,81,0.5)] rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4 text-[#60a5fa]">
            <Trophy className="w-10 h-10" />
            <span className="text-2xl font-medium">{t.shareCard.topLanguage}</span>
          </div>
          <p className="text-5xl font-bold leading-tight break-words">
            {data.topLanguages[0]?.name || "N/A"}
          </p>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="bg-[rgba(31,41,55,0.4)] backdrop-blur-md border border-[rgba(55,65,81,0.5)] rounded-3xl p-8 mb-10 z-10 flex-1 flex flex-col justify-center">
        <h3 className="text-3xl font-bold mb-8 text-[#d1d5db]">{t.shareCard.graph}</h3>
        <div className="w-full flex justify-center">
           <ContributionHeatmap 
             data={data.stats.contributionCalendar} 
             labels={{
               less: t.dashboard.charts.less,
               more: t.dashboard.charts.more,
               totalCount: t.dashboard.charts.totalCount,
             }}
             blockSize={14}
             blockMargin={5}
           />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex justify-between items-end z-10">
        <div className="flex gap-4">
          {data.topLanguages.slice(0, 3).map((lang) => (
            <div key={lang.name} className="flex items-center gap-2 bg-[rgba(31,41,55,0.6)] px-4 py-2 rounded-full">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: lang.color }} />
              <span className="text-lg font-medium">{lang.name}</span>
            </div>
          ))}
        </div>
        <p className="text-lg text-[#6b7280]">github-wrapped.vercel.app</p>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";

export default ShareCard;
