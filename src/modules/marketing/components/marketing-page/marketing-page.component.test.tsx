import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MARKETING_PAGE_KIND, type MarketingScreenView } from '../../types/marketing.types';
import { MarketingPage } from './marketing-page.component';

function props(kind: MarketingScreenView['kind']): MarketingScreenView {
  return {
    kind,
    title: 'Public page',
    intro: 'A specific public-page introduction.',
    sections: [
      { title: 'First topic', body: 'First explanation.' },
      { title: 'Second topic', body: 'Second explanation.' },
    ],
    contactHref: undefined,
    contactLabel: undefined,
  };
}

describe('MarketingPage', () => {
  it('uses disclosure controls for frequently asked questions', () => {
    render(<MarketingPage {...props(MARKETING_PAGE_KIND.Faq)} />);

    const disclosures = screen.getAllByRole('group');
    expect(disclosures).toHaveLength(2);
    expect(within(disclosures[0]!).getByText('First topic')).toBeInTheDocument();
  });

  it.each([MARKETING_PAGE_KIND.About, MARKETING_PAGE_KIND.Features, MARKETING_PAGE_KIND.Contact])(
    'gives the %s page a page-specific layout marker',
    (kind) => {
      render(<MarketingPage {...props(kind)} />);

      expect(screen.getByRole('region', { name: 'Public page' })).toHaveAttribute(
        'data-kind',
        kind,
      );
      expect(screen.queryByRole('group')).not.toBeInTheDocument();
    },
  );

  it('renders the optional contact call to action', () => {
    render(
      <MarketingPage
        {...props(MARKETING_PAGE_KIND.Contact)}
        contactHref="mailto:hello@example.com"
        contactLabel="Start a conversation"
      />,
    );

    expect(screen.getByText('Start a conversation')).toHaveAttribute(
      'href',
      'mailto:hello@example.com',
    );
  });
});
