import { IonSelect, IonSelectOption } from '@/packages/ionic';

import { toInputStateClass } from '../input/input.helper';
import { extractIonSelectValue } from './select.helper';
import type { AppSelectProps } from './select.types';

/** Accessible single-choice field with normalized Ionic event values. */
export function AppSelect(props: AppSelectProps): React.JSX.Element {
  return (
    <IonSelect
      data-testid={props.testId}
      label={props.label}
      labelPlacement="stacked"
      name={props.name}
      value={props.value}
      fill="outline"
      interface="popover"
      className={`app-input ${toInputStateClass(props.errorMessage !== undefined)}`}
      {...(props.placeholder === undefined ? {} : { placeholder: props.placeholder })}
      {...(props.errorMessage === undefined ? {} : { errorText: props.errorMessage })}
      onIonChange={(event) => {
        props.onValueChange(extractIonSelectValue(event.detail.value));
      }}
    >
      {props.options.map((option) => (
        <IonSelectOption key={option.value} value={option.value}>
          {option.label}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
}
