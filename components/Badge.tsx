import React from "react"

const Badge = ({ label }: { label: string }) => {
  let bgColor
  const newLabel =
    label && label[0].toUpperCase() + label.slice(1, label.length)

  switch (newLabel) {
    case "Low":
      bgColor = "#0ECC5A"
      break
    case "Medium":
      bgColor = "#FFA235"
      break
    case "Urgent":
      bgColor = "#FF6B6B"
      break
    default:
      bgColor = "#CCCCCC"
  }

  return (
    <span
      className={`text-white px-3 py-1 rounded-full`}
      style={{ backgroundColor: bgColor }}
    >
      {newLabel}
    </span>
  )
}

export default Badge
