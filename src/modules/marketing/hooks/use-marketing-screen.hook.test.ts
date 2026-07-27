import { renderHook } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { initTestI18n } from '../../../../tests/setup/i18n-test.helper';
import { MARKETING_PAGE_KIND } from '../types/marketing.types';
import { useMarketingScreen } from './use-marketing-screen.hook';

beforeAll(async () => {
  await initTestI18n();
});

describe('useMarketingScreen', () => {
  it.each([
    [MARKETING_PAGE_KIND.About, 4],
    [MARKETING_PAGE_KIND.Features, 5],
    [MARKETING_PAGE_KIND.Faq, 5],
  ] as const)('prepares translated %s content without a contact action', (kind, sectionCount) => {
    const { result } = renderHook(() => useMarketingScreen(kind));

    expect(result.current.kind).toBe(kind);
    expect(result.current.title).not.toBe('');
    expect(result.current.intro).not.toBe('');
    expect(result.current.sections).toHaveLength(sectionCount);
    expect(result.current.contactHref).toBeUndefined();
    expect(result.current.contactLabel).toBeUndefined();
  });

  it('adds the local mail action only to the contact page', () => {
    const { result } = renderHook(() => useMarketingScreen(MARKETING_PAGE_KIND.Contact));

    expect(result.current.contactHref).toBe('mailto:hello@capacitorranger.app');
    expect(result.current.contactLabel).toBe('Email hello@capacitorranger.app');
  });
});
