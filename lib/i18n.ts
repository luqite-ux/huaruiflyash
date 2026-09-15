// Locale-aware content infrastructure.
// English is the only shipped locale today, but every content model below
// stores text as a per-locale record so additional languages can be added
// without changing page or data-model code.
export const locales = ["en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export type LocalizedText = Partial<Record<Locale, string>>

/**
 * Resolves a localized text field using:
 * requested language -> default language -> first non-empty language.
 */
export function resolveLocaleText(field: LocalizedText, requested: Locale = defaultLocale): string {
  if (field[requested]) return field[requested] as string
  if (field[defaultLocale]) return field[defaultLocale] as string
  const first = Object.values(field).find((value) => Boolean(value))
  return first ?? ""
}
