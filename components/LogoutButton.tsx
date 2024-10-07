import { useAuth } from "@/context/AuthContext"
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
  const { logout, isActionLoading } = useAuth()

  // Default logout handler
  const handleLogout = async () => {
    if (onClick) {
      onClick()
      return
    }
    logout()
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
      {isActionLoading ? "Logging out..." : children || "Logout"}
    </Element>
  )
}

export default LogoutButton
