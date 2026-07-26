import { describe, expect, it } from 'vitest';

import { APP_LOCALE, APP_LOCALES } from './locale.enums';

describe('APP_LOCALE', () => {
  it('pins the supported locale codes', () => {
    expect(APP_LOCALE).toEqual({
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
    });
  });

  it('derives the locale list from the map', () => {
    expect(APP_LOCALES).toEqual([
      'en',
      'ar',
      'fr',
      'it',
      'de',
      'hi',
      'fa',
      'th',
      'ja',
      'zh',
      'es',
      'pt',
      'ko',
      'tr',
    ]);
  });

  it('keeps the derived list in sync with the map', () => {
    expect([...APP_LOCALES].sort()).toEqual(Object.values(APP_LOCALE).sort());
  });
});
