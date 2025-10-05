"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { ThemeProvider } from "./ThemeProvider";
import { ReactNode } from "react";

export function ReduxThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}