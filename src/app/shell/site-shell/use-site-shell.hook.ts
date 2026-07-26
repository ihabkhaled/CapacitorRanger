import { useEffect, useMemo, useState } from 'react';

import { useAppearanceController } from '@/modules/settings';
import { changeAppLocale, localeToDirection, useAppTranslation } from '@/packages/i18n';
import { useAppNavigation } from '@/packages/router';
import { applyDocumentLocale, useCompactViewport } from '@/platform';
import { APP_IDENTITY } from '@/shared/config';
import {
  localeFromPath,
  localizedPath,
  replacePathLocale,
} from '@/shared/helpers/localized-path.helper';
import { I18N_KEYS } from '@/shared/i18n';

import {
  SITE_LOCALE_CHOICES,
  SITE_PRIMARY_LINKS,
  SITE_PRODUCT_LINKS,
  SITE_THEME_CHOICES,
} from './site-shell.constants';
import type { SiteShellView } from './site-shell.types';
import { useCloseMenuOnEscape } from './use-close-menu-on-escape.hook';

export function useSiteShell(): SiteShellView {
  const { t } = useAppTranslation();
  const navigation = useAppNavigation();
  const appearance = useAppearanceController();
  const setLocale = appearance.setLocale;
  const locale = localeFromPath(navigation.currentPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCompactViewport = useCompactViewport();
  const primaryLinks = useMemo(
    () =>
      SITE_PRIMARY_LINKS.map((item) => ({
        label: t(item.labelKey),
        path: localizedPath(item.path, locale),
      })),
    [locale, t],
  );
  const productLinks = useMemo(
    () =>
      SITE_PRODUCT_LINKS.map((item) => ({
        label: t(item.labelKey),
        path: localizedPath(item.path, locale),
      })),
    [locale, t],
  );
  const welcomeLink = {
    label: t(SITE_PRIMARY_LINKS[0].labelKey),
    path: localizedPath(SITE_PRIMARY_LINKS[0].path, locale),
  };
  const currentLink =
    [...primaryLinks, ...productLinks].find((item) => item.path === navigation.currentPath) ??
    welcomeLink;
  const breadcrumbs =
    currentLink.path === welcomeLink.path
      ? [{ ...currentLink, isCurrent: true }]
      : [
          { ...welcomeLink, isCurrent: false },
          { ...currentLink, isCurrent: true },
        ];
  useEffect(() => {
    setLocale(locale);
    applyDocumentLocale(locale, localeToDirection(locale));
    void changeAppLocale(locale);
  }, [locale, setLocale]);
  useCloseMenuOnEscape(isMenuOpen, () => {
    setIsMenuOpen(false);
  });
  return {
    brandLabel: APP_IDENTITY.appName,
    navigationLabel: t(I18N_KEYS.shell.navigationLabel),
    menuLabel: t(isMenuOpen ? I18N_KEYS.shell.menuClose : I18N_KEYS.shell.menuOpen),
    breadcrumbsLabel: t(I18N_KEYS.shell.breadcrumbsLabel),
    themeLabel: t(I18N_KEYS.shell.themeLabel),
    languageLabel: t(I18N_KEYS.shell.languageLabel),
    footerTagline: t(I18N_KEYS.footer.tagline),
    footerExploreLabel: t(I18N_KEYS.footer.explore),
    footerProductLabel: t(I18N_KEYS.footer.product),
    footerBuiltWith: t(I18N_KEYS.footer.builtWith),
    primaryLinks,
    productLinks,
    breadcrumbs,
    localeChoices: SITE_LOCALE_CHOICES.map((item) => ({
      value: item.value,
      label: t(item.labelKey),
    })),
    themeChoices: SITE_THEME_CHOICES.map((item) => ({
      value: item.value,
      label: t(item.labelKey),
    })),
    currentPath: navigation.currentPath,
    locale,
    theme: appearance.theme,
    isMenuOpen,
    isCompactViewport,
    onMenuToggle: () => {
      setIsMenuOpen((open) => !open);
    },
    onMenuClose: () => {
      setIsMenuOpen(false);
    },
    onNavigate: (path) => {
      setIsMenuOpen(false);
      navigation.push(path);
    },
    onLocaleChange: (nextLocale) => {
      setIsMenuOpen(false);
      navigation.replace(replacePathLocale(navigation.currentUrl, nextLocale));
    },
    onThemeChange: appearance.setTheme,
  };
}
