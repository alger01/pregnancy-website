"use client"

import type React from "react"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { i18n, isValidLocale, type Locale } from "@/lib/i18n-config"
import type { Messages } from "@/lib/get-messages"
import { getNestedMessage } from "@/lib/get-messages"

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  messages: Messages
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  initialLocale,
  initialMessages,
  children,
}: {
  initialLocale: Locale
  initialMessages: Messages
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [messages, setMessages] = useState<Messages>(initialMessages)

  const setLocale = useCallback((newLocale: Locale) => {
    if (!isValidLocale(newLocale)) return
    setLocaleState(newLocale)
    document.cookie = `${i18n.cookieName}=${newLocale};path=/;max-age=31536000`
    import(`@/locales/${newLocale}.json`)
      .then((mod) => setMessages(mod.default as Messages))
      .catch(() => {})
  }, [])

  const t = useCallback(
    (key: string): string => {
      const value = getNestedMessage(messages, key)
      return value ?? key
    },
    [messages]
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t, messages }),
    [locale, setLocale, t, messages]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}

export function useTranslations() {
  const { t, locale, setLocale } = useLanguage()
  return { t, locale, setLocale }
}
