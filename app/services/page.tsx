"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Baby, Users, Calendar, Video, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import type { Service } from "@/types"

const ICON_MAP: Record<NonNullable<Service["icon"]>, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  heart: Heart,
  baby: Baby,
  users: Users,
  calendar: Calendar,
  message: MessageCircle,
  video: Video,
}

export default function ServicesPage() {
  const { t, locale } = useLanguage()
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data: Service[]) => setServices(data))
      .catch((error) => {
        console.error("Error loading services:", error)
      })
  }, [])

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("services.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const Icon =
              (service.icon && ICON_MAP[service.icon]) || Heart
            const color = service.color || "#b73b8f"
            const localizedTitle = locale === "sq" ? service.titleSq || service.title : service.title
            const localizedDescription = locale === "sq" ? service.descriptionSq || service.description : service.description
            const localizedDetails = locale === "sq" ? service.detailsSq || service.details : service.details
            return (
            <Card key={service.id} className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>
                <CardTitle className="text-xl">{localizedTitle}</CardTitle>
                <CardDescription>{localizedDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {localizedDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )})}
        </div>

        {/* CTA Section */}
        <Card className="max-w-3xl mx-auto overflow-hidden border-0 shadow-xl bg-gradient-to-br from-[#b73b8f]/10 via-white to-[#00adef]/10 dark:from-[#b73b8f]/15 dark:via-card dark:to-[#00adef]/15">
          <div className="px-6 pt-8 pb-6 text-center border-b border-border/50 bg-white/50 dark:bg-white/5">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("services.ctaTitle")}</h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">{t("services.ctaSubtitle")}</p>
          </div>
          <div className="px-6 py-8 flex justify-center">
            <Button size="lg" variant="gradient" asChild>
              <Link href="/#contact">{t("services.ctaButton")}</Link>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
