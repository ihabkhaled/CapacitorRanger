import { TEST_IDS } from '@/shared/config';
import { PageShell } from '@/shared/ui';

import { MarketingPage } from '../components/marketing-page';
import { useMarketingScreen } from '../hooks/use-marketing-screen.hook';
import { MARKETING_PAGE_KIND } from '../types/marketing.types';

export function FeaturesContainer(): React.JSX.Element {
  const screen = useMarketingScreen(MARKETING_PAGE_KIND.Features);
  return (
    <PageShell title={screen.title} testId={TEST_IDS.featuresPage}>
      <MarketingPage {...screen} />
    </PageShell>
  );
}
