import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { WelcomeView } from './welcome-view.component';
import { WELCOME_VIEW_TEST_IDS } from './welcome-view.constants';

const PROPS = {
  title: 'Build the product, not the foundation',
  subtitle: 'A production-ready Ionic React and Capacitor starter.',
  eyebrow: 'A serious starter for ambitious teams',
  loginCta: 'Open the product',
  featuresCta: 'Explore the foundation',
  trustLabel: 'Technology foundation',
  trustIntro: 'Built around proven open-source tools.',
  trustBrands: ['Ionic', 'React', 'Capacitor', 'TypeScript'],
  releaseTargets: ['Web', 'Android', 'iOS'],
  onFeaturesClick: vi.fn(),
};

function mountWelcome(onLoginClick: () => void = vi.fn()): void {
  render(<WelcomeView {...PROPS} onLoginClick={onLoginClick} />);
}

describe('WelcomeView', () => {
  it('renders the title as the page heading', () => {
    mountWelcome();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Build the product, not the foundation',
    );
  });

  it('renders the subtitle', () => {
    mountWelcome();

    expect(screen.getByText(PROPS.subtitle)).toBeInTheDocument();
  });

  it('shows the cross-platform release route as the hero signature', () => {
    mountWelcome();

    const route = screen.getByRole('figure', { name: PROPS.trustLabel });
    expect(route).toHaveTextContent('React');
    expect(route).toHaveTextContent('Web');
    expect(route).toHaveTextContent('Android');
    expect(route).toHaveTextContent('iOS');
  });

  it('renders the call to action under its test id', () => {
    mountWelcome();

    expect(screen.getByTestId(WELCOME_VIEW_TEST_IDS.loginCta)).toHaveTextContent(
      'Open the product',
    );
  });

  it('forwards a call-to-action click', async () => {
    const onLoginClick = vi.fn();
    mountWelcome(onLoginClick);

    await userEvent.click(screen.getByTestId(WELCOME_VIEW_TEST_IDS.loginCta));

    expect(onLoginClick).toHaveBeenCalledOnce();
  });
});
