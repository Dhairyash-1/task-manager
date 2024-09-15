import React from "react"

const useDebounce = (value: string, timeout: number = 200) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, timeout)

    return () => {
      clearTimeout(handler)
    }
  }, [value, timeout])

  return debouncedValue
}

export default useDebounce
