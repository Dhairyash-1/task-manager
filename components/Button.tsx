import Image from "next/image"
import React, { MouseEventHandler } from "react"
interface inputProp {
  label?: string
  icon?: string
  bgColor?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  type?: string
}
const Button = ({ label, icon, bgColor, onClick, type }: inputProp) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center cursor-pointer  ${
        bgColor === "none" ? `bg-[${bgColor}]` : "bg-[#e8e8e8]"
      }  p-2 rounded-md  gap-[14px] `}
    >
      {label && (
        <button
          className={`bg-transparent ${
            type === "action" ? "hidden xl:block" : "block"
          } text-[#797979] text-base border-none outline-none shadow-none`}
        >
          {label}
        </button>
      )}
      {icon && <Image src={icon} width={24} height={24} alt="button" />}
    </div>
  )
}

export default Button
