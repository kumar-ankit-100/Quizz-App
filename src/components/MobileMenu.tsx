import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setCurrentQuestion } from "@/features/quiz/quizSlice";
import { X } from "lucide-react";
import { useTheme } from "next-themes";

interface MobileMenuProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function MobileMenu({ mobileOpen, setMobileOpen }: MobileMenuProps) {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const dispatch = useDispatch();
  const { questions, currentQuestion, answers, markedForReview } = useSelector((state: RootState) => state.quiz);

  const getQuestionStatus = (questionId: number): string => {
    if (markedForReview[questionId] && answers[questionId] !== undefined) return "marked-answered";
    if (markedForReview[questionId]) return "marked";
    if (answers[questionId] !== undefined) return "answered";
    return "unanswered";
  };

  if (!mobileOpen) return null;

  return (
    <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button onClick={() => setMobileOpen(false)} className="text-right w-full">
          <X className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-900"}`} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const status = getQuestionStatus(q.id);
            const buttonStyle = {
              answered: darkMode ? "bg-green-600" : "bg-green-500",
              "marked-answered": darkMode ? "bg-yellow-600" : "bg-yellow-500",
              marked: darkMode ? "bg-orange-600" : "bg-orange-500",
              unanswered: darkMode ? "bg-gray-600" : "bg-gray-200",
            }[status];
            return (
              <button
                key={q.id}
                onClick={() => {
                  dispatch(setCurrentQuestion(idx));
                  setMobileOpen(false);
                }}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${buttonStyle} hover:opacity-90 ${
                  currentQuestion === idx ? "ring-2 ring-blue-500" : ""
                }`}
              >
                Question {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}