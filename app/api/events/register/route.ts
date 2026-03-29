import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { Event, Registration } from "@/types"

function isDiscountActive(event: Event) {
  if (typeof event.discountPrice !== "number") return false
  if (!event.discountUntil) return true
  const untilEnd = new Date(`${event.discountUntil}T23:59:59`)
  return Date.now() <= untilEnd.getTime()
}

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
      const discountActive = isDiscountActive(event)
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
              price: event.price,
              discountPrice: event.discountPrice,
              discountActive,
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
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
