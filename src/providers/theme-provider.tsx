"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme | undefined;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
}: {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<Theme | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    updateSystemTheme();
    mediaQuery.addEventListener("change", updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    setMounted(true);
    
    // Get theme from localStorage or default
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = storedTheme || defaultTheme;
    
    setTheme(initialTheme);
    
    // Apply theme to document
    const applyTheme = (newTheme: Theme) => {
      const resolvedTheme = newTheme === "system" ? systemTheme : newTheme;
      
      if (resolvedTheme) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(resolvedTheme);
      }
    };
    
    applyTheme(initialTheme);
  }, [defaultTheme, storageKey, systemTheme]);

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return;
    
    const applyTheme = (newTheme: Theme) => {
      const resolvedTheme = newTheme === "system" ? systemTheme : newTheme;
      
      if (resolvedTheme) {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(resolvedTheme);
        localStorage.setItem(storageKey, newTheme);
      }
    };
    
    applyTheme(theme);
  }, [theme, systemTheme, mounted, storageKey]);

  const value = {
    theme,
    setTheme,
    systemTheme,
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Theme script to prevent flash of wrong theme
export function ThemeScript() {
  const codeToRunOnClient = `
    (function() {
      try {
        var theme = localStorage.getItem("portfolio-theme") || "system";
        var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        var resolvedTheme = theme === "system" ? systemTheme : theme;
        
        if (resolvedTheme === "dark") {
          document.documentElement.classList.add("dark");
        }
      } catch (e) {}
    })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
}