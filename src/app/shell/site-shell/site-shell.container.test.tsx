import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { SiteShellView } from './site-shell.types';
import { SiteShellContainer } from './site-shell.container';
import { useSiteShell } from './use-site-shell.hook';

vi.mock('./site-shell.component', () => ({
  SiteShell: (props: { readonly children: React.ReactNode }) => (
    <div data-testid="site-shell-double">{props.children}</div>
  ),
}));

vi.mock('./use-site-shell.hook', () => ({ useSiteShell: vi.fn() }));

describe('SiteShellContainer', () => {
  it('connects the shell view model to its routed children', () => {
    vi.mocked(useSiteShell).mockReturnValue({} as SiteShellView);

    render(
      <SiteShellContainer>
        <main>Routed content</main>
      </SiteShellContainer>,
    );

    expect(useSiteShell).toHaveBeenCalledOnce();
    expect(screen.getByTestId('site-shell-double')).toHaveTextContent('Routed content');
  });
});
