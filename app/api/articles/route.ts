import { NextResponse } from "next/server"
import { readData } from "@/lib/file-storage"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { Article } from "@/types"

export async function GET() {
  try {
    const articles = await readData<Article>("articles.json")
    // Sort by date descending (newest first)
    const sortedArticles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return NextResponse.json(sortedArticles)
  } catch (error) {
    console.error("[v0] Fetch articles error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
