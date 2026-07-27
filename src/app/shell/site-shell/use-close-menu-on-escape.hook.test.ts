import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type * as PlatformModule from '@/platform';
import { subscribeToEscapeKey } from '@/platform';

import { useCloseMenuOnEscape } from './use-close-menu-on-escape.hook';

vi.mock('@/platform', async (importOriginal) => ({
  ...(await importOriginal<typeof PlatformModule>()),
  subscribeToEscapeKey: vi.fn(),
}));

describe('useCloseMenuOnEscape', () => {
  it('subscribes only while the menu is open and cleans up the listener', () => {
    const onClose = vi.fn();
    const unsubscribe = vi.fn();
    vi.mocked(subscribeToEscapeKey).mockReturnValue(unsubscribe);
    const { rerender, unmount } = renderHook(
      ({ isOpen }) => {
        useCloseMenuOnEscape(isOpen, onClose);
      },
      { initialProps: { isOpen: false } },
    );

    expect(subscribeToEscapeKey).not.toHaveBeenCalled();

    rerender({ isOpen: true });
    expect(subscribeToEscapeKey).toHaveBeenCalledExactlyOnceWith(onClose);

    unmount();
    expect(unsubscribe).toHaveBeenCalledOnce();
  });
});
