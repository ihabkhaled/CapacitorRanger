import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AppCard } from './card.component';

describe('AppCard', () => {
  it('renders children inside the shared default surface', () => {
    render(
      <AppCard testId="surface">
        <p>Starter content</p>
      </AppCard>,
    );

    const card = screen.getByTestId('surface');
    expect(card).toHaveClass('app-card');
    expect(card).toHaveTextContent('Starter content');
  });

  it('applies the accent tone through a stable design-system class', () => {
    render(
      <AppCard tone="accent" testId="surface">
        Accent
      </AppCard>,
    );

    expect(screen.getByTestId('surface')).toHaveClass('app-card--accent');
  });

  it('applies the muted tone through a stable design-system class', () => {
    render(
      <AppCard tone="muted" testId="surface">
        Muted
      </AppCard>,
    );

    expect(screen.getByTestId('surface')).toHaveClass('app-card--muted');
  });
});
