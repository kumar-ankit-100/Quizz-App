"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxThemeProvider } from "@/providers/ReduxThemeProvider";
import { StartCard } from "@/components/StartCard";
import { RootState } from "@/lib/store";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  const { quizStarted } = useSelector((state: RootState) => state.quiz);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Always reload the page when this component mounts
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.location.hash = 'reloaded';
      window.location.reload();
      return;
    }
    
    setIsMounted(true);
    console.log("Home mounted, Quiz started:", quizStarted);
  }, [quizStarted]);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-900 rounded-full relative">
          <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <ReduxThemeProvider>
      <Navbar />
      <main className="px-4 py-12 flex items-center justify-center min-h-screen">
        <StartCard />
      </main>
    </ReduxThemeProvider>
  );
}