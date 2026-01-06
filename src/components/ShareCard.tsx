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
      className="flex flex-col relative"
      style={{
        width: '1080px',
        minHeight: '1350px',
        maxHeight: 'fit-content',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#0d1117",
        color: "#ffffff",
        padding: "64px",
        border: "1px solid #30363d",
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Background Elements - Using Radial Gradients instead of filters for better html2canvas support */}
      <div 
        style={{ 
          background: "radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0) 70%)",
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '1000px',
          height: '1000px',
          zIndex: 0
        }} 
      />
      <div 
        style={{ 
          background: "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)",
          position: 'absolute',
          bottom: '-200px',
          left: '-200px',
          width: '800px',
          height: '800px',
          zIndex: 0
        }} 
      />
      <div 
        style={{ 
          background: "radial-gradient(circle at center, rgba(192, 132, 252, 0.05) 0%, rgba(192, 132, 252, 0) 60%)",
          position: 'absolute',
          top: '75px', // 1350/2 - 1200/2 = 75
          left: '-60px', // 1080/2 - 1200/2 = -60
          width: '1200px',
          height: '1200px',
          zIndex: 0
        }} 
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '48px', position: 'relative', zIndex: 10 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ 
            position: 'absolute', 
            top: '-4px',
            left: '-4px',
            right: '-4px',
            bottom: '-4px',
            background: 'linear-gradient(45deg, #4ade80, #60a5fa, #c084fc)', 
            borderRadius: '9999px',
            zIndex: -1
          }} />
          <img
            src={data.user.avatarUrl}
            alt={data.user.name}
            crossOrigin="anonymous"
            style={{ 
              width: '140px',
              height: '140px',
              borderRadius: '9999px',
              border: "4px solid #0d1117",
              display: 'block'
            }}
          />
        </div>
        <div>
          <h1 
            style={{ fontSize: '64px', fontWeight: 800, marginBottom: '8px', color: 'white', letterSpacing: '-0.02em' }}
          >
            {data.user.name || data.user.login}
          </h1>
          <p style={{ fontSize: '32px', color: '#8b949e', fontWeight: 500 }}>@{data.user.login}</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              backgroundColor: "rgba(22, 27, 34, 0.8)", 
              padding: "16px 32px", 
              borderRadius: "9999px", 
              border: "1px solid #30363d",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}
          >
            <Github size={40} />
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#f0f6fc' }}>{data.year}</span>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: '48px', position: 'relative', zIndex: 10 }}>
        <div 
          style={{ 
            backgroundColor: "rgba(22, 27, 34, 0.6)", 
            border: "1px solid #30363d", 
            borderRadius: "32px", 
            padding: "40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', color: "#4ade80" }}>
            <GitCommit size={48} />
            <span style={{ fontSize: '28px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.shareCard.contributions}</span>
          </div>
          <p style={{ fontSize: '80px', fontWeight: 800, color: '#f0f6fc' }}>{data.stats.totalContributions.toLocaleString()}</p>
        </div>
        
        <div 
          style={{ 
            backgroundColor: "rgba(22, 27, 34, 0.6)", 
            border: "1px solid #30363d", 
            borderRadius: "32px", 
            padding: "40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', color: "#facc15" }}>
            <Star size={48} />
            <span style={{ fontSize: '28px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.shareCard.stars}</span>
          </div>
          <p style={{ fontSize: '80px', fontWeight: 800, color: '#f0f6fc' }}>{data.totalStarsEarned.toLocaleString()}</p>
        </div>

        <div 
          style={{ 
            backgroundColor: "rgba(22, 27, 34, 0.6)", 
            border: "1px solid #30363d", 
            borderRadius: "32px", 
            padding: "40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', color: "#c084fc" }}>
            <GitPullRequest size={48} />
            <span style={{ fontSize: '28px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.shareCard.prs}</span>
          </div>
          <p style={{ fontSize: '80px', fontWeight: 800, color: '#f0f6fc' }}>{data.stats.totalPullRequests.toLocaleString()}</p>
        </div>

        <div 
          style={{ 
            backgroundColor: "rgba(22, 27, 34, 0.6)", 
            border: "1px solid #30363d", 
            borderRadius: "32px", 
            padding: "40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', color: "#60a5fa" }}>
            <Trophy size={48} />
            <span style={{ fontSize: '28px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.shareCard.topLanguage}</span>
          </div>
          <p style={{ fontSize: '64px', fontWeight: 800, color: '#f0f6fc', lineHeight: 1.1 }}>
            {data.topLanguages[0]?.name || "N/A"}
          </p>
        </div>
      </div>

      {/* Heatmap Section */}
      <div 
        style={{ 
          backgroundColor: "rgba(22, 27, 34, 0.6)", 
          border: "1px solid #30363d", 
          borderRadius: "32px", 
          padding: "48px", 
          marginBottom: "48px", 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
        }}
      >
        <h3 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '40px', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.shareCard.graph}</h3>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
           <ContributionHeatmap 
             data={data.stats.contributionCalendar} 
             labels={{
               less: t.dashboard.charts.less,
               more: t.dashboard.charts.more,
               totalCount: t.dashboard.charts.totalCount,
             }}
             blockSize={18}
             blockMargin={5}
             fontSize={18}
           />
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {data.topLanguages.slice(0, 3).map((lang) => (
            <div 
              key={lang.name} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                backgroundColor: "rgba(48, 54, 61, 0.8)", 
                padding: "12px 24px", 
                borderRadius: "9999px",
                border: "1px solid #484f58"
              }}
            >
              <div style={{ width: '20px', height: '20px', borderRadius: '9999px', backgroundColor: lang.color }} />
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#f0f6fc' }}>{lang.name}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '24px', color: '#8b949e', marginBottom: '8px', fontWeight: 500 }}>Generated by</p>
          <p 
            style={{ 
              fontSize: '48px', 
              fontWeight: 900, 
              color: '#c084fc',
              letterSpacing: '-0.02em'
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
