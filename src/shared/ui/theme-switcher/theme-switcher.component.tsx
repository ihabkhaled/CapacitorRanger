import type { ThemeMode } from '@/shared/enums';

import type { ThemeSwitcherProps } from './theme-switcher.types';

export function ThemeSwitcher(props: ThemeSwitcherProps): React.JSX.Element {
  return (
    <label className="site-switcher">
      <span className="sr-only">{props.label}</span>
      <select
        value={props.value}
        aria-label={props.label}
        data-testid={props.testId}
        onChange={(event) => {
          props.onChange(event.currentTarget.value as ThemeMode);
        }}
      >
        {props.choices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    </label>
  );
}
