import { useEffect } from 'react';

import { subscribeToEscapeKey } from '@/platform';

export function useCloseMenuOnEscape(isMenuOpen: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }
    return subscribeToEscapeKey(onClose);
  }, [isMenuOpen, onClose]);
}
