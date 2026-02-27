"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "@/components/language-provider"

const LOGO_HEIGHT = 80
const LOGO_WIDTH = 300

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslations()

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-[var(--section-off-white)]/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[4.5rem] items-center justify-between py-2">
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={t("common.brandName")}>
              <Image
                src="/logo_purple.jpg"
                alt={t("common.brandName")}
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                className="h-14 sm:h-16 md:h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {t("common.nav.home")}
              </Link>
              <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {t("common.nav.about")}
              </Link>
              <Link href="/services" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {t("common.nav.services")}
              </Link>
              <Link href="/team" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {t("common.nav.team")}
              </Link>
              <Link href="/events" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {t("common.nav.events")}
              </Link>
              <Link href="/articles" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {t("common.nav.blog")}
              </Link>
              <LanguageSwitcher />
              <Link href="/contact"><Button variant="gradient">{t("common.nav.contact")}</Button></Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 flex flex-col gap-4 border-t border-border/60">
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
              <div className="pt-2 border-t border-border/60">
                <LanguageSwitcher />
              </div>
              <Link href="/contact"><Button variant="gradient" onClick={() => setIsMenuOpen(false)} className="w-full">{t("common.nav.contact")}</Button></Link>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
