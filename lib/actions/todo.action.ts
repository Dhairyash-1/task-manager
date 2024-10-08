"use server"
import { connectDB } from "@/config"
import Todo from "@/models/todo.model"
import { revalidatePath } from "next/cache"
import { parseStringify } from "../helper"

export const getAllUserTodo = async (params: GetAllUserTodoParams) => {
  try {
    connectDB()
    const { userId } = params
    const todo = await Todo.find({ owner: userId })
    return parseStringify(todo)
  } catch (error) {
    console.log(error)
  }
}
export const createTodo = async (params: CreateTodoParams) => {
  try {
    connectDB()
    const {
      title,
      status,
      deadline,
      description,
      priority,
      path,
      owner,
      frequency,
      day,
      date,
      isRecurring,
    } = params
    if (!title || !status) {
      throw new Error("Title and status is required to create todo")
    }
    const todo = new Todo({
      title,
      status,
      deadline: deadline ? new Date(deadline) : null,
      description: description || "",
      priority: priority || null,
      owner: owner,
      frequency,
      day,
      date,
      isRecurring,
    })
    await todo.save()
    revalidatePath(path)

    return parseStringify(todo)
  } catch (error) {
    console.log(error)
  }
}
export const updateTodo = async (params: UpdateTodoParams) => {
  try {
    connectDB()
    const { id, updateData, path } = params
    // const todo = await Todo.findById(id)
    const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, updateData)
    revalidatePath(path)
    return parseStringify(updatedTodo)
  } catch (error) {
    console.log(error)
  }
}
export const getTodoById = async (params: GetTodoByIdParams) => {
  try {
    connectDB()
    const { id } = params
    const todo = await Todo.findById(id)
    if (!todo) {
      throw new Error("No Todo found for give ID")
    }
    return parseStringify(todo)
  } catch (error) {
    console.log(error)
  }
}
export const deleteTodo = async (params: DeleteTodoParams) => {
  try {
    connectDB()
    const { id, path } = params

    const deletedTodo = await Todo.findOneAndDelete({ _id: id })
    revalidatePath(path)
    return parseStringify(deletedTodo)
  } catch (error) {
    console.log(error)
  }
}

export const searchTodo = async (params: SearchTodoParams) => {
  try {
    connectDB()
    const { query, userId } = params
    const todo = await Todo.find({
      owner: userId,
      title: { $regex: query, $options: "i" },
    })
    return parseStringify(todo)
  } catch (error) {
    console.log(error)
  }
}
