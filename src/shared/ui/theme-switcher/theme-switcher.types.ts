import type { ThemeMode } from '@/shared/enums';

import type { ThemeChoiceView } from '../site-shell/site-shell.types';

export interface ThemeSwitcherProps {
  readonly label: string;
  readonly value: ThemeMode;
  readonly choices: readonly ThemeChoiceView[];
  readonly onChange: (value: ThemeMode) => void;
  readonly testId?: string;
}
