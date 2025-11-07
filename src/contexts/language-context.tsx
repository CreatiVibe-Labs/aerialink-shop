"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Language = "EN" | "JP";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language | null>(null);

  // Load language from localStorage (once on mount)
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("language") as Language | null;
      setLanguageState(savedLang || "EN");
    } catch (err) {
      console.error("Error loading language:", err);
      setLanguageState("EN");
    }
  }, []);

  // Save to localStorage when language changes
  const setLanguage = (lang: Language) => {
    try {
      setLanguageState(lang);
      localStorage.setItem("language", lang);
    } catch (err) {
      console.error("Error saving language:", err);
    }
  };

  // Don’t render until the language is known — prevents EN → JP flicker
  if (!language) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
