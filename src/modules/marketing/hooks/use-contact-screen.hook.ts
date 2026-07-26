import { useState } from 'react';

import { useAppForm, useAppFormField, type FormFieldBinding } from '@/packages/forms';
import { useAppTranslation } from '@/packages/i18n';
import { I18N_KEYS } from '@/shared/i18n';

import { buildContactMailHref } from '../helpers/contact-mail.helper';
import { contactFormSchema } from '../schemas/contact-form.schema';
import {
  MARKETING_PAGE_KIND,
  type ContactFormValues,
  type ContactScreenView,
} from '../types/marketing.types';
import { useMarketingScreen } from './use-marketing-screen.hook';

function translatedBinding(
  binding: FormFieldBinding,
  t: (key: string) => string,
): FormFieldBinding {
  return {
    ...binding,
    errorMessage: binding.errorMessage === undefined ? undefined : t(binding.errorMessage),
  };
}

export function useContactScreen(): ContactScreenView {
  const { t } = useAppTranslation();
  const marketing = useMarketingScreen(MARKETING_PAGE_KIND.Contact);
  const form = useAppForm<ContactFormValues>({
    schema: contactFormSchema,
    defaultValues: { name: '', email: '', message: '' },
  });
  const name = useAppFormField({ control: form.control, name: 'name' });
  const email = useAppFormField({ control: form.control, name: 'email' });
  const message = useAppFormField({ control: form.control, name: 'message' });
  const [mailHref, setMailHref] = useState<string | undefined>();
  return {
    marketing,
    form: {
      title: t(I18N_KEYS.marketing.contactFormTitle),
      nameLabel: t(I18N_KEYS.marketing.contactNameLabel),
      emailLabel: t(I18N_KEYS.marketing.contactEmailLabel),
      messageLabel: t(I18N_KEYS.marketing.contactMessageLabel),
      submitLabel: t(I18N_KEYS.marketing.contactSubmit),
      readyMessage: mailHref === undefined ? undefined : t(I18N_KEYS.marketing.contactReady),
      openMailLabel: t(I18N_KEYS.marketing.contactOpenMail),
      mailHref,
      name: translatedBinding(name, t),
      email: translatedBinding(email, t),
      message: translatedBinding(message, t),
      onSubmit: (event) => {
        void form.handleSubmit((values) => {
          setMailHref(buildContactMailHref(values));
        })(event);
      },
    },
  };
}
