import { verify } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("accessToken")?.value

    if (!token) {
      NextResponse.json({ error: "Token not found" })
    }
    const user = verify(token as string, process.env.TOKEN_SECRET as string)
    if (!user) {
      NextResponse.json({ error: "Invaild token" })
    }

    return NextResponse.json(
      { user: user, message: "user found" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while getting user" },
      { status: 500 }
    )
  }
}
