export interface AppTextareaProps {
  readonly label: string;
  readonly name: string;
  readonly value: string;
  readonly onValueChange: (value: string) => void;
  readonly onBlur?: (() => void) | undefined;
  readonly errorMessage?: string | undefined;
  readonly rows?: number;
  readonly testId?: string | undefined;
}
