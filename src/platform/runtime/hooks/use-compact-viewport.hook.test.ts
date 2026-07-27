import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { COMPACT_VIEWPORT_QUERY } from '../viewport.constants';
import { useCompactViewport } from './use-compact-viewport.hook';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useCompactViewport', () => {
  it('tracks the compact media query and removes its listener', () => {
    let onChange: ((event: MediaQueryListEvent) => void) | undefined;
    const removeEventListener = vi.fn();
    const query = {
      matches: false,
      media: COMPACT_VIEWPORT_QUERY,
      addEventListener: vi.fn((_event: string, listener: (event: MediaQueryListEvent) => void) => {
        onChange = listener;
      }),
      removeEventListener,
    } as unknown as MediaQueryList;
    const matchMedia = vi.fn(() => query);
    vi.stubGlobal('matchMedia', matchMedia);

    const { result, unmount } = renderHook(() => useCompactViewport());
    expect(result.current).toBe(false);
    expect(matchMedia).toHaveBeenCalledWith(COMPACT_VIEWPORT_QUERY);

    act(() => {
      onChange?.({ matches: true } as MediaQueryListEvent);
    });
    expect(result.current).toBe(true);

    unmount();
    expect(removeEventListener).toHaveBeenCalledExactlyOnceWith('change', onChange);
  });
});
