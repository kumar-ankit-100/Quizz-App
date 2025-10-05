// src/app/quiz/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import { ReportSummary } from "@/components/ReportSummary";
import { ReportCharts } from "@/components/ReportCharts";
import { ReportAnalysis } from "@/components/ReportAnalysis";
import { ReportQuestionList } from "@/components/ReportQuestionList";
import { ReduxThemeProvider } from "@/providers/ReduxThemeProvider";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { ArrowLeft, Calendar, Clock, TrendingUp, Award, Sparkles } from "lucide-react";

interface Quiz {
  id: string;
  questions: any[];
  answers: Record<number, number>;
  score: number;
  createdAt: string;
}

export default function QuizReportPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (quizId) {
      fetchQuiz(quizId);
    }
  }, [quizId]);

  const fetchQuiz = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/quiz/${id}`);
      const data = await res.json();
      console.log("Fetched quiz data:", data.questions);
      
      let parsedQuestions: any[] = [];
      try {
        parsedQuestions = JSON.parse(data.questions);
      } catch (error) {
        console.error("Error parsing questions:", error);
        parsedQuestions = [];
      }
      
      setQuizQuestions(parsedQuestions);
      setQuiz(data);
      
      let quizAns: any[] = [];
      quizAns = JSON.parse(data.answers);
      setQuizAnswers(quizAns);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateResults = (questions: any[], answers: Record<number, number>) => {
    let correct = 0, incorrect = 0, unanswered = 0;
    console.log("Calculating results with questions:", questions);
    console.log("Calculating results with answers:", answers);
    
    let newAnswers: any[] = [];
    newAnswers = JSON.parse(answers);
    
    for (const q of questions) {
      const ans = newAnswers[q.id];
      if (ans === undefined) unanswered++;
      else if (ans === q.correctAnswer) correct++;
      else incorrect++;
    }

    const total = questions.length;
    const percentage = total > 0 ? ((correct / total) * 100).toFixed(1) : "0.0";
    return { correct, incorrect, unanswered, total, percentage };
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) return { label: "Outstanding", color: "from-emerald-500 to-teal-500", icon: "🏆" };
    if (percentage >= 80) return { label: "Excellent", color: "from-blue-500 to-cyan-500", icon: "⭐" };
    if (percentage >= 70) return { label: "Good", color: "from-purple-500 to-pink-500", icon: "👍" };
    if (percentage >= 60) return { label: "Fair", color: "from-amber-500 to-orange-500", icon: "📈" };
    return { label: "Keep Practicing", color: "from-red-500 to-rose-500", icon: "💪" };
  };

  if (loading) {
    return (
      <ReduxThemeProvider>
        <SignedIn>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <Navbar />
            <div className="pt-24 flex flex-col items-center justify-center min-h-screen">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 font-medium">Loading your quiz report...</p>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ReduxThemeProvider>
    );
  }

  if (!quiz) {
    return (
      <ReduxThemeProvider>
        <SignedIn>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <Navbar />
            <div className="pt-24 flex flex-col items-center justify-center min-h-screen">
              <p className="text-xl text-gray-600 dark:text-gray-400">Quiz not found</p>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </ReduxThemeProvider>
    );
  }

  const results = calculateResults(quizQuestions, quiz.answers);
  const formatTime = () => "N/A";
  const badge = getPerformanceBadge(parseFloat(results.percentage));

  return (
    <ReduxThemeProvider>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
          <Navbar />
          
          <div className="pt-20 sm:pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => router.push("/all-quizzes")}
                className="group mb-6 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">Back to All Quizzes</span>
              </button>

              {/* Hero Header */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 mb-8 shadow-2xl animate-fade-in">
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-bounce-slow">
                            <Award className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              Quiz Report
                            </h1>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">
                                  {new Date(quiz.createdAt).toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{formatTime()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Badge */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className={`relative bg-gradient-to-r ${badge.color} rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                          <div className="text-center">
                            <div className="text-4xl mb-2">{badge.icon}</div>
                            <div className="text-3xl font-bold mb-1">{results.percentage}%</div>
                            <div className="text-sm font-medium opacity-90">{badge.label}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Correct</span>
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{results.correct}</div>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-red-600 dark:text-red-400 text-sm font-medium">Incorrect</span>
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="text-2xl font-bold text-red-700 dark:text-red-300">{results.incorrect}</div>
                      </div>

                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">Unanswered</span>
                          <Clock className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{results.unanswered}</div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 transform hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total</span>
                          <Award className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{results.total}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="space-y-6">
                <div className="animate-slide-in" style={{ animationDelay: "100ms" }}>
                  {/* <ReportSummary results={results} /> */}
                </div>
                
                <div className="animate-slide-in" style={{ animationDelay: "200ms" }}>
                  <ReportCharts results={results} questions={quizQuestions} answers={quiz.answers} />
                </div>
                
                <div className="animate-slide-in" style={{ animationDelay: "300ms" }}>
                  <ReportAnalysis results={results} timeTaken={formatTime()} />
                </div>
                
                <div className="animate-slide-in" style={{ animationDelay: "400ms" }}>
                  <ReportQuestionList questions={quizQuestions} answers={quizAnswers} />
                </div>
              </div>
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
            transform: translateY(-20px);
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

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </ReduxThemeProvider>
  );
}