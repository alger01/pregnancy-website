import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"
import { requireAuth } from "@/lib/auth"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"

const UPLOAD_DIR = process.env.UPLOAD_DIR || "/var/www/uploads"
const UPLOAD_PUBLIC_PREFIX = process.env.UPLOAD_PUBLIC_PREFIX || "/uploads"
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
}

export async function POST(request: Request) {
  try {
    await requireAuth()

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    if (!MIME_TO_EXT[file.type]) {
      return NextResponse.json(
        { message: "Invalid file type. Only jpg, png, webp are allowed." },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: "File too large. Maximum size is 5MB." },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = MIME_TO_EXT[file.type]
    const filename = `${Date.now()}-${randomUUID()}${ext}`
    const dir = path.resolve(UPLOAD_DIR)
    const filePath = path.join(dir, filename)

    await mkdir(dir, { recursive: true })
    await writeFile(filePath, buffer)

    const url = `${UPLOAD_PUBLIC_PREFIX.replace(/\/$/, "")}/${filename}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error("[upload] Error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
