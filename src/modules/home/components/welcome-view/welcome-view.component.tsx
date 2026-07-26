import { IonText } from '@/packages/ionic';
import { AppButton, AppCard } from '@/shared/ui';

import { WELCOME_VIEW_TEST_IDS } from './welcome-view.constants';
import type { WelcomeViewProps } from './welcome-view.types';

export function WelcomeView(props: WelcomeViewProps): React.JSX.Element {
  return (
    <div className="app-hero-shell">
      <div className="app-hero-orb" aria-hidden="true" />
      <AppCard tone="accent">
        <div className="flex flex-col items-center gap-5 px-2 py-4 text-center sm:px-6 sm:py-8">
          <div className="app-brand-mark" aria-hidden="true" />
          <IonText>
            <h1 className="m-0 max-w-xl text-3xl font-bold tracking-tight sm:text-5xl">
              {props.title}
            </h1>
          </IonText>
          <IonText color="medium">
            <p className="m-0 max-w-lg text-base leading-7 sm:text-lg">{props.subtitle}</p>
          </IonText>
          <AppButton
            label={props.loginCta}
            onClick={props.onLoginClick}
            testId={WELCOME_VIEW_TEST_IDS.loginCta}
          />
        </div>
      </AppCard>
    </div>
  );
}
