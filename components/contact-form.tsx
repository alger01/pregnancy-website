"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { handleApiError } from "@/lib/api-client"
import { Calendar, MapPin, Clock, Video } from "lucide-react"
import { useTranslations } from "@/components/language-provider"
import type { Event } from "@/types"

interface ContactFormProps {
  event?: Event
  onSuccess?: () => void
}

function isDiscountActive(event: Event) {
  if (typeof event.discountPrice !== "number") return false
  if (!event.discountUntil) return true
  const untilEnd = new Date(`${event.discountUntil}T23:59:59`)
  return Date.now() <= untilEnd.getTime()
}

function formatEur(amount: number, locale: string) {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(amount)
  } catch {
    return `€${amount.toFixed(2)}`
  }
}

export function ContactForm({ event, onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { t, locale } = useTranslations()
  const dateLocale = locale === "sq" ? "sq-AL" : "en"
  const moneyLocale = locale === "sq" ? "sq-AL" : "en"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(event ? "/api/events/register" : "/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventId: event?.id,
          eventTitle: event?.title,
        }),
      })

      if (!response.ok) {
        const errorMessage = await handleApiError(null, response)
        throw new Error(errorMessage)
      }

      toast({
        title: t("contactForm.successTitle"),
        description: event ? t("contactForm.successRegister") : t("contactForm.successMessage"),
      })

      setFormData({ name: "", email: "", phone: "", message: "" })
      onSuccess?.()
    } catch (error) {
      const errorMessage = await handleApiError(error)
      toast({
        title: t("contactForm.errorTitle"),
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {event && (
        <div
          className={`p-6 rounded-lg border-2 ${event.theme === "girl" ? "bg-[#b73b8f]/5 border-[#b73b8f]/20" : "bg-[#00adef]/5 border-[#00adef]/20"}`}
        >
          <h3 className="font-semibold text-lg mb-4">{event.title}</h3>
            <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">{t("contactForm.date")}</p>
                <p className="text-muted-foreground">{new Date(event.date).toLocaleDateString(dateLocale)}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">{t("contactForm.time")}</p>
                <p className="text-muted-foreground">{event.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              {event.location === "online" ? (
                <Video className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              ) : (
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">{t("contactForm.location")}</p>
                <p className="text-muted-foreground">
                  {event.location === "online" ? t("events.onlineVideoCall") : event.address || t("events.addressTbc")}
                </p>
              </div>
            </div>
            {typeof event.price === "number" && (
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Çmimi</p>
                  {isDiscountActive(event) ? (
                    <div className="flex items-center gap-2">
                      <span className="text-base text-muted-foreground line-through">{formatEur(event.price, moneyLocale)}</span>
                      <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        {formatEur(event.discountPrice as number, moneyLocale)}
                      </span>
                    </div>
                  ) : (
                    <p className="text-foreground text-lg font-bold">{formatEur(event.price, moneyLocale)}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t("contactForm.fullName")}</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder={t("contactForm.fullNamePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("contactForm.email")}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="email@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("contactForm.phone")}</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            placeholder="+355 69 623 4090"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">{t("contactForm.message")}</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            placeholder={t("contactForm.messagePlaceholder")}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? t("contactForm.sending") : event ? t("contactForm.submitRegister") : t("contactForm.submit")}
        </Button>
      </form>
    </div>
  )
}

export default ContactForm
