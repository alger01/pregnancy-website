"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, Tag } from "lucide-react"
import { Pagination } from "@/components/pagination"
import { Modal } from "@/components/modal"
import type { Article } from "@/types"
import { useSearchParams } from "next/navigation"

const ITEMS_PER_PAGE = 9

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
  }, [])

  useEffect(() => {
    const readArticleId = searchParams.get("read")
    if (readArticleId) {
      const article = articles.find((a) => a.id === readArticleId)
      if (article) {
        setSelectedArticle(article)
        setIsModalOpen(true)
      }
    }
  }, [searchParams, articles])

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleReadMore = (article: Article) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
  }

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Edukim</h1>
          <p className="text-lg text-muted-foreground">
            Informacion i bazuar në evidenca shkencore për të mbështetur udhëtimin tuaj
          </p>
        </div>

        {displayedArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nuk ka artikuj të disponueshëm në këtë moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedArticles.map((article) => {
                const themeColor = article.theme === "boy" ? "#00adef" : "#b73b8f"
                const themeBg = article.theme === "boy" ? "bg-[#00adef]/10" : "bg-[#b73b8f]/10"
                const themeText = article.theme === "boy" ? "text-[#00adef]" : "text-[#b73b8f]"
                const themeBorder = article.theme === "boy" ? "border-[#00adef]" : "border-[#b73b8f]"
                const themeBtnBorder = article.theme === "boy" ? "border-[#00adef]" : "border-[#b73b8f]"
                const themeBtnHover = article.theme === "boy" ? "hover:bg-[#00adef]" : "hover:bg-[#b73b8f]"

                return (
                  <Card
                    key={article.id}
                    className={`overflow-hidden border-2 ${themeBorder} hover:bg-white hover:shadow-lg transition-all flex flex-col group`}
                  >
                    {article.imageUrl && (
                      <div
                        className="aspect-video w-full overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)` }}
                      >
                        <img
                          src={article.imageUrl || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-grow">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${themeBg} ${themeText}`}>
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.date).toLocaleDateString("sq-AL")}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4 flex-shrink-0" />
                        <span>{article.author}</span>
                      </div>
                      <button
                        onClick={() => handleReadMore(article)}
                        className={`w-full border-2 ${themeBtnBorder} ${themeText} bg-transparent ${themeBtnHover} hover:text-white transition-colors px-4 py-2 rounded-md font-medium`}
                      >
                        Lexo më shumë
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

      {/* Reading Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedArticle?.title}>
        {selectedArticle && (
          <div className="space-y-6">
            {selectedArticle.imageUrl && (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-[#b73b8f]/10 to-[#00adef]/10">
                <img
                  src={selectedArticle.imageUrl || "/placeholder.svg"}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{selectedArticle.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(selectedArticle.date).toLocaleDateString("sq-AL")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <span>{selectedArticle.category}</span>
              </div>
            </div>

            <div
              className="prose prose-sm max-w-none"
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.75",
              }}
            >
              {selectedArticle.content}
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
}
