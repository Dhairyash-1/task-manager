import { connectDB } from "@/db"
import { NextResponse } from "next/server"
connectDB()
export async function GET() {
  try {
    return NextResponse.json({ message: "health is ok", success: "true" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
