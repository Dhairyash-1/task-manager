import { connectDB } from "@/db"
import { AuthenticatedRequest, authMiddleware } from "@/lib/authMiddleware"
import Todo from "@/models/todo.model"
import { NextResponse } from "next/server"

async function handler(request: AuthenticatedRequest) {
  try {
    connectDB()
    const ownerId = request.userId

    const todos = await Todo.find({ owner: ownerId })

    if (!todos) {
      return NextResponse.json({ error: "No todos found" }, { status: 404 })
    }

    return NextResponse.json(
      { message: "All User todos fetched", todo: todos },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error getting all to-do:", error)
    return NextResponse.json(
      { error: "An error occurred while getting user todos" },
      { status: 500 }
    )
  }
}

export const GET = authMiddleware(handler)
