import { NextResponse } from "next/server"
import { readData } from "@/lib/file-storage"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { Service } from "@/types"

export async function GET() {
  try {
    const services = await readData<Service>("services.json")
    return NextResponse.json(services)
  } catch (error) {
    console.error("[v0] Fetch services error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

