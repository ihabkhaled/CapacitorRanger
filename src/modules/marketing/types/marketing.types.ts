import type { FormFieldBinding } from '@/packages/forms';

export const MARKETING_PAGE_KIND = {
  About: 'about',
  Features: 'features',
  Faq: 'faq',
  Contact: 'contact',
} as const;

export type MarketingPageKind = (typeof MARKETING_PAGE_KIND)[keyof typeof MARKETING_PAGE_KIND];

export interface MarketingSectionView {
  readonly title: string;
  readonly body: string;
}

export interface MarketingScreenView {
  readonly kind: MarketingPageKind;
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly MarketingSectionView[];
  readonly contactHref: string | undefined;
  readonly contactLabel: string | undefined;
}

export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

export interface ContactFormView {
  readonly title: string;
  readonly nameLabel: string;
  readonly emailLabel: string;
  readonly messageLabel: string;
  readonly submitLabel: string;
  readonly readyMessage: string | undefined;
  readonly openMailLabel: string;
  readonly mailHref: string | undefined;
  readonly name: FormFieldBinding;
  readonly email: FormFieldBinding;
  readonly message: FormFieldBinding;
  readonly onSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
}

export interface ContactScreenView {
  readonly marketing: MarketingScreenView;
  readonly form: ContactFormView;
}
