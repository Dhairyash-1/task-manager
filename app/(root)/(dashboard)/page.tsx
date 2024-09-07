import DashBoardHeader from "@/components/DashBoardHeader"
import SideBar from "@/components/SideBar"
import TaskBoard from "@/components/TaskBoard"
import { getAllUserTodo } from "@/lib/actions/todo.action"
import { cookies } from "next/headers"
import React from "react"

const Page = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get("accessToken")?.value
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/verify`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
      },
      cache: "no-store",
    }
  )
  const currentUser = await res.json()
  console.log("currentUser", currentUser)
  const todos = await getAllUserTodo({ userId: currentUser.user.id })

  return (
    <div className="bg-[#f2f2f2] flex w-full h-screen">
      <SideBar />
      <div className="pl-4 pr-8 py-6 h-full flex-col flex-1 overflow-y-scroll">
        <DashBoardHeader />
        <TaskBoard AllTasks={todos} />
      </div>
    </div>
  )
}

export default Page
