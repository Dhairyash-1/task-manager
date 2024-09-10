import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"

const useUrlState = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(pathname + "?" + params.toString())
  }

  return { searchParams, updateUrl }
}

export default useUrlState
