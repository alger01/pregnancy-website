"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import type { StaffMember } from "@/types"

export default function TeamPage() {
  const { t, locale } = useLanguage()
  const [members, setMembers] = useState<StaffMember[]>([])

  useEffect(() => {
    fetch("/api/staff")
      .then((res) => res.json())
      .then((data: StaffMember[]) => setMembers(data))
      .catch((error) => {
        console.error("Error loading staff:", error)
      })
  }, [])

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("team.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("team.subtitle")}</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {members.map((member) => (
            <Card key={member.id || member.email} className="overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-[#b73b8f]/10 to-[#00adef]/10">
                <img
                  src={member.imageUrl || "/logo_white.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{locale === "sq" ? member.roleSq || member.role : member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{locale === "sq" ? member.bioSq || member.bio : member.bio}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
