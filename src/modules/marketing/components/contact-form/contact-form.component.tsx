import { IonNote } from '@/packages/ionic';
import { AppButton, AppCard, AppInput, AppTextarea } from '@/shared/ui';

import { CONTACT_FORM_TEST_IDS } from './contact-form.constants';
import type { ContactFormProps } from './contact-form.types';

export function ContactForm(props: ContactFormProps): React.JSX.Element {
  return (
    <AppCard tone="accent">
      <form
        className="app-contact-form"
        data-testid={CONTACT_FORM_TEST_IDS.form}
        onSubmit={props.onSubmit}
        noValidate
      >
        <h2>{props.title}</h2>
        <AppInput
          label={props.nameLabel}
          name={props.name.name}
          value={props.name.value}
          onValueChange={props.name.onChange}
          onBlur={props.name.onBlur}
          errorMessage={props.name.errorMessage}
          autocomplete="name"
          testId={CONTACT_FORM_TEST_IDS.name}
        />
        <AppInput
          label={props.emailLabel}
          name={props.email.name}
          value={props.email.value}
          onValueChange={props.email.onChange}
          onBlur={props.email.onBlur}
          errorMessage={props.email.errorMessage}
          type="email"
          autocomplete="email"
          testId={CONTACT_FORM_TEST_IDS.email}
        />
        <AppTextarea
          label={props.messageLabel}
          name={props.message.name}
          value={props.message.value}
          onValueChange={props.message.onChange}
          onBlur={props.message.onBlur}
          errorMessage={props.message.errorMessage}
          testId={CONTACT_FORM_TEST_IDS.message}
        />
        <AppButton label={props.submitLabel} type="submit" />
        {props.readyMessage === undefined ? null : (
          <IonNote role="status" color="success">
            {props.readyMessage}
          </IonNote>
        )}
        {props.mailHref === undefined ? null : (
          <AppButton label={props.openMailLabel} href={props.mailHref} tone="secondary" />
        )}
      </form>
    </AppCard>
  );
}
