import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppNavbar } from './navbar.component';

describe('AppNavbar', () => {
  it('renders active navigation and wires brand, route, and menu actions', async () => {
    const onNavigate = vi.fn();
    const onMenuToggle = vi.fn();
    render(
      <AppNavbar
        brandLabel="Capacitor Ranger"
        brandPath="/en"
        navigationLabel="Primary"
        menuLabel="Open menu"
        items={[
          { label: 'Welcome', path: '/en' },
          { label: 'Features', path: '/en/features' },
        ]}
        currentPath="/en/features"
        onNavigate={onNavigate}
        onMenuToggle={onMenuToggle}
        menuExpanded={false}
        menuControls="site-navigation"
        actions={<span>Preferences</span>}
        testId="navbar"
        menuTestId="menu-toggle"
      />,
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByText('Preferences')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Welcome' })).not.toHaveAttribute('aria-current');

    await userEvent.click(screen.getByRole('button', { name: 'Capacitor Ranger' }));
    await userEvent.click(screen.getByRole('link', { name: 'Features' }));
    await userEvent.click(screen.getByTestId('menu-toggle'));

    expect(onNavigate).toHaveBeenNthCalledWith(1, '/en');
    expect(onNavigate).toHaveBeenNthCalledWith(2, '/en/features');
    expect(onMenuToggle).toHaveBeenCalledOnce();
  });
});
