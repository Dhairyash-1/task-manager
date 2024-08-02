"use client"

import React, { useEffect, useState } from "react"
import TaskActionBar from "./TaskActionBar"
import TaskItemCard from "./TaskItemCard"
import Column from "./Column"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import axios from "axios"
import { fetchTodos } from "@/lib/api"
import Loader from "./Loader"
import { useTodo } from "@/context/TodoContext"

interface Task {
  _id: string
  title: string
  status: string
  description: string
  deadline: string
  priority: string
  createdAt: string
  updatedAt: string
}

const TaskBoard = () => {
  const { tasks, setTasks } = useTodo()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTasks() {
      try {
        const todos = await fetchTodos()
        setTasks(todos)
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  async function handleDrop(id: string, newStatus: string) {
    setTasks((prevTask: Task[]) => {
      return prevTask.map((task) =>
        task._id === id ? { ...task, status: newStatus } : task
      )
    })

    const res = await axios.patch(
      `/api/todo/update?id=${id}`,
      JSON.stringify({ status: newStatus })
    )

    console.log("task status update", res)
  }

  return (
    <>
      <TaskActionBar />
      <DndProvider backend={HTML5Backend}>
        {isLoading ? (
          <Loader />
        ) : (
          <div
            className={`bg-white rounded-md p-4 flex gap-4 ${
              isLoading ? "items-center justify-center" : "items-start"
            } `}
          >
            <Column status="todo" onDrop={handleDrop}>
              {tasks
                .filter((task) => task.status === "todo")
                .map((task, i) => (
                  <TaskItemCard key={i} task={task} />
                ))}
            </Column>
            <Column status="inprogress" onDrop={handleDrop}>
              {tasks
                .filter((task) => task.status === "inprogress")
                .map((task, i) => (
                  <TaskItemCard key={i} task={task} />
                ))}
            </Column>
            <Column status="inreview" onDrop={handleDrop}>
              {tasks
                .filter((task) => task.status === "inreview")
                .map((task, i) => (
                  <TaskItemCard key={i} task={task} />
                ))}
            </Column>
            <Column status="finished" onDrop={handleDrop}>
              {tasks
                .filter((task) => task.status === "finished")
                .map((task, i) => (
                  <TaskItemCard key={i} task={task} />
                ))}
            </Column>
          </div>
        )}
      </DndProvider>
    </>
  )
}

export default TaskBoard
