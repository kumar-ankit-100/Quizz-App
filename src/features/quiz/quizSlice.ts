import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Define the initial state interface
interface QuizState {
  questions: { id: number; question: string; options: string[]; correctAnswer: number }[];
  currentQuestion: number;
  answers: Record<number, number>;
  markedForReview: Record<number, boolean>;
  timeLeft: number;
  quizStarted: boolean;
  quizSubmitted: boolean;
}

const initialState: QuizState = {
  questions: [],
  currentQuestion: 0,
  answers: {},
  markedForReview: {},
  timeLeft: 0,
  quizStarted: false,
  quizSubmitted: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (state, action: PayloadAction<{ id: number; question: string; options: string[]; correctAnswer: number }[]>) => {
      state.questions = action.payload;
      state.quizStarted = true;
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestion = action.payload;
    },
    setAnswer: (state, action: PayloadAction<{ index: number; answer: number }>) => {
      state.answers[action.payload.index] = action.payload.answer;
    },
    toggleMark: (state, action: PayloadAction<number>) => {
      const questionId = action.payload;
      state.markedForReview[questionId] = !state.markedForReview[questionId];
    },
    resetAnswer: (state, action: PayloadAction<number>) => {
      const questionId = action.payload;
      delete state.answers[questionId];
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.timeLeft = action.payload;
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    submitQuiz: (state) => {
      state.quizSubmitted = true;
    },
    resetQuiz: (state) => {
      state.currentQuestion = 0;
      state.answers = {};
      state.markedForReview = {};
      state.timeLeft = 30 * 60;
      state.quizSubmitted = false;
    },
  },
});

export const {
  startQuiz,
  setCurrentQuestion,
  setAnswer,
  toggleMark,
  resetAnswer,
  setTime,
  decrementTime,
  submitQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;