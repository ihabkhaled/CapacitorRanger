import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TEST_IDS } from '@/shared/config';
import { buildContactScreenView, buildMarketingView } from '@/tests/factories/marketing.factory';

import { useContactScreen } from '../hooks/use-contact-screen.hook';
import { useMarketingScreen } from '../hooks/use-marketing-screen.hook';
import { MARKETING_PAGE_KIND } from '../types/marketing.types';
import { AboutContainer } from './about.container';
import { ContactContainer } from './contact.container';
import { FaqContainer } from './faq.container';
import { FeaturesContainer } from './features.container';

vi.mock('../hooks/use-contact-screen.hook', () => ({ useContactScreen: vi.fn() }));
vi.mock('../hooks/use-marketing-screen.hook', () => ({ useMarketingScreen: vi.fn() }));

beforeEach(() => {
  vi.mocked(useContactScreen).mockReturnValue(buildContactScreenView());
  vi.mocked(useMarketingScreen).mockImplementation((kind) => buildMarketingView({ kind }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('marketing route containers', () => {
  it.each([
    [AboutContainer, TEST_IDS.aboutPage, MARKETING_PAGE_KIND.About],
    [FeaturesContainer, TEST_IDS.featuresPage, MARKETING_PAGE_KIND.Features],
    [FaqContainer, TEST_IDS.faqPage, MARKETING_PAGE_KIND.Faq],
  ] as const)('renders %s through the marketing page shell', (Container, testId, kind) => {
    render(<Container />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(useMarketingScreen).toHaveBeenCalledExactlyOnceWith(kind);
  });

  it('renders contact through its composed screen model', () => {
    render(<ContactContainer />);

    expect(screen.getByTestId(TEST_IDS.contactPage)).toBeInTheDocument();
    expect(useContactScreen).toHaveBeenCalledOnce();
  });
});
