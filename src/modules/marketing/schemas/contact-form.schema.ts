import { schemaBuilder } from '@/packages/schema';
import { I18N_KEYS } from '@/shared/i18n';

export const contactFormSchema = schemaBuilder.object({
  name: schemaBuilder.string().trim().min(2, I18N_KEYS.marketing.contactValidationName),
  email: schemaBuilder
    .string()
    .trim()
    .pipe(schemaBuilder.email(I18N_KEYS.marketing.contactValidationEmail)),
  message: schemaBuilder.string().trim().min(10, I18N_KEYS.marketing.contactValidationMessage),
});
