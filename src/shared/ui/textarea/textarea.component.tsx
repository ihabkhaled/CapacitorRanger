import { IonTextarea } from '@/packages/ionic';

import { extractTextareaValue } from './textarea.helper';
import type { AppTextareaProps } from './textarea.types';

export function AppTextarea(props: AppTextareaProps): React.JSX.Element {
  return (
    <IonTextarea
      data-testid={props.testId}
      label={props.label}
      labelPlacement="stacked"
      name={props.name}
      value={props.value}
      rows={props.rows ?? 5}
      {...(props.errorMessage === undefined ? {} : { errorText: props.errorMessage })}
      className="app-input app-textarea"
      onIonInput={(event) => {
        props.onValueChange(extractTextareaValue(event.detail.value));
      }}
      {...(props.onBlur === undefined ? {} : { onIonBlur: props.onBlur })}
      fill="outline"
    />
  );
}
