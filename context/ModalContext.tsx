"use client"
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"

interface ModalContextType {
  isModalOpen: boolean
  modalTaskId: string | null
  setModalTaskId: Dispatch<SetStateAction<string | null>>
  modalMode: "create" | "edit"
  setModalMode: Dispatch<SetStateAction<"create" | "edit">>
  openModal: (
    mode: "create" | "edit",
    taskId: string | null,
    defaultStatus?: TStatus
  ) => void
  closeModal: () => void
  openDialog: () => void
  closeDialog: () => void
  isDialogOpen: boolean
  status: TStatus | undefined
}

const defaultContextValue: ModalContextType = {
  isModalOpen: false,
  modalTaskId: null,
  setModalTaskId: () => {},
  modalMode: "create",
  setModalMode: () => {},
  openModal: () => {},
  closeModal: () => {},
  openDialog: () => {},
  closeDialog: () => {},
  isDialogOpen: false,
  status: undefined,
}

export const ModalContext = createContext<ModalContextType>(defaultContextValue)

// Provide context to children components
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [modalTaskId, setModalTaskId] = useState<string | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [status, setStatus] = useState<TStatus | undefined>(undefined)

  const openModal = (
    mode: "create" | "edit",
    taskId: string | null,
    status?: TStatus
  ) => {
    setModalMode(mode)
    setModalTaskId(taskId)
    setIsModalOpen(true)
    if (status) setStatus(status)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalMode("create")
    setModalTaskId(null)
    setStatus(undefined)
  }

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalTaskId,
        openModal,
        closeModal,
        modalMode,
        setModalMode,
        openDialog,
        closeDialog,
        isDialogOpen,
        setModalTaskId,
        status,
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
