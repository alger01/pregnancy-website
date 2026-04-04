import type React from "react"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SponsorsBanner } from "@/components/sponsors-banner"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/components/language-provider"
import { i18n, isValidLocale, type Locale } from "@/lib/i18n-config"
import { getMessages } from "@/lib/get-messages"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nën'Harmoni - Mbështetje për Shtatzëninë",
  description: "Edukim, mbështetje emocionale dhe evente për femrat para dhe pas shtatzënisë",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo_white.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo_white.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "logo_white.jpg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get(i18n.cookieName)?.value
  const locale: Locale = isValidLocale(localeCookie) ? (localeCookie as Locale) : i18n.defaultLocale
  const messages = await getMessages(locale)

  return (
    <html lang={locale}>
      <body className={`font-sans antialiased`}>
        <LanguageProvider initialLocale={locale} initialMessages={messages}>
          <Header />
          {children}
          <SponsorsBanner />
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
