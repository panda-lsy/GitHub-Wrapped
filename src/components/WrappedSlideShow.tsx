"use client";

import { useState, useEffect } from "react";
import { WrappedData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Share2, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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
}

export default function WrappedSlideShow({ data, onRefresh, isRefreshing, onShare, onDownload }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const { t } = useLanguage();

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
            <h1 className="text-xl md:text-2xl font-bold text-white">GitHub Wrapped {data.year}</h1>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-gray-800/80 backdrop-blur-sm text-white text-sm md:text-base rounded-lg hover:bg-gray-700/80 transition-all disabled:opacity-50"
            >
              <RotateCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{isRefreshing ? "Generating..." : "Refresh"}</span>
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
              onClick={onDownload}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-green-600 text-white text-sm md:text-base rounded-lg hover:bg-green-500 transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
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
