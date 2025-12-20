import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#b73b8f]" />
                <div className="w-3 h-3 rounded-full bg-[#00adef]" />
              </div>
              <span className="text-lg font-semibold">Nën'Harmoni</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Mbështetje profesionale për femrat para dhe pas shtatzënisë.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigimi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ballina
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Rreth Nesh
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shërbimet
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ekipi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resurse</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Evente
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog & Edukim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontakti</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+355 69 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@nenharmoni.al</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Tiranë, Shqipëri</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a
                href="https://wa.me/355691234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/nenharmoni.al"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#E4405F] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/nenharmoni.al"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nën'Harmoni. Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  )
}
