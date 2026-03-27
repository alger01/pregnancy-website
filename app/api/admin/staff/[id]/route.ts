import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { requireAuth } from "@/lib/auth"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { StaffMember } from "@/types"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const body = await request.json()

    const staff = await readData<StaffMember>("staff.json")
    const index = staff.findIndex((m) => m.id === id)

    if (index === -1) {
      return NextResponse.json({ message: "Staff member not found" }, { status: 404 })
    }

    staff[index] = {
      ...staff[index],
      ...body,
      id,
    }

    await writeData("staff.json", staff)

    return NextResponse.json(staff[index])
  } catch (error) {
    console.error("[v0] Update staff member error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth()

    const { id } = await params
    const staff = await readData<StaffMember>("staff.json")
    const filtered = staff.filter((m) => m.id !== id)

    if (filtered.length === staff.length) {
      return NextResponse.json({ message: "Staff member not found" }, { status: 404 })
    }

    await writeData("staff.json", filtered)

    return NextResponse.json({ message: "Staff member deleted successfully" })
  } catch (error) {
    console.error("[v0] Delete staff member error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

