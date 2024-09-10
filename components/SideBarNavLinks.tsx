import { sideBarLinks } from "@/lib/constant"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const SideBarNavLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {sideBarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.url) && item.url.length > 1) ||
          pathname === item.url

        return (
          <Link
            key={item.value}
            href={item.url}
            className={`flex p-2 rounded-[4px] text-xl items-center justify-center lg:justify-start ${
              isActive && "bg-[#f4f4f4] link-border"
            }`}
          >
            <Image
              src={item.src}
              width={24}
              height={24}
              alt={item.value}
              className="max-lg:mx-auto"
            />
            <p className="ml-[14px] hidden lg:block text-[#797979]">
              {item.name}
            </p>
          </Link>
        )
      })}
    </>
  )
}

export default SideBarNavLinks
