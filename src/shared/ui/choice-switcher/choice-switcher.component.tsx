import type { ChoiceSwitcherProps } from './choice-switcher.types';

/** Compact native select for global shell preferences such as theme and language. */
export function ChoiceSwitcher<Value extends string>(
  props: ChoiceSwitcherProps<Value>,
): React.JSX.Element {
  return (
    <label className="site-switcher">
      <span className="sr-only">{props.label}</span>
      <select
        value={props.value}
        aria-label={props.label}
        data-testid={props.testId}
        onChange={(event) => {
          props.onChange(event.currentTarget.value as Value);
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
