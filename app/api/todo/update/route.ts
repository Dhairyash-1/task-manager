import { connectDB } from "@/db"
import { authMiddleware, AuthenticatedRequest } from "@/lib/authMiddleware"
import Todo from "@/models/todo.model"
import { NextRequest, NextResponse } from "next/server"

async function handler(request: AuthenticatedRequest) {
  try {
    // Connect to the database
    await connectDB()

    // Parse the request body
    const reqBody = await request.json()
    const { title, status, priority, deadline, description } = reqBody

    // Get the ID from the URL
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    const ownerId = request.userId

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is missing" },
        { status: 400 }
      )
    }

    // Find the task by ID
    const task: any = await Todo.findById(id)

    if (!task) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    if (task.owner.toString() !== ownerId?.toString()) {
      return NextResponse.json(
        { error: "Only owner can update todo" },
        { status: 429 }
      )
    }
    // Update the task
    // For example, assuming `task` is an object with a method `update` or similar:
    task.title = title ?? task.title
    task.status = status ?? task.status
    task.priority = priority ?? task.priority
    task.deadline = deadline ? new Date(deadline) : null
    task.description = description ?? task.description

    await task.save()

    return NextResponse.json({ success: true, task }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while updating the to-do" },
      { status: 500 }
    )
  }
}

export const PATCH = authMiddleware(handler)
