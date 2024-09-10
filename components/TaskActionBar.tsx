import { taskBarActionBtn } from "@/lib/constant"
import Image from "next/image"
import React from "react"
import Button from "./Button"
import TaskButton from "./TaskButton"
import { useModal } from "@/context/ModalContext"
import { EllipsisVertical, PlusIcon } from "lucide-react"
import CustomDropDownMenu from "./CustomDropDownMenu"

const TaskActionBar = () => {
  const { openModal } = useModal()

  return (
    <div className="my-4 flex items-center justify-between gap-6">
      <div className="bg-white rounded-lg flex items-center py-[10.5px] px-2 sm:w-[260px] xl:w-[320px] w-full">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none shadow-none w-full text-base"
        />
        <Image src={"/search.png"} width={24} height={24} alt="search bar" />
      </div>
      {/* on large device */}
      <div className="sm:flex gap-4 items-center hidden">
        {taskBarActionBtn.map((item) => {
          if (item.label !== "Create Task") {
            return (
              <Button
                key={item.id}
                label={item.label}
                icon={item.icon as string}
                type="action"
              />
            )
          }
        })}
        <TaskButton
          size="medium"
          bgColor="blue-gradient"
          label="Create New"
          handleClick={() => openModal("create", null)}
        />
      </div>
      {/* on small device */}
      <TaskButton
        size="medium"
        bgColor="blue-gradient"
        label="Create New"
        handleClick={() => openModal("create", null)}
        className="sm:hidden"
      />
      <CustomDropDownMenu
        hideAboveWidth={640}
        options={taskBarActionBtn}
        menuClassName="flex flex-col gap-2 p-2  items-start"
        itemClassName="flex flex-row-reverse item-start gap-2 "
      >
        <EllipsisVertical color="#606060" size="25px" className="sm:hidden" />
      </CustomDropDownMenu>
    </div>
  )
}

export default TaskActionBar
