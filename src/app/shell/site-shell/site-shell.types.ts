import type { AppLocale, ThemeMode } from '@/shared/enums';
import type {
  LocaleChoiceView,
  SiteBreadcrumbView,
  SiteLinkView,
  ThemeChoiceView,
} from '@/shared/ui';

export interface SiteShellView {
  readonly brandLabel: string;
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
