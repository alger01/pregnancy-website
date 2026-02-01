"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Video } from "lucide-react"
import { Pagination } from "@/components/pagination"
import { Modal } from "@/components/modal"
import { ContactForm } from "@/components/contact-form"
import { useTranslations } from "@/components/language-provider"
import type { Event } from "@/types"
import { useSearchParams } from "next/navigation"

const ITEMS_PER_PAGE = 9

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    fetch("/api/events")
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.message || "Failed to fetch events")
        }
        return res.json()
      })
      .then((data) => setEvents(data))
      .catch((error) => {
        console.error("Error fetching events:", error)
        // Optionally show a toast notification here if needed
      })
  }, [])

  useEffect(() => {
    const registerEventId = searchParams.get("register")
    if (registerEventId) {
      const event = events.find((e) => e.id === registerEventId)
      if (event) {
        setSelectedEvent(event)
        setIsModalOpen(true)
      }
    }
  }, [searchParams, events])

  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date())
  const totalPages = Math.ceil(upcomingEvents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedEvents = upcomingEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const { t, locale } = useTranslations()
  const dateLocale = locale === "sq" ? "sq-AL" : "en"

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("events.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("events.subtitle")}</p>
        </div>

        {displayedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("events.noEvents")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedEvents.map((event) => {
                const themeColor = event.theme === "boy" ? "#00adef" : "#b73b8f"
                const themeBg = event.theme === "boy" ? "bg-[#00adef]/10" : "bg-[#b73b8f]/10"
                const themeText = event.theme === "boy" ? "text-[#00adef]" : "text-[#b73b8f]"
                const themeBorder = event.theme === "boy" ? "border-[#00adef]" : "border-[#b73b8f]"
                const themeBtnHover = event.theme === "boy" ? "hover:bg-[#00adef]" : "hover:bg-[#b73b8f]"

                return (
                  <Card
                    key={event.id}
                    className={`overflow-hidden border-2 ${themeBorder} hover:bg-white hover:shadow-lg transition-all flex flex-col group`}
                  >
                    {event.imageUrl && (
                      <div
                        className="aspect-video w-full overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)` }}
                      >
                        <img
                          src={event.imageUrl || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${themeBg} ${themeText}`}>
                          {event.location === "online" ? t("events.online") : t("events.onsite")}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{new Date(event.date).toLocaleDateString(dateLocale)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      {event.location === "online" ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Video className="h-4 w-4 flex-shrink-0" />
                          <span>{t("events.onlineVideoCall")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span>{event.address || t("events.addressTbc")}</span>
                        </div>
                      )}
                      <button
                        onClick={() => handleRegister(event)}
                        className={`w-full mt-4 px-4 py-2 rounded-md font-medium text-white transition-colors ${themeBg.replace("/10", "")} ${themeBtnHover}`}
                        style={{ backgroundColor: themeColor }}
                      >
                        {t("events.register")}
                      </button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </div>

      {/* Registration Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={t("events.registerModalTitle")}>
        {selectedEvent && <ContactForm event={selectedEvent} onSuccess={handleCloseModal} />}
      </Modal>
    </main>
  )
}
