import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppSidebar } from './sidebar.component';

const ITEMS = [
  { label: 'Welcome', path: '/en' },
  { label: 'Settings', path: '/en/settings' },
];

describe('AppSidebar', () => {
  it('renders persistent navigation and wires close and route actions', async () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();
    render(
      <AppSidebar
        id="sidebar"
        label="Product"
        items={ITEMS}
        currentPath="/en/settings"
        isOpen={false}
        isHidden={false}
        isModal={false}
        closeLabel="Close"
        controls={<span>Controls</span>}
        onClose={onClose}
        onNavigate={onNavigate}
      />,
    );

    const sidebar = screen.getByRole('complementary', { name: 'Product' });
    expect(sidebar).not.toHaveAttribute('inert');
    expect(sidebar).not.toHaveAttribute('aria-modal');
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Welcome' })).not.toHaveAttribute('aria-current');

    await userEvent.click(screen.getByRole('link', { name: 'Welcome' }));
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onNavigate).toHaveBeenCalledExactlyOnceWith('/en');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('presents an open modal drawer and closes it with Escape', async () => {
    const onClose = vi.fn();
    render(
      <AppSidebar
        id="drawer"
        label="Navigation"
        items={ITEMS}
        currentPath="/en"
        isOpen
        isHidden
        isModal
        closeLabel="Close drawer"
        controls={null}
        onClose={onClose}
        onNavigate={vi.fn()}
      />,
    );

    const drawer = screen.getByRole('dialog', { hidden: true });
    expect(drawer).toHaveAttribute('inert');
    expect(drawer).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('button', { name: 'Close drawer', hidden: true })).toHaveFocus();

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });
});
