import { ContactForm } from '../contact-form';
import { MarketingPage } from '../marketing-page';
import type { ContactPageProps } from './contact-page.types';

export function ContactPage(props: ContactPageProps): React.JSX.Element {
  return (
    <div className="app-contact-page">
      <MarketingPage {...props.marketing} />
      <ContactForm {...props.form} />
    </div>
  );
}
