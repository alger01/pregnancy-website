import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { requireAuth } from "@/lib/auth"
import type { Event } from "@/types"

export async function POST(request: Request) {
  try {
    await requireAuth()

    const body = await request.json()
    const { title, description, date, time, location, address, imageUrl, capacity } = body

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 })
    }

    const events = await readData<Event>("events.json")

    const newEvent: Event = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      location,
      address,
      imageUrl,
      capacity,
      registrations: [],
    }

    events.push(newEvent)
    await writeData("events.json", events)

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error) {
    console.error("[v0] Create event error:", error)
    return NextResponse.json({ message: "Unauthorized or failed to create event" }, { status: 401 })
  }
}
