"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-md hover:bg-gray-800"
      title={locale === "en" ? "Switch to Chinese" : "切换到英文"}
    >
      <Globe className="w-4 h-4" />
      <span>{locale === "en" ? "EN" : "中文"}</span>
    </button>
  );
}
