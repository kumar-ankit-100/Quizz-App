import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes";

interface ReportChartsProps {
  results: { correct: number; incorrect: number; unanswered: number; total: number; percentage: string };
  questions: any[];
  answers: Record<number, number>;
}

export function ReportCharts({ results, questions, answers }: ReportChartsProps) {
  const { theme } = useTheme();
  const darkMode = theme === "dark";
  const pieData = [
    { name: "Correct", value: results.correct, color: "#10b981" },
    { name: "Incorrect", value: results.incorrect, color: "#ef4444" },
    { name: "Unanswered", value: results.unanswered, color: "#6b7280" },
  ];
  const barData = questions.map((q, idx) => ({
    question: `Q${idx + 1}`,
    status: answers[q.id] === q.correctAnswer ? 100 : answers[q.id] !== undefined ? 0 : -1,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Score Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Question-wise Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="question" />
            <YAxis hide />
            <Tooltip formatter={(value) => (value === 100 ? "Correct" : value === 0 ? "Incorrect" : "Unanswered")} />
            <Bar dataKey="status" fill="#8884d8">
              {barData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.status === 100 ? "#10b981" : entry.status === 0 ? "#ef4444" : "#6b7280"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}