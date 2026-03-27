import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/file-storage"
import { requireAuth } from "@/lib/auth"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { StaffMember } from "@/types"

export async function POST(request: Request) {
  try {
    await requireAuth()

    const body = await request.json()
    const { name, role, roleSq, bio, bioSq, email, imageUrl } = body

    if (!name || !role || !email) {
      return NextResponse.json({ message: "All required fields must be filled" }, { status: 400 })
    }

    const staff = await readData<StaffMember>("staff.json")

    const newMember: StaffMember = {
      id: Date.now().toString(),
      name,
      role,
      roleSq,
      bio: bio || "",
      bioSq: bioSq || "",
      email,
      imageUrl,
    }

    staff.push(newMember)
    await writeData("staff.json", staff)

    return NextResponse.json(newMember, { status: 201 })
  } catch (error) {
    console.error("[v0] Create staff member error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

