import { TEST_IDS } from '@/shared/config';
import {
  AppBreadcrumbs,
  AppNavbar,
  AppSidebar,
  LanguageSwitcher,
  SiteFooter,
  ThemeSwitcher,
} from '@/shared/ui';

import type { SiteShellProps } from './site-shell.types';
import { SITE_SIDEBAR_ID } from './site-shell.constants';

export function SiteShell(props: SiteShellProps): React.JSX.Element {
  const controls = (
    <>
      <ThemeSwitcher
        label={props.themeLabel}
        value={props.theme}
        choices={props.themeChoices}
        onChange={props.onThemeChange}
        testId={TEST_IDS.themeSwitcher}
      />
      <LanguageSwitcher
        label={props.languageLabel}
        value={props.locale}
        choices={props.localeChoices}
        onChange={props.onLocaleChange}
        testId={TEST_IDS.languageSwitcher}
      />
    </>
  );
  return (
    <div className="site-shell">
      <AppNavbar
        brandLabel={props.brandLabel}
        brandPath={props.brandPath}
        navigationLabel={props.navigationLabel}
        menuLabel={props.menuLabel}
        items={props.primaryLinks}
        currentPath={props.currentPath}
        onNavigate={props.onNavigate}
        onMenuToggle={props.onMenuToggle}
        menuExpanded={props.isMenuOpen}
        menuControls={SITE_SIDEBAR_ID}
        testId={TEST_IDS.siteNavigation}
        menuTestId={TEST_IDS.mobileNavigationToggle}
        actions={controls}
      />
      <div className="site-shell-body" data-layout={props.layout}>
        {props.showsDrawerScrim ? (
          <button
            className="site-drawer-scrim"
            type="button"
            aria-label={props.menuLabel}
            data-testid={TEST_IDS.siteDrawerScrim}
            onClick={props.onMenuClose}
          />
        ) : null}
        {props.rendersSidebar ? (
          <AppSidebar
            label={props.navigationLabel}
            items={[...props.primaryLinks, ...props.productLinks]}
            currentPath={props.currentPath}
            isOpen={props.isMenuOpen}
            isHidden={props.isSidebarHidden}
            isModal={props.isCompactViewport}
            id={SITE_SIDEBAR_ID}
            closeLabel={props.menuLabel}
            controls={controls}
            onClose={props.onMenuClose}
            onNavigate={props.onNavigate}
          />
        ) : null}
        <div
          className="site-shell-content"
          inert={props.isContentInert}
          data-testid={TEST_IDS.siteShellContent}
        >
          <AppBreadcrumbs
            label={props.breadcrumbsLabel}
            items={props.breadcrumbs}
            onNavigate={props.onNavigate}
          />
          <div className="site-router-frame">{props.children}</div>
          <SiteFooter
            brandLabel={props.brandLabel}
            tagline={props.footerTagline}
            exploreLabel={props.footerExploreLabel}
            productLabel={props.footerProductLabel}
            builtWith={props.footerBuiltWith}
            exploreLinks={props.primaryLinks}
            productLinks={props.productLinks}
            onNavigate={props.onNavigate}
          />
        </div>
      </div>
    </div>
  );
}
