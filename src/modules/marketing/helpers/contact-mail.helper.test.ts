import { describe, expect, it } from 'vitest';

import { buildContactMailHref } from './contact-mail.helper';

describe('buildContactMailHref', () => {
  it('encodes the sender and message into the local mail draft', () => {
    const href = buildContactMailHref({
      name: 'Ranger Team',
      email: 'team@example.com',
      message: 'We need a multilingual native launch.',
    });
    const url = new URL(href);

    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe('hello@capacitorranger.app');
    expect(url.searchParams.get('subject')).toBe('Ranger Team');
    expect(url.searchParams.get('body')).toBe(
      'We need a multilingual native launch.\n\nRanger Team <team@example.com>',
    );
  });
});
