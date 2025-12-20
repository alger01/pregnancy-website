import { cookies } from "next/headers"
import { verifyToken } from "./jwt"

export async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) {
    return null
  }

  const payload = await verifyToken(token.value)
  return payload
}

export async function requireAuth() {
  const user = await getAuthUser()

  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized")
  }

  return user
}
