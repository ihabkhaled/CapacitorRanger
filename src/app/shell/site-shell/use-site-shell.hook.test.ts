import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type * as SettingsModule from '@/modules/settings';
import { useAppearanceController } from '@/modules/settings';
import type * as I18nModule from '@/packages/i18n';
import { changeAppLocale, useAppTranslation } from '@/packages/i18n';
import type * as RouterModule from '@/packages/router';
import { useAppNavigation } from '@/packages/router';
import type * as PlatformModule from '@/platform';
import { applyDocumentLocale, useCompactViewport } from '@/platform';
import { APP_LOCALE, THEME_MODE } from '@/shared/enums';

import { useCloseMenuOnEscape } from './use-close-menu-on-escape.hook';
import { useSiteShell } from './use-site-shell.hook';

vi.mock('@/modules/settings', async (importOriginal) => ({
  ...(await importOriginal<typeof SettingsModule>()),
  useAppearanceController: vi.fn(),
}));

vi.mock('@/packages/i18n', async (importOriginal) => ({
  ...(await importOriginal<typeof I18nModule>()),
  changeAppLocale: vi.fn(),
  useAppTranslation: vi.fn(),
}));

vi.mock('@/packages/router', async (importOriginal) => ({
  ...(await importOriginal<typeof RouterModule>()),
  useAppNavigation: vi.fn(),
}));

vi.mock('@/platform', async (importOriginal) => ({
  ...(await importOriginal<typeof PlatformModule>()),
  applyDocumentLocale: vi.fn(),
  useCompactViewport: vi.fn(),
}));

vi.mock('./use-close-menu-on-escape.hook', () => ({ useCloseMenuOnEscape: vi.fn() }));

const push = vi.fn();
const replace = vi.fn();
const setLocale = vi.fn();
const setTheme = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useAppTranslation).mockReturnValue({
    t: (key: string) => key,
    locale: APP_LOCALE.Arabic,
  });
  vi.mocked(useAppNavigation).mockReturnValue({
    currentPath: '/ar/settings',
    currentUrl: '/ar/settings?panel=appearance#language',
    push,
    replace,
    goBack: vi.fn(),
  });
  vi.mocked(useAppearanceController).mockReturnValue({
    locale: APP_LOCALE.English,
    theme: THEME_MODE.Dark,
    setLocale,
    setTheme,
  });
  vi.mocked(useCompactViewport).mockReturnValue(true);
  vi.mocked(changeAppLocale).mockResolvedValue();
});

describe('useSiteShell', () => {
  it('derives localized navigation, product layout, and document direction from the URL', async () => {
    const { result } = renderHook(() => useSiteShell());

    expect(result.current.brandPath).toBe('/ar');
    expect(result.current.primaryLinks[1]?.path).toBe('/ar/about');
    expect(result.current.productLinks.at(-1)?.path).toBe('/ar/workbench');
    expect(result.current.localeChoices).toHaveLength(14);
    expect(result.current.themeChoices).toHaveLength(3);
    expect(result.current.layout).toBe('product');
    expect(result.current.rendersSidebar).toBe(true);
    expect(result.current.isSidebarHidden).toBe(true);
    await waitFor(() => {
      expect(setLocale).toHaveBeenCalledWith(APP_LOCALE.Arabic);
    });
    expect(applyDocumentLocale).toHaveBeenCalledWith(APP_LOCALE.Arabic, 'rtl');
    expect(changeAppLocale).toHaveBeenCalledWith(APP_LOCALE.Arabic);
  });

  it('owns menu, navigation, locale, and theme interactions', () => {
    const { result } = renderHook(() => useSiteShell());

    act(() => {
      result.current.onMenuToggle();
    });
    expect(result.current.isMenuOpen).toBe(true);
    expect(result.current.showsDrawerScrim).toBe(true);

    act(() => {
      result.current.onNavigate('/ar/features');
    });
    expect(result.current.isMenuOpen).toBe(false);
    expect(push).toHaveBeenCalledExactlyOnceWith('/ar/features');

    act(() => {
      result.current.onMenuToggle();
      result.current.onLocaleChange(APP_LOCALE.Japanese);
    });
    expect(replace).toHaveBeenCalledExactlyOnceWith('/ja/settings?panel=appearance#language');
    expect(result.current.isMenuOpen).toBe(false);

    act(() => {
      result.current.onThemeChange(THEME_MODE.Light);
    });
    expect(setTheme).toHaveBeenCalledExactlyOnceWith(THEME_MODE.Light);
  });

  it('closes an open menu through the escape subscription callback', () => {
    const { result } = renderHook(() => useSiteShell());

    act(() => {
      result.current.onMenuToggle();
    });
    const escapeClose = vi.mocked(useCloseMenuOnEscape).mock.calls.at(-1)?.[1];
    expect(escapeClose).toBeTypeOf('function');

    act(() => {
      escapeClose?.();
    });
    expect(result.current.isMenuOpen).toBe(false);

    act(() => {
      result.current.onMenuToggle();
      result.current.onMenuClose();
    });
    expect(result.current.isMenuOpen).toBe(false);
  });
});
