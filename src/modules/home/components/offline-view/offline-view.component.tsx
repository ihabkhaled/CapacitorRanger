import { OfflineState } from '@/shared/ui';

import type { OfflineViewProps } from './offline-view.types';

export function OfflineView(props: OfflineViewProps): React.JSX.Element {
  return <OfflineState title={props.title} message={props.message} />;
}
