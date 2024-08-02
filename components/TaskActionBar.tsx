import { taskBarActionBtn } from "@/lib/constant"
import Image from "next/image"
import React from "react"
import Button from "./Button"
import TaskButton from "./TaskButton"
import { useModal } from "@/context/ModalContext"

const TaskActionBar = () => {
  const { openModal } = useModal()
  return (
    <div className="my-4 flex items-center justify-between">
      <div className="bg-white rounded-lg flex items-center  py-[10.5px] px-2 w-[196px]">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none shadow-none w-full text-base"
        />
        <Image src={"/search.png"} width={24} height={24} alt="search bar" />
      </div>
      <div className="flex gap-4 items-center">
        {taskBarActionBtn.map((item) => (
          <Button key={item.id} label={item.label} icon={item.icon} />
        ))}
        <TaskButton
          size="medium"
          bgColor="blue-gradient"
          label="Create New"
          handleClick={() => openModal("create", null)}
        />
      </div>
    </div>
  )
}

export default TaskActionBar
