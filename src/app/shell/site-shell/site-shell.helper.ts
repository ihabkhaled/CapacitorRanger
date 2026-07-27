import type { AppLocale } from '@/shared/enums';
import { localizedPath } from '@/shared/helpers/localized-path.helper';
import type { SiteBreadcrumbView, SiteLinkView } from '@/shared/ui';

import { SITE_PRODUCT_SIDEBAR_PATHS } from './site-shell.constants';
import type {
  SiteLinkDefinition,
  SiteShellLayoutView,
  TranslateSiteLabel,
} from './site-shell.types';

export function buildLocalizedSiteLinks(
  definitions: readonly SiteLinkDefinition[],
  locale: AppLocale,
  translate: TranslateSiteLabel,
): readonly SiteLinkView[] {
  return definitions.map((item) => ({
    label: translate(item.labelKey),
    path: localizedPath(item.path, locale),
  }));
}

export function buildSiteBreadcrumbs(
  currentPath: string,
  primaryLinks: readonly SiteLinkView[],
  productLinks: readonly SiteLinkView[],
): readonly SiteBreadcrumbView[] {
  const welcomeLink = primaryLinks[0];
  if (welcomeLink === undefined) {
    return [];
  }
  const currentLink =
    [...primaryLinks, ...productLinks].find((item) => item.path === currentPath) ?? welcomeLink;
  return currentLink.path === welcomeLink.path
    ? [{ ...currentLink, isCurrent: true }]
    : [
        { ...welcomeLink, isCurrent: false },
        { ...currentLink, isCurrent: true },
      ];
}

export function isProductSidebarPath(currentPath: string, locale: AppLocale): boolean {
  return SITE_PRODUCT_SIDEBAR_PATHS.some((path) => localizedPath(path, locale) === currentPath);
}

export function buildSiteShellLayout(
  currentPath: string,
  locale: AppLocale,
  isCompactViewport: boolean,
  isMenuOpen: boolean,
): SiteShellLayoutView {
  const showsProductSidebar = isProductSidebarPath(currentPath, locale);
  const showsDrawerScrim = isCompactViewport && isMenuOpen;
  return {
    layout: showsProductSidebar ? 'product' : 'marketing',
    rendersSidebar: showsProductSidebar || isCompactViewport,
    showsDrawerScrim,
    isSidebarHidden: isCompactViewport && !isMenuOpen,
    isContentInert: showsDrawerScrim,
    showsProductSidebar,
  };
}
