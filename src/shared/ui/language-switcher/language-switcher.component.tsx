import { ChoiceSwitcher } from '../choice-switcher';

import type { LanguageSwitcherProps } from './language-switcher.types';

export function LanguageSwitcher(props: LanguageSwitcherProps): React.JSX.Element {
  return <ChoiceSwitcher {...props} />;
}
