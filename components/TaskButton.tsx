import Image from "next/image"
import React from "react"

interface inputProp {
  type?: "black"
  size: "medium" | "large"
  bgColor: string
  label: string
  handleClick: Function
  className?: string
}

const TaskButton = ({
  type,
  size,
  bgColor,
  label,
  handleClick,
  className,
}: inputProp) => {
  if (type === "black") {
    return (
      <div
        onClick={() => {
          console.log("task button", bgColor)
          handleClick()
        }}
        className={`${bgColor} ${
          size === "large" ? "text-base p-2" : "text-[18px] py-3 px-8"
        } font-normal cursor-pointer flex items-center justify-between gap-2 rounded-lg ${className}`}
      >
        <button className="bg-transparent max-lg:hidden border-none outline-none shadow-none text-white">
          {label}
        </button>
        <Image src={"/light-plus.png"} width={24} height={24} alt="add task" />
      </div>
    )
  }

  return (
    <div
      onClick={() => {
        handleClick()
      }}
      className={`${bgColor} ${
        size === "large" ? "text-[18px] py-3 px-4" : "text-base p-2"
      } font-medium flex cursor-pointer items-center gap-2 rounded-lg ${className}`}
    >
      <button className="bg-transparent max-lg:hidden border-none outline-none shadow-none text-white">
        {label}
      </button>
      <Image src={"/plus.png"} width={24} height={24} alt="add task" />
    </div>
  )
}

export default TaskButton
