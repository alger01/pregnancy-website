"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, Clock, Video } from "lucide-react"
import type { Event } from "@/types"

interface ContactFormProps {
  event?: Event
  onSuccess?: () => void
}

export function ContactForm({ event, onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
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

      if (!response.ok) throw new Error("Failed to submit")

      toast({
        title: "Sukses",
        description: event
          ? "Regjistrimi juaj u dërgua me sukses!"
          : "Mesazhi juaj u dërgua me sukses! Do t'ju kontaktojmë së shpejti.",
      })

      setFormData({ name: "", email: "", phone: "", message: "" })
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Gabim",
        description: "Ndodhi një gabim. Ju lutem provoni përsëri.",
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
                <p className="font-medium">Data</p>
                <p className="text-muted-foreground">{new Date(event.date).toLocaleDateString("sq-AL")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 flex-shrink-0 mt-0.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Ora</p>
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
                <p className="font-medium">Lokacioni</p>
                <p className="text-muted-foreground">
                  {event.location === "online" ? "Online Video Call" : event.address || "Adresa do të konfirmohet"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Emri i plotë</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Emri juaj"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
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
          <Label htmlFor="phone">Telefoni</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            placeholder="+355 69 123 4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mesazhi</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            placeholder="Shkruani mesazhin tuaj këtu..."
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Duke dërguar..." : event ? "Regjistrohu" : "Dërgo Mesazhin"}
        </Button>
      </form>
    </div>
  )
}

export default ContactForm
