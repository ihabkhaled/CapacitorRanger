import { useSession } from '@/modules/auth';
import { useAppTranslation } from '@/packages/i18n';
import { useAppNavigation } from '@/packages/router';
import { APP_PATHS, PATH_SEPARATOR } from '@/shared/config';
import { isAppLocale } from '@/shared/enums';
import { localeFromPath, localizedPath } from '@/shared/helpers/localized-path.helper';
import { I18N_KEYS } from '@/shared/i18n';

export interface RouteGuardView {
  readonly isResolved: boolean;
  readonly isAuthenticated: boolean;
  readonly isLocaleSupported: boolean;
  readonly loadingLabel: string;
  readonly loginPath: string;
  readonly homePath: string;
}

export function useRouteGuard(): RouteGuardView {
  const session = useSession();
  const { t } = useAppTranslation();
  const navigation = useAppNavigation();
  const localeSegment = navigation.currentPath.split(PATH_SEPARATOR)[1] ?? '';
  const locale = localeFromPath(navigation.currentPath);
  return {
    isResolved: session.isResolved,
    isAuthenticated: session.isAuthenticated,
    isLocaleSupported: isAppLocale(localeSegment),
    loadingLabel: t(I18N_KEYS.common.loading),
    loginPath: localizedPath(APP_PATHS.login, locale),
    homePath: localizedPath(APP_PATHS.home, locale),
  };
}
