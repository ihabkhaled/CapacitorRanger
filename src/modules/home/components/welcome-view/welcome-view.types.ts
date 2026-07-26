export interface WelcomeViewProps {
  readonly title: string;
  readonly subtitle: string;
  readonly eyebrow: string;
  readonly loginCta: string;
  readonly featuresCta: string;
  readonly trustLabel: string;
  readonly trustIntro: string;
  readonly trustBrands: readonly string[];
  readonly releaseTargets: readonly string[];
  readonly onLoginClick: () => void;
  readonly onFeaturesClick: () => void;
}
