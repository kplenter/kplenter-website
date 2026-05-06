import de from "./de.json";
import en from "./en.json";

const dict = { de, en } as const;

export type Lang = keyof typeof dict;
export const LANGS: readonly Lang[] = ["de", "en"] as const;
export const DEFAULT_LANG: Lang = "de";

type Dict = typeof de;

type Lookup = string | string[] | undefined;

export function getLang(url: URL): Lang {
  return url.pathname.startsWith("/en") ? "en" : "de";
}

export function t(lang: Lang, key: string): Lookup {
  const segments = key.split(".");
  let current: unknown = dict[lang];
  for (const seg of segments) {
    if (current && typeof current === "object" && seg in current) {
      current = (current as Record<string, unknown>)[seg];
    } else {
      return key;
    }
  }
  return current as Lookup;
}

export function tStr(lang: Lang, key: string): string {
  const value = t(lang, key);
  return typeof value === "string" ? value : key;
}

export function tArr(lang: Lang, key: string): string[] {
  const value = t(lang, key);
  return Array.isArray(value) ? value : [];
}

export function homeHref(lang: Lang): string {
  return lang === "de" ? "/" : "/en/";
}

export function altLang(lang: Lang): Lang {
  return lang === "de" ? "en" : "de";
}

export type { Dict };
