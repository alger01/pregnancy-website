"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Section } from "@/components/section"
import { Calendar, Heart, Users, BookOpen, ArrowRight, Baby, MessageCircle, Video } from "lucide-react"
import { Modal } from "@/components/modal"
import { ContactForm } from "@/components/contact-form"
import { useTranslations } from "@/components/language-provider"
import type { Event, Article, Service } from "@/types"

interface HomePageProps {
  events: Event[]
  articles: Article[]
}

const ICON_MAP: Record<NonNullable<Service["icon"]>, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  heart: Heart,
  baby: Baby,
  users: Users,
  calendar: Calendar,
  message: MessageCircle,
  video: Video,
}

export default function HomePage({ events, articles }: HomePageProps) {
  const { t, locale } = useTranslations()
  const upcomingEvents = (events ?? []).filter((event) => new Date(event.date) >= new Date()).slice(0, 3)
  const latestArticles = (articles ?? []).slice(0, 3)
  const [services, setServices] = useState<Service[]>([])
  const dateLocale = locale === "sq" ? "sq-AL" : "en"

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data: Service[]) => setServices(data))
      .catch((error) => {
        console.error("Error loading services:", error)
      })
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <Section variant="gradient" spacing="large" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b73b8f]/8 via-transparent to-[#00adef]/8" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo above title, centered, close together */}
            <div className="mb-2">
              <Image
                src="/logo_white_png.png"
                alt="Nën'armoni"
                width={180}
                height={100}
                className="h-16 md:h-40 w-auto object-contain mx-auto"
                priority
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance text-center leading-tight mb-6">
              {t("home.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton text={t("home.hero.ctaBook")} />
              <Button size="lg" variant="outline" asChild className="text-lg">
                <Link href="/about">{t("home.hero.ctaAbout")}</Link>
              </Button>
            </div>
          </div>

          {/* Decorative illustration */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-70">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-2xl bg-white/80 shadow-md flex items-center justify-center">
                <Heart className="w-12 h-12 text-[#b73b8f]" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-2xl bg-white/80 shadow-md flex items-center justify-center">
                <Users className="w-12 h-12 text-[#00adef]" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-2xl bg-white/80 shadow-md flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Preview */}
      <Section variant="lavender">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.services.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.slice(0, 3).map((service) => {
              const Icon = (service.icon && ICON_MAP[service.icon]) || Heart
              const color = service.color || "#b73b8f"
              const title = locale === "sq" ? service.titleSq || service.title : service.title
              const description = locale === "sq" ? service.descriptionSq || service.description : service.description

              return (
                <Card key={service.id} className="bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${color}20` }}>
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="gradient">
              <Link href="/services">
                {t("home.services.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <Section variant="paleBlue">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{t("home.events.title")}</h2>
                <p className="text-muted-foreground">{t("home.events.subtitle")}</p>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/events">
                  {t("home.events.all")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden bg-card/90">
                  {event.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-2xl bg-muted">
                      <img
                        src={event.imageUrl || "/logo_white.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(event.date).toLocaleDateString(dateLocale)} • {event.time}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="gradient" className="w-full">
                      <Link href={`/events?register=${event.id}`}>{t("home.events.register")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <Section variant="offWhite">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{t("home.blog.title")}</h2>
                <p className="text-muted-foreground">{t("home.blog.subtitle")}</p>
              </div>
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/articles">
                  {t("home.blog.allArticles")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden bg-card/90">
                  <div className="aspect-video w-full overflow-hidden rounded-t-2xl bg-muted">
                    <img
                      src={article.imageUrl || (article.theme === "boy" ? "/logo_blue.jpg" : "/logo_purple.jpg")}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="px-2 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium">{article.category}</span>
                      <span>{new Date(article.date).toLocaleDateString(dateLocale)}</span>
                    </div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/articles?read=${article.id}`}>{t("home.blog.readMore")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Contact CTA */}
      <Section id="contact" variant="warm" spacing="large">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto overflow-hidden border-0 shadow-xl bg-gradient-to-br from-[#b73b8f]/10 via-white to-[#00adef]/10 dark:from-[#b73b8f]/15 dark:via-card dark:to-[#00adef]/15">
            <div className="px-6 pt-8 pb-2 text-center border-b border-border/50 bg-white/50 dark:bg-white/5">
              <CardHeader className="p-0">
                <CardTitle className="text-3xl md:text-4xl mb-3 font-bold text-foreground">
                  {t("home.contactCta.title")}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground max-w-xl mx-auto">
                  {t("home.contactCta.subtitle")}
                </CardDescription>
              </CardHeader>
            </div>
            <CardContent className="pt-8 pb-8">
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-white/10 shadow-sm border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-[#b73b8f]/20 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-[#b73b8f]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-0.5">{t("home.contactCta.phone")}</h3>
                    <p className="text-sm text-muted-foreground">+355 69 623 4090</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/80 dark:bg-white/10 shadow-sm border border-border/50">
                  <div className="w-12 h-12 rounded-xl bg-[#00adef]/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#00adef]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-0.5">{t("home.contactCta.email")}</h3>
                    <p className="text-sm text-muted-foreground">nenharmoni@outlook.com</p>
                  </div>
                </div>
                <div className="pt-2 flex justify-center">
                  <ContactButton text={t("home.contactCta.bookConsultation")} size="lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </main>
  )
}

function ContactButton({ text, size }: { text: string; size?: "default" | "lg" }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslations()

  return (
    <>
      <Button size={size || "default"} variant="gradient" className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
        {text}
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t("contactForm.modalTitle")}>
        <ContactForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}