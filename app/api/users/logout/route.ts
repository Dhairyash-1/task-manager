import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "Logout Successful",
        success: true,
      },
      { status: 200 }
    )

    response.cookies.set("accessToken", "", { expires: new Date(0), path: "/" })

    return response
  } catch (error: any) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
