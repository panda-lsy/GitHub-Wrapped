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
      id="share-card-container"
      className="w-[1080px] h-[1350px] flex flex-col relative overflow-hidden"
      style={{ 
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#0d1117",
        color: "#ffffff",
        padding: "48px"
      }}
    >
      {/* Background Elements */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full" 
        style={{ 
          backgroundColor: "rgba(34,197,94,0.1)", 
          filter: "blur(120px)", 
          transform: "translate(33%, -50%)" 
        }} 
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full" 
        style={{ 
          backgroundColor: "rgba(59,130,246,0.1)", 
          filter: "blur(100px)", 
          transform: "translate(-25%, 33%)" 
        }} 
      />

      {/* Header */}
      <div className="flex items-center gap-8 mb-10 z-10" style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={data.user.avatarUrl}
          alt={data.user.name}
          crossOrigin="anonymous"
          className="w-28 h-28 rounded-full"
          style={{ 
            width: '112px',
            height: '112px',
            borderRadius: '9999px',
            border: "4px solid #374151",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
          }}
        />
        <div>
          <h1 
            className="text-5xl font-bold mb-2 text-white"
            style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px', color: 'white' }}
          >
            {data.user.name || data.user.login}
          </h1>
          <p className="text-2xl text-[#9ca3af]" style={{ fontSize: '24px', color: '#9ca3af' }}>@{data.user.login}</p>
        </div>
        <div className="ml-auto" style={{ marginLeft: 'auto' }}>
          <div 
            className="flex items-center gap-3 px-6 py-3 rounded-full" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              backgroundColor: "rgba(31,41,55,0.5)", 
              padding: "12px 24px", 
              borderRadius: "9999px", 
              border: "1px solid #374151" 
            }}
          >
            <Github className="w-8 h-8" style={{ width: '32px', height: '32px' }} />
            <span className="text-2xl font-bold" style={{ fontSize: '24px', fontWeight: 'bold' }}>{t.shareCard.title.replace("{{year}}", data.year.toString())}</span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-6 mb-10 z-10" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <div 
          className="border rounded-3xl p-8" 
          style={{ 
            backgroundColor: "rgba(31,41,55,0.4)", 
            border: "1px solid rgba(55,65,81,0.5)", 
            borderRadius: "24px", 
            padding: "32px" 
          }}
        >
          <div className="flex items-center gap-4 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', color: "#4ade80" }}>
            <GitCommit className="w-10 h-10" style={{ width: '40px', height: '40px' }} />
            <span className="text-2xl font-medium" style={{ fontSize: '24px', fontWeight: 500 }}>{t.shareCard.contributions}</span>
          </div>
          <p className="text-6xl font-bold" style={{ fontSize: '60px', fontWeight: 'bold' }}>{data.stats.totalContributions.toLocaleString()}</p>
        </div>
        
        <div 
          className="border rounded-3xl p-8" 
          style={{ 
            backgroundColor: "rgba(31,41,55,0.4)", 
            border: "1px solid rgba(55,65,81,0.5)", 
            borderRadius: "24px", 
            padding: "32px" 
          }}
        >
          <div className="flex items-center gap-4 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', color: "#facc15" }}>
            <Star className="w-10 h-10" style={{ width: '40px', height: '40px' }} />
            <span className="text-2xl font-medium" style={{ fontSize: '24px', fontWeight: 500 }}>{t.shareCard.stars}</span>
          </div>
          <p className="text-6xl font-bold" style={{ fontSize: '60px', fontWeight: 'bold' }}>{data.totalStarsEarned.toLocaleString()}</p>
        </div>

        <div 
          className="border rounded-3xl p-8" 
          style={{ 
            backgroundColor: "rgba(31,41,55,0.4)", 
            border: "1px solid rgba(55,65,81,0.5)", 
            borderRadius: "24px", 
            padding: "32px" 
          }}
        >
          <div className="flex items-center gap-4 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', color: "#c084fc" }}>
            <GitPullRequest className="w-10 h-10" style={{ width: '40px', height: '40px' }} />
            <span className="text-2xl font-medium" style={{ fontSize: '24px', fontWeight: 500 }}>{t.shareCard.prs}</span>
          </div>
          <p className="text-6xl font-bold" style={{ fontSize: '60px', fontWeight: 'bold' }}>{data.stats.totalPullRequests.toLocaleString()}</p>
        </div>

        <div 
          className="border rounded-3xl p-8" 
          style={{ 
            backgroundColor: "rgba(31,41,55,0.4)", 
            border: "1px solid rgba(55,65,81,0.5)", 
            borderRadius: "24px", 
            padding: "32px" 
          }}
        >
          <div className="flex items-center gap-4 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', color: "#60a5fa" }}>
            <Trophy className="w-10 h-10" style={{ width: '40px', height: '40px' }} />
            <span className="text-2xl font-medium" style={{ fontSize: '24px', fontWeight: 500 }}>{t.shareCard.topLanguage}</span>
          </div>
          <p className="text-5xl font-bold leading-tight break-words" style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: 1.2 }}>
            {data.topLanguages[0]?.name || "N/A"}
          </p>
        </div>
      </div>

      {/* Heatmap Section */}
      <div 
        className="border rounded-3xl p-8 mb-10 z-10 flex-1 flex flex-col justify-center" 
        style={{ 
          backgroundColor: "rgba(31,41,55,0.4)", 
          border: "1px solid rgba(55,65,81,0.5)", 
          borderRadius: "24px", 
          padding: "32px", 
          marginBottom: "40px", 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}
      >
        <h3 className="text-3xl font-bold mb-8 text-[#d1d5db]" style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '32px', color: '#d1d5db' }}>{t.shareCard.graph}</h3>
        <div className="w-full flex justify-center" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
           <ContributionHeatmap 
             data={data.stats.contributionCalendar} 
             labels={{
               less: t.dashboard.charts.less,
               more: t.dashboard.charts.more,
               totalCount: t.dashboard.charts.totalCount,
             }}
             blockSize={16}
             blockMargin={5}
             fontSize={20}
           />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex justify-between items-end z-10" style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div className="flex gap-4" style={{ display: 'flex', gap: '16px' }}>
          {data.topLanguages.slice(0, 3).map((lang) => (
            <div 
              key={lang.name} 
              className="flex items-center gap-2 px-4 py-2 rounded-full" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                backgroundColor: "rgba(31,41,55,0.6)", 
                padding: "8px 16px", 
                borderRadius: "9999px" 
              }}
            >
              <div className="w-4 h-4 rounded-full" style={{ width: '16px', height: '16px', borderRadius: '9999px', backgroundColor: lang.color }} />
              <span className="text-lg font-medium" style={{ fontSize: '18px', fontWeight: 500 }}>{lang.name}</span>
            </div>
          ))}
        </div>
        <div className="text-right" style={{ textAlign: 'right' }}>
          <p className="text-xl text-[#9ca3af] mb-1" style={{ fontSize: '20px', color: '#9ca3af', marginBottom: '4px' }}>Generated by</p>
          <p 
            className="text-3xl font-bold" 
            style={{ 
              fontSize: '30px', 
              fontWeight: 'bold', 
              background: 'linear-gradient(to right, #c084fc, #db2777)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            GitHub Wrapped
          </p>
        </div>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";

export default ShareCard;
