"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
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

interface TStatus {
  status: "todo" | "inprogress" | "inreview" | "finished" | undefined
}

// Define the context type
interface ModalContextType {
  isModalOpen: boolean
  modalTaskId: string | null
  modalMode: "create" | "edit"
  setModalMode: Dispatch<SetStateAction<"create" | "edit">>
  openModal: (mode: "create" | "edit", taskId: string | null) => void
  closeModal: () => void
  openDialog: () => void
  closeDialog: () => void
  isDialogOpen: boolean
  setModalTaskId: (id: string) => void
  tasks: TTodo[]
  setTasks: Dispatch<SetStateAction<TTodo[]>>
  defaultStatus: string
  setDefaultStatus: Dispatch<SetStateAction<string>>
}

// Create the context with an undefined default value
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)

// Provide context to children components
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [modalTaskId, setModalTaskId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<TTodo[]>([])
  const [modalMode, setModalMode] = useState("create")
  const [defaultStatus, setDefaultStatus] = useState("")

  const openModal = (mode: "create" | "edit", taskId = null) => {
    setModalMode(mode)
    setModalTaskId(taskId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalMode("create")
    setModalTaskId(null)
  }
  // const openModal = () => setIsModalOpen(true)
  // const closeModal = () => setIsModalOpen(false)
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)
  // const updateModalTaskId = (id: string) => setModalTaskId(id)

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalTaskId,
        openModal,
        closeModal,
        modalMode,
        openDialog,
        closeDialog,
        isDialogOpen,
        tasks,
        setTasks,
        defaultStatus,
        setDefaultStatus,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

// Custom hook to use the ModalContext
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
