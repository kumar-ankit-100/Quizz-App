import { useTheme } from "next-themes";

interface ReportQuestionListProps {
  questions: any[];
  answers: Record<number, number>;
}

export function ReportQuestionList({ questions, answers }: ReportQuestionListProps) {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
      <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Question Review</h3>
      <ul className="space-y-4">
        {questions.map((q, idx) => {
          const isCorrect = answers[q.id] === q.correctAnswer;
          const statusColor = isCorrect
            ? "text-green-500"
            : answers[q.id] !== undefined
            ? "text-red-500"
            : "text-gray-500";
          return (
            <li key={q.id} className={`p-4 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}>
              <div className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                Q{idx + 1}: {q.question}
              </div>
              <div className="mt-2">
                Your Answer: <span className={statusColor}>{answers[q.id] !== undefined ? q.options[answers[q.id]] : "Not Answered"}</span>
              </div>
              <div className="mt-1">
                Correct Answer: <span className="text-blue-500">{q.options[q.correctAnswer]}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}