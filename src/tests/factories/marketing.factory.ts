import type {
  ContactScreenView,
  MarketingScreenView,
} from '@/modules/marketing/types/marketing.types';
import type { FormFieldBinding } from '@/packages/forms';

export function buildMarketingView(
  overrides: Partial<MarketingScreenView> = {},
): MarketingScreenView {
  return {
    kind: 'about',
    title: 'Public page',
    intro: 'A useful introduction.',
    sections: [{ title: 'Architecture', body: 'Clear ownership and strict boundaries.' }],
    contactHref: undefined,
    contactLabel: undefined,
    ...overrides,
  };
}

export function buildFieldBinding(
  name: string,
  overrides: Partial<FormFieldBinding> = {},
): FormFieldBinding {
  return {
    name,
    value: '',
    onChange: () => undefined,
    onBlur: () => undefined,
    errorMessage: undefined,
    ...overrides,
  };
}

export function buildContactScreenView(
  overrides: Partial<ContactScreenView> = {},
): ContactScreenView {
  return {
    marketing: buildMarketingView({ kind: 'contact' }),
    form: {
      title: 'Plan your launch',
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      submitLabel: 'Prepare request',
      readyMessage: undefined,
      openMailLabel: 'Open email',
      mailHref: undefined,
      name: buildFieldBinding('name'),
      email: buildFieldBinding('email'),
      message: buildFieldBinding('message'),
      onSubmit: () => undefined,
    },
    ...overrides,
  };
}
