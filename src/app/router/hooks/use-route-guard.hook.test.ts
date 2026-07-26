import { renderHook } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import type * as AuthModule from '@/modules/auth';
import { SESSION_STATUS, useSession } from '@/modules/auth';
import type * as RouterPackage from '@/packages/router';
import { useAppNavigation } from '@/packages/router';

import { initTestI18n } from '../../../../tests/setup/i18n-test.helper';
import { useRouteGuard } from './use-route-guard.hook';

vi.mock('@/modules/auth', async (importOriginal) => ({
  ...(await importOriginal<typeof AuthModule>()),
  useSession: vi.fn(),
}));

vi.mock('@/packages/router', async (importOriginal) => ({
  ...(await importOriginal<typeof RouterPackage>()),
  useAppNavigation: vi.fn(),
}));

function mockSession(status: (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS]): void {
  vi.mocked(useSession).mockReturnValue({
    status,
    isAuthenticated: status === SESSION_STATUS.Authenticated,
    isResolved: status !== SESSION_STATUS.Unknown,
  });
}

beforeAll(async () => {
  await initTestI18n();
});

function mockNavigation(currentPath = '/en'): void {
  vi.mocked(useAppNavigation).mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    goBack: vi.fn(),
    currentPath,
    currentUrl: currentPath,
  });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('useRouteGuard', () => {
  it('rejects an unsupported locale segment before a screen can render', () => {
    mockSession(SESSION_STATUS.Anonymous);
    mockNavigation('/xx/features');

    const { result } = renderHook(() => useRouteGuard());

    expect(result.current.isLocaleSupported).toBe(false);
  });

  it('holds routing until the session resolves', () => {
    mockSession(SESSION_STATUS.Unknown);
    mockNavigation();

    const { result } = renderHook(() => useRouteGuard());

    expect(result.current.isResolved).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('reports an authenticated session as resolved', () => {
    mockSession(SESSION_STATUS.Authenticated);
    mockNavigation();

    const { result } = renderHook(() => useRouteGuard());

    expect(result.current.isResolved).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('reports an anonymous session as resolved but unauthenticated', () => {
    mockSession(SESSION_STATUS.Anonymous);
    mockNavigation();

    const { result } = renderHook(() => useRouteGuard());

    expect(result.current.isResolved).toBe(true);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('carries a translated loading label for the waiting state', () => {
    mockSession(SESSION_STATUS.Unknown);
    mockNavigation();

    const { result } = renderHook(() => useRouteGuard());

    expect(result.current.loadingLabel).toBe('Loading…');
  });

  it('never exposes the session status or any token to the guard', () => {
    mockSession(SESSION_STATUS.Authenticated);
    mockNavigation();

    const { result } = renderHook(() => useRouteGuard());

    expect(Object.keys(result.current).sort()).toEqual([
      'homePath',
      'isAuthenticated',
      'isLocaleSupported',
      'isResolved',
      'loadingLabel',
      'loginPath',
    ]);
  });
});
