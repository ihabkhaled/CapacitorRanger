import { TEST_IDS } from '@/shared/config';
import { PageShell } from '@/shared/ui';

import { MarketingPage } from '../components/marketing-page';
import { useMarketingScreen } from '../hooks/use-marketing-screen.hook';
import { MARKETING_PAGE_KIND } from '../types/marketing.types';

export function FaqContainer(): React.JSX.Element {
  const screen = useMarketingScreen(MARKETING_PAGE_KIND.Faq);
  return (
    <PageShell title={screen.title} presentation="marketing" testId={TEST_IDS.faqPage}>
      <MarketingPage {...screen} />
    </PageShell>
  );
}
