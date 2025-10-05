import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setCurrentQuestion } from "@/features/quiz/quizSlice";
import { useTheme } from "next-themes";

interface QuizRightProps {
  handleSubmit: () => void;
  setMobileOpen: (open: boolean) => void;
}

export function QuizRight({ handleSubmit, setMobileOpen }: QuizRightProps) {
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

  return (
    <div className={`flex-1 overflow-y-auto p-8 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
      <div className={`rounded-xl p-6 mb-6 ${darkMode ? "bg-gray-700" : "bg-white"} shadow-lg`}>
        <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Question Navigator</h3>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {questions.map((q, idx) => {
            const status = getQuestionStatus(q.id);
            return (
              <button
                key={q.id}
                onClick={() => {
                  dispatch(setCurrentQuestion(idx));
                  setMobileOpen(false);
                }}
                className={`aspect-square rounded-lg font-bold text-sm transition-all transform hover:scale-110 ${
                  currentQuestion === idx ? "ring-4 ring-blue-500 ring-opacity-50" : ""
                } ${
                  status === "answered"
                    ? darkMode
                      ? "bg-green-600 text-white"
                      : "bg-green-500 text-white"
                    : status === "marked-answered"
                    ? darkMode
                      ? "bg-yellow-600 text-white"
                      : "bg-yellow-500 text-white"
                    : status === "marked"
                    ? darkMode
                      ? "bg-orange-600 text-white"
                      : "bg-orange-500 text-white"
                    : darkMode
                    ? "bg-gray-600 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
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
              Marked for Review ({Object.keys(markedForReview).filter((id) => answers[parseInt(id)] === undefined).length})
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-500"></div>
            <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Answered & Marked ({Object.keys(markedForReview).filter((id) => answers[parseInt(id)] !== undefined).length})
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        Submit Quiz
      </button>
    </div>
  );
}