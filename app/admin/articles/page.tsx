"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Modal } from "@/components/modal"
import { ArticleForm } from "@/components/article-form"
import type { Article } from "@/types"
import { useToast } from "@/hooks/use-toast"

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const fetchArticles = () => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleCreate = () => {
    setIsCreating(true)
    setSelectedArticle(null)
    setIsModalOpen(true)
  }

  const handleEdit = (article: Article) => {
    setIsCreating(false)
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handleDelete = async (articleId: string) => {
    if (!confirm("Jeni të sigurt që doni të fshini këtë artikull?")) return

    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, { method: "DELETE" })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "Sukses",
        description: "Artikulli u fshi me sukses",
      })

      fetchArticles()
    } catch (error) {
      toast({
        title: "Gabim",
        description: "Ndodhi një gabim gjatë fshirjes",
        variant: "destructive",
      })
    }
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
    fetchArticles()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Menaxho Artikujt</h1>
          <p className="text-muted-foreground">Krijo dhe menaxho artikuj edukativë</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Artikull i Ri
        </Button>
      </div>

      {articles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nuk ka artikuj. Krijoni të parin!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {article.category}
                  </span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(article)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(article.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{article.title}</CardTitle>
                <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {new Date(article.date).toLocaleDateString("sq-AL")} • {article.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isCreating ? "Krijo Artikull të Ri" : "Edito Artikullin"}
      >
        <ArticleForm article={selectedArticle} onSuccess={handleSuccess} />
      </Modal>
    </div>
  )
}
