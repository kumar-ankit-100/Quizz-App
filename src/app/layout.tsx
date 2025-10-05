// src/app/layout.tsx
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ReduxThemeProvider } from "@/providers/ReduxThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CausalFunnel Quiz",
  description: "A modern quiz app with Clerk authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300`}>
          <ThemeProvider>
            <ReduxThemeProvider>
              <div className="min-h-screen pt-16 sm:pt-18">
                      <div className="pt-10 sm:pt-5">

                {children}
                </div>
              </div>
            </ReduxThemeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}