import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { requireAuth } from "@/lib/auth"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { Service } from "@/types"

export async function POST(request: Request) {
  try {
    await requireAuth()

    const body = await request.json()
    const { title, titleSq, description, descriptionSq, details, detailsSq, icon, color } = body

    if (!title || !description) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 })
    }

    const services = await readData<Service>("services.json")

    const newService: Service = {
      id: Date.now().toString(),
      title,
      titleSq,
      description,
      descriptionSq,
      details: Array.isArray(details) ? details : [],
      detailsSq: Array.isArray(detailsSq) ? detailsSq : [],
      icon,
      color,
    }

    services.push(newService)
    await writeData("services.json", services)

    return NextResponse.json(newService, { status: 201 })
  } catch (error) {
    console.error("[v0] Create service error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

