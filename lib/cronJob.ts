import { connectDB } from "@/config"
import Todo, { ITodo } from "@/models/todo.model"
import cron from "node-cron"
declare global {
  var cronScheduled: boolean | undefined
}
// Schedule cron job when the server starts
cron.schedule("0 0 * * *", jobFunction)

async function jobFunction() {
  if (global.cronScheduled) {
    console.log("Cron jobs already scheduled.")
    return
  }
  try {
    await connectDB() // Ensure the DB connection is established
    const recurringTodos = await Todo.find({ isRecurring: true })

    if (!recurringTodos || recurringTodos.length === 0) {
      console.log("No recurring tasks present for today")
      return
    }

    const now = new Date()

    for (const todo of recurringTodos) {
      await processRecurringTodo(todo, now)
    }
    global.cronScheduled = true

    console.log("Finished executing cron job")
  } catch (error) {
    console.log("Error in executing cron job", error)
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
