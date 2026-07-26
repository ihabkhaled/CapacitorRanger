import { IonText } from '@/packages/ionic';
import { AppButton, AppCard } from '@/shared/ui';

import { WORKBENCH_BUTTONS_TEST_ID } from './workbench-buttons.constants';
import type { WorkbenchButtonsProps } from './workbench-buttons.types';

export function WorkbenchButtons(props: WorkbenchButtonsProps): React.JSX.Element {
  return (
    <AppCard>
      <section data-testid={WORKBENCH_BUTTONS_TEST_ID} className="flex flex-col gap-4">
        <IonText>
          <h2 className="m-0 text-xl font-semibold tracking-tight">{props.heading}</h2>
        </IonText>
        <div className="flex flex-wrap gap-3">
          <AppButton label={props.primaryLabel} tone="primary" />
          <AppButton label={props.secondaryLabel} tone="secondary" />
          <AppButton label={props.dangerLabel} tone="danger" />
        </div>
      </section>
    </AppCard>
  );
}
