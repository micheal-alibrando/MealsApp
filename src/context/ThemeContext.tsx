import React, { createContext, useContext, useEffect, useState } from "react";
import { colors } from "../theme/global";
import { loadTheme, saveTheme } from "../services/storage";

type ThemeName = "light" | "dark";

type ThemeColors = {
  background: string;
  text: string;
  card: string;
  input: string;
  inputBorder: string;
  tagBackground: string;
  tagText: string;
};

type ThemeContextType = {
  theme: ThemeName;
  toggleTheme: () => void;
  colors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function buildColors(theme: ThemeName): ThemeColors {
  if (theme === "dark") {
    return {
      background: colors.background.black,
      text: colors.white[900],
      card: "#2a2a2a",
      input: colors.background.black,
      inputBorder: "#444",
      tagBackground: colors.primary,
      tagText: colors.white[900],
    };
  }

  return {
    background: colors.background.white,
    text: "#111",
    card: colors.white[900],
    input: colors.white[900],
    inputBorder: colors.white[800],
    tagBackground: colors.primary,
    tagText: colors.white[900],
  };
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>("light");

  useEffect(() => {
    void (async () => {
      const saved = await loadTheme();
      if (saved === "dark" || saved === "light") setTheme(saved);
    })();
  }, []);

  useEffect(() => {
    void saveTheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  const themeColors = buildColors(theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
