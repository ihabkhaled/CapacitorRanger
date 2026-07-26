import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

import { describe, expect, it, vi } from 'vitest';

function runThemeInit(storedTheme: string | undefined, systemDark: boolean): Set<string> {
  const classes = new Set<string>();
  runInNewContext(readFileSync('public/theme-init.js', 'utf8'), {
    document: {
      documentElement: {
        classList: {
          add: (value: string) => classes.add(value),
          remove: (value: string) => classes.delete(value),
        },
        style: {},
      },
    },
    localStorage: {
      getItem: vi.fn(() =>
        storedTheme === undefined
          ? null
          : JSON.stringify({ state: { theme: storedTheme }, version: 1 }),
      ),
    },
    matchMedia: vi.fn(() => ({ matches: systemDark })),
    JSON,
  });
  return classes;
}

describe('theme prepaint', () => {
  it('applies the dark palette before React for a stored dark preference', () => {
    expect(runThemeInit('dark', false)).toContain('ion-palette-dark');
  });

  it('follows the system preference for a stored system preference', () => {
    expect(runThemeInit('system', true)).toContain('ion-palette-dark');
  });

  it('keeps the light palette for invalid stored data', () => {
    expect(runThemeInit('midnight', true)).not.toContain('ion-palette-dark');
  });
});
