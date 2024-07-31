import Image from "next/image"
import React, { ReactElement, useEffect, useState } from "react"
import TaskItemCard from "./TaskItemCard"
import TaskButton from "./TaskButton"
import { useDrop } from "react-dnd"
import { ItemTypes } from "@/utils/helper"
import TaskModal from "./TaskModal"
import { useModal } from "@/context"

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
  const {
    isModalOpen,
    openModal,
    closeModal,
    modalMode,
    modalTaskId,
    defaultStatus,
    setDefaultStatus,
  } = useModal()

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
            setDefaultStatus(status)
          }
        }}
      />
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        taskId={modalTaskId}
        defaultStatus={defaultStatus}
      />
    </div>
  )
}

export default Column
