"use client"

import { usePathname } from "next/navigation"
import { AdminNav } from "@/components/admin-nav"

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  return (
    <div className="min-h-screen bg-muted/30">
      {!isLoginPage && <AdminNav />}
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
