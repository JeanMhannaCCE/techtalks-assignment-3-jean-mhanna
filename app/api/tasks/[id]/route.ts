import { NextResponse } from "next/server";
import { tasks } from "@/lib/data";

// GET one
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(task);
}

// PATCH
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body: { title?: string; completed?: boolean } = await req.json();
  const { id: idParam } = await params;
  const id = Number(idParam);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  if (body.title === undefined && body.completed === undefined) {
    return NextResponse.json({ message: "Update body cannot be empty" }, { status: 400 });
  }

  if (body.title !== undefined) {
    const title = String(body.title).trim();
    if (!title) {
      return NextResponse.json({ message: "Title cannot be empty" }, { status: 400 });
    }
    task.title = title;
  }

  if (body.completed !== undefined) {
    task.completed = Boolean(body.completed);
  }

  return NextResponse.json({ message: "Updated", task });
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }

  const deletedTask = tasks.splice(index, 1)[0];

  return NextResponse.json({ message: "Deleted", task: deletedTask });
}