import type { AppLocale } from '@/shared/enums';

import type { LanguageSwitcherProps } from './language-switcher.types';

export function LanguageSwitcher(props: LanguageSwitcherProps): React.JSX.Element {
  return (
    <label className="site-switcher">
      <span className="sr-only">{props.label}</span>
      <select
        value={props.value}
        aria-label={props.label}
        data-testid={props.testId}
        onChange={(event) => {
          props.onChange(event.currentTarget.value as AppLocale);
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
