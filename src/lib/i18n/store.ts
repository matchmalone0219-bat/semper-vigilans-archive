import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale, TranslationDictionary } from "./types";
import { zh } from "./translations/zh";
import { en } from "./translations/en";

const dictionaries: Record<Locale, TranslationDictionary> = { zh, en };

export interface I18nState {
  locale: Locale;
  t: TranslationDictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

function applyHtmlLang(locale: Locale) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: "zh",
      t: zh,
      setLocale: (nextLocale: Locale) => {
        applyHtmlLang(nextLocale);
        set({
          locale: nextLocale,
          t: dictionaries[nextLocale] || zh,
        });
      },
      toggleLocale: () => {
        const next: Locale = get().locale === "zh" ? "en" : "zh";
        get().setLocale(next);
      },
    }),
    {
      name: "sv_lang",
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyHtmlLang(state.locale);
          state.t = dictionaries[state.locale] || zh;
        }
      },
    }
  )
);
