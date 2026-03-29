"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { handleApiError } from "@/lib/api-client"
import type { StaffMember } from "@/types"
import { Upload, X } from "lucide-react"

interface StaffFormProps {
  member: StaffMember | null
  onSuccess: () => void
}

export function StaffForm({ member, onSuccess }: StaffFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: member?.name || "",
    role: member?.role || "",
    roleSq: member?.roleSq || "",
    bio: member?.bio || "",
    bioSq: member?.bioSq || "",
    email: member?.email || "",
    imageUrl: member?.imageUrl || "",
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Gabim",
        description: "Përdorni një skedar imazhi.",
        variant: "destructive",
      })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Gabim",
        description: "Imazhi duhet të jetë më i vogël se 5MB.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const uploadData = new FormData()
      uploadData.append("file", file)
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Upload failed")
      }
      const { url } = await res.json()
      setFormData((prev) => ({ ...prev, imageUrl: url }))
      toast({ title: "Sukses", description: "Imazhi u ngarkua" })
    } catch (error) {
      const msg = await handleApiError(error)
      toast({ title: "Gabim", description: msg, variant: "destructive" })
    } finally {
      setIsUploading(false)
      e.target.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = member ? `/api/admin/staff/${member.id}` : "/api/admin/staff"
      const method = member ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorMessage = await handleApiError(null, response)
        throw new Error(errorMessage)
      }

      toast({
        title: "Sukses",
        description: member ? "Anëtari i stafit u përditësua me sukses" : "Anëtari i stafit u krijua me sukses",
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
        <Label htmlFor="name">Emri</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role (English)</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio (English)</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="roleSq">Roli (Shqip)</Label>
        <Input
          id="roleSq"
          value={formData.roleSq}
          onChange={(e) => setFormData({ ...formData, roleSq: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bioSq">Biografia (Shqip)</Label>
        <Textarea
          id="bioSq"
          value={formData.bioSq}
          onChange={(e) => setFormData({ ...formData, bioSq: e.target.value })}
          rows={4}
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
        />
      </div>

      <div className="space-y-2">
        <Label>Imazhi i profilit</Label>
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Duke ngarkuar..." : "Ngarko foto"}
            </Button>
          </div>
          {formData.imageUrl ? (
            <div className="relative inline-block">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-32 w-auto rounded-lg border object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, imageUrl: "" })}
                className="absolute -top-2 -right-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                aria-label="Hiq imazhin"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Duke ruajtur..." : member ? "Përditëso" : "Krijo"}
        </Button>
      </div>
    </form>
  )
}

