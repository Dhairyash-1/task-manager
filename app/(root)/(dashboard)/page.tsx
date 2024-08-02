"use server"
import DashBoardHeader from "@/components/DashBoardHeader"
import SideBar from "@/components/SideBar"
import TaskBoard from "@/components/TaskBoard"
import React from "react"

const Page = () => {
  return (
    <div className="bg-[#f2f2f2] flex w-full min-h-full">
      <SideBar />
      <div className="pl-4 pr-8 py-6 flex-1">
        <DashBoardHeader />
        <TaskBoard />
      </div>
    </div>
  )
}

export default Page
