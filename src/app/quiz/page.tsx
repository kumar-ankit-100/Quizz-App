"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { startQuiz, setTime, decrementTime, submitQuiz } from "@/features/quiz/quizSlice";
import { Navbar } from "@/components/Navbar";
import { QuizLeft } from "@/components/QuizLeft";
import { QuizRight } from "@/components/QuizRight";
import { ResizableDivider } from "@/components/ResizableDivider";
import { MobileMenu } from "@/components/MobileMenu";
import { useRouter } from "next/navigation";
import { ReduxThemeProvider } from "@/providers/ReduxThemeProvider";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Clock, AlertCircle, CheckCircle, Timer, Info } from "lucide-react";

const QUIZ_DURATION = 30 * 60; // 30 minutes in seconds

export default function QuizPage() {
  const dispatch = useDispatch();
  const { questions, timeLeft, quizSubmitted, answers } = useSelector((state: RootState) => state.quiz);
  const router = useRouter();
  const [leftWidth, setLeftWidth] = useState<number>(() => {
    return typeof window !== "undefined" ? parseInt(localStorage.getItem("leftPanelWidth") || "70") : 70;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("leftPanelWidth", leftWidth.toString());
    }
  }, [leftWidth]);

  // Initialize quiz from API
  useEffect(() => {
    if (questions.length === 0 && !isInitialized) {
      async function initQuiz() {
        setIsLoading(true);
        try {
          const res = await fetch("/api/quiz", { method: "POST" });
          const data = await res.json();
          if (data.quizId && data.questions) {
            setQuizId(data.quizId);
            dispatch(startQuiz(data.questions));
            // Set to 30 minutes if no remaining time or set from API
            const initialTime = data.remainingTime || QUIZ_DURATION;
            dispatch(setTime(initialTime));
            console.log("Quiz loaded from API, ID:", data.quizId);
          }
        } catch (error) {
          console.error("Failed to load quiz:", error);
          router.push("/");
        } finally {
          setIsInitialized(true);
          setIsLoading(false);
        }
      }
      initQuiz();
    }
  }, [dispatch, questions.length, isInitialized, router]);

  // Timer management
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (questions.length > 0 && timeLeft > 0 && !quizSubmitted && isInitialized) {
      timer = setInterval(() => dispatch(decrementTime()), 1000);
      
      // Show warning when 5 minutes left
      if (timeLeft === 300 && !showWarning) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 5000);
      }
    } else if (timeLeft <= 0 && !quizSubmitted && isInitialized) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [timeLeft, quizSubmitted, questions.length, dispatch, isInitialized, showWarning]);

  const handleSubmit = async () => {
    if (!quizSubmitted && quizId) {
      try {
        const res = await fetch("/api/quiz", {
          method: "PUT",
          body: JSON.stringify({ quizId, answers }),
        });
        const data = await res.json();
        console.log("Quiz submitted, response:", data);
        dispatch(submitQuiz());
        if (data.quiz && data.quiz.id) {
          router.push(`/quiz/${data.quiz.id}`);
        } else {
          console.error("Quiz report not found in response:", data);
        }
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get time color based on remaining time
  const getTimeColor = () => {
    if (timeLeft <= 300) return "text-red-500 dark:text-red-400"; // Last 5 minutes
    if (timeLeft <= 600) return "text-amber-500 dark:text-amber-400"; // Last 10 minutes
    return "text-emerald-500 dark:text-emerald-400";
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    return (timeLeft / QUIZ_DURATION) * 100;
  };

  // Get progress color
  const getProgressColor = () => {
    if (timeLeft <= 300) return "from-red-500 to-rose-600";
    if (timeLeft <= 600) return "from-amber-500 to-orange-600";
    return "from-emerald-500 to-teal-600";
  };

  if (isLoading) {
    return (
      <ReduxThemeProvider>
        <SignedIn>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading Quiz</h2>
              <p className="text-gray-600 dark:text-gray-400">Preparing your questions...</p>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ReduxThemeProvider>
    );
  }

  return (
    <ReduxThemeProvider>
      <SignedIn>
        <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Navbar />
          
          {/* Timer Bar - Fixed at top */}
          <div className="fixed top-16 sm:top-18 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${timeLeft <= 300 ? 'bg-red-100 dark:bg-red-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'} animate-pulse`}>
                    <Timer className={`w-5 h-5 ${getTimeColor()}`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Time Remaining</p>
                    <p className={`text-2xl font-bold ${getTimeColor()} tabular-nums`}>
                      {formatTime(timeLeft)}
                    </p>
                  </div>
                </div>
                
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {Object.keys(answers).length}/{questions.length} Answered
                    </span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={quizSubmitted}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-1000 ease-linear`}
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Warning Alert */}
          {showWarning && (
            <div className="fixed top-32 sm:top-36 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
              <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 animate-pulse" />
                <div>
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm">Only 5 minutes remaining</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden pt-24 sm:pt-28">
            <div className="hidden lg:flex flex-col overflow-hidden" style={{ width: `${leftWidth}%` }}>
              <QuizLeft />
            </div>
            <ResizableDivider onResize={setLeftWidth} />
            <div 
              className={`flex-col overflow-hidden ${mobileOpen ? "flex absolute inset-0 z-50 lg:relative" : "hidden lg:flex"}`} 
              style={{ width: mobileOpen ? "100%" : `${100 - leftWidth}%` }}
            >
              <QuizRight handleSubmit={handleSubmit} setMobileOpen={setMobileOpen} />
            </div>
            <MobileMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          </div>

          {/* Mobile Submit Button */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <button
              onClick={handleSubmit}
              disabled={quizSubmitted}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz ({Object.keys(answers).length}/{questions.length})
            </button>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, 10%);
          }
          100% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </ReduxThemeProvider>
  );
}