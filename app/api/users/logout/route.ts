import { strict } from "assert"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Successfull",
        success: true,
      },
      { status: 200 }
    )

    response.cookies.delete("accessToken")
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
