"use client"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react"

interface TTodo {
  _id: string
  title: string
  status: string
  description: string
  deadline: string
  priority: string
  createdAt: string
  updatedAt: string
}

interface TodoContextType {
  tasks: TTodo[]
  setTasks: Dispatch<SetStateAction<TTodo[]>>
  defaultTaskStatus: string
  setDefaultTaskStatus: Dispatch<SetStateAction<string>>
}

// Default value for the context, can be updated as needed
const defaultContextValue: TodoContextType = {
  tasks: [],
  setTasks: () => {},
  defaultTaskStatus: "",
  setDefaultTaskStatus: () => {},
}

export const TodoContext = createContext<TodoContextType>(defaultContextValue)

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TTodo[]>([])
  const [defaultTaskStatus, setDefaultTaskStatus] = useState<string>("")

  return (
    <TodoContext.Provider
      value={{ tasks, setTasks, defaultTaskStatus, setDefaultTaskStatus }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider")
  }
  return context
}
