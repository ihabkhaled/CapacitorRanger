import { describe, expect, it } from 'vitest';

import { APP_PATHS } from '@/shared/config';
import { APP_LOCALE, APP_LOCALES, isAppLocale } from '@/shared/enums';

import { localeFromPath, localizedPath } from './localized-path.helper';

describe('localized path helpers', () => {
  it('recognizes exactly the supported locale catalog', () => {
    expect(APP_LOCALES).toHaveLength(14);
    expect(APP_LOCALES.every(isAppLocale)).toBe(true);
    expect(isAppLocale('en-US')).toBe(false);
  });

  it('reads a supported locale and safely defaults invalid paths to English', () => {
    expect(localeFromPath('/fa/features')).toBe(APP_LOCALE.Persian);
    expect(localeFromPath('/unknown/features')).toBe(APP_LOCALE.English);
    expect(localeFromPath('/')).toBe(APP_LOCALE.English);
  });

  it('builds concrete localized paths from route patterns', () => {
    expect(localizedPath(APP_PATHS.about, APP_LOCALE.French)).toBe('/fr/about');
    expect(localizedPath(APP_PATHS.root, APP_LOCALE.French)).toBe('/');
  });
});
