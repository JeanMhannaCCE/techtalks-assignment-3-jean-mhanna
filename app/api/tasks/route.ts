import { NextResponse } from "next/server";
import { tasks } from "@/lib/data";

// GET
export async function GET() {
  return NextResponse.json(tasks);
}

// POST
export async function POST(req: Request) {
  const body: { title: string } = await req.json();

  const title = String(body.title ?? "").trim();

  if (!title) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false,
  };

  tasks.push(newTask);

  return NextResponse.json(newTask, { status: 201 });
}