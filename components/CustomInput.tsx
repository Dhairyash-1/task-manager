import React, { useState, useEffect, useRef } from "react"

interface Option {
  value: string
  label: string
}

interface InputProps {
  type: "select" | "date"
  options?: Option[]
  placeholder: string
  value: string
  onChange: (value: string) => void
}

const CustomSelect: React.FC<InputProps> = ({
  type,
  options = [],
  placeholder,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>(value)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = (option: string) => {
    setSelected(option)
    setIsOpen(false)
    onChange(option)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setSelected(value)
  }, [value])

  if (type === "select") {
    return (
      <div ref={selectRef} className="relative w-full">
        <div
          className={`bg-transparent py-2 rounded border-none outline-none cursor-pointer select-none w-full ${
            selected ? "text-black" : "text-[#cccccc]"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected
            ? options.find((opt) => opt.value === selected)?.label
            : placeholder}
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 z-10">
            {options.map((option) => (
              <div
                key={option.value}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  } else if (type === "date") {
    return (
      <input
        type="date"
        className="bg-transparent py-2 rounded border-none outline-none cursor-pointer w-full text-black placeholder:text-[#cccccc]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={value}
      />
    )
  }

  return null
}

export default CustomSelect
