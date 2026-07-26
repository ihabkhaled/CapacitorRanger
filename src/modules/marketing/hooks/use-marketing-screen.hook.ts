import { useAppTranslation } from '@/packages/i18n';
import { I18N_KEYS } from '@/shared/i18n';

import { MARKETING_CONTACT_HREF, MARKETING_PAGE_KEYS } from '../constants/marketing.constants';
import {
  MARKETING_PAGE_KIND,
  type MarketingPageKind,
  type MarketingScreenView,
} from '../types/marketing.types';

export function useMarketingScreen(kind: MarketingPageKind): MarketingScreenView {
  const { t } = useAppTranslation();
  const keys = MARKETING_PAGE_KEYS[kind];
  const isContact = kind === MARKETING_PAGE_KIND.Contact;
  return {
    kind,
    title: t(keys.title),
    intro: t(keys.intro),
    sections: keys.sections.map(([title, body]) => ({ title: t(title), body: t(body) })),
    contactHref: isContact ? MARKETING_CONTACT_HREF : undefined,
    contactLabel: isContact ? t(I18N_KEYS.marketing.contactCta) : undefined,
  };
}
