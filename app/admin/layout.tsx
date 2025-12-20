import type React from "react"
import type { Metadata } from "next"
import { AdminNav } from "@/components/admin-nav"

export const metadata: Metadata = {
  title: "Admin Dashboard - Nën'Harmoni",
  description: "Manage events and articles",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
