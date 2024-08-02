"use client"
import { sideBarLinks } from "@/utils/constant"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import React from "react"
import TaskButton from "./TaskButton"
import { useModal } from "@/context"
import { useUser } from "@/context/UserContext"

const SideBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { openModal } = useModal()
  const { user, loading, setUser, refreshSession } = useUser()

  console.log("user", user)
  async function handleLogout() {
    try {
      const res = await axios.get("/api/users/logout")
      if (res.status === 200) {
        setUser(null)
        refreshSession()
        router.push("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="sm:w-[285px] pt-6 px-4 bg-white min-h-screen flex flex-col">
      <header>
        <div className="flex gap-2">
          <Image
            src="/avatar.png"
            alt="user"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h2 className="text-[#080808] font-medium text-xl line-clamp-1">
            {loading ? "Loading..." : user && user.fullName}
          </h2>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-5 mt-2 items-center">
            <Image
              src="/bell.png"
              width={24}
              height={24}
              alt="notification"
              className="cursor-pointer"
            />
            <Image
              src="/sun.png"
              width={24}
              height={24}
              alt="dark-mode"
              className="cursor-pointer"
            />
            <Image
              src="/arrow.png"
              width={24}
              height={24}
              alt="arrow"
              className="cursor-pointer"
            />
          </div>
          <button
            onClick={handleLogout}
            className="bg-[#f4f4f4] py-[10.5px] px-2 text-[16px] text-[#797979] rounded-[4px] font-normal"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mt-4 flex flex-col gap-2">
        {sideBarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.url) && item.url.length > 1) ||
            pathname === item.url
          return (
            <Link
              key={item.value}
              href={item.url}
              className={`flex p-2 rounded-[4px] text-xl items-center ${
                isActive && "bg-[#f4f4f4] link-border"
              } `}
            >
              <Image src={item.src} width={24} height={24} alt={item.value} />
              <p className="ml-[14px] text-[#797979]">{item.name}</p>
            </Link>
          )
        })}
        <TaskButton
          size="large"
          bgColor="blue-gradient"
          label="Create New Task"
          handleClick={() => openModal("create", null)}
        />
      </div>
    </div>
  )
}

export default SideBar
