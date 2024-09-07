import React from "react"

const Empty = ({ message }: { message: string }) => {
  return (
    <div className="h-full flex-grow">
      <p className="font-bold text-xl text-center">{message} </p>
    </div>
  )
}

export default Empty
