export type AppButtonTone = 'primary' | 'secondary' | 'danger';

export interface AppButtonProps {
  readonly label: string;
  readonly href?: string | undefined;
  readonly onClick?: (() => void) | undefined;
  readonly type?: 'button' | 'submit';
  readonly tone?: AppButtonTone;
  readonly disabled?: boolean | undefined;
  readonly loading?: boolean | undefined;
  readonly expand?: boolean | undefined;
  readonly testId?: string | undefined;
}
