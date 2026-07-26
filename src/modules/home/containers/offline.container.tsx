import { TEST_IDS } from '@/shared/config';
import { PageShell } from '@/shared/ui';

import { OfflineView } from '../components/offline-view';
import { useOfflineScreen } from '../hooks/use-offline-screen.hook';

export function OfflineContainer(): React.JSX.Element {
  const screen = useOfflineScreen();
  return (
    <PageShell title={screen.title} testId={TEST_IDS.offlinePage}>
      <OfflineView {...screen} />
    </PageShell>
  );
}
