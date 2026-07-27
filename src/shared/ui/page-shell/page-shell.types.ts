import type { ReactNode } from 'react';

export interface PageShellProps {
  readonly title: string;
  readonly children: ReactNode;
  readonly presentation?: 'product' | 'marketing';
  readonly testId?: string;
  readonly headerEnd?: ReactNode;
  readonly banner?: ReactNode;
}
