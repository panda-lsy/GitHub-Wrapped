"use client";

import { useRef, useState, useEffect } from "react";
import { WrappedData } from "@/types";
import StatsCard from "./StatsCard";
import LanguageChart from "./LanguageChart";
import ContributionHeatmap from "./ContributionHeatmap";
import ShareCard from "./ShareCard";
import { GitCommit, Star, GitPullRequest, Eye, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

interface Props {
  data: WrappedData;
}

export default function Dashboard({ data }: Props) {
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useLanguage();
  const [avatarBase64, setAvatarBase64] = useState<string>(data.user.avatarUrl);

  // Convert avatar to base64 on mount to avoid CORS issues
  useEffect(() => {
    const convertAvatar = async () => {
      try {
        const response = await fetch(data.user.avatarUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarBase64(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.error("Failed to convert avatar to base64", e);
      }
    };
    convertAvatar();
  }, [data.user.avatarUrl]);

  const handleDownload = async () => {
    if (!shareCardRef.current) return;
    setIsGenerating(true);
    try {
      // Wait a bit for any rendering to finish
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get actual dimensions
      const element = shareCardRef.current;
      const rect = element.getBoundingClientRect();

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#0d1117",
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: rect.width,
        height: rect.height,
        windowWidth: 1920,
        windowHeight: 3000,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          const container = clonedDoc.getElementById('share-card-container');
          if (container) {
            // Let content flow naturally
            container.style.width = '1080px';
            container.style.height = 'auto';
            container.style.minHeight = '1350px';
            container.style.maxHeight = 'none';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.position = 'relative';
            container.style.overflow = 'visible';
            container.style.visibility = 'visible';
            container.style.opacity = '1';

            // Ensure all children are visible
            const children = container.querySelectorAll('*');
            children.forEach((child) => {
              if (child instanceof HTMLElement) {
                child.style.overflow = 'visible';
              }
            });
          }

          // Remove any overflow hidden on cloned document
          const body = clonedDoc.body;
          if (body) {
            body.style.overflow = 'visible';
            body.style.width = 'auto';
            body.style.height = 'auto';
          }
        }
      });

      const link = document.createElement("a");
      link.download = `github-wrapped-${data.year}-${data.user.login}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{t.dashboard.title.replace("{{year}}", data.year.toString())}</h1>
          <p className="text-gray-400">{t.dashboard.welcome}, {data.user.name || data.user.login}</p>
        </div>
        <div className="flex gap-3">
          <LanguageSwitcher />
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? t.dashboard.generating : t.dashboard.download}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={t.dashboard.stats.contributions}
          value={data.stats.totalContributions}
          icon={GitCommit}
          color="text-green-400"
          description={t.dashboard.stats.contributionsDesc}
        />
        <StatsCard
          title={t.dashboard.stats.stars}
          value={data.totalStarsEarned}
          icon={Star}
          color="text-yellow-400"
          description={t.dashboard.stats.starsDesc}
        />
        <StatsCard
          title={t.dashboard.stats.prs}
          value={data.stats.totalPullRequests}
          icon={GitPullRequest}
          color="text-purple-400"
          description={t.dashboard.stats.prsDesc}
        />
        <StatsCard
          title={t.dashboard.stats.activeRepos}
          value={data.topRepos.length} // Simplified
          icon={Eye}
          color="text-blue-400"
          description={t.dashboard.stats.activeReposDesc}
        />
      </div>

      {/* Heatmap Section - Full Width */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">{t.dashboard.charts.calendar}</h3>
        <ContributionHeatmap 
          data={data.stats.contributionCalendar} 
          labels={{
            less: t.dashboard.charts.less,
            more: t.dashboard.charts.more,
            totalCount: t.dashboard.charts.totalCount,
          }}
        />
      </div>

      {/* Bottom Grid - Repos and Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Repos */}
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-6 h-full">
          <h3 className="text-xl font-bold text-white mb-6">{t.dashboard.charts.topRepos}</h3>
          <div className="space-y-4">
            {data.topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gray-900/50 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-blue-400 hover:underline">{repo.name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      {repo.primaryLanguage && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: repo.primaryLanguage.color }}
                          />
                          {repo.primaryLanguage.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>{repo.stargazerCount}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="lg:col-span-1 bg-gray-800/50 border border-gray-700 rounded-xl p-6 h-full">
          <h3 className="text-xl font-bold text-white mb-4">{t.dashboard.charts.topLanguages}</h3>
          <LanguageChart data={data.topLanguages} />
          <div className="mt-4 space-y-2">
            {data.topLanguages.map((lang) => (
              <div key={lang.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-gray-300">{lang.name}</span>
                </div>
                <span className="text-gray-500">{lang.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden Share Card for Generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, visibility: 'visible' }}>
        <div id="share-card-container">
            <ShareCard ref={shareCardRef} data={{...data, user: {...data.user, avatarUrl: avatarBase64}}} />
        </div>
      </div>
    </div>
  );
}
