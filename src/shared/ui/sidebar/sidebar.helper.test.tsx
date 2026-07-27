import { describe, expect, it, vi } from 'vitest';

import { closeDrawerOnEscape, focusDrawerClose } from './sidebar.helper';

describe('sidebar helpers', () => {
  it('focuses an available close control only for an open drawer', () => {
    const button = document.createElement('button');
    const focus = vi.spyOn(button, 'focus');

    focusDrawerClose(false, button);
    focusDrawerClose(true, null);
    expect(focus).not.toHaveBeenCalled();

    focusDrawerClose(true, button);
    expect(focus).toHaveBeenCalledOnce();
  });

  it('closes on Escape and ignores every other key', () => {
    const onClose = vi.fn();
    closeDrawerOnEscape({ key: 'Enter' } as React.KeyboardEvent<HTMLElement>, onClose);
    expect(onClose).not.toHaveBeenCalled();

    closeDrawerOnEscape({ key: 'Escape' } as React.KeyboardEvent<HTMLElement>, onClose);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
