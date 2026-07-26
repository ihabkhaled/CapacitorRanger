import { IonText } from '@/packages/ionic';
import { AppButton, TrustStrip } from '@/shared/ui';

import { WELCOME_VIEW_TEST_IDS } from './welcome-view.constants';
import type { WelcomeViewProps } from './welcome-view.types';

export function WelcomeView(props: WelcomeViewProps): React.JSX.Element {
  return (
    <div className="app-hero-shell">
      <section className="app-hero-command">
        <div className="app-hero-copy">
          <p className="app-hero-eyebrow">{props.eyebrow}</p>
          <IonText>
            <h1>{props.title}</h1>
          </IonText>
          <IonText color="medium">
            <p className="app-hero-subtitle">{props.subtitle}</p>
          </IonText>
          <div className="app-hero-actions">
            <AppButton
              label={props.loginCta}
              onClick={props.onLoginClick}
              testId={WELCOME_VIEW_TEST_IDS.loginCta}
            />
            <AppButton
              label={props.featuresCta}
              tone="secondary"
              onClick={props.onFeaturesClick}
              testId={WELCOME_VIEW_TEST_IDS.featuresCta}
            />
          </div>
        </div>
        <figure className="app-release-route" aria-label={props.trustLabel}>
          <figcaption>{props.trustIntro}</figcaption>
          <div className="app-release-source">
            <span>{props.trustBrands[1]}</span>
            <small>{props.trustBrands[3]}</small>
          </div>
          <div className="app-release-trace" aria-hidden="true" />
          <ul>
            {props.releaseTargets.map((target) => (
              <li key={target}>{target}</li>
            ))}
          </ul>
        </figure>
      </section>
      <TrustStrip label={props.trustLabel} intro={props.trustIntro} brands={props.trustBrands} />
    </div>
  );
}
