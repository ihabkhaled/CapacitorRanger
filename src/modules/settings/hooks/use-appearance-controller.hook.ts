import type { AppLocale, ThemeMode } from '@/shared/enums';

import { useSettingsStore } from '../store/settings.store';

export interface AppearanceController {
  readonly theme: ThemeMode;
  readonly locale: AppLocale;
  readonly setTheme: (theme: ThemeMode) => void;
  readonly setLocale: (locale: AppLocale) => void;
}

export function useAppearanceController(): AppearanceController {
  const theme = useSettingsStore((state) => state.theme);
  const locale = useSettingsStore((state) => state.locale);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const setLocale = useSettingsStore((state) => state.setLocale);
  return { theme, locale, setTheme, setLocale };
}
