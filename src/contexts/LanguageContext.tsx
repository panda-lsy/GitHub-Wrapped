"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionary, Locale } from "@/lib/dictionary";

interface LanguageContextType {
  locale: Locale;
  t: typeof dictionary.en;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("locale") as Locale;
        if (saved && (saved === "en" || saved === "zh")) {
          setLocale(saved);
        } else {
          const browserLang = navigator.language.startsWith("zh") ? "zh" : "en";
          setLocale(browserLang);
        }
      } catch (error) {
        console.warn("Failed to read locale from localStorage:", error);
      }
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("locale", newLocale);
      } catch (error) {
        console.warn("Failed to write locale to localStorage:", error);
      }
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        t: dictionary[locale],
        setLocale: handleSetLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
