import { useTheme } from "next-themes";

interface ReportSummaryProps {
  results: { correct: number; incorrect: number; unanswered: number; total: number; percentage: string };
}

export function ReportSummary({ results }: ReportSummaryProps) {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div className={`p-6 rounded-xl text-center ${darkMode ? "bg-gray-700" : "bg-gradient-to-br from-green-50 to-green-100"}`}>
        <div className={`text-5xl font-bold ${darkMode ? "text-green-400" : "text-green-600"} mb-2`}>{results.correct}</div>
        <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Correct Answers</div>
      </div>
      <div className={`p-6 rounded-xl text-center ${darkMode ? "bg-gray-700" : "bg-gradient-to-br from-red-50 to-red-100"}`}>
        <div className={`text-5xl font-bold ${darkMode ? "text-red-400" : "text-red-600"} mb-2`}>{results.incorrect}</div>
        <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Incorrect Answers</div>
      </div>
      <div className={`p-6 rounded-xl text-center ${darkMode ? "bg-gray-700" : "bg-gradient-to-br from-gray-50 to-gray-100"}`}>
        <div className={`text-5xl font-bold ${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>{results.unanswered}</div>
        <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Unanswered</div>
      </div>
      <div className={`p-6 rounded-xl text-center ${darkMode ? "bg-gray-700" : "bg-gradient-to-br from-blue-50 to-blue-100"}`}>
        <div className={`text-5xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"} mb-2`}>{results.percentage}%</div>
        <div className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Score</div>
      </div>
    </div>
  );
}