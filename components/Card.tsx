import Image from "next/image"
import React from "react"

interface inputProp {
  icon: string
  title: string
  description: string
}

const Card = ({ icon, title, description }: inputProp) => {
  return (
    <div className="py-[24.5px] flex-1 px-4 flex gap-[10px] bg-white items-center rounded-lg">
      <Image src={icon} width={77} height={65} alt={title} />
      <div className="flex flex-col">
        <h3 className="line-clamp-1 mb-1 text-[#757575] font-semibold lg:text-base text-sm">
          {title}
        </h3>
        <p className="text-[#868686] font-normal text-sm">{description}</p>
      </div>
    </div>
  )
}

export default Card
