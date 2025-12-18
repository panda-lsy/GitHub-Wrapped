"use client";

import LoginButton from "@/components/LoginButton";
import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="z-10 flex flex-col items-center">
        <div className="mb-8 p-6 bg-gray-800/50 rounded-full border border-gray-700 shadow-2xl animate-bounce-slow">
          <Github className="w-24 h-24 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {t.home.title}
        </h1>
        
        <p className="text-xl text-gray-400 mb-12 max-w-2xl">
          {t.home.subtitle}
        </p>

        <LoginButton />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <h3 className="text-lg font-bold mb-2 text-blue-400">{t.home.features.visualize.title}</h3>
            <p className="text-gray-400 text-sm">{t.home.features.visualize.desc}</p>
          </div>
          <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <h3 className="text-lg font-bold mb-2 text-purple-400">{t.home.features.share.title}</h3>
            <p className="text-gray-400 text-sm">{t.home.features.share.desc}</p>
          </div>
          <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <h3 className="text-lg font-bold mb-2 text-green-400">{t.home.features.insights.title}</h3>
            <p className="text-gray-400 text-sm">{t.home.features.insights.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
