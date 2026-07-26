import type { AppLocale } from '@/shared/enums';

import type { LocaleChoiceView } from '../site-shell/site-shell.types';

export interface LanguageSwitcherProps {
  readonly label: string;
  readonly value: AppLocale;
  readonly choices: readonly LocaleChoiceView[];
  readonly onChange: (value: AppLocale) => void;
  readonly testId?: string;
}
