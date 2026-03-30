import { NextResponse } from "next/server"
import { readData } from "@/lib/file-storage"
import { createToken } from "@/lib/jwt"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { User } from "@/types"
import bcrypt from "bcryptjs" // safer for Next.js

export async function POST(request: Request) {
  try {
    let body

    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
    }

    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase()

    const users = await readData<User>("users.json")
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail)

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 403 }
      )
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[LOGIN ERROR]:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
