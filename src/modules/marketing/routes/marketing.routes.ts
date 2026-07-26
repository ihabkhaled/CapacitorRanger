import { ROUTE_ACCESS, type AppRouteDefinition } from '@/shared/types';

import { AboutContainer } from '../containers/about.container';
import { ContactContainer } from '../containers/contact.container';
import { FaqContainer } from '../containers/faq.container';
import { FeaturesContainer } from '../containers/features.container';
import { aboutPath, contactPath, faqPath, featuresPath } from './marketing.paths';

export function getMarketingRouteDefinitions(): readonly AppRouteDefinition[] {
  return [
    { path: aboutPath(), exact: true, access: ROUTE_ACCESS.Public, component: AboutContainer },
    {
      path: featuresPath(),
      exact: true,
      access: ROUTE_ACCESS.Public,
      component: FeaturesContainer,
    },
    { path: faqPath(), exact: true, access: ROUTE_ACCESS.Public, component: FaqContainer },
    { path: contactPath(), exact: true, access: ROUTE_ACCESS.Public, component: ContactContainer },
  ];
}
