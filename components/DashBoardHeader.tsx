"use client"
import { cardData } from "@/utils/constant"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import Card from "./Card"
import { useUser } from "@/context/UserContext"

const DashBoardHeader = () => {
  const { loading, user } = useUser()
  if (loading) {
    return
  }
  return (
    <div className="">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-5xl font-semibold ">
          Good morning, {user?.user.fullName}!
        </h1>
        <Link href={"/help"} className="flex gap-2 items-center">
          Help & feedback
          <Image src="/question.png" width={24} height={24} alt="help button" />
        </Link>
      </div>
      {/*  */}
      <div className="flex items-center gap-2 mt-4">
        {cardData.map((item) => (
          <Card
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}

export default DashBoardHeader
