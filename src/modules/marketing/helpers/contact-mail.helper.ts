import type { ContactFormValues } from '../types/marketing.types';

import { MARKETING_CONTACT_HREF } from '../constants/marketing.constants';

export function buildContactMailHref(values: ContactFormValues): string {
  const query = new URLSearchParams({
    subject: values.name,
    body: `${values.message}\n\n${values.name} <${values.email}>`,
  });
  return `${MARKETING_CONTACT_HREF}?${query.toString()}`;
}
