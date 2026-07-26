export const APP_LOCALE = {
  English: 'en',
  Arabic: 'ar',
  French: 'fr',
  Italian: 'it',
  German: 'de',
  Hindi: 'hi',
  Persian: 'fa',
  Thai: 'th',
  Japanese: 'ja',
  Chinese: 'zh',
  Spanish: 'es',
  Portuguese: 'pt',
  Korean: 'ko',
  Turkish: 'tr',
} as const;

export type AppLocale = (typeof APP_LOCALE)[keyof typeof APP_LOCALE];

export const APP_LOCALES: readonly AppLocale[] = Object.values(APP_LOCALE);

export const APP_LOCALE_SET: ReadonlySet<string> = new Set(APP_LOCALES);

export function isAppLocale(value: string): value is AppLocale {
  return APP_LOCALE_SET.has(value);
}
