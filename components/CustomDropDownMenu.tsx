import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import useWindowSize from "@/hooks/useWindowSize"
import Image from "next/image"

interface Option {
  label: string
  onClick?: () => void
  customContent?: React.ReactNode
  icon?: string
}

interface CustomDropDownMenuProps {
  children: React.ReactNode // Trigger element
  options: Option[] // More flexible option handling
  menuClassName?: string // For optional styling of the menu
  itemClassName?: string // For optional styling of the items
  hideAboveWidth?: number // For conditional rendering
}

const CustomDropDownMenu = ({
  children,
  options,
  menuClassName,
  itemClassName,
  hideAboveWidth = 1024,
}: CustomDropDownMenuProps) => {
  const { width } = useWindowSize()

  if (hideAboveWidth <= width) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={menuClassName}>
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className={itemClassName}
            onClick={option.onClick}
          >
            {option.customContent ? option.customContent : option.label}
            {option.icon && (
              <Image
                src={option.icon}
                width={24}
                height={24}
                alt={option.label}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CustomDropDownMenu
