import { connectDB } from "@/db"
import Todo from "@/models/todo.model"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    connectDB()
    // Extract the 'id' from the query parameters
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is missing" },
        { status: 400 }
      )
    }

    console.log("Requested ID:", id)

    // Fetch the todo item by ID
    const todo = await Todo.findById(id)

    if (!todo) {
      return NextResponse.json(
        { error: "No todo found with this id" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, todo }, { status: 200 })
  } catch (error) {
    console.error("Error fetching todo:", error)
    return NextResponse.json(
      { error: "An error occurred while getting the to-do by id" },
      { status: 500 }
    )
  }
}
//

// import { NextRequest, NextResponse } from "next/server"

// export async function GET(request: NextRequest) {
//   try {
//     const reqBody = request.json()
//   } catch (error) {
//     return NextResponse.json(
//       { error: "An error occurred while creating the to-do" },
//       { status: 500 }
//     )
//   }
// }
