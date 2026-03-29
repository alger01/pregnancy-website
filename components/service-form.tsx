"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { handleApiError } from "@/lib/api-client"
import type { Service } from "@/types"

interface ServiceFormProps {
  service: Service | null
  onSuccess: () => void
}

export function ServiceForm({ service, onSuccess }: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: service?.title || "",
    titleSq: service?.titleSq || "",
    description: service?.description || "",
    descriptionSq: service?.descriptionSq || "",
    details: (service?.details || []).join("\n"),
    detailsSq: (service?.detailsSq || []).join("\n"),
    icon: service?.icon || "heart",
    color: service?.color || "#b73b8f",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = service ? `/api/admin/services/${service.id}` : "/api/admin/services"
      const method = service ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          titleSq: formData.titleSq,
          description: formData.description,
          descriptionSq: formData.descriptionSq,
          details: formData.details
            .split("\n")
            .map((d) => d.trim())
            .filter(Boolean),
          detailsSq: formData.detailsSq
            .split("\n")
            .map((d) => d.trim())
            .filter(Boolean),
          icon: formData.icon,
          color: formData.color,
        }),
      })

      if (!response.ok) {
        const errorMessage = await handleApiError(null, response)
        throw new Error(errorMessage)
      }

      toast({
        title: "Sukses",
        description: service ? "Shërbimi u përditësua me sukses" : "Shërbimi u krijua me sukses",
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
        <Label htmlFor="title">Title (English)</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (English)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Details (English, one line per item)</Label>
        <Textarea
          id="details"
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="titleSq">Titulli (Shqip)</Label>
        <Input
          id="titleSq"
          value={formData.titleSq}
          onChange={(e) => setFormData({ ...formData, titleSq: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descriptionSq">Përshkrimi (Shqip)</Label>
        <Textarea
          id="descriptionSq"
          value={formData.descriptionSq}
          onChange={(e) => setFormData({ ...formData, descriptionSq: e.target.value })}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="detailsSq">Detajet (Shqip, një rresht për secilën)</Label>
        <Textarea
          id="detailsSq"
          value={formData.detailsSq}
          onChange={(e) => setFormData({ ...formData, detailsSq: e.target.value })}
          rows={6}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Ikona (heart, baby, users, calendar, message, video)</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value as any })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">Ngjyra (hex)</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Duke ruajtur..." : service ? "Përditëso" : "Krijo"}
        </Button>
      </div>
    </form>
  )
}

