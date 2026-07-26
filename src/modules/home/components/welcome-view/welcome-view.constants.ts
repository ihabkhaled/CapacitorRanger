import { TEST_IDS } from '@/shared/config';

export const WELCOME_VIEW_TEST_IDS = {
  loginCta: TEST_IDS.welcomeLoginCta,
  featuresCta: TEST_IDS.welcomeFeaturesCta,
} as const;

export const WELCOME_TRUST_BRANDS = ['Ionic', 'React', 'Capacitor', 'TypeScript'] as const;
export const WELCOME_RELEASE_TARGETS = ['Web', 'Android', 'iOS'] as const;
