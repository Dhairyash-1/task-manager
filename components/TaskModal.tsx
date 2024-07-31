"use client"
import React, { ChangeEvent, useEffect, useState } from "react"
import Button from "./Button"
import Image from "next/image"
import CustomSelect from "./CustomSelect"
import AutoResizeTextarea from "./AutoResizeTextarea"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useModal } from "@/context"
import { createTodo, fetchTodos } from "@/utils/api"
import { formatDate } from "@/utils/helper"
import { toast } from "react-toastify"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "create" | "edit"
  taskId: string | null
  defaultStatus: string
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  mode,
  defaultStatus,
}) => {
  const pathname = usePathname()
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    status: defaultStatus,
    priority: "",
    deadline: "",
    content: "",
  })
  console.log("todosdata", todoData)
  const [isLoading, setIsLoading] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const { modalTaskId, setTasks, setDefaultStatus } = useModal()
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  useEffect(() => {
    async function fetchTodo(id: string) {
      setIsLoading(true)
      const res = await axios.get(`/api/todo?id=${id}`)
      const updatedTodo = {
        ...res.data.todo,
        deadline: formatDate(res.data.todo.deadline),
      }
      setTodoData(updatedTodo)
      setIsLoading(false)
    }
    if (mode === "edit" && modalTaskId !== null) {
      fetchTodo(modalTaskId)
    } else {
      // Reset form data when mode is 'create'
      setTodoData({
        title: "",
        description: "",
        status: defaultStatus,
        priority: "",
        deadline: "",
        content: "",
      })
    }
  }, [modalTaskId, mode, defaultStatus])

  if (!isOpen) return null
  console.log("mode", mode, "status", defaultStatus)

  const handleSelectChange = (field: string, value: string) => {
    setTodoData((prevData) => {
      const newState = { ...prevData, [field]: value }
      console.log(newState) // To verify the new state
      return newState
    })
  }

  async function createTodoApi() {
    if (!todoData.title) {
      return toast.error("Task Title is required", { autoClose: 3000 })
    }
    if (!todoData.status) {
      return toast.error("Task status is required", { autoClose: 3000 })
    }
    try {
      setIsLoading(true)
      const res = await createTodo({
        ...todoData,
        path: pathname,
      })
      if (res.status === 201) {
        const allTodo = await fetchTodos()
        setTasks(allTodo)
        setTodoData({
          title: "",
          description: "",
          status: defaultStatus,
          priority: "",
          deadline: "",
          content: "",
        })
        onClose()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function updateTodoApi() {
    try {
      setIsLoading(true)
      const res = await axios.patch(
        `/api/todo/update?id=${modalTaskId}`,
        todoData
      )
      if (res.status === 200) {
        const allTodo = await fetchTodos()
        setTasks(allTodo)
        setTodoData({
          title: "",
          description: "",
          status: defaultStatus,
          priority: "",
          deadline: "",
          content: "",
        })
        onClose()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div
        className={`bg-white py-4 px-6 rounded-lg shadow-xl w-full ${
          isMaximized ? "w-full h-screen" : "max-w-[670px]"
        } `}
      >
        {isLoading ? (
          <div className="">Loading...</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Button
                  icon="/close.png"
                  bgColor="none"
                  onClick={() => {
                    onClose()
                    setDefaultStatus("")
                    setTodoData({
                      title: "",
                      description: "",
                      status: defaultStatus,
                      priority: "",
                      deadline: "",
                      content: "",
                    })
                  }}
                />
                <Button
                  icon="/maximize.png"
                  bgColor="none"
                  onClick={toggleMaximize}
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  icon=""
                  label={mode === "create" ? "Add Task" : "Edit Task"}
                  onClick={mode === "create" ? createTodoApi : updateTodoApi}
                />
                <Button icon="/share.png" label="Share" />
                <Button icon="/star.png" label="Favourite" />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-8">
              <input
                className="w-full border-none outline-none shadow-none font-semibold text-5xl p-2 mb-4 placeholder:text-[#cccccc] rounded"
                type="text"
                name="title"
                placeholder="Title"
                value={todoData.title}
                onChange={(e) =>
                  setTodoData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              {/* Section for Select Inputs */}
              <div className="flex flex-col gap-6">
                {[
                  {
                    type: "select",
                    label: "Status",
                    icon: "/status.png",
                    value: todoData.status,
                    field: "status",
                    options: [
                      { value: "todo", label: "To Do" },
                      { value: "inprogress", label: "In Progress" },
                      { value: "inreview", label: "In review" },
                      { value: "finished", label: "Finished" },
                    ],
                  },
                  {
                    type: "select",
                    label: "Priority",
                    icon: "/priority.png",
                    value: todoData.priority,
                    field: "priority",
                    options: [
                      { value: "urgent", label: "Urgent" },
                      { value: "medium", label: "Medium" },
                      { value: "low", label: "Low" },
                    ],
                  },
                  {
                    type: "date",
                    label: "Deadline",
                    icon: "/calander.png",
                    value: todoData.deadline,
                    field: "deadline",
                    options: [
                      { value: "today", label: "Today" },
                      { value: "tomorrow", label: "Tomorrow" },
                      { value: "nextweek", label: "Next Week" },
                    ],
                  },
                ].map(({ type, label, icon, value, field, options }) => (
                  <div className="flex items-center" key={label}>
                    <div className="flex items-center gap-6 mr-[60px]">
                      <Image src={icon} width={24} height={24} alt={label} />
                      <label className="text-[#666666] font-normal text-base">
                        {label}
                      </label>
                    </div>
                    <div className="flex-1">
                      <CustomSelect
                        type={type as "select" | "date"}
                        options={options}
                        placeholder="Not Selected"
                        value={value}
                        onChange={(option: string) =>
                          handleSelectChange(field, option)
                        }
                      />
                    </div>
                  </div>
                ))}

                <div className="flex items-center">
                  <div
                    className={`flex items-center gap-6 mr-[60px]
                    }`}
                  >
                    <Image
                      src="/pencil.png"
                      width={24}
                      height={24}
                      alt="description"
                    />
                    <label className="text-[#666666] font-normal text-base">
                      Description
                    </label>
                    <input
                      className="w-full border-none outline-none shadow-none font p-2  placeholder:text-[#cccccc] rounded"
                      type="text"
                      placeholder="Not Selected"
                      value={todoData.description}
                      onChange={(e) =>
                        setTodoData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
              {/* custom prop button */}
              <div className="flex items-center gap-6">
                <Image src="/plusicon.png" width={24} height={25} alt="add" />
                <button className="bg-transparent outline-none border-none text-base">
                  Add Custom Property
                </button>
              </div>
              {/* horizontal line */}
              <div className="bg-[#dddddd] border w-full my-8"></div>
              {/* Additional Content */}
            </div>
            <AutoResizeTextarea
              value={todoData.content}
              placeholder="Start writing, or drag your own files here."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTodoData((prevData) => ({
                  ...prevData,
                  content: e.target.value,
                }))
              }
            />
            {/* <div className="flex justify-end mt-4">
              {mode === "create" ? (
                <Button label="Create" onClick={createTodoApi} />
              ) : (
                <Button label="Update" onClick={updateTodoApi} />
              )}
            </div> */}
          </>
        )}
      </div>
      {/* <CustomAlertDialog create={createTodoApi} /> */}
    </div>
  )
}

export default TaskModal
