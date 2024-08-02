"use client"
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import Button from "./Button"
import Image from "next/image"
import CustomSelect from "./CustomInput"
import AutoResizeTextarea from "./AutoResizeTextarea"
import axios from "axios"
import { useModal } from "@/context/ModalContext"
import { createTodo, fetchTodos } from "@/lib/api"
import { formatDate } from "@/lib/helper"
import { toast } from "react-toastify"
import { useTodo } from "@/context/TodoContext"
import Loader from "./Loader"

const TaskModal = () => {
  const { setDefaultTaskStatus, defaultTaskStatus, setTasks } = useTodo()
  const { modalTaskId, modalMode, isModalOpen, closeModal } = useModal()

  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    status: defaultTaskStatus,
    priority: "",
    deadline: "",
    content: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
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
    if (modalMode === "edit" && modalTaskId !== null) {
      fetchTodo(modalTaskId)
    } else {
      // Reset form data when mode is 'create'
      setTodoData({
        title: "",
        description: "",
        status: defaultTaskStatus,
        priority: "",
        deadline: "",
        content: "",
      })
    }
  }, [modalTaskId, modalMode, defaultTaskStatus])

  const handleSelectChange = (field: string, value: string) => {
    setTodoData((prevData) => {
      const newState = { ...prevData, [field]: value }
      console.log(newState) // To verify the new state
      return newState
    })
  }

  const createTodoApi = useCallback(async () => {
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
      })
      if (res.status === 201) {
        const allTodo = await fetchTodos()
        setTasks(allTodo)
        setTodoData({
          title: "",
          description: "",
          status: defaultTaskStatus,
          priority: "",
          deadline: "",
          content: "",
        })
        closeModal()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [defaultTaskStatus, todoData, setTasks, closeModal])

  const updateTodoApi = useCallback(async () => {
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
          status: defaultTaskStatus,
          priority: "",
          deadline: "",
          content: "",
        })
        closeModal()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [todoData, modalTaskId, defaultTaskStatus, setTasks, closeModal])

  const deleteTodoApi = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true)
        const res = await axios.delete(`/api/todo/delete?id=${id}`)
        if (res.status === 200) {
          const allTodo = await fetchTodos()
          setTasks(allTodo)
          setTodoData({
            title: "",
            description: "",
            status: defaultTaskStatus,
            priority: "",
            deadline: "",
            content: "",
          })
          closeModal()
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    },
    [closeModal, defaultTaskStatus, setTasks]
  )

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div
        className={`bg-white py-4 px-6 rounded-lg shadow-xl w-full ${
          isMaximized ? "w-full h-screen" : "max-w-[670px]"
        } `}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Button
                  icon="/close.png"
                  bgColor="none"
                  onClick={() => {
                    closeModal()
                    setDefaultTaskStatus("")
                    setTodoData({
                      title: "",
                      description: "",
                      status: defaultTaskStatus,
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
                  label={modalMode === "create" ? "Add Task" : "Edit Task"}
                  onClick={
                    modalMode === "create" ? createTodoApi : updateTodoApi
                  }
                />
                <Button icon="/share.png" label="Share" />
                {/* <Button icon="/star.png" label="Favourite" /> */}
                {modalMode === "edit" && (
                  <Button
                    icon=""
                    onClick={() => {
                      if (modalTaskId !== null) {
                        deleteTodoApi(modalTaskId)
                      }
                    }}
                    label="Delete"
                  />
                )}
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
                  </div>
                  <input
                    className=" w-full border-none outline-none shadow-none font p-2  placeholder:text-[#cccccc] rounded"
                    type="text"
                    placeholder="Write task description"
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
          </>
        )}
      </div>
    </div>
  )
}

export default TaskModal
