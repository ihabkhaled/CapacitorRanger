import type { SiteLinkView } from '../site-shell/site-shell.types';

export interface AppNavbarProps {
  readonly brandLabel: string;
  readonly brandPath: string;
  readonly navigationLabel: string;
  readonly menuLabel: string;
  readonly items: readonly SiteLinkView[];
  readonly currentPath: string;
  readonly onNavigate: (path: string) => void;
  readonly onMenuToggle: () => void;
  readonly menuExpanded: boolean;
  readonly menuControls: string;
  readonly actions: React.ReactNode;
  readonly testId?: string;
  readonly menuTestId?: string;
}
