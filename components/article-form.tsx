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
import type { Article } from "@/types"

interface ArticleFormProps {
  article: Article | null
  onSuccess: () => void
}

export function ArticleForm({ article, onSuccess }: ArticleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    author: article?.author || "",
    category: article?.category || "",
    imageUrl: article?.imageUrl || "",
    theme: article?.theme || "girl",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = article ? `/api/admin/articles/${article.id}` : "/api/admin/articles"
      const method = article ? "PUT" : "POST"

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
        description: article ? "Artikulli u përditësua me sukses" : "Artikulli u krijua me sukses",
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
        <Label htmlFor="excerpt">Përshkrimi i Shkurtër</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Përmbajtja</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={8}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author">Autori</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Kategoria</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
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
          {isSubmitting ? "Duke ruajtur..." : article ? "Përditëso" : "Krijo"}
        </Button>
      </div>
    </form>
  )
}
