import { useAppTranslation } from '@/packages/i18n';
import { useAppNavigation } from '@/packages/router';
import { APP_PATHS } from '@/shared/config';
import { localeFromPath, localizedPath } from '@/shared/helpers/localized-path.helper';
import { I18N_KEYS } from '@/shared/i18n';

import {
  WELCOME_RELEASE_TARGETS,
  WELCOME_TRUST_BRANDS,
} from '../components/welcome-view/welcome-view.constants';

export interface WelcomeScreenView {
  readonly title: string;
  readonly subtitle: string;
  readonly eyebrow: string;
  readonly loginCta: string;
  readonly featuresCta: string;
  readonly trustLabel: string;
  readonly trustIntro: string;
  readonly trustBrands: readonly string[];
  readonly releaseTargets: readonly string[];
  readonly onLoginClick: () => void;
  readonly onFeaturesClick: () => void;
}

export function useWelcomeScreen(): WelcomeScreenView {
  const { t } = useAppTranslation();
  const navigation = useAppNavigation();
  const locale = localeFromPath(navigation.currentPath);
  return {
    title: t(I18N_KEYS.welcome.title),
    subtitle: t(I18N_KEYS.welcome.subtitle),
    eyebrow: t(I18N_KEYS.welcome.eyebrow),
    loginCta: t(I18N_KEYS.welcome.loginCta),
    featuresCta: t(I18N_KEYS.welcome.featuresCta),
    trustLabel: t(I18N_KEYS.welcome.trustLabel),
    trustIntro: t(I18N_KEYS.welcome.trustIntro),
    trustBrands: WELCOME_TRUST_BRANDS,
    releaseTargets: WELCOME_RELEASE_TARGETS,
    onLoginClick: () => {
      navigation.push(localizedPath(APP_PATHS.login, locale));
    },
    onFeaturesClick: () => {
      navigation.push(localizedPath(APP_PATHS.features, locale));
    },
  };
}
