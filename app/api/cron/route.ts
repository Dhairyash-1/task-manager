import { connectDB } from "@/config"
import Todo, { ITodo } from "@/models/todo.model"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    connectDB()
    console.log("started execute cron job")
    const recurringTodos = await Todo.find({ isRecurring: true })

    if (!recurringTodos || recurringTodos.length === 0) {
      return NextResponse.json({
        message: "No recurring task present for today",
      })
    }

    const now = new Date()

    for (const todo of recurringTodos) {
      await processRecurringTodo(todo, now)
    }
    console.log("finish execute cron job")

    return NextResponse.json(
      {
        message: "Recurring tasks processed successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.log("Error in creating recurring task", error)
  }
}

async function processRecurringTodo(todo: ITodo, now: Date) {
  let shouldExecute = false
  switch (todo.frequency) {
    case "DAILY":
      shouldExecute = true
      break
    case "WEEKLY":
      if (todo.day && todo.day === now.getUTCDay()) {
        shouldExecute = true
      }
      break
    case "MONTHLY":
      if (todo.date && todo.date === now.getUTCDate()) {
        shouldExecute = true
      }
      break
  }

  if (shouldExecute) {
    await executeTodo(todo)
  }
}

async function executeTodo(todo: ITodo) {
  const newTask = todo.toObject()
  delete newTask._id
  delete newTask.createdAt
  delete newTask.updatedAt

  await Todo.create({
    ...newTask,
    isRecurring: false,
    day: undefined,
    date: undefined,
    frequency: "NONE",
  })
}
