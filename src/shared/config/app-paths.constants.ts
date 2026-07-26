/**
 * Canonical route table. Modules expose typed builders in their
 * routes/*.paths.ts files derived from these values; raw route strings are
 * forbidden everywhere else (ESLint: architecture/no-inline-routes).
 */
export const APP_PATHS = {
  root: '/',
  welcome: '/:locale',
  about: '/:locale/about',
  features: '/:locale/features',
  faq: '/:locale/faq',
  contact: '/:locale/contact',
  offline: '/:locale/offline',
  login: '/:locale/login',
  home: '/:locale/home',
  settings: '/:locale/settings',
  workbench: '/:locale/workbench',
} as const;

export type AppPath = (typeof APP_PATHS)[keyof typeof APP_PATHS];

export const PATH_SEPARATOR = '/';
export const LOCALE_PATH_PARAMETER = ':locale';
