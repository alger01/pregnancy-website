import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { requireAuth } from "@/lib/auth"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { Service } from "@/types"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const body = await request.json()

    const services = await readData<Service>("services.json")
    const index = services.findIndex((s) => s.id === id)

    if (index === -1) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 })
    }

    services[index] = {
      ...services[index],
      ...body,
      id,
    }

    await writeData("services.json", services)

    return NextResponse.json(services[index])
  } catch (error) {
    console.error("[v0] Update service error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const services = await readData<Service>("services.json")
    const filtered = services.filter((s) => s.id !== id)

    if (filtered.length === services.length) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 })
    }

    await writeData("services.json", filtered)

    return NextResponse.json({ message: "Service deleted successfully" })
  } catch (error) {
    console.error("[v0] Delete service error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

