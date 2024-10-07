"use client"
import React, {
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import Button from "./Button"
import Image from "next/image"
import CustomSelect from "./CustomInput"
import AutoResizeTextarea from "./AutoResizeTextarea"
import { useModal } from "@/context/ModalContext"
import { formatDate } from "@/lib/helper"
import { toast } from "react-toastify"
import Loader from "./Loader"
import {
  createTodo,
  deleteTodo,
  getTodoById,
  updateTodo,
} from "@/lib/actions/todo.action"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Repeat } from "lucide-react"
import RecurringTask from "./RecurringTask"

export type TFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "NONE"
interface ITodosData {
  title: string
  description: string
  status: TStatus | undefined
  priority: TPriority | undefined
  deadline: string
  content: string
  isRecurring: boolean
  frequency: TFrequency
  day?: number
  date?: number
}
const initialTodoData = {
  title: "",
  description: "",
  status: undefined,
  priority: undefined,
  deadline: "",
  content: "",
  isRecurring: false,
  frequency: "NONE",
  day: undefined,
  date: undefined,
} as ITodosData

const TaskModal = () => {
  const { modalTaskId, modalMode, isModalOpen, closeModal, status } = useModal()
  const { user } = useAuth()

  const path = usePathname()
  const modalRef: RefObject<HTMLElement> = useRef(null)
  const [todoData, setTodoData] = useState<ITodosData>(initialTodoData)
  const [isLoading, setIsLoading] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  useEffect(() => {
    setTodoData((prevData) => ({
      ...prevData,
      status: status,
    }))
  }, [status])

  useEffect(() => {
    async function getTodoDetails(taskId: string) {
      try {
        setIsLoading(true)
        const data = await getTodoById({ id: taskId })
        if (!data) {
          throw new Error("No Todo found for given ID")
        }
        const todo = data
        console.log("todo", todo)
        const todoState = {
          title: todo.title,
          status: todo.status,
          description: todo.description,
          priority: todo.priority as TPriority,
          deadline: formatDate(todo.deadline),
          content: todo.content,
          frequency: todo.frequency,
          day: todo.day,
          date: todo.date,
          isRecurring: todo.isRecurring,
        }
        setTodoData(todoState)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    if (modalMode === "edit" && modalTaskId !== null) {
      getTodoDetails(modalTaskId)
    }
  }, [modalTaskId, modalMode])

  const handleSelectChange = (field: string, value: string) => {
    setTodoData((prevData) => {
      const newState = { ...prevData, [field]: value }
      console.log(newState)
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
    const createTodoData = {
      title: todoData.title,
      description: todoData.description,
      status: todoData.status,
      priority: todoData.priority,
      deadline: todoData.deadline,
      content: todoData.content,
      path: path,
      owner: user?.id as string,
      frequency: todoData.frequency,
      day: todoData.day,
      date: todoData.date,
      isRecurring: todoData.isRecurring,
    }
    await createTodo(createTodoData)
    closeModal()
    setTodoData({
      ...initialTodoData,
      status: status,
    })
  }, [todoData, path, user?.id, closeModal, status])

  const updateTodoApi = async () => {
    const updateData = {
      title: todoData.title,
      description: todoData.description,
      status: todoData.status as TStatus,
      priority: todoData.priority,
      deadline: todoData.deadline,
      content: todoData.content,
      owner: user?.id as string,
      frequency: todoData.frequency,
      day: todoData.day,
      date: todoData.date,
      isRecurring: todoData.isRecurring,
    }
    await updateTodo({ id: modalTaskId as string, updateData, path })
    closeModal()
    setTodoData({
      ...initialTodoData,
      status: status,
    })
  }

  const deleteTodoApi = async (id: string) => {
    await deleteTodo({ id: id, path: path })
  }

  const handleRecurringTaskTime = useCallback(
    ({
      frequency,
      dayOfWeek,
      dateOfMonth,
    }: {
      frequency: TFrequency
      dayOfWeek?: number
      dateOfMonth?: number
    }) => {
      let recurring = false
      if (frequency !== "NONE") {
        recurring = true
      }
      // if (dayofweek === 0 || dayofmonth === 0) return
      setTodoData((prevTodo) => ({
        ...prevTodo,
        frequency: frequency,
        day: dayOfWeek,
        date: dateOfMonth,
        isRecurring: recurring,
      }))
    },
    []
  )

  function handleModalClose() {
    closeModal()
    setTodoData({
      ...initialTodoData,
      status: status,
    })
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        event.target instanceof HTMLElement &&
        !modalRef.current.contains(event.target)
      ) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isModalOpen, closeModal])

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600  bg-opacity-50  w-full flex items-center justify-center overflow-y-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            ref={modalRef as RefObject<HTMLDivElement>}
            className={`custom-scrollbar bg-white py-4 px-6 rounded-lg shadow-xl w-full overflow-y-auto ${
              isMaximized
                ? "w-full h-full"
                : "w-full md:max-w-[80%] lg:max-w-[800px]  h-auto max-h-[90%]"
            } `}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Button
                  icon="/close.png"
                  bgColor="none"
                  onClick={handleModalClose}
                />
                <Button
                  icon="/maximize.png"
                  bgColor="none"
                  onClick={toggleMaximize}
                />
              </div>
              <div className="flex items-center justify-end  gap-4">
                <Button
                  label={modalMode === "create" ? "Add Task" : "Edit Task"}
                  onClick={
                    modalMode === "create" ? createTodoApi : updateTodoApi
                  }
                />
                {/* <Button icon="/share.png" label="Share" /> */}
                {/* <Button icon="/star.png" label="Favourite" /> */}
                {modalMode === "edit" && (
                  <Button
                    onClick={() => {
                      if (modalTaskId !== null) {
                        deleteTodoApi(modalTaskId)
                        handleModalClose()
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
              <div className="flex flex-col gap-6 justify-start">
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
                  // {
                  //   type: "select",
                  //   label: "Recurring",
                  //   icon: <Repeat height={24} width={24} color="#797979" />,
                  //   value: "",
                  //   field: "recurring",
                  //   options: [
                  //     { value: "daily", label: "Daily" },
                  //     { value: "weekly", label: "Weekly" },
                  //     { value: "monthly", label: "Monthly" },
                  //   ],
                  // },
                ].map(({ type, label, icon, value, field, options }) => (
                  <div className="grid  grid-cols-4 gap-4" key={label}>
                    <div className="flex items-center gap-6">
                      {typeof icon === "string" ? (
                        <Image src={icon} width={24} height={24} alt={label} />
                      ) : (
                        icon // @ts-ignore
                      )}
                      <label className="text-[#666666] font-normal text-base">
                        {label}
                      </label>
                    </div>
                    <div className="col-span-3">
                      <CustomSelect
                        type={type as "select" | "date"}
                        options={options}
                        placeholder="Not Selected"
                        value={value as string}
                        onChange={(option: string) =>
                          handleSelectChange(field, option)
                        }
                      />
                    </div>
                  </div>
                ))}
                <RecurringTask
                  defaultRecurrence={todoData.frequency}
                  defaultDayOfWeek={todoData.day}
                  defaultDateOfMonth={todoData.date}
                  onChange={handleRecurringTaskTime}
                />

                <div className="grid grid-cols-4">
                  <div
                    className={`col-span-1 flex items-center gap-6 
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
                    className="w-full col-span-3 border-none outline-none shadow-none font p-2  placeholder:text-[#cccccc] rounded"
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

              {/* horizontal line */}
              <div className="bg-[#dddddd] border w-full my-8"></div>
              {/* Additional Content */}
            </div>
            <AutoResizeTextarea
              value={todoData.content}
              placeholder="Start writing here."
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTodoData((prevData) => ({
                  ...prevData,
                  content: e.target.value,
                }))
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

export default TaskModal
