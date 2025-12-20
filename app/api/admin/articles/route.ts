import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { requireAuth } from "@/lib/auth"
import type { Article } from "@/types"

export async function POST(request: Request) {
  try {
    await requireAuth()

    const body = await request.json()
    const { title, content, excerpt, author, category, imageUrl } = body

    if (!title || !content || !excerpt || !author || !category) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 })
    }

    const articles = await readData<Article>("articles.json")

    const newArticle: Article = {
      id: Date.now().toString(),
      title,
      content,
      excerpt,
      author,
      category,
      imageUrl,
      date: new Date().toISOString(),
    }

    articles.push(newArticle)
    await writeData("articles.json", articles)

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error("[v0] Create article error:", error)
    return NextResponse.json({ message: "Unauthorized or failed to create article" }, { status: 401 })
  }
}
