import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { requireAuth } from "@/lib/auth"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { Article } from "@/types"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const body = await request.json()

    const articles = await readData<Article>("articles.json")
    const articleIndex = articles.findIndex((a) => a.id === id)

    if (articleIndex === -1) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    articles[articleIndex] = {
      ...articles[articleIndex],
      ...body,
      id,
    }

    await writeData("articles.json", articles)

    return NextResponse.json(articles[articleIndex])
  } catch (error) {
    console.error("[v0] Update article error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const articles = await readData<Article>("articles.json")
    const filteredArticles = articles.filter((a) => a.id !== id)

    if (filteredArticles.length === articles.length) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 })
    }

    await writeData("articles.json", filteredArticles)

    return NextResponse.json({ message: "Article deleted successfully" })
  } catch (error) {
    console.error("[v0] Delete article error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
