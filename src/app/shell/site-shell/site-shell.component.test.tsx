import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { APP_LOCALE, THEME_MODE } from '@/shared/enums';

import { SiteShell } from './site-shell.component';

const CLOSE = vi.fn();
const PROPS = {
  brandLabel: 'Capacitor Ranger',
  brandPath: '/en',
  navigationLabel: 'Navigation',
  menuLabel: 'Close menu',
  breadcrumbsLabel: 'Breadcrumbs',
  themeLabel: 'Theme',
  languageLabel: 'Language',
  footerTagline: 'Starter',
  footerExploreLabel: 'Explore',
  footerProductLabel: 'Product',
  footerBuiltWith: 'Built with',
  primaryLinks: [{ label: 'Welcome', path: '/en' }],
  productLinks: [{ label: 'Home', path: '/en/home' }],
  breadcrumbs: [{ label: 'Welcome', path: '/en', isCurrent: true }],
  localeChoices: [{ label: 'English', value: APP_LOCALE.English }],
  themeChoices: [{ label: 'System', value: THEME_MODE.System }],
  currentPath: '/en',
  locale: APP_LOCALE.English,
  theme: THEME_MODE.System,
  isMenuOpen: true,
  isCompactViewport: true,
  layout: 'marketing' as const,
  rendersSidebar: true,
  showsDrawerScrim: true,
  isSidebarHidden: false,
  isContentInert: true,
  showsProductSidebar: false,
  onMenuToggle: vi.fn(),
  onMenuClose: CLOSE,
  onNavigate: vi.fn(),
  onLocaleChange: vi.fn(),
  onThemeChange: vi.fn(),
};

describe('SiteShell', () => {
  it('presents a modal drawer with page controls and an inert page', () => {
    render(<SiteShell {...PROPS}>Page content</SiteShell>);

    const drawer = screen.getByRole('dialog', { name: 'Navigation' });
    expect(drawer).toBeInTheDocument();
    expect(within(drawer).getByRole('button', { name: 'Close menu' })).toHaveFocus();
    expect(screen.getAllByRole('combobox')).toHaveLength(4);
    expect(screen.getByTestId('site-shell-content')).toHaveAttribute('inert');
  });

  it('closes through the scrim and Escape key', async () => {
    const user = userEvent.setup();
    render(<SiteShell {...PROPS}>Page content</SiteShell>);

    await user.click(screen.getByTestId('site-drawer-scrim'));
    within(screen.getByRole('dialog', { name: 'Navigation' }))
      .getByRole('button', { name: 'Close menu' })
      .focus();
    await user.keyboard('{Escape}');

    expect(CLOSE).toHaveBeenCalledTimes(2);
  });

  it('keeps persistent product navigation out of public desktop pages', () => {
    render(
      <SiteShell
        {...PROPS}
        isCompactViewport={false}
        isMenuOpen={false}
        rendersSidebar={false}
        showsDrawerScrim={false}
        isContentInert={false}
        showsProductSidebar={false}
      >
        Marketing page
      </SiteShell>,
    );

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    expect(screen.getByText('Marketing page')).toBeVisible();
  });
});
