import { NextResponse } from "next/server"
import { readData } from "@/lib/file-storage"
import type { Article } from "@/types"

export async function GET() {
  try {
    const articles = await readData<Article>("articles.json")
    // Sort by date descending (newest first)
    const sortedArticles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return NextResponse.json(sortedArticles)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}
