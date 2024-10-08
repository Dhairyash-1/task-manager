"use client"
import React, { useEffect, useState } from "react"
import Badge from "./Badge"
import Image from "next/image"
import { formatDate, ItemTypes, timeAgo } from "@/lib/helper"
import { useModal } from "@/context/ModalContext"
import { useDrag } from "react-dnd"

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

interface InputProp {
  task: Task
}

const TaskItemCard = ({ task }: InputProp) => {
  const [, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id },
  })
  const { openModal } = useModal()

  const [timeAgoText, setTimeAgoText] = useState<string>("")

  useEffect(() => {
    setTimeAgoText(timeAgo(task.createdAt))
  }, [task.createdAt])

  return (
    <div
      onClick={() => openModal("edit", task._id)}
      ref={drag as any}
      className="bg-[#f4f4f4] cursor-move border-[#deded3] rounded-md p-[14px]"
    >
      <h3 className="font-medium text-base mb-1 text-[#606060]">
        {task.title}
      </h3>
      <p className="font-normal text-sm mb-3 text-[#797979]">
        {task.description}
      </p>
      {task.priority && <Badge label={task.priority} />}
      <div className="flex gap-2 items-center mt-3">
        <Image src="/clock.png" width={24} height={24} alt="time" />
        <span className="text-[#606060] font-semibold">
          {formatDate(task.createdAt)}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-[#797979]">{timeAgoText}</p>
    </div>
  )
}

export default TaskItemCard
