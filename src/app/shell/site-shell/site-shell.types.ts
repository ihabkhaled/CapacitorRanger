import type { AppPath } from '@/shared/config';
import type { AppLocale, ThemeMode } from '@/shared/enums';
import type { I18nKey } from '@/shared/i18n';
import type {
  LocaleChoiceView,
  SiteBreadcrumbView,
  SiteLinkView,
  ThemeChoiceView,
} from '@/shared/ui';

type SiteShellLayout = 'marketing' | 'product';

export interface SiteLinkDefinition {
  readonly path: AppPath;
  readonly labelKey: I18nKey;
}

export type TranslateSiteLabel = (key: I18nKey) => string;

export interface SiteShellLayoutView {
  readonly layout: SiteShellLayout;
  readonly rendersSidebar: boolean;
  readonly showsDrawerScrim: boolean;
  readonly isSidebarHidden: boolean;
  readonly isContentInert: boolean;
  readonly showsProductSidebar: boolean;
}

export interface SiteShellView extends SiteShellLayoutView {
  readonly brandLabel: string;
  readonly brandPath: string;
  readonly navigationLabel: string;
  readonly menuLabel: string;
  readonly breadcrumbsLabel: string;
  readonly themeLabel: string;
  readonly languageLabel: string;
  readonly footerTagline: string;
  readonly footerExploreLabel: string;
  readonly footerProductLabel: string;
  readonly footerBuiltWith: string;
  readonly primaryLinks: readonly SiteLinkView[];
  readonly productLinks: readonly SiteLinkView[];
  readonly breadcrumbs: readonly SiteBreadcrumbView[];
  readonly localeChoices: readonly LocaleChoiceView[];
  readonly themeChoices: readonly ThemeChoiceView[];
  readonly currentPath: string;
  readonly locale: AppLocale;
  readonly theme: ThemeMode;
  readonly isMenuOpen: boolean;
  readonly isCompactViewport: boolean;
  readonly onMenuToggle: () => void;
  readonly onMenuClose: () => void;
  readonly onNavigate: (path: string) => void;
  readonly onLocaleChange: (locale: AppLocale) => void;
  readonly onThemeChange: (theme: ThemeMode) => void;
}

export interface SiteShellProps extends SiteShellView {
  readonly children: React.ReactNode;
}

export interface SiteShellContainerProps {
  readonly children: React.ReactNode;
}
