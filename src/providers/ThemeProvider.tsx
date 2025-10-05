"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during server-side rendering to avoid hydration mismatch
    return <div className="min-h-screen bg-gray-100" />;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Optional: Custom hook to access theme (can be used instead of useTheme from next-themes directly)
export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();
  return { theme, setTheme };
};