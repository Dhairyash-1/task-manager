import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState, ReactNode } from "react"

interface LogoutButtonProps {
  className?: string
  type?: "button" | "div"
  variant?: "button" | "dropdown" // New variant prop for conditional styles
  children?: ReactNode
  onClick?: () => void
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = "",
  type = "button",
  variant = "button", // Default to button style
  children,
  onClick,
}) => {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Default logout handler
  const handleLogout = async () => {
    if (onClick) {
      onClick()
      return
    }

    try {
      setIsLoggingOut(true)
      const res = await axios.post("/api/users/logout")
      if (res.status === 200) {
        router.refresh()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const Element = type === "button" ? "button" : "div"

  // Base styles for each variant
  const baseStyles =
    variant === "button"
      ? "py-[10.5px] px-2 text-[16px] bg-[#f4f4f4] text-[#797979] rounded-[4px]  cursor-pointer"
      : " cursor-pointer" // Dropdown variant styles

  return (
    <Element
      onClick={handleLogout}
      className={`${baseStyles} ${className}`} // Combine base styles and custom className
    >
      {isLoggingOut ? "Logging out..." : children || "Logout"}
    </Element>
  )
}

export default LogoutButton
