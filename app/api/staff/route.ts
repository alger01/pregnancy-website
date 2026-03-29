import { NextResponse } from "next/server"
import { readData } from "@/lib/file-storage"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"
import type { StaffMember } from "@/types"

export async function GET() {
  try {
    const staff = await readData<StaffMember>("staff.json")
    return NextResponse.json(staff)
  } catch (error) {
    console.error("[v0] Fetch staff error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}

