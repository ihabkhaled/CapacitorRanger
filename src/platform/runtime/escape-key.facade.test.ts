import { describe, expect, it, vi } from 'vitest';

import { subscribeToEscapeKey } from './escape-key.facade';

describe('subscribeToEscapeKey', () => {
  it('notifies only for Escape and removes the listener', () => {
    const onEscape = vi.fn();
    const unsubscribe = subscribeToEscapeKey(onEscape);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    unsubscribe();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(onEscape).toHaveBeenCalledOnce();
  });
});
