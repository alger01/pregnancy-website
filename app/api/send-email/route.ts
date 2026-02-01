import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL 
    const GMAIL_USER = process.env.GMAIL_USER
    const GMAIL_PASS = process.env.GMAIL_PASS
    if (!GMAIL_USER || !GMAIL_PASS) {
      return NextResponse.json({ message: "SMTP credentials not set" }, { status: 500 })
    }

    // Create transporter for Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    })

      const emailContent = {
        from: `"Nën'Harmoni" <${GMAIL_USER}>`, // sender
        to: ADMIN_EMAIL,
        subject: `Kontakt nga klienti ${body.name}`,
        html: `
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
      }

      // Send email
      await transporter.sendMail(emailContent)

      return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("[v0] Send email error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
