import { connectDB } from "@/db"
import { authMiddleware, AuthenticatedRequest } from "@/lib/authMiddleware"
import Todo from "@/models/todo.model"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

async function handler(request: AuthenticatedRequest) {
  try {
    await connectDB()
    const reqBody = await request.json()
    const { title, description, status, priority, deadline, path } = reqBody

    if (!title || !status) {
      return NextResponse.json(
        { error: "Title and status are required" },
        { status: 400 }
      )
    }

    // Use the userId from the authenticated request
    const userId = request.userId
    console.log("userid", userId)

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      )
    }

    const newTodo = new Todo({
      title,
      status,
      owner: userId, // Set the owner to the authenticated user's ID
    })
    if (priority) newTodo.priority = priority
    if (description) newTodo.description = description
    if (deadline) newTodo.deadline = new Date(deadline)

    await newTodo.save()
    revalidatePath(path)
    return NextResponse.json(
      { message: "To-do created successfully", todo: newTodo },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating to-do:", error)
    return NextResponse.json(
      { error: "An error occurred while creating the to-do" },
      { status: 500 }
    )
  }
}

export const POST = authMiddleware(handler)
