import type { Locale } from "./i18n-config"
import { isValidLocale } from "./i18n-config"

export type Messages = Record<string, unknown>

export async function getMessages(locale: string): Promise<Messages> {
  const validLocale = isValidLocale(locale) ? locale : "sq"
  const messages = await import(`@/locales/${validLocale}.json`)
  return messages.default as Messages
}

/** Resolve nested key like "home.hero.title" from a flat object. */
export function getNestedMessage(obj: Messages, path: string): string | undefined {
  const keys = path.split(".")
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === "string" ? current : undefined
}
