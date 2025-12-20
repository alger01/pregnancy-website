"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Calendar, FileText, LayoutDashboard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      toast({
        title: "U shkëputët me sukses",
        description: "Mirupafshim!",
      })
      router.push("/admin/login")
    } catch (error) {
      toast({
        title: "Gabim",
        description: "Ndodhi një gabim gjatë daljes",
        variant: "destructive",
      })
    }
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#b73b8f]" />
                <div className="w-2 h-2 rounded-full bg-[#00adef]" />
              </div>
              Admin Panel
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/admin"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  pathname === "/admin" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/events"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  pathname.startsWith("/admin/events") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Evente
              </Link>
              <Link
                href="/admin/articles"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  pathname.startsWith("/admin/articles")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-4 w-4" />
                Artikuj
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Shiko Faqen</Link>
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Dil
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
