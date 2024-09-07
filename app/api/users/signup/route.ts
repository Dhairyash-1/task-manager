import { connectDB } from "@/config"
import User from "@/models/user.model"
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  connectDB()
  try {
    const reqBody = await request.json()

    const { fullName, email, password } = reqBody

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return NextResponse.json(
        { error: "All fields are mandatory" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({ error: "User Already exist" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      fullName,
      email,
      password: passwordHash,
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        data: newUser,
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
