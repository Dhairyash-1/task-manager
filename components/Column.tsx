import Image from "next/image"
import React from "react"
import TaskButton from "./TaskButton"
import { useDrop } from "react-dnd"
import { ItemTypes } from "@/lib/helper"
import TaskModal from "./TaskModal"
import { useModal } from "@/context/ModalContext"
import { useTodo } from "@/context/TodoContext"

interface inputProp {
  status: string
  onDrop: Function
  children: React.ReactNode
}

const getTitle: { [key: string]: string } = {
  todo: "To do",
  inprogress: "In Progress",
  inreview: "In review",
  finished: "Finished",
}

const Column = ({ status, onDrop, children }: inputProp) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item: any) => onDrop(item.id, status),
  })
  const { openModal } = useModal()
  const { setDefaultTaskStatus } = useTodo()

  const title = getTitle[status]
  return (
    <div
      ref={drop as any}
      className="flex flex-col justify-center w-[260px] gap-4 "
    >
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl text-[#555555]">{title}</h5>
        <Image
          className="cursor-pointer"
          src={"/sort.png"}
          width={24}
          height={24}
          alt="sort option"
        />
      </div>

      {children}

      <TaskButton
        type="black"
        size="large"
        bgColor="black-gradient"
        label="Add new"
        handleClick={() => {
          openModal("create", null)
          if (status !== "") {
            setDefaultTaskStatus(status)
          }
        }}
      />
      <TaskModal />
    </div>
  )
}

export default Column
