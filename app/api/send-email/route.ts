import { NextResponse } from "next/server"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL
    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL
    const BREVO_SENDER_NAME = "Nën'Harmoni Website"

    if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
      return NextResponse.json({ message: "Brevo credentials not set" }, { status: 500 })
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_SENDER_NAME,
          email: BREVO_SENDER_EMAIL,
        },
        to: [{ email: ADMIN_EMAIL }],
        subject: `Kontakt nga klienti ${body.name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #b73b8f;">Kontakt nga klienti</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Të Dhënat e Klientit</h3>
              <p><strong>Emri:</strong> ${body.name}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Telefoni:</strong> ${body.phone}</p>
              ${body.message ? `<p><strong>Mesazhi:</strong><br/>${body.message}</p>` : ""}
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Ky email u gjenerua automatikisht nga sistemi i regjistrimit të Nën'Harmoni.
            </p>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message ?? "Failed to send email via Brevo")
    }

    return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("[v0] Send email error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
