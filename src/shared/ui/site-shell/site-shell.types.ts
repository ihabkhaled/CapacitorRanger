import type { AppLocale, ThemeMode } from '@/shared/enums';

export interface SiteLinkView {
  readonly label: string;
  readonly path: string;
}

export interface SiteBreadcrumbView extends SiteLinkView {
  readonly isCurrent: boolean;
}

export interface LocaleChoiceView {
  readonly value: AppLocale;
  readonly label: string;
}

export interface ThemeChoiceView {
  readonly value: ThemeMode;
  readonly label: string;
}
