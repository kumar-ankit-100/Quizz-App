// src/app/api/quiz/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    const quiz = await prisma.quiz.findUnique({
      where: { id: id, userId: user.id },
    });

    if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}