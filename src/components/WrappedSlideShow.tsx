"use client";

import { useState, useEffect } from "react";
import { WrappedData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Share2, Download } from "lucide-react";
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
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
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
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">GitHub Wrapped {data.year}</h1>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg hover:bg-gray-700/80 transition-all disabled:opacity-50"
          >
            <RotateCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? t.dashboard.generating : t.dashboard.refresh || "Refresh"}
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onShare("twitter")}
            className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-all"
          >
            <Share2 className="w-4 h-4" />
            Twitter
          </button>
          <button
            onClick={() => onShare("linkedin")}
            className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#00669c] transition-all"
          >
            <Share2 className="w-4 h-4" />
            LinkedIn
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all"
          >
            <Download className="w-4 h-4" />
            {t.dashboard.download}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            className="absolute w-full h-full flex items-center justify-center p-8"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-full hover:bg-gray-700/80 transition-all disabled:opacity-30"
        disabled={currentSlide === 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-full hover:bg-gray-700/80 transition-all disabled:opacity-30"
        disabled={currentSlide === slides.length - 1}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-12 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-gradient-to-r from-purple-500 to-blue-500 scale-110"
                : "bg-gray-700/80 hover:bg-gray-600/80"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-20 text-gray-400 text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}
