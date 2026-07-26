import { IonText } from '@/packages/ionic';
import { AppButton } from '@/shared/ui';

import { MARKETING_PAGE_KIND } from '../../types/marketing.types';
import type { MarketingPageProps } from './marketing-page.types';

export function MarketingPage(props: MarketingPageProps): React.JSX.Element {
  return (
    <section className="app-marketing-page" data-kind={props.kind} aria-label={props.title}>
      <header className="app-marketing-heading">
        <IonText>
          <h1>{props.title}</h1>
        </IonText>
        <IonText color="medium">
          <p>{props.intro}</p>
        </IonText>
      </header>
      <div className="app-marketing-grid">
        {props.sections.map((section) =>
          props.kind === MARKETING_PAGE_KIND.Faq ? (
            <details className="app-marketing-disclosure" key={section.title}>
              <summary>{section.title}</summary>
              <p>{section.body}</p>
            </details>
          ) : (
            <article className="app-marketing-section" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ),
        )}
      </div>
      {props.contactHref === undefined || props.contactLabel === undefined ? null : (
        <AppButton href={props.contactHref} label={props.contactLabel} />
      )}
    </section>
  );
}
