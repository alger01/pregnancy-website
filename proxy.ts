import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/jwt"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("auth-token")

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    const payload = await verifyToken(token.value)

    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
