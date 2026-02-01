import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"

export async function GET() {
  try {
    const user = await getAuthUser()

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user,
    })
  } catch (error) {
    console.error("[v0] Verify auth error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ authenticated: false, message: errorMessage }, { status })
  }
}
