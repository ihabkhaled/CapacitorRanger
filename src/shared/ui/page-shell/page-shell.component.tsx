import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@/packages/ionic';

import type { PageShellProps } from './page-shell.types';

/** Canonical routed-screen skeleton: every route renders inside an IonPage. */
export function PageShell(props: PageShellProps): React.JSX.Element {
  return (
    <IonPage data-testid={props.testId}>
      {props.presentation === 'marketing' ? null : (
        <IonHeader className="app-header" translucent>
          <IonToolbar className="app-toolbar">
            <IonTitle>{props.title}</IonTitle>
            {props.headerEnd === undefined ? null : (
              <IonButtons slot="end">{props.headerEnd}</IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
      )}
      {props.banner}
      <IonContent
        className="app-page-content"
        data-presentation={props.presentation ?? 'product'}
        fullscreen
      >
        <main className="app-page-frame">{props.children}</main>
      </IonContent>
    </IonPage>
  );
}
