import type { AppLocale } from '@/shared/enums';

import type { ChoiceSwitcherProps } from '../choice-switcher';
import type { LocaleChoiceView } from '../site-shell/site-shell.types';

export type LanguageSwitcherProps = Omit<ChoiceSwitcherProps<AppLocale>, 'choices'> & {
  readonly choices: readonly LocaleChoiceView[];
};
