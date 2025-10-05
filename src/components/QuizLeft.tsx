// src/components/QuizLeft.tsx
"use client";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setAnswer, toggleMark, setCurrentQuestion, resetAnswer } from "@/features/quiz/quizSlice";
import { Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

export function QuizLeft() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const dispatch = useDispatch();
  const { questions, currentQuestion, answers, markedForReview } = useSelector((state: RootState) => state.quiz);
  const q = questions[currentQuestion];

  if (!q) return null;

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex-1 overflow-y-auto p-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-3xl mx-auto">
        <div className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>{q.question}</h2>
        <div className="space-y-4 mb-8">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => dispatch(setAnswer({ index: q.id, answer: index }))}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                answers[q.id] === index
                  ? darkMode
                    ? "border-blue-500 bg-blue-500/20 text-white"
                    : "border-blue-500 bg-blue-50 text-gray-900"
                  : darkMode
                  ? "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                  : "border-gray-200 bg-white text-gray-900 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    answers[q.id] === index
                      ? "border-blue-500 bg-blue-500"
                      : darkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  }`}
                >
                  {answers[q.id] === index && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => dispatch(toggleMark(q.id))}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              markedForReview[q.id]
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Flag className="w-5 h-5" />
            <span>{markedForReview[q.id] ? "Marked" : "Mark for Review"}</span>
          </button>
          <button
            onClick={() => dispatch(resetAnswer(q.id))}
            className={`px-6 py-3 rounded-lg font-medium transition-all bg-red-500 text-white hover:bg-red-600`}
          >
            Clear Answer
          </button>
          <div className="flex space-x-3">
            <button
              onClick={() => dispatch(setCurrentQuestion(Math.max(0, currentQuestion - 1)))}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentQuestion === 0
                  ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => dispatch(setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1)))}
              disabled={currentQuestion === questions.length - 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentQuestion === questions.length - 1
                  ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}