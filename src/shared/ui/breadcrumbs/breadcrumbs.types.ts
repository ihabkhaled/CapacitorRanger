import type { SiteBreadcrumbView } from '../site-shell/site-shell.types';

export interface AppBreadcrumbsProps {
  readonly label: string;
  readonly items: readonly SiteBreadcrumbView[];
  readonly onNavigate: (path: string) => void;
}
