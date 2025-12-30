"use client"

import Link from "next/link"
import React from "react"
import { Instagram, MessageCircle } from "lucide-react"

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Link
        href="https://wa.me/355691234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#25D366] hover:scale-105 transition-transform"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>

      <Link
        href="https://instagram.com/nenharmoni.al"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#E4405F] hover:scale-105 transition-transform"
      >
        <Instagram className="h-6 w-6" />
      </Link>
    </div>
  )
}

export default FloatingContact
