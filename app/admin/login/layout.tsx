import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login - Nën'Harmoni",
  description: "Admin panel login",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
