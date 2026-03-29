"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { useTranslations } from "@/components/language-provider"

const LOGO_HEIGHT = 72
const LOGO_WIDTH = 270

export function Footer() {
  const { t } = useTranslations()

  return (
    <footer className="w-full bg-[var(--footer-bg)] text-white mt-0">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {/* Brand + logo */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-2" aria-label={t("common.brandName")}>
              <Image
                src="/logo_white_png.png"
                alt={t("common.brandName")}
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-white/70 max-w-[200px]">
              {t("common.footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-2">{t("common.footer.navigation")}</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-[#a78bfa] transition-colors">
                  {t("common.nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-[#a78bfa] transition-colors">
                  {t("common.nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-[#a78bfa] transition-colors">
                  {t("common.nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white/80 hover:text-[#a78bfa] transition-colors">
                  {t("common.nav.team")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-2">{t("common.footer.resources")}</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/events" className="text-white/80 hover:text-[#60a5fa] transition-colors">
                  {t("common.nav.events")}
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-white/80 hover:text-[#60a5fa] transition-colors">
                  {t("common.footer.blogAndEducation")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + social */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-2">{t("common.footer.contact")}</h3>
            <ul className="space-y-1 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-white/70" />
                <span>+355 69 623 4090</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-white/70" />
                <span>nenharmoni@outlook.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-white/70" />
                <span>{t("common.footer.address")}</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-2">
              <a
                href="https://wa.me/355696234090"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/nen_harmoni"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#E4405F] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-4 text-center text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} {t("common.brandName")}. {t("common.footer.allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  )
}
