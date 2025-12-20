import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import type { Event, Registration } from "@/types"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventId, name, email, phone, message } = body

    if (!eventId || !name || !email || !phone) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const events = await readData<Event>("events.json")
    const eventIndex = events.findIndex((e) => e.id === eventId)

    if (eventIndex === -1) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    const registration: Registration = {
      id: Date.now().toString(),
      eventId,
      name,
      email,
      phone,
      message,
      registeredAt: new Date().toISOString(),
    }

    if (!events[eventIndex].registrations) {
      events[eventIndex].registrations = []
    }

    const alreadyRegistered = events[eventIndex].registrations?.some((r) => r.email === email)

    if (alreadyRegistered) {
      return NextResponse.json({ message: "You are already registered for this event" }, { status: 400 })
    }

    if (events[eventIndex].capacity && events[eventIndex].registrations!.length >= events[eventIndex].capacity!) {
      return NextResponse.json({ message: "Event is full" }, { status: 400 })
    }

    events[eventIndex].registrations!.push(registration)
    await writeData("events.json", events)

    try {
      const event = events[eventIndex]
      await fetch(`${request.url.split("/api")[0]}/api/events/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "registration",
          data: {
            event: {
              title: event.title,
              date: event.date,
              time: event.time,
              location: event.location,
              address: event.address,
            },
            registration: {
              name,
              email,
              phone,
              message,
            },
          },
        }),
      })
    } catch (emailError) {
      console.error("[v0] Failed to send email notification:", emailError)
      // Don't fail the registration if email fails
    }

    return NextResponse.json({ message: "Registration successful", registration })
  } catch (error) {
    console.error("[v0] Event registration error:", error)
    return NextResponse.json({ message: "Failed to register" }, { status: 500 })
  }
}
