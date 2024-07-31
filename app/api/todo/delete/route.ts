import { connectDB } from "@/db"
import { AuthenticatedRequest, authMiddleware } from "@/lib/authMiddleware"
import Todo, { ITodo } from "@/models/todo.model"
import { NextResponse } from "next/server"
// eslint-disabled
async function handler(request: AuthenticatedRequest) {
  try {
    connectDB()
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    console.log("id", id)

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is missing" },
        { status: 400 }
      )
    }

    const ownerId = request.userId

    const task = (await Todo.findById(id)) as ITodo
    if (!task) {
      return NextResponse.json({ error: "task is not found" }, { status: 404 })
    }

    if (task.owner.toString() !== ownerId?.toString()) {
      return NextResponse.json(
        { error: "Only owner can delete task" },
        { status: 429 }
      )
    }

    await task.deleteOne()

    return NextResponse.json(
      { message: "task deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the to-do" },
      { status: 500 }
    )
  }
}

export const DELETE = authMiddleware(handler)
