import { APP_PATHS, LOCALE_PATH_PARAMETER, PATH_SEPARATOR, type AppPath } from '@/shared/config';
import { APP_LOCALE, isAppLocale, type AppLocale } from '@/shared/enums';

export function localeFromPath(path: string): AppLocale {
  const candidate = path.split(PATH_SEPARATOR)[1] ?? '';
  return isAppLocale(candidate) ? candidate : APP_LOCALE.English;
}

export function localizedPath(path: AppPath, locale: AppLocale): string {
  return path === APP_PATHS.root ? APP_PATHS.root : path.replace(LOCALE_PATH_PARAMETER, locale);
}
