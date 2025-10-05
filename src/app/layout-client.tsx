"use client";

import { ReduxThemeProvider } from "@/providers/ReduxThemeProvider";
import { ReactNode } from "react";

export default function LayoutClient({ children }: { children: ReactNode }) {
  return <ReduxThemeProvider>{children}</ReduxThemeProvider>;
}