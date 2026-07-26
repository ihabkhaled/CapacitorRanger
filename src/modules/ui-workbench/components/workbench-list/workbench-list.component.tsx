import { IonItem, IonLabel, IonText } from '@/packages/ionic';
import { AppCard, VirtualizedList } from '@/shared/ui';

import { WORKBENCH_LIST_HEIGHT_PX, WORKBENCH_LIST_TEST_IDS } from './workbench-list.constants';
import type { WorkbenchListProps } from './workbench-list.types';

export function WorkbenchList(props: WorkbenchListProps): React.JSX.Element {
  return (
    <AppCard>
      <section className="flex flex-col gap-4">
        <IonText>
          <h2 className="m-0 text-xl font-semibold tracking-tight">{props.heading}</h2>
        </IonText>
        <VirtualizedList
          items={props.items}
          heightPx={WORKBENCH_LIST_HEIGHT_PX}
          emptyTitle={props.emptyTitle}
          testId={WORKBENCH_LIST_TEST_IDS.list}
          renderItem={(item) => (
            <IonItem data-testid={WORKBENCH_LIST_TEST_IDS.item}>
              <IonLabel>{item.label}</IonLabel>
            </IonItem>
          )}
        />
      </section>
    </AppCard>
  );
}
