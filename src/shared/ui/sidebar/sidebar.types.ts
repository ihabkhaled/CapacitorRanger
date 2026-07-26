import type { SiteLinkView } from '../site-shell/site-shell.types';

export interface AppSidebarProps {
  readonly label: string;
  readonly items: readonly SiteLinkView[];
  readonly currentPath: string;
  readonly isOpen: boolean;
  readonly isHidden: boolean;
  readonly isModal: boolean;
  readonly id: string;
  readonly closeLabel: string;
  readonly controls: React.ReactNode;
  readonly onClose: () => void;
  readonly onNavigate: (path: string) => void;
}
