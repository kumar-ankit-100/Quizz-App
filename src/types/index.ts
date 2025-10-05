// src/types/quizData.ts
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const mockQuestions: Question[] = [
  { id: 1, question: "What is React?", options: ["A library for building UIs", "A database", "A backend framework", "A CSS framework"], correctAnswer: 0 },
  { id: 2, question: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"], correctAnswer: 0 },
  { id: 3, question: "Which hook is used for side effects?", options: ["useState", "useEffect", "useContext", "useMemo"], correctAnswer: 1 },
  { id: 4, question: "What is the virtual DOM?", options: ["A programming language", "A lightweight copy of the actual DOM", "A database", "A CSS framework"], correctAnswer: 1 },
  { id: 5, question: "What is npm?", options: ["Node Package Manager", "New Programming Method", "Network Protocol Manager", "Node Process Monitor"], correctAnswer: 0 },
  { id: 6, question: "What is the purpose of useState?", options: ["To manage side effects", "To manage component state", "To fetch data", "To style components"], correctAnswer: 1 },
  { id: 7, question: "What is a component in React?", options: ["A function or class that returns JSX", "A database table", "A CSS file", "A server"], correctAnswer: 0 },
  { id: 8, question: "What is Next.js?", options: ["A CSS framework", "A React framework for production", "A database", "A testing library"], correctAnswer: 1 },
  { id: 9, question: "What does SSR stand for?", options: ["Server Side Rendering", "Static Site Rendering", "Single Source Rendering", "Secure Server Rendering"], correctAnswer: 0 },
  { id: 10, question: "What is TypeScript?", options: ["A JavaScript superset with types", "A database", "A CSS preprocessor", "A testing framework"], correctAnswer: 0 },
  { id: 11, question: "What is the purpose of useCallback?", options: ["To memoize functions", "To fetch data", "To manage state", "To style components"], correctAnswer: 0 },
  { id: 12, question: "What is Redux?", options: ["A state management library", "A database", "A CSS framework", "A testing tool"], correctAnswer: 0 },
  { id: 13, question: "What is API?", options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Process Interface", "Application Protocol Integration"], correctAnswer: 0 },
  { id: 14, question: "What is REST?", options: ["Representational State Transfer", "Remote Execution State Transfer", "Rapid Execution System Transfer", "Remote State Testing"], correctAnswer: 0 },
  { id: 15, question: "What is Git?", options: ["A version control system", "A database", "A programming language", "A web server"], correctAnswer: 0 },
];