import { SiteShell } from './site-shell.component';
import type { SiteShellContainerProps } from './site-shell.types';
import { useSiteShell } from './use-site-shell.hook';

export function SiteShellContainer(props: SiteShellContainerProps): React.JSX.Element {
  const shell = useSiteShell();
  return <SiteShell {...shell}>{props.children}</SiteShell>;
}
