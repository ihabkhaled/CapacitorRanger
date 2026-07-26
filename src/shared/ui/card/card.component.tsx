import { IonCard, IonCardContent } from '@/packages/ionic';

import { CARD_TONE_CLASS } from './card.constants';
import type { AppCardProps } from './card.types';

/** Reusable responsive surface with shared spacing, border, and elevation tokens. */
export function AppCard(props: AppCardProps): React.JSX.Element {
  return (
    <IonCard className={CARD_TONE_CLASS[props.tone ?? 'default']} data-testid={props.testId}>
      <IonCardContent>{props.children}</IonCardContent>
    </IonCard>
  );
}
