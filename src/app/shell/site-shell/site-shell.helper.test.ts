import { describe, expect, it } from 'vitest';

import { APP_PATHS } from '@/shared/config';
import { APP_LOCALE } from '@/shared/enums';
import { I18N_KEYS } from '@/shared/i18n';

import {
  buildLocalizedSiteLinks,
  buildSiteBreadcrumbs,
  buildSiteShellLayout,
  isProductSidebarPath,
} from './site-shell.helper';

describe('isProductSidebarPath', () => {
  it('limits the persistent sidebar to signed-in product surfaces', () => {
    expect(isProductSidebarPath('/en/home', APP_LOCALE.English)).toBe(true);
    expect(isProductSidebarPath('/ar/settings', APP_LOCALE.Arabic)).toBe(true);
    expect(isProductSidebarPath('/en/workbench', APP_LOCALE.English)).toBe(true);
    expect(isProductSidebarPath('/en/login', APP_LOCALE.English)).toBe(false);
    expect(isProductSidebarPath('/en/features', APP_LOCALE.English)).toBe(false);
  });

  it('derives public desktop and mobile-drawer layout flags once for the view', () => {
    expect(buildSiteShellLayout('/en/features', APP_LOCALE.English, false, false)).toEqual({
      layout: 'marketing',
      rendersSidebar: false,
      showsDrawerScrim: false,
      isSidebarHidden: false,
      isContentInert: false,
      showsProductSidebar: false,
    });
    expect(buildSiteShellLayout('/en/features', APP_LOCALE.English, true, true)).toEqual({
      layout: 'marketing',
      rendersSidebar: true,
      showsDrawerScrim: true,
      isSidebarHidden: false,
      isContentInert: true,
      showsProductSidebar: false,
    });
  });

  it('builds localized navigation and compact breadcrumbs outside the screen hook', () => {
    const links = buildLocalizedSiteLinks(
      [
        { path: APP_PATHS.welcome, labelKey: I18N_KEYS.navigation.welcome },
        { path: APP_PATHS.about, labelKey: I18N_KEYS.navigation.about },
      ],
      APP_LOCALE.Arabic,
      (key) => (key === I18N_KEYS.navigation.welcome ? 'الرئيسية' : 'عن القالب'),
    );

    expect(links).toEqual([
      { path: '/ar', label: 'الرئيسية' },
      { path: '/ar/about', label: 'عن القالب' },
    ]);
    expect(buildSiteBreadcrumbs('/ar/about', links, [])).toEqual([
      { path: '/ar', label: 'الرئيسية', isCurrent: false },
      { path: '/ar/about', label: 'عن القالب', isCurrent: true },
    ]);
  });
});
