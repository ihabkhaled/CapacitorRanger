export interface AppSelectOption {
  readonly label: string;
  readonly value: string;
}

export interface AppSelectProps {
  readonly label: string;
  readonly name: string;
  readonly value: string;
  readonly options: readonly AppSelectOption[];
  readonly onValueChange: (value: string) => void;
  readonly placeholder?: string | undefined;
  readonly errorMessage?: string | undefined;
  readonly testId?: string | undefined;
}
