"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { ContactForm } from "@/components/contact-form"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#b73b8f]" />
                <div className="w-3 h-3 rounded-full bg-[#00adef]" />
              </div>
              <span className="text-xl font-semibold">Nën'Harmoni</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                Ballina
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                Rreth Nesh
              </Link>
              <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
                Shërbimet
              </Link>
              <Link href="/team" className="text-sm font-medium hover:text-primary transition-colors">
                Ekipi
              </Link>
              <Link href="/events" className="text-sm font-medium hover:text-primary transition-colors">
                Evente
              </Link>
              <Link href="/articles" className="text-sm font-medium hover:text-primary transition-colors">
                Blog
              </Link>
              <Button onClick={() => setIsContactModalOpen(true)}>Na Kontaktoni</Button>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 flex flex-col gap-4 border-t">
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ballina
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Rreth Nesh
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shërbimet
              </Link>
              <Link
                href="/team"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ekipi
              </Link>
              <Link
                href="/events"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Evente
              </Link>
              <Link
                href="/articles"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Button
                onClick={() => {
                  setIsContactModalOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full"
              >
                Na Kontaktoni
              </Button>
            </nav>
          )}
        </div>
      </header>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Na Kontaktoni">
        <ContactForm onSuccess={() => setIsContactModalOpen(false)} />
      </Modal>
    </>
  )
}
