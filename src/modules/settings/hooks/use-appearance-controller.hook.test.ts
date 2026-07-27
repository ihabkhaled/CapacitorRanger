import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { APP_LOCALE, THEME_MODE } from '@/shared/enums';

import { useSettingsStore } from '../store/settings.store';
import { useAppearanceController } from './use-appearance-controller.hook';

beforeEach(() => {
  useSettingsStore.setState({
    theme: THEME_MODE.System,
    locale: APP_LOCALE.English,
  });
});

describe('useAppearanceController', () => {
  it('exposes and updates the shared appearance preferences', () => {
    const { result } = renderHook(() => useAppearanceController());

    expect(result.current.theme).toBe(THEME_MODE.System);
    expect(result.current.locale).toBe(APP_LOCALE.English);

    act(() => {
      result.current.setTheme(THEME_MODE.Dark);
      result.current.setLocale(APP_LOCALE.Arabic);
    });

    expect(result.current.theme).toBe(THEME_MODE.Dark);
    expect(result.current.locale).toBe(APP_LOCALE.Arabic);
  });
});
