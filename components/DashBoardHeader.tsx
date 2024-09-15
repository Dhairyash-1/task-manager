"use client"
import { cardData } from "@/lib/constant"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import Card from "./Card"
import { useUser } from "@/context/UserContext"
import { Menu } from "lucide-react"
import useUrlState from "@/hooks/useUrlState"
import FilterSortModal from "./FilterSortModal"

const DashBoardHeader = () => {
  const { loading, user } = useUser()
  const { updateUrl } = useUrlState()
  const { searchParams } = useUrlState()
  const value = searchParams.get("isMobile") === "true"

  return (
    <>
      <div className="flex justify-between items-center gap-2 w-full">
        <h1 className="xl:text-5xl text-center sm:text-start sm:text-2xl text-xl lg:text-4xl md:3xl font-semibold ">
          {loading ? "Loading..." : `Good morning, ${user && user.fullName}!`}
        </h1>
        <Link href={"/help"} className="sm:flex gap-2 items-center hidden">
          <p className="text-sm hidden sm:block">Help & feedback</p>
          <Image src="/question.png" width={16} height={16} alt="help button" />
        </Link>
        <Menu
          color="#606060"
          size="30px"
          className="sm:hidden"
          onClick={() => updateUrl("isMobile", `${value ? "false" : "true"}`)}
        />
      </div>
      {/*  */}
      <div className="lg:flex flex-wrap hidden items-stretch justify-start md:flex-row gap-2 mt-4">
        {cardData.map((item) => (
          <Card
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      {/* <FilterSortModal /> */}
    </>
  )
}

export default DashBoardHeader
