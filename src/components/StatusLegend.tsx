"use client";

import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export function StatusLegend() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const { answers, markedForReview, questions } = useSelector((state: RootState) => state.quiz);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-green-500"></div>
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Answered ({Object.keys(answers).filter((k) => !markedForReview[parseInt(k)]).length})
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gray-400"></div>
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Not Answered ({questions.length - Object.keys(answers).length})
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-orange-500"></div>
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Marked for Review ({Object.keys(markedForReview).filter((k) => !answers[parseInt(k)]).length})
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-yellow-500"></div>
        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Answered & Marked ({Object.keys(markedForReview).filter((k) => answers[parseInt(k)] !== undefined).length})
        </span>
      </div>
    </div>
  );
}