import { connectDB } from "@/db"
import User from "@/models/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  connectDB()
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password required" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User not exist!" }, { status: 404 })
    }

    const isVaildPassword = await bcrypt.compare(password, user.password)

    if (!isVaildPassword) {
      return NextResponse.json({ error: "Password is wrong!" }, { status: 429 })
    }

    const payload = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    }

    const accessToken = await jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    })

    const response = NextResponse.json(
      {
        message: "Login Successfull",
        success: true,
        data: payload,
      },
      { status: 200 }
    )

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
