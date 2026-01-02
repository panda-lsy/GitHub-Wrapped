"use client";

import { useState, useEffect, useRef } from "react";
import { WrappedData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Share2, Download, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ShareCard from "./ShareCard";
import html2canvas from "html2canvas";
import {
  IntroSlide,
  StatsSlide,
  HeatmapSlide,
  LanguagesSlide,
  ReposSlide,
  BadgesSlide,
  MilestonesSlide,
  SummarySlide,
} from "./slides";

interface Props {
  data: WrappedData;
  onRefresh: () => void;
  isRefreshing: boolean;
  onShare: (platform: string) => void;
  onDownload: () => void;
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export default function WrappedSlideShow({ 
  data, 
  onRefresh, 
  isRefreshing, 
  onShare, 
  onDownload,
  selectedYear,
  onYearChange
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useLanguage();
  const shareCardRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const slides = [
    <IntroSlide key="intro" data={data} />,
    <StatsSlide key="stats" data={data} />,
    <HeatmapSlide key="heatmap" data={data} />,
    <LanguagesSlide key="languages" data={data} />,
    <ReposSlide key="repos" data={data} />,
    <BadgesSlide key="badges" data={data} />,
    <MilestonesSlide key="milestones" data={data} />,
    <SummarySlide key="summary" data={data} />,
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setShowProgress(true);
    setTimeout(() => setShowProgress(false), 2000);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setShowProgress(true);
    setTimeout(() => setShowProgress(false), 2000);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
    setShowProgress(true);
    setTimeout(() => setShowProgress(false), 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") nextSlide();
      if (e.key === "ArrowUp") prevSlide();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Wheel navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      // Check if scrolling inside a scrollable container
      const target = e.target as HTMLElement;
      const scrollableElement = target.closest('[data-scrollable="true"]');
      
      if (scrollableElement) {
        // Allow scrolling within the container
        const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
        const isAtTop = scrollTop === 0;
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
        
        // Only prevent default and trigger page navigation if at edges
        if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
          return;
        }
      }
      
      e.preventDefault();
      
      // Debounce wheel events to prevent rapid scrolling
      if (wheelTimeout) return;
      
      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }
      
      wheelTimeout = setTimeout(() => {
        wheelTimeout = null as any;
      }, 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, []);

  const handleDownloadImage = async () => {
    if (!shareCardRef.current) return;
    setIsGenerating(true);
    try {
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2, // Higher quality
        backgroundColor: "#0d1117",
        useCORS: true,
        allowTaint: true,
        width: 1080,
        height: 1350,
        logging: true, // Enable logging to help debug
        onclone: (clonedDoc) => {
          // EXTREME FIX for "lab" color function issue:
          // Remove ALL style and link tags to prevent html2canvas from parsing problematic CSS.
          // We have inlined essential styles in ShareCard.tsx.
          const styles = clonedDoc.getElementsByTagName('style');
          const links = clonedDoc.getElementsByTagName('link');
          
          // Convert to array to avoid live collection issues while removing
          Array.from(styles).forEach(s => s.remove());
          Array.from(links).forEach(l => {
            if (l.rel === 'stylesheet') l.remove();
          });

          // Also sanitize any remaining inline styles just in case
          const allElements = clonedDoc.getElementsByTagName('*');
          for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i] as HTMLElement;
            if (el.style) {
              ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke', 'background'].forEach(prop => {
                try {
                  // @ts-ignore
                  const val = el.style[prop];
                  if (typeof val === 'string' && (val.includes('lab(') || val.includes('oklch(') || val.includes('oklab('))) {
                    // @ts-ignore
                    el.style[prop] = 'transparent';
                  }
                } catch (e) {}
              });
            }
          }
        }
      });
      
      const link = document.createElement("a");
      link.download = `github-wrapped-${data.year}-${data.user.login}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
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
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-gray-800/80 backdrop-blur-sm text-white text-sm md:text-base rounded-lg hover:bg-gray-700/80 transition-all disabled:opacity-50"
            >
              <RotateCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{isRefreshing ? t.dashboard.generating : t.dashboard.refresh}</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => onShare("twitter")}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-[#1DA1F2] text-white text-sm md:text-base rounded-lg hover:bg-[#1a8cd8] transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Twitter</span>
            </button>
            <button
              onClick={() => onShare("linkedin")}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-[#0077B5] text-white text-sm md:text-base rounded-lg hover:bg-[#00669c] transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-green-600 text-white text-sm md:text-base rounded-lg hover:bg-green-500 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isGenerating ? t.dashboard.generating : t.dashboard.download}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Share Card for Image Generation */}
      <div className="fixed left-[-9999px] top-[-9999px]">
        <ShareCard ref={shareCardRef} data={data} />
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showProgress ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3 px-4"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-8 h-1.5 md:w-12 md:h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-gradient-to-r from-purple-500 to-blue-500 scale-110"
                : "bg-gray-700/80 hover:bg-gray-600/80"
            }`}
          />
        ))}
      </motion.div>

      {/* Slide Counter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showProgress ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
        className="absolute bottom-6 md:bottom-8 right-4 md:right-8 z-20 text-gray-400 text-xs md:text-sm"
      >
        {currentSlide + 1} / {slides.length}
      </motion.div>
    </div>
  );
}
