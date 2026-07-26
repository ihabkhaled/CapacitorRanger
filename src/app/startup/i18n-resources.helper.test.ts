import { describe, expect, it } from 'vitest';

import { APP_LOCALE, APP_LOCALES } from '@/shared/enums';
import { I18N_KEYS } from '@/shared/i18n';

import { buildI18nResources } from './i18n-resources.helper';

describe('buildI18nResources', () => {
  it('bundles exactly the supported locales', () => {
    expect(Object.keys(buildI18nResources()).sort()).toEqual([...APP_LOCALES].sort());
  });

  it('nests each catalog under the i18next translation namespace', () => {
    const resources = buildI18nResources();

    expect(resources[APP_LOCALE.English]?.translation).toBeTypeOf('object');
    expect(resources[APP_LOCALE.Arabic]?.translation).toBeTypeOf('object');
    expect(resources[APP_LOCALE.Japanese]?.translation).toBeTypeOf('object');
  });

  it('carries the English copy the app renders', () => {
    const english = buildI18nResources()[APP_LOCALE.English]?.translation;

    expect(english).toMatchObject({ common: { appName: 'Capacitor Ranger' } });
  });

  it('carries a translated Arabic catalog rather than a copy of English', () => {
    const resources = buildI18nResources();

    expect(resources[APP_LOCALE.Arabic]?.translation).not.toEqual(
      resources[APP_LOCALE.English]?.translation,
    );
  });

  it('keeps every catalog structurally identical, so no key falls back', () => {
    const resources = buildI18nResources();
    const englishKeys = Object.keys(resources[APP_LOCALE.English]?.translation ?? {}).sort();
    for (const locale of APP_LOCALES)
      expect(Object.keys(resources[locale]?.translation ?? {}).sort()).toEqual(englishKeys);
  });

  it('resolves a declared key in both catalogs', () => {
    const resources = buildI18nResources();
    const [namespace, key] = I18N_KEYS.common.loading.split('.') as [string, string];

    for (const locale of APP_LOCALES) {
      const section = resources[locale]?.translation[namespace] as Record<string, string>;
      expect(section[key]).toBeTypeOf('string');
    }
  });
});
