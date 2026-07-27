import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppBreadcrumbs } from './breadcrumbs.component';

describe('AppBreadcrumbs', () => {
  it('marks the current page and routes through earlier crumbs', async () => {
    const onNavigate = vi.fn();
    render(
      <AppBreadcrumbs
        label="Breadcrumbs"
        items={[
          { label: 'Welcome', path: '/en', isCurrent: false },
          { label: 'Features', path: '/en/features', isCurrent: true },
        ]}
        onNavigate={onNavigate}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Breadcrumbs' })).toBeInTheDocument();
    expect(screen.getByText('Features')).toHaveAttribute('aria-current', 'page');
    await userEvent.click(screen.getByRole('link', { name: 'Welcome' }));

    expect(onNavigate).toHaveBeenCalledExactlyOnceWith('/en');
  });
});
