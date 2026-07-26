import { describe, expect, it } from 'vitest';

import { extractIonSelectValue } from './select.helper';

describe('extractIonSelectValue', () => {
  it('returns a string selection unchanged', () => {
    expect(extractIonSelectValue('dark')).toBe('dark');
  });

  it.each([undefined, null, 1, { value: 'dark' }])(
    'normalizes an invalid selection to an empty string',
    (value) => {
      expect(extractIonSelectValue(value)).toBe('');
    },
  );
});
