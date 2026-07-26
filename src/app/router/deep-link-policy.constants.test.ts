import { describe, expect, it } from 'vitest';

import { parseDeepLink } from '@/platform';
import { APP_IDENTITY } from '@/shared/config';
import { APP_LOCALES } from '@/shared/enums';

import { APP_DEEP_LINK_POLICY } from './deep-link-policy.constants';

describe('APP_DEEP_LINK_POLICY', () => {
  it('allows https and the app custom scheme only', () => {
    expect(APP_DEEP_LINK_POLICY.allowedSchemes).toEqual(['https', APP_IDENTITY.appId]);
    expect(APP_DEEP_LINK_POLICY.allowedSchemes).toEqual(['https', 'com.capacitorranger.app']);
  });

  it('never allows an unencrypted scheme', () => {
    expect(APP_DEEP_LINK_POLICY.allowedSchemes).not.toContain('http');
  });

  it('allows the production host and local development only', () => {
    expect(APP_DEEP_LINK_POLICY.allowedHosts).toEqual(['capacitorranger.app', 'localhost']);
  });

  it('expands locale route templates into concrete allowlisted prefixes', () => {
    expect(APP_DEEP_LINK_POLICY.allowedPathPrefixes).toHaveLength(1 + APP_LOCALES.length * 10);
    expect(APP_DEEP_LINK_POLICY.allowedPathPrefixes).toContain('/');
    expect(APP_DEEP_LINK_POLICY.allowedPathPrefixes).toContain('/en/home');
    expect(APP_DEEP_LINK_POLICY.allowedPathPrefixes).toContain('/ar/settings');
    expect(APP_DEEP_LINK_POLICY.allowedPathPrefixes.some((path) => path.includes(':'))).toBe(false);
  });

  it('admits a link to a real screen', () => {
    expect(
      parseDeepLink('https://capacitorranger.app/en/home', APP_DEEP_LINK_POLICY),
    ).toMatchObject({
      ok: true,
      value: '/en/home',
    });
  });

  it('admits a link opened through the app custom scheme', () => {
    expect(
      parseDeepLink(
        'com.capacitorranger.app://capacitorranger.app/ar/settings',
        APP_DEEP_LINK_POLICY,
      ).ok,
    ).toBe(true);
  });

  it('rejects a link from a look-alike host', () => {
    expect(
      parseDeepLink('https://capacitorranger.app.evil.com/en/home', APP_DEEP_LINK_POLICY).ok,
    ).toBe(false);
  });

  it('rejects a plain http link', () => {
    expect(parseDeepLink('http://capacitorranger.app/en/home', APP_DEEP_LINK_POLICY).ok).toBe(
      false,
    );
  });

  it('rejects an unsupported locale even when the remaining path is real', () => {
    expect(parseDeepLink('https://capacitorranger.app/xx/home', APP_DEEP_LINK_POLICY)).toEqual({
      ok: false,
      error: { reason: 'path' },
    });
  });
});
