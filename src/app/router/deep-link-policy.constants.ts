import type { DeepLinkPolicy } from '@/platform';
import { APP_IDENTITY, APP_PATHS } from '@/shared/config';
import { APP_LOCALES } from '@/shared/enums';
import { localizedPath } from '@/shared/helpers/localized-path.helper';

const LOCALIZED_DEEP_LINK_PREFIXES = APP_LOCALES.flatMap((locale) =>
  Object.values(APP_PATHS)
    .filter((path) => path !== APP_PATHS.root)
    .map((path) => localizedPath(path, locale)),
);

/** Strict allowlist for cold-start and runtime deep links. */
export const APP_DEEP_LINK_POLICY: DeepLinkPolicy = {
  allowedSchemes: ['https', APP_IDENTITY.appId],
  allowedHosts: ['capacitorranger.app', 'localhost'],
  allowedPathPrefixes: [APP_PATHS.root, ...LOCALIZED_DEEP_LINK_PREFIXES],
};
