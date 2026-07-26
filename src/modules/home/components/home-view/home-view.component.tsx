import { IonText } from '@/packages/ionic';
import { AppButton, AppCard, LoadingState } from '@/shared/ui';

import { HOME_VIEW_TEST_IDS } from './home-view.constants';
import type { HomeViewProps } from './home-view.types';

export function HomeView(props: HomeViewProps): React.JSX.Element {
  return (
    <div className="app-dashboard-grid">
      <AppCard tone="accent">
        <div className="flex flex-col items-start gap-4 p-1 sm:p-3">
          {props.isLoadingUser ? (
            <LoadingState label={props.loadingLabel} />
          ) : (
            <IonText>
              <h2
                className="m-0 text-2xl font-semibold tracking-tight sm:text-3xl"
                data-testid={HOME_VIEW_TEST_IDS.greeting}
              >
                {props.greeting}
              </h2>
            </IonText>
          )}
          <AppButton
            label={props.logoutLabel}
            tone="secondary"
            onClick={props.onLogout}
            loading={props.isLoggingOut}
            testId={HOME_VIEW_TEST_IDS.logout}
          />
        </div>
      </AppCard>
      {props.healthSlot}
    </div>
  );
}
