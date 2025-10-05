// src/app/all-quizzes/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import { ReduxThemeProvider } from "@/providers/ReduxThemeProvider";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Calendar, Trophy, ArrowRight, TrendingUp, BookOpen, Sparkles, Target, CheckCircle, XCircle, Clock } from "lucide-react";

interface Quiz {
  id: string;
  score: number;
  createdAt: string;
  questions: string;
  answers: string;
}

interface QuizStats {
  correct: number;
  incorrect: number;
  unanswered: number;
  attempted: number;
  total: number;
  percentage: number;
}

export default function AllQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      fetchQuizzes();
    }
  }, [isSignedIn]);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quiz");
      const data = await res.json();
      console.log("Fetched quizzes data:", data);
      setQuizzes(data.quizzes || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateQuizStats = (quiz: Quiz): QuizStats => {
    try {
      // Parse the JSON strings
      const questions = typeof quiz.questions === 'string' 
        ? JSON.parse(quiz.questions) 
        : quiz.questions;
      
      const answers = typeof quiz.answers === 'string' 
        ? JSON.parse(quiz.answers) 
        : quiz.answers;
      
      let correct = 0;
      let incorrect = 0;
      let unanswered = 0;

      // Iterate through questions
      for (const q of questions) {
        const userAnswer = answers[q.id];
        
        if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
          unanswered++;
        } else if (userAnswer === q.correctAnswer) {
          correct++;
        } else {
          incorrect++;
        }
      }

      const total = questions.length;
      const attempted = correct + incorrect;
      const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

      return { correct, incorrect, unanswered, attempted, total, percentage };
    } catch (error) {
      console.error("Error calculating quiz stats:", error, quiz);
      return { 
        correct: 0, 
        incorrect: 0, 
        unanswered: 0, 
        attempted: 0, 
        total: 0, 
        percentage: 0 
      };
    }
  };

  const viewReport = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-emerald-500 dark:text-emerald-400";
    if (percentage >= 60) return "text-blue-500 dark:text-blue-400";
    if (percentage >= 40) return "text-amber-500 dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 80) return { label: "Excellent", color: "bg-emerald-500" };
    if (percentage >= 60) return { label: "Good", color: "bg-blue-500" };
    if (percentage >= 40) return { label: "Fair", color: "bg-amber-500" };
    return { label: "Needs Work", color: "bg-red-500" };
  };

  const calculateOverallStats = () => {
    if (quizzes.length === 0) return { 
      avgScore: 0, 
      avgPercentage: 0,
      bestScore: 0, 
      totalQuizzes: 0,
      totalAttempted: 0,
      totalCorrect: 0,
      totalQuestions: 0
    };

    let totalCorrect = 0;
    let totalAttempted = 0;
    let totalQuestions = 0;
    let bestPercentage = 0;

    quizzes.forEach(quiz => {
      const stats = calculateQuizStats(quiz);
      totalCorrect += stats.correct;
      totalAttempted += stats.attempted;
      totalQuestions += stats.total;
      if (stats.percentage > bestPercentage) {
        bestPercentage = stats.percentage;
      }
    });

    return {
      avgScore: totalQuestions > 0 ? Math.round(totalCorrect / quizzes.length) : 0,
      avgPercentage: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
      bestScore: bestPercentage,
      totalQuizzes: quizzes.length,
      totalAttempted: totalAttempted,
      totalCorrect: totalCorrect,
      totalQuestions: totalQuestions
    };
  };

  const stats = calculateOverallStats();

  return (
    <ReduxThemeProvider>
      <SignedIn>
        <Navbar />
        
        <div className="mt-5 pb-12 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 min-h-screen transition-colors duration-500">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/30">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Your Quiz Journey
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Track your progress, review past quizzes, and watch your skills grow over time
              </p>
            </div>

            {/* Stats Cards */}
            {quizzes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Quizzes</span>
                      <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalQuizzes}</p>
                    <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Avg Score</span>
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgPercentage}%</p>
                    <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${stats.avgPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Best Score</span>
                      <Trophy className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.bestScore}%</p>
                    <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${stats.bestScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Correct</span>
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCorrect}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">of {stats.totalQuestions}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quizzes List */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative inline-block mb-6">
                    <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your quizzes...</p>
                </div>
              ) : quizzes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full mb-6">
                    <Sparkles className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No quizzes yet!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Start your learning journey by taking your first quiz</p>
                  <button
                    onClick={() => router.push("/")}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
                  >
                    <span>Take Your First Quiz</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                    Quiz History
                  </h2>
                  {quizzes.map((quiz, index) => {
                    const quizStats = calculateQuizStats(quiz);
                    const badge = getScoreBadge(quizStats.percentage);
                    
                    return (
                      <div
                        key={quiz.id}
                        className="group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 animate-slide-in border border-gray-200/50 dark:border-gray-700/50"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative p-6">
                          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                <Calendar className="w-6 h-6 text-white" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Quiz on {new Date(quiz.createdAt).toLocaleDateString('en-US', { 
                                      month: 'long', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    })}
                                  </h3>
                                  <span className={`px-2 py-1 ${badge.color} text-white text-xs font-medium rounded-full`}>
                                    {badge.label}
                                  </span>
                                </div>
                                
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <div className="text-sm">
                                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{quizStats.correct}</span>
                                      <span className="text-gray-500 dark:text-gray-400 ml-1">Correct</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <XCircle className="w-4 h-4 text-red-500" />
                                    <div className="text-sm">
                                      <span className="font-bold text-red-600 dark:text-red-400">{quizStats.incorrect}</span>
                                      <span className="text-gray-500 dark:text-gray-400 ml-1">Wrong</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-amber-500" />
                                    <div className="text-sm">
                                      <span className="font-bold text-amber-600 dark:text-amber-400">{quizStats.unanswered}</span>
                                      <span className="text-gray-500 dark:text-gray-400 ml-1">Skipped</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <Trophy className="w-4 h-4 text-purple-500" />
                                    <div className="text-sm">
                                      <span className={`font-bold ${getScoreColor(quizStats.percentage)}`}>{quizStats.percentage}%</span>
                                      <span className="text-gray-500 dark:text-gray-400 ml-1">Score</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full bg-gradient-to-r ${
                                      quizStats.percentage >= 80 
                                        ? 'from-emerald-500 to-teal-500' 
                                        : quizStats.percentage >= 60 
                                        ? 'from-blue-500 to-purple-500'
                                        : quizStats.percentage >= 40
                                        ? 'from-amber-500 to-orange-500'
                                        : 'from-red-500 to-rose-500'
                                    } rounded-full transition-all duration-500`}
                                    style={{ width: `${quizStats.percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => viewReport(quiz.id)}
                              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                            >
                              <span>View Report</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.4s ease-out forwards;
          opacity: 0;
        }

        /* Smooth theme transitions */
        * {
          transition-property: background-color, border-color, color, box-shadow;
          transition-duration: 500ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </ReduxThemeProvider>
  );
}