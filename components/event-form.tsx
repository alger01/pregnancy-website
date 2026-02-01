"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { handleApiError } from "@/lib/api-client"
import type { Event } from "@/types"

interface EventFormProps {
  event: Event | null
  onSuccess: () => void
}

export function EventForm({ event, onSuccess }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "onsite",
    address: event?.address || "",
    imageUrl: event?.imageUrl || "",
    capacity: event?.capacity?.toString() || "",
    theme: event?.theme || "girl",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = event ? `/api/admin/events/${event.id}` : "/api/admin/events"
      const method = event ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          capacity: formData.capacity ? Number.parseInt(formData.capacity) : undefined,
        }),
      })

      if (!response.ok) {
        const errorMessage = await handleApiError(null, response)
        throw new Error(errorMessage)
      }

      toast({
        title: "Sukses",
        description: event ? "Eventi u përditësua me sukses" : "Eventi u krijua me sukses",
      })

      onSuccess()
    } catch (error) {
      const errorMessage = await handleApiError(error)
      toast({
        title: "Gabim",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titulli</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Përshkrimi</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Ora</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Lokacioni</Label>
        <Select
          value={formData.location}
          onValueChange={(value) => setFormData({ ...formData, location: value as any })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="onsite">Onsite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.location === "onsite" && (
        <div className="space-y-2">
          <Label htmlFor="address">Adresa</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="capacity">Kapaciteti (opsionale)</Label>
        <Input
          id="capacity"
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="theme">Ngjyra Tematike</Label>
        <Select value={formData.theme} onValueChange={(value) => setFormData({ ...formData, theme: value as any })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="girl">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#b73b8f]" />
                <span>Rozë (Vajzë)</span>
              </div>
            </SelectItem>
            <SelectItem value="boy">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#00adef]" />
                <span>Blu (Djalë)</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL e Imazhit (opsionale)</Label>
        <Input
          id="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Duke ruajtur..." : event ? "Përditëso" : "Krijo"}
        </Button>
      </div>
    </form>
  )
}
