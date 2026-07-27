import type { ThemeMode } from '@/shared/enums';

import type { ChoiceSwitcherProps } from '../choice-switcher';
import type { ThemeChoiceView } from '../site-shell/site-shell.types';

export type ThemeSwitcherProps = Omit<ChoiceSwitcherProps<ThemeMode>, 'choices'> & {
  readonly choices: readonly ThemeChoiceView[];
};
