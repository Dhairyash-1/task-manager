import React, { useState, useRef, useEffect } from "react"

interface inputProp {
  value: string
  placeholder: string
  onChange: Function
  minHeight?: string
}

const AutoResizeTextarea = ({
  value,
  placeholder,
  onChange,
  minHeight = "100px",
}: inputProp) => {
  const [text, setText] = useState(value)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to calculate new scrollHeight
      textareaRef.current.style.height = "auto"
      // Set height to scrollHeight to adjust to content
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        parseInt(minHeight, 10)
      )}px`
    }
  }, [text, minHeight])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (onChange) onChange(e)
  }

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      className="w-full p-2 border rounded resize-none overflow-hidden border-none outline-none placeholder:text-[#c0bdbd]
          text-base"
      style={{ minHeight }}
      placeholder={placeholder}
    />
  )
}

export default AutoResizeTextarea
