import { Clock, CheckCircle, Flag, Sparkles, Trophy, Target, Zap, BookOpen, Award } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { mockQuestions } from "@/types/index";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton, SignedOut, SignedIn } from "@clerk/nextjs";

export function StartCard() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isSignedIn } = useAuth();
  const darkMode = theme === "dark";
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log("StartCard mounted, isSignedIn:", isSignedIn);
  }, [isSignedIn]);

  const handleStartQuiz = () => {
    console.log("Start Quiz button clicked, isSignedIn:", isSignedIn);
    if (isSignedIn) {
      router.push("/quiz");
    } else {
      setShowSignInPrompt(true);
    }
  };

  const handleClosePrompt = () => {
    setShowSignInPrompt(false);
  };

  return (
    <>
      <div className={`max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden animate-fade-in ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Trophy className="w-10 h-10 text-purple-600 animate-bounce-slow" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              CausalFunnel Quiz Challenge
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Test your knowledge and compete with the best! {mockQuestions.length} challenging questions await.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Clock className="w-8 h-8" />
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <p className="text-sm font-medium opacity-90 mb-1">Duration</p>
                <p className="text-3xl font-bold">30 Min</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Target className="w-8 h-8" />
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <p className="text-sm font-medium opacity-90 mb-1">Questions</p>
                <p className="text-3xl font-bold">{mockQuestions.length}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Award className="w-8 h-8" />
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <p className="text-sm font-medium opacity-90 mb-1">Total Marks</p>
                <p className="text-3xl font-bold">100</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className={`p-4 rounded-xl border-2 ${
              darkMode ? "bg-gray-700/50 border-blue-500/30" : "bg-blue-50 border-blue-200"
            } transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Instant Results</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Get feedback immediately</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              darkMode ? "bg-gray-700/50 border-purple-500/30" : "bg-purple-50 border-purple-200"
            } transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Progress Tracking</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Monitor your answers</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              darkMode ? "bg-gray-700/50 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"
            } transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Flag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Mark for Review</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Revisit any question</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              darkMode ? "bg-gray-700/50 border-amber-500/30" : "bg-amber-50 border-amber-200"
            } transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Detailed Report</p>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>View full analysis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className={`p-6 rounded-2xl mb-8 border ${
            darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
          }`}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Quiz Guidelines
              </h3>
            </div>
            <ul className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Each question has 4 options with only one correct answer</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <span>Navigate using Next/Previous buttons or question palette</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <span>Mark questions for review to revisit them later</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                <span>Quiz auto-submits if you navigate away or when time expires</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">5</span>
                <span>Submit before the 30-minute timer runs out</span>
              </li>
            </ul>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartQuiz}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
              <span>Start Quiz Now</span>
              <Zap className={`w-6 h-6 ${isHovered ? 'animate-bounce' : ''}`} />
            </div>
          </button>

          <p className={`text-center text-sm mt-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Ready to challenge yourself? Let's begin! 🚀
          </p>
        </div>
      </div>

      {/* Sign-in Prompt Modal */}
      {showSignInPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className={`rounded-3xl shadow-2xl w-full max-w-md transform animate-scale-in ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}>
            {/* Modal Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 rounded-t-3xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <button
                onClick={handleClosePrompt}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative z-10 text-center text-white">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Trophy className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
                <p className="text-white/90 text-sm">Join us to start your quiz journey!</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <SignedOut>
                <div className="space-y-4">
                  <SignInButton>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-base h-12 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                      <span>Sign In</span>
                      <Zap className="w-5 h-5" />
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-base h-12 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                      <span>Create Account</span>
                      <Sparkles className="w-5 h-5" />
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
              
              <SignedIn>
                <button
                  onClick={() => router.push("/quiz")}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold text-base h-12 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Continue to Quiz</span>
                  <CheckCircle className="w-5 h-5" />
                </button>
              </SignedIn>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}