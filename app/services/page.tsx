"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Baby, Users, Calendar, Video, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

const SERVICE_KEYS = ["prenatal", "postnatal", "individual", "workshops", "couple", "online"] as const
const ICONS = [Heart, Baby, Users, Calendar, MessageCircle, Video]
const COLORS = ["#b73b8f", "#00adef", "#b73b8f", "#00adef", "#b73b8f", "#00adef"]

export default function ServicesPage() {
  const { t, messages } = useLanguage()
  const items = (messages as Record<string, unknown>)?.services?.items as Record<string, { title: string; description: string; details: string[] }> | undefined
  const servicesWithDetails = SERVICE_KEYS.map((key, index) => {
    const item = items?.[key]
    return {
      icon: ICONS[index],
      color: COLORS[index],
      title: item?.title ?? t(`services.items.${key}.title`),
      description: item?.description ?? t(`services.items.${key}.description`),
      details: item?.details ?? [],
    }
  })

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("services.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {servicesWithDetails.map((service, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
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
