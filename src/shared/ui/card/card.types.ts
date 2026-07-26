import type { ReactNode } from 'react';

export type AppCardTone = 'default' | 'accent' | 'muted';

export interface AppCardProps {
  readonly children: ReactNode;
  readonly tone?: AppCardTone;
  readonly testId?: string | undefined;
}
