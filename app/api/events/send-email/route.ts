import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getErrorMessage, getErrorStatus } from "@/lib/error-handler"

function formatEur(amount: number, locale = "sq-AL") {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(amount)
  } catch {
    return `€${amount.toFixed(2)}`
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

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

    if (type === "registration") {
      const { event, registration } = data
      const hasPrice = typeof event?.price === "number"
      const hasDiscount = event?.discountActive && typeof event?.discountPrice === "number"
      const priceHtml = hasPrice
        ? `<p><strong>Çmimi:</strong> ${
            hasDiscount
              ? `${formatEur(event.price)} <span style="color:#666; text-decoration: line-through; margin-left:8px;">(origjinal)</span> &nbsp; <span style="color:#047857; font-weight:700;">${formatEur(event.discountPrice)}</span>`
              : `${formatEur(event.price)}`
          }</p>`
        : ""

      const emailContent = {
        from: `"Nën'Harmoni" <${GMAIL_USER}>`, // sender
        to: ADMIN_EMAIL,
        subject: `Regjistrim i Ri për Eventin: ${event.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #b73b8f;">Regjistrim i Ri për Event</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Detajet e Eventit</h3>
              <p><strong>Titulli:</strong> ${event.title}</p>
              <p><strong>Data:</strong> ${new Date(event.date).toLocaleDateString("sq-AL")}</p>
              <p><strong>Ora:</strong> ${event.time}</p>
              <p><strong>Vendndodhja:</strong> ${event.location === "online" ? "Online" : event.address || "N/A"}</p>
              ${priceHtml}
            </div>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Të Dhënat e Pjesëmarrësit</h3>
              <p><strong>Emri:</strong> ${registration.name}</p>
              <p><strong>Email:</strong> ${registration.email}</p>
              <p><strong>Telefoni:</strong> ${registration.phone}</p>
              ${registration.message ? `<p><strong>Mesazhi:</strong><br/>${registration.message}</p>` : ""}
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
    }

    return NextResponse.json({ message: "Unknown email type" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Send email error:", error)
    const errorMessage = getErrorMessage(error)
    const status = getErrorStatus(error)
    return NextResponse.json({ message: errorMessage }, { status })
  }
}
