import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { buildContactScreenView } from '@/tests/factories/marketing.factory';

import { ContactPage } from './contact-page.component';

describe('ContactPage', () => {
  it('composes public context and the contact form', () => {
    render(<ContactPage {...buildContactScreenView()} />);

    expect(screen.getByRole('region', { name: 'Public page' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Plan your launch' })).toBeInTheDocument();
  });
});
