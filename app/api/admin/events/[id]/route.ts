import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { requireAuth } from "@/lib/auth"
import type { Event } from "@/types"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const body = await request.json()

    const events = await readData<Event>("events.json")
    const eventIndex = events.findIndex((e) => e.id === id)

    if (eventIndex === -1) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    // Preserve registrations when updating
    events[eventIndex] = {
      ...events[eventIndex],
      ...body,
      id,
      registrations: events[eventIndex].registrations,
    }

    await writeData("events.json", events)

    return NextResponse.json(events[eventIndex])
  } catch (error) {
    console.error("[v0] Update event error:", error)
    return NextResponse.json({ message: "Unauthorized or failed to update event" }, { status: 401 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const events = await readData<Event>("events.json")
    const filteredEvents = events.filter((e) => e.id !== id)

    if (filteredEvents.length === events.length) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    await writeData("events.json", filteredEvents)

    return NextResponse.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("[v0] Delete event error:", error)
    return NextResponse.json({ message: "Unauthorized or failed to delete event" }, { status: 401 })
  }
}
