"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "@/components/language-provider"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslations()

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
              <span className="text-xl font-semibold">{t("common.brandName")}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                {t("common.nav.home")}
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                {t("common.nav.about")}
              </Link>
              <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
                {t("common.nav.services")}
              </Link>
              <Link href="/team" className="text-sm font-medium hover:text-primary transition-colors">
                {t("common.nav.team")}
              </Link>
              <Link href="/events" className="text-sm font-medium hover:text-primary transition-colors">
                {t("common.nav.events")}
              </Link>
              <Link href="/articles" className="text-sm font-medium hover:text-primary transition-colors">
                {t("common.nav.blog")}
              </Link>
              <LanguageSwitcher />
              <Link href="/contact"><Button>{t("common.nav.contact")}</Button></Link>
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
                {t("common.nav.home")}
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("common.nav.about")}
              </Link>
              <Link
                href="/services"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("common.nav.services")}
              </Link>
              <Link
                href="/team"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("common.nav.team")}
              </Link>
              <Link
                href="/events"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("common.nav.events")}
              </Link>
              <Link
                href="/articles"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("common.nav.blog")}
              </Link>
              <div className="pt-2 border-t">
                <LanguageSwitcher />
              </div>
              <Link href="/contact"><Button onClick={() => setIsMenuOpen(false)} className="w-full">{t("common.nav.contact")}</Button></Link>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
