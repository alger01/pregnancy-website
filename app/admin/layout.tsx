import type React from "react"
import type { Metadata } from "next"
import { AdminLayoutClient } from "@/components/admin-layout-client"

export const metadata: Metadata = {
  title: "Admin Dashboard - Nën'Harmoni",
  description: "Manage events and articles",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
