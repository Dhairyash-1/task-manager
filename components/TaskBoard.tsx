"use client"

import React, { useEffect, useState } from "react"
import TaskActionBar from "./TaskActionBar"
import Image from "next/image"
import TaskItemCard from "./TaskItemCard"
import { Tasks } from "@/utils/constant"

import Column from "./Column"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import axios from "axios"
import { fetchTodos } from "@/utils/api"
import { useModal } from "@/context"

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
  // const [tasks, setTasks] = useState<Task[]>([])
  const { tasks, setTasks } = useModal()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const todos = await fetchTodos()
      setTasks(todos)
    }
    try {
      fetch()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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
        <div
          className={`bg-white rounded-md p-4 flex gap-4 ${
            isLoading ? "items-center justify-center" : "items-start"
          } `}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
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
            </>
          )}
        </div>
      </DndProvider>
    </>
  )
}

export default TaskBoard
