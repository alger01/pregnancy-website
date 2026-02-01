"use client"

import { useTranslations } from "@/components/language-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { i18n, localeNames, type Locale } from "@/lib/i18n-config"
import { ChevronDown, Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors outline-none focus:ring-0 focus-visible:ring-0 border-0 bg-transparent p-0 min-w-0 h-auto"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden />
        <span>{localeNames[locale]}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc as Locale)}
            className={locale === loc ? "bg-accent" : undefined}
          >
            {localeNames[loc as Locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
