"use client"
import { sideBarDropdownOptions, sideBarLinks } from "@/lib/constant"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import React, { useState } from "react"
import TaskButton from "./TaskButton"
import { useModal } from "@/context/ModalContext"
import { useAuth } from "@/context/AuthContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Bell } from "lucide-react"
import LogoutButton from "./LogoutButton"
import CustomDropDownMenu from "./CustomDropDownMenu"
import SideBarNavLinks from "./SideBarNavLinks"

const SideBar = () => {
  const { openModal } = useModal()
  const { user, isAuthLoading, isActionLoading } = useAuth()
  console.log("user", user)

  return (
    <aside className="xl:w-[250px] lg:w-[220px] max-lg:w-fit pt-6 px-4 bg-white min-h-screen hidden sm:flex flex-col">
      <header>
        <div className="flex gap-2 justify-center lg:justify-start">
          <Image
            src="/avatar.png"
            alt="user"
            width={32}
            height={32}
            className="rounded-full outline-none border-none hidden lg:block"
          />
          {/* hidden on large screen */}
          <CustomDropDownMenu
            hideAboveWidth={1024}
            options={sideBarDropdownOptions}
          >
            <Image
              src="/avatar.png"
              alt="user"
              width={32}
              height={32}
              className="rounded-full outline-none border-none "
            />
          </CustomDropDownMenu>

          <h2 className="text-[#080808] max-lg:hidden font-medium text-xl line-clamp-1">
            {isAuthLoading || isActionLoading ? "Loading..." : user?.fullName}
          </h2>
        </div>
        <div className="flex justify-between items-center mt-2 max-lg:hidden">
          <div className="flex gap-5 mt-2 items-center">
            <Bell color="#797979" size="25px" />
            <Image
              src="/sun.png"
              width={24}
              height={24}
              alt="dark-mode"
              className="cursor-pointer"
            />
            {/* <Image
              src="/arrow.png"
              width={24}
              height={24}
              alt="arrow"
              className="cursor-pointer"
            /> */}
          </div>
          <LogoutButton type="button" variant="button" />
        </div>
      </header>

      <div className="lg:mt-4 mt-8 flex flex-col gap-3 lg:gap-2">
        <SideBarNavLinks />
        <TaskButton
          size="medium"
          bgColor="blue-gradient"
          label="Create New Task"
          handleClick={() => openModal("create", null)}
          className="flex items-center justify-between "
        />
      </div>
    </aside>
  )
}

export default SideBar
