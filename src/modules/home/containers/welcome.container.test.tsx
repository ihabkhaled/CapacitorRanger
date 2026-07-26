import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TEST_IDS } from '@/shared/config';

import { WELCOME_VIEW_TEST_IDS } from '../components/welcome-view/welcome-view.constants';
import { useWelcomeScreen } from '../hooks/use-welcome-screen.hook';
import { WelcomeContainer } from './welcome.container';

vi.mock('../hooks/use-welcome-screen.hook', () => ({ useWelcomeScreen: vi.fn() }));

const onLoginClick = vi.fn();
const onFeaturesClick = vi.fn();

beforeEach(() => {
  vi.mocked(useWelcomeScreen).mockReturnValue({
    title: 'Build the product, not the foundation',
    subtitle: 'A production-ready Ionic React and Capacitor starter.',
    eyebrow: 'A serious starter for ambitious teams',
    loginCta: 'Open the product',
    featuresCta: 'Explore the foundation',
    trustLabel: 'Technology foundation',
    trustIntro: 'Built around proven open-source tools.',
    trustBrands: ['Ionic', 'React', 'Capacitor', 'TypeScript'],
    releaseTargets: ['Web', 'Android', 'iOS'],
    onLoginClick,
    onFeaturesClick,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

function getIonTitle(): Element | null {
  return document.body.querySelector('ion-title');
}

describe('WelcomeContainer', () => {
  it('renders the welcome page shell', () => {
    render(<WelcomeContainer />);

    expect(screen.getByTestId(TEST_IDS.welcomePage)).toBeInTheDocument();
  });

  it('titles both the toolbar and the view from the screen hook', () => {
    render(<WelcomeContainer />);

    expect(getIonTitle()).toHaveTextContent('Build the product, not the foundation');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Build the product, not the foundation',
    );
  });

  it('feeds the view model into the welcome view', () => {
    render(<WelcomeContainer />);

    expect(
      screen.getByText('A production-ready Ionic React and Capacitor starter.'),
    ).toBeInTheDocument();
    expect(screen.getByTestId(WELCOME_VIEW_TEST_IDS.loginCta)).toHaveTextContent(
      'Open the product',
    );
  });

  it('wires the call to action back to the screen hook', async () => {
    render(<WelcomeContainer />);

    await userEvent.click(screen.getByTestId(WELCOME_VIEW_TEST_IDS.loginCta));

    expect(onLoginClick).toHaveBeenCalledOnce();
  });
});
