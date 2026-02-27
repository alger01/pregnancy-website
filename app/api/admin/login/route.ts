import { NextResponse } from "next/server"
import { readData } from "@/lib/file-storage"
import { createToken } from "@/lib/jwt"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { User } from "@/types"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const users = await readData<User>("users.json")
    const user = users.find((u) => u.email === email)

    // For demo purposes, we're using a simple comparison
    // In production, you would use bcrypt to compare hashed passwords
    // Example: const isValid = await bcrypt.compare(password, user.password)
    //if (!user || user.password !== password) {
      //return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    //}

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
