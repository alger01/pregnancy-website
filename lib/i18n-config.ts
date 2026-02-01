/**
 * Multi-language configuration.
 * Add new locales by creating a JSON file in locales/ and adding the code here.
 */
export const i18n = {
  defaultLocale: "sq" as const,
  locales: ["sq", "en"] as const,
  cookieName: "NEXT_LOCALE",
}

export type Locale = (typeof i18n.locales)[number]

export function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale)
}

export const localeNames: Record<Locale, string> = {
  sq: "Shqip",
  en: "English",
}
