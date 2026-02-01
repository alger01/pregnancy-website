import { NextResponse } from "next/server"
import { readData } from "@/lib/file-storage"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { Event } from "@/types"

export async function GET() {
  try {
    const events = await readData<Event>("events.json")
    return NextResponse.json(events)
  } catch (error) {
    console.error("[v0] Fetch events error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
