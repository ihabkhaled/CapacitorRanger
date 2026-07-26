import { TEST_IDS } from '@/shared/config';
import { PageShell } from '@/shared/ui';

import { ContactPage } from '../components/contact-page';
import { useContactScreen } from '../hooks/use-contact-screen.hook';

export function ContactContainer(): React.JSX.Element {
  const screen = useContactScreen();
  return (
    <PageShell title={screen.marketing.title} testId={TEST_IDS.contactPage}>
      <ContactPage {...screen} />
    </PageShell>
  );
}
