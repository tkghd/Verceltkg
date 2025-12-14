
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeName = 'cyber' | 'ocean' | 'forest' | 'sunset' | 'royal';

export interface ThemeColors {
  name: ThemeName;
  primary: string; // Main highlight (e.g., cyan)
  secondary: string; // Secondary highlight (e.g., indigo)
  accent: string; // Accent color (e.g., purple)
  gradient: string; // Tailwind gradient string
  glow: string; // RGB values for shadow
}

const THEMES: Record<ThemeName, ThemeColors> = {
  cyber: { 
    name: 'cyber', 
    primary: 'cyan', 
    secondary: 'indigo', 
    accent: 'purple',
    gradient: 'from-cyan-600 to-indigo-600',
    glow: '6,182,212' // Cyan RGB
  },
  ocean: { 
    name: 'ocean', 
    primary: 'sky', 
    secondary: 'blue', 
    accent: 'teal',
    gradient: 'from-sky-600 to-blue-600',
    glow: '14,165,233' // Sky RGB
  },
  forest: { 
    name: 'forest', 
    primary: 'emerald', 
    secondary: 'green', 
    accent: 'lime',
    gradient: 'from-emerald-600 to-green-600',
    glow: '16,185,129' // Emerald RGB
  },
  sunset: { 
    name: 'sunset', 
    primary: 'orange', 
    secondary: 'red', 
    accent: 'rose',
    gradient: 'from-orange-600 to-red-600',
    glow: '249,115,22' // Orange RGB
  },
  royal: { 
    name: 'royal', 
    primary: 'violet', 
    secondary: 'purple', 
    accent: 'fuchsia',
    gradient: 'from-violet-600 to-purple-600',
    glow: '139,92,246' // Violet RGB
  }
};

interface ThemeContextType {
  theme: ThemeColors;
  setThemeName: (name: ThemeName) => void;
  themes: Record<ThemeName, ThemeColors>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: THEMES.cyber,
  setThemeName: () => {},
  themes: THEMES
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('cyber');

  const value = {
    theme: THEMES[themeName],
    setThemeName,
    themes: THEMES
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
