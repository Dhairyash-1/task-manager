"use client"
import useUrlState from "@/hooks/useUrlState"
import React from "react"
import SideBarNavLinks from "./SideBarNavLinks"
import { sideBarDropdownOptions, sideBarLinks } from "@/lib/constant"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import CustomDropDownMenu from "./CustomDropDownMenu"
import { useAuth } from "@/context/AuthContext"

const MobileNav = () => {
  const { searchParams, updateUrl } = useUrlState()
  const pathname = usePathname()
  const isMobile = searchParams.get("isMobile")
  const { user, isActionLoading, isAuthLoading } = useAuth()
  console.log("isMobile", isMobile)
  return (
    <div
      className={`sm:hidden ${
        isMobile === "true" ? "flex" : "hidden"
      }  w-[220px] flex-col gap-2 z-50 shadow-lg px-4 py-6 h-full bg-white absolute top-0 left-0 `}
    >
      <div className="flex gap-2 mb-6">
        <CustomDropDownMenu
          hideAboveWidth={1024}
          options={sideBarDropdownOptions}
        >
          <Image
            src="/avatar.png"
            alt="user"
            width={32}
            height={32}
            className="rounded-full outline-none border-none"
          />
        </CustomDropDownMenu>
        <h2 className="text-[#080808]  font-medium text-xl line-clamp-1">
          {isActionLoading || isAuthLoading ? "Loading..." : user?.fullName}
        </h2>
      </div>
      {sideBarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.url) && item.url.length > 1) ||
          pathname === item.url

        return (
          <Link
            key={item.value}
            href={item.url}
            className={`flex p-2 rounded-[4px] text-xl  items-center   ${
              isActive && "bg-[#f4f4f4] link-border"
            }`}
          >
            {typeof item.src === "string" ? (
              <Image
                src={item.src}
                width={24}
                height={24}
                alt={item.value}
                className="max-lg:mx-auto"
              />
            ) : (
              item.src
            )}
            <p className="ml-[14px]  text-[#797979]">{item.name}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default MobileNav
