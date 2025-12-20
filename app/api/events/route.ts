import { NextResponse } from "next/server"
import { readData } from "@/lib/file-storage"
import type { Event } from "@/types"

export async function GET() {
  try {
    const events = await readData<Event>("events.json")
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
