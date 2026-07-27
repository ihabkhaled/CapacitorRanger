export interface ChoiceSwitcherOption<Value extends string> {
  readonly value: Value;
  readonly label: string;
}

export interface ChoiceSwitcherProps<Value extends string> {
  readonly label: string;
  readonly value: Value;
  readonly choices: readonly ChoiceSwitcherOption<Value>[];
  readonly onChange: (value: Value) => void;
  readonly testId?: string;
}
