"use client"

import React, { useEffect, useState } from "react"
import TaskActionBar from "./TaskActionBar"
import TaskItemCard from "./TaskItemCard"
import Column from "./Column"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { updateTodo } from "@/lib/actions/todo.action"
import { usePathname } from "next/navigation"
import TaskModal from "./TaskModal"
import { useUser } from "@/context/UserContext"
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

const TaskBoard = ({ AllTasks }: { AllTasks: Task[] }) => {
  const path = usePathname()
  const { user } = useUser()

  async function handleDrop(id: string, newStatus: TStatus) {
    const params = {
      id: id,
      updateData: { status: newStatus, owner: user?.id as string },
      path,
    }
    await updateTodo(params)
  }

  return (
    <>
      <TaskActionBar />
      <DndProvider backend={HTML5Backend}>
        <div
          className={`bg-white rounded-md p-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start justify-center
            `}
        >
          <Column status="todo" onDrop={handleDrop}>
            {AllTasks.filter((task) => task.status === "todo").map(
              (task, i) => (
                <TaskItemCard key={i} task={task} />
              )
            )}
          </Column>
          <Column status="inprogress" onDrop={handleDrop}>
            {AllTasks.filter((task) => task.status === "inprogress").map(
              (task, i) => (
                <TaskItemCard key={i} task={task} />
              )
            )}
          </Column>
          <Column status="inreview" onDrop={handleDrop}>
            {AllTasks.filter((task) => task.status === "inreview").map(
              (task, i) => (
                <TaskItemCard key={i} task={task} />
              )
            )}
          </Column>
          <Column status="finished" onDrop={handleDrop}>
            {AllTasks.filter((task) => task.status === "finished").map(
              (task, i) => (
                <TaskItemCard key={i} task={task} />
              )
            )}
          </Column>
        </div>
      </DndProvider>
      <TaskModal />
    </>
  )
}

export default TaskBoard
