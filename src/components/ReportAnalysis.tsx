import { useTheme } from "next-themes";

interface ReportAnalysisProps {
  results: { correct: number; incorrect: number; unanswered: number; total: number; percentage: string };
  timeTaken: string;
}

export function ReportAnalysis({ results, timeTaken }: ReportAnalysisProps) {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
      <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Performance Analysis</h3>
      <div className="space-y-3">
        {results.percentage >= "80" && (
          <p className={`${darkMode ? "text-green-400" : "text-green-700"} font-medium`}>
            🌟 Excellent! You have a strong understanding of the concepts.
          </p>
        )}
        {results.percentage >= "60" && results.percentage < "80" && (
          <p className={`${darkMode ? "text-blue-400" : "text-blue-700"} font-medium`}>
            👍 Good job! You're on the right track. Review incorrect answers to improve.
          </p>
        )}
        {results.percentage < "60" && (
          <p className={`${darkMode ? "text-orange-400" : "text-orange-700"} font-medium`}>
            📚 Keep practicing! Review concepts to boost your score.
          </p>
        )}
        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Time taken: {timeTaken}</p>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="py-3 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}