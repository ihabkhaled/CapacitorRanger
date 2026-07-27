import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SiteFooter } from './site-footer.component';

describe('SiteFooter', () => {
  it('renders both navigation groups and routes without reloading', async () => {
    const onNavigate = vi.fn();
    render(
      <SiteFooter
        brandLabel="Capacitor Ranger"
        tagline="Build the product."
        exploreLabel="Explore"
        productLabel="Product"
        builtWith="Built with Ionic"
        exploreLinks={[{ label: 'About', path: '/en/about' }]}
        productLinks={[{ label: 'Settings', path: '/en/settings' }]}
        onNavigate={onNavigate}
      />,
    );

    expect(screen.getByText('Capacitor Ranger')).toBeVisible();
    expect(screen.getByText('Built with Ionic')).toBeVisible();
    await userEvent.click(screen.getByRole('link', { name: 'About' }));
    await userEvent.click(screen.getByRole('link', { name: 'Settings' }));

    expect(onNavigate).toHaveBeenNthCalledWith(1, '/en/about');
    expect(onNavigate).toHaveBeenNthCalledWith(2, '/en/settings');
  });
});
