# Multi-language resources

Translation strings live in JSON files here: one file per locale (e.g. `sq.json`, `en.json`).

## Adding a new language

1. **Create a new JSON file**  
   Copy `en.json` (or `sq.json`) and name it with the locale code (e.g. `de.json` for German).

2. **Register the locale** in `lib/i18n-config.ts`:
   - Add the code to the `locales` array: `locales: ["sq", "en", "de"]`
   - Add a label in `localeNames`: `de: "Deutsch"`

3. **Translate** all values in the new JSON file. Keep the same keys and structure as the existing files.

4. **Optional:** Set it as default by changing `defaultLocale` in `lib/i18n-config.ts`.

## Structure

- **common** – Nav, footer, brand (shared across pages)
- **metadata** – Site title and description
- **home** – Home page sections (hero, services preview, events, blog, contact CTA)
- **about** – About page (intro, values, mission)
- **contact** – Contact page
- **services** – Services page (title, items with title/description/details arrays)
- **team** – Team page (title, subtitle, members array with name/role/bio)
- **events** – Events page
- **articles** – Articles page
- **contactForm** – Form labels, placeholders, toasts

Use dot-notation keys in code, e.g. `t("home.hero.title")` or `t("common.nav.about")`.

## How the locale is chosen

- The app reads the `NEXT_LOCALE` cookie (if present).
- Users change language via the header language switcher; the choice is stored in that cookie.
- The root layout loads messages for the current locale and passes them to `LanguageProvider`.
