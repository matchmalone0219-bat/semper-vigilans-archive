import { useI18nStore } from "./store";
import type { Locale, TranslationDictionary } from "./types";

export * from "./types";
export * from "./store";
export { zh } from "./translations/zh";
export { en } from "./translations/en";
export * from "./dossier-en";
export * from "./people-en";
export * from "./places-en";
export * from "./gear-en";
export * from "./craft-en";
export * from "./recap-en";
export * from "./roots-en";
export * from "./merch-en";
export * from "./cases-en";
export * from "./rataalada-en";

/**
 * Convenience hook that returns current locale and translation dictionary.
 */
export function useI18n() {
  const locale = useI18nStore((s) => s.locale);
  const t = useI18nStore((s) => s.t);
  const setLocale = useI18nStore((s) => s.setLocale);
  const toggleLocale = useI18nStore((s) => s.toggleLocale);

  return { locale, t, setLocale, toggleLocale };
}

/**
 * Helper to pick localized value based on locale.
 */
export function pickLocale<T>(locale: Locale | string, zhVal: T, enVal: T): T {
  return locale === "en" ? enVal : zhVal;
}
