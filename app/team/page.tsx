"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const IMAGE_URLS = [
  "/smiling-female-doctor.png",
  "/female-midwife-caring-professional.jpg",
  "/female-psychologist-warm-professional.jpg",
  "/female-nutritionist-friendly-professional.jpg",
  "/female-pediatric-nurse-kind-professional.jpg",
  "/female-yoga-instructor-peaceful-professional.jpg",
]
const EMAILS = [
  "elena.k@nenharmoni.al",
  "arta.h@nenharmoni.al",
  "klara.b@nenharmoni.al",
  "luana.s@nenharmoni.al",
  "dorina.m@nenharmoni.al",
  "fjona.d@nenharmoni.al",
]

export default function TeamPage() {
  const { t, messages } = useLanguage()
  const members = ((messages as Record<string, unknown>)?.team?.members as Array<{ name: string; role: string; bio: string }>) ?? []

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("team.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("team.subtitle")}</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <Card key={index} className="overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-[#b73b8f]/10 to-[#00adef]/10">
                <img
                  src={IMAGE_URLS[index] || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <a
                  href={`mailto:${EMAILS[index]}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{EMAILS[index]}</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
