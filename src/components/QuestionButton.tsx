"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setCurrentQuestion } from "@/features/quiz/quizSlice";
import { useTheme } from "next-themes";

interface Props {
  index: number;
  questionId: number;
}

export function QuestionButton({ index, questionId }: Props) {
  const dispatch = useDispatch();
  const { answers, markedForReview } = useSelector((state: RootState) => state.quiz);
  const status =
    markedForReview[questionId] && answers[questionId] !== undefined
      ? "marked-answered"
      : markedForReview[questionId]
      ? "marked"
      : answers[questionId] !== undefined
      ? "answered"
      : "unanswered";
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const getButtonStyle = () => {
    switch (status) {
      case "answered":
        return darkMode ? "bg-green-600 text-white" : "bg-green-500 text-white";
      case "marked-answered":
        return darkMode ? "bg-yellow-600 text-white" : "bg-yellow-500 text-white";
      case "marked":
        return darkMode ? "bg-orange-600 text-white" : "bg-orange-500 text-white";
      default:
        return darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-200 text-gray-700";
    }
  };

  return (
    <button
      onClick={() => dispatch(setCurrentQuestion(index))}
      className={`aspect-square rounded-lg font-bold text-sm transition-all transform hover:scale-110 ${getButtonStyle()} ${
        index === currentQuestion ? "ring-4 ring-blue-500 ring-opacity-50" : ""
      }`}
    >
      {index + 1}
    </button>
  );
}