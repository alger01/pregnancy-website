"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Heart, Users, BookOpen, ArrowRight } from "lucide-react"
import { Modal } from "@/components/modal"
import { ContactForm } from "@/components/contact-form"
import { useTranslations } from "@/components/language-provider"
import type { Event, Article } from "@/types"

interface HomePageProps {
  events: Event[]
  articles: Article[]
}

export default function HomePage({ events, articles }: HomePageProps) {
  const { t, locale } = useTranslations()
  const upcomingEvents = (events ?? []).filter((event) => new Date(event.date) >= new Date()).slice(0, 3)
  const latestArticles = (articles ?? []).slice(0, 3)
  const dateLocale = locale === "sq" ? "sq-AL" : "en"

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b73b8f]/5 via-background to-[#00adef]/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              {t("home.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton text={t("home.hero.ctaBook")} />
              <Button size="lg" variant="outline" asChild className="text-lg bg-transparent">
                <Link href="/about">{t("home.hero.ctaAbout")}</Link>
              </Button>
            </div>
          </div>

          {/* Decorative illustration */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-60">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#b73b8f]/20 to-[#b73b8f]/5 flex items-center justify-center">
                <Heart className="w-12 h-12 text-[#b73b8f]" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00adef]/20 to-[#00adef]/5 flex items-center justify-center">
                <Users className="w-12 h-12 text-[#00adef]" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#b73b8f]/20 via-background to-[#00adef]/20 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.services.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-[#b73b8f]/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#b73b8f]/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[#b73b8f]" />
                </div>
                <CardTitle>{t("home.services.prenatal.title")}</CardTitle>
                <CardDescription>{t("home.services.prenatal.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-[#00adef]/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#00adef]/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#00adef]" />
                </div>
                <CardTitle>{t("home.services.postnatal.title")}</CardTitle>
                <CardDescription>{t("home.services.postnatal.description")}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("home.services.workshops.title")}</CardTitle>
                <CardDescription>{t("home.services.workshops.description")}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/services">
                {t("home.services.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{t("home.events.title")}</h2>
                <p className="text-muted-foreground">{t("home.events.subtitle")}</p>
              </div>
              <Button asChild variant="ghost">
                <Link href="/events">
                  {t("home.events.all")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {event.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={event.imageUrl || "/placeholder.svg"}
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
                    <Button asChild className="w-full">
                      <Link href={`/events?register=${event.id}`}>{t("home.events.register")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{t("home.blog.title")}</h2>
                <p className="text-muted-foreground">{t("home.blog.subtitle")}</p>
              </div>
              <Button asChild variant="ghost">
                <Link href="/articles">
                  {t("home.blog.allArticles")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {article.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={article.imageUrl || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary">{article.category}</span>
                      <span>{new Date(article.date).toLocaleDateString(dateLocale)}</span>
                    </div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={`/articles?read=${article.id}`}>{t("home.blog.readMore")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <Card className="border-2 bg-gradient-to-br from-[#b73b8f]/5 via-background to-[#00adef]/5">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl mb-4">{t("home.contactCta.title")}</CardTitle>
              <CardDescription className="text-lg">
                {t("home.contactCta.subtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-background border">
                  <div className="w-12 h-12 rounded-full bg-[#b73b8f]/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-[#b73b8f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("home.contactCta.phone")}</h3>
                    <p className="text-sm text-muted-foreground">+355 69 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-background border">
                  <div className="w-12 h-12 rounded-full bg-[#00adef]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[#00adef]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t("home.contactCta.email")}</h3>
                    <p className="text-sm text-muted-foreground">info@nenharmoni.al</p>
                  </div>
                </div>
                <ContactButton text={t("home.contactCta.bookConsultation")} size="lg" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

function ContactButton({ text, size }: { text: string; size?: "default" | "lg" }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslations()

  return (
    <>
      <Button size={size || "default"} className="w-full" onClick={() => setIsModalOpen(true)}>
        {text}
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t("contactForm.modalTitle")}>
        <ContactForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </>
  )
}
