import { I18N_KEYS, type I18nKey } from '@/shared/i18n';

import { MARKETING_PAGE_KIND, type MarketingPageKind } from '../types/marketing.types';

interface MarketingPageKeys {
  readonly title: I18nKey;
  readonly intro: I18nKey;
  readonly sections: readonly (readonly [I18nKey, I18nKey])[];
}

export const MARKETING_PAGE_KEYS: Readonly<Record<MarketingPageKind, MarketingPageKeys>> = {
  [MARKETING_PAGE_KIND.About]: {
    title: I18N_KEYS.marketing.aboutTitle,
    intro: I18N_KEYS.marketing.aboutIntro,
    sections: [
      [I18N_KEYS.marketing.aboutArchitectureTitle, I18N_KEYS.marketing.aboutArchitectureBody],
      [I18N_KEYS.marketing.aboutDeliveryTitle, I18N_KEYS.marketing.aboutDeliveryBody],
      [I18N_KEYS.marketing.aboutStandardsTitle, I18N_KEYS.marketing.aboutStandardsBody],
      [I18N_KEYS.marketing.aboutOwnershipTitle, I18N_KEYS.marketing.aboutOwnershipBody],
    ],
  },
  [MARKETING_PAGE_KIND.Features]: {
    title: I18N_KEYS.marketing.featuresTitle,
    intro: I18N_KEYS.marketing.featuresIntro,
    sections: [
      [I18N_KEYS.marketing.featuresStrictTitle, I18N_KEYS.marketing.featuresStrictBody],
      [I18N_KEYS.marketing.featuresNativeTitle, I18N_KEYS.marketing.featuresNativeBody],
      [I18N_KEYS.marketing.featuresAiTitle, I18N_KEYS.marketing.featuresAiBody],
      [I18N_KEYS.marketing.featuresExperienceTitle, I18N_KEYS.marketing.featuresExperienceBody],
      [I18N_KEYS.marketing.featuresOfflineTitle, I18N_KEYS.marketing.featuresOfflineBody],
    ],
  },
  [MARKETING_PAGE_KIND.Faq]: {
    title: I18N_KEYS.marketing.faqTitle,
    intro: I18N_KEYS.marketing.faqIntro,
    sections: [
      [I18N_KEYS.marketing.faqStartQuestion, I18N_KEYS.marketing.faqStartAnswer],
      [I18N_KEYS.marketing.faqBackendQuestion, I18N_KEYS.marketing.faqBackendAnswer],
      [I18N_KEYS.marketing.faqNativeQuestion, I18N_KEYS.marketing.faqNativeAnswer],
      [I18N_KEYS.marketing.faqCostQuestion, I18N_KEYS.marketing.faqCostAnswer],
      [I18N_KEYS.marketing.faqLocalesQuestion, I18N_KEYS.marketing.faqLocalesAnswer],
    ],
  },
  [MARKETING_PAGE_KIND.Contact]: {
    title: I18N_KEYS.marketing.contactTitle,
    intro: I18N_KEYS.marketing.contactIntro,
    sections: [
      [I18N_KEYS.marketing.contactSupportTitle, I18N_KEYS.marketing.contactSupportBody],
      [I18N_KEYS.marketing.contactResponseTitle, I18N_KEYS.marketing.contactResponseBody],
    ],
  },
};

export const MARKETING_CONTACT_HREF = 'mailto:hello@capacitorranger.app';
