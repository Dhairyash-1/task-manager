"use client"
import React, { use, useEffect, useRef, useState } from "react"
import TaskActionBar from "./TaskActionBar"
import TaskItemCard from "./TaskItemCard"
import Column from "./Column"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { searchTodo, updateTodo } from "@/lib/actions/todo.action"
import { usePathname } from "next/navigation"
import TaskModal from "./TaskModal"
import { useUser } from "@/context/UserContext"
import useDebounce from "@/hooks/useDebounce"
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
  const [query, setQuery] = useState<string>("")
  const debouncedQuery = useDebounce(query)
  const [searchResult, setSearchResult] = useState<Task[]>([])

  async function handleDrop(id: string, newStatus: TStatus) {
    const params = {
      id: id,
      updateData: { status: newStatus, owner: user?.id as string },
      path,
    }
    await updateTodo(params)
  }

  useEffect(() => {
    async function search() {
      const result = await searchTodo({
        query: debouncedQuery,
        userId: user?.id as string,
      })
      setSearchResult(result)
    }
    if (debouncedQuery.length > 0) {
      search()
    }
  }, [debouncedQuery, user?.id])

  const tasks = query.length > 0 ? searchResult : AllTasks

  return (
    <>
      <TaskActionBar handleQuery={setQuery} />
      <DndProvider backend={HTML5Backend}>
        <div
          className={`bg-white rounded-md p-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start justify-center
            `}
        >
          {["todo", "inprogress", "inreview", "finished"].map((status) => (
            <Column key={status} status={status as TStatus} onDrop={handleDrop}>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskItemCard key={task._id} task={task} />
                ))}
            </Column>
          ))}
        </div>
      </DndProvider>
      <TaskModal />
    </>
  )
}

export default TaskBoard
