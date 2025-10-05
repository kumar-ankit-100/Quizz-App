// src/app/api/quiz/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { decode } from "he";

class PrismaClientWithRetry extends PrismaClient {
  constructor() {
    super({
      log: ["query", "info", "warn", "error"],
    });
    this.$connect = this.retryConnect.bind(this);
  }

  private async retryConnect(maxRetries = 5, delayMs = 2000) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await super.$connect();
        console.log("Prisma connected successfully");
        return;
      } catch (error) {
        console.error(`Prisma connection attempt ${i + 1} failed:`, error);
        if (i === maxRetries - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)));
      }
    }
  }
}

const prisma = new PrismaClientWithRetry();

async function fetchOpenTDBQuestions(): Promise<any[]> {
  const response = await fetch("https://opentdb.com/api.php?amount=15&type=multiple");
  const data = await response.json();
  if (data.response_code !== 0) throw new Error("Failed to fetch questions");

  return data.results.map((item: any) => {
    const question = decode(item.question);
    const correctAnswer = decode(item.correct_answer);
    let options = [...item.incorrect_answers.map((ans: string) => decode(ans))];
    options.push(correctAnswer);
    options = options.sort(() => Math.random() - 0.5);

    if (item.type === "boolean") {
      options = [correctAnswer, ...item.incorrect_answers.map((ans: string) => decode(ans === "True" ? "False" : "True"))];
      options = options.sort(() => Math.random() - 0.5);
    }

    return {
      id: Date.now() + Math.random(),
      question,
      options,
      correctAnswer: options.indexOf(correctAnswer),
    };
  });
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const quizzes = await prisma.quiz.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ quizzes });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST() {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const questions = await fetchOpenTDBQuestions();
    const quiz = await prisma.quiz.create({
      data: {
        userId: user.id,
        questions: JSON.stringify(questions),
        answers: JSON.stringify({}),
        startTime: new Date(),
        score: 0,
      },
    });

    return NextResponse.json({ quizId: quiz.id, questions, remainingTime: 30 * 60 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { quizId, answers } = body;
    console.log("PUT request body:", body); // Debug the incoming data

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz || quiz.userId !== user.id) {
      return NextResponse.json({ error: "Quiz not found or unauthorized" }, { status: 404 });
    }

    const questions = JSON.parse(quiz.questions as string) as any[];
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });

    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: { endTime: new Date(), answers: JSON.stringify(answers), score },
    });

    console.log("Updated quiz:", updatedQuiz); // Debug the updated data
    return NextResponse.json({ quiz: updatedQuiz });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}