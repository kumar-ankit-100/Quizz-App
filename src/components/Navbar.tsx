// src/components/Navbar.tsx
"use client";
import { useTheme } from "next-themes";
import { Menu, X, BookOpen, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? darkMode 
            ? "bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-800" 
            : "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200"
          : darkMode
            ? "bg-transparent border-b border-gray-800/50"
            : "bg-transparent border-b border-gray-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className={`text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                CausalFunnel
              </span>
              <span className={`block text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Quiz Platform
              </span>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* All Quizzes Button - Desktop */}
            <SignedIn>
              <Link 
                href="/all-quizzes" 
                className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  darkMode 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50" 
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-300/40 hover:shadow-purple-400/60"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>All Quizzes</span>
              </Link>
            </SignedIn>

            {/* Theme Toggle */}
            <div className="transform hover:scale-110 transition-transform duration-300">
              <ThemeToggle />
            </div>

            {/* Clerk User Button - Desktop */}
            <SignedIn>
              <div className="hidden sm:block transform hover:scale-110 transition-transform duration-300">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </div>
            </SignedIn>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`sm:hidden p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                darkMode 
                  ? "bg-gray-800 text-white hover:bg-gray-700" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`px-4 py-4 space-y-3 ${
          darkMode ? "bg-gray-900 border-t border-gray-800" : "bg-white border-t border-gray-200"
        }`}>
          <SignedIn>
            <Link 
              href="/all-quizzes"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                darkMode 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                  : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span>All Quizzes</span>
            </Link>

            {/* Clerk User Button - Mobile */}
            <div className="flex items-center space-x-3 px-4 py-3">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
              <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Account Settings
              </span>
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}