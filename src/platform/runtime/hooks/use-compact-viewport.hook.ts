import { useEffect, useState } from 'react';

import { COMPACT_VIEWPORT_QUERY } from '../viewport.constants';

export function useCompactViewport(): boolean {
  const [isCompact, setIsCompact] = useState(() => matchMedia(COMPACT_VIEWPORT_QUERY).matches);
  useEffect(() => {
    const query = matchMedia(COMPACT_VIEWPORT_QUERY);
    const update = (event: MediaQueryListEvent) => {
      setIsCompact(event.matches);
    };
    query.addEventListener('change', update);
    return () => {
      query.removeEventListener('change', update);
    };
  }, []);
  return isCompact;
}
