import type { SiteLinkView } from '../site-shell/site-shell.types';

export interface SiteFooterProps {
  readonly brandLabel: string;
  readonly tagline: string;
  readonly exploreLabel: string;
  readonly productLabel: string;
  readonly builtWith: string;
  readonly exploreLinks: readonly SiteLinkView[];
  readonly productLinks: readonly SiteLinkView[];
  readonly onNavigate: (path: string) => void;
}
