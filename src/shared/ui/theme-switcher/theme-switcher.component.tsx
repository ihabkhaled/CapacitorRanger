import { ChoiceSwitcher } from '../choice-switcher';

import type { ThemeSwitcherProps } from './theme-switcher.types';

export function ThemeSwitcher(props: ThemeSwitcherProps): React.JSX.Element {
  return <ChoiceSwitcher {...props} />;
}
