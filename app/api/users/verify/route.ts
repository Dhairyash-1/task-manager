import { verify } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("accessToken")?.value

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 })
    }

    const user = verify(token as string, process.env.TOKEN_SECRET as string)

    return NextResponse.json(
      { user: user, message: "user found" },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Invalid token or authentication failed" },
      { status: 401 }
    )
  }
}
