import { readFile } from 'node:fs/promises';

import { SITE_ORIGIN_FALLBACK } from './static-site.constants.mjs';

const BUILD_ENV_FILES = ['.env.production.local', '.env.production', '.env.local', '.env'];

async function readOriginFromEnvFile(file) {
  try {
    const source = await readFile(file, 'utf8');
    const line = source
      .split(/\r?\n/u)
      .find((candidate) => candidate.startsWith('VITE_PUBLIC_SITE_URL='));
    return line?.slice('VITE_PUBLIC_SITE_URL='.length).trim();
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

export async function resolveBuildSiteOrigin() {
  if (process.env['VITE_PUBLIC_SITE_URL'] !== undefined)
    return resolveSiteOrigin(process.env['VITE_PUBLIC_SITE_URL']);
  for (const file of BUILD_ENV_FILES) {
    const candidate = await readOriginFromEnvFile(file);
    if (candidate !== undefined) return resolveSiteOrigin(candidate);
  }
  return resolveSiteOrigin(SITE_ORIGIN_FALLBACK);
}

export function resolveSiteOrigin(candidate = process.env['VITE_PUBLIC_SITE_URL']) {
  const raw = candidate ?? SITE_ORIGIN_FALLBACK;
  const url = new URL(raw);
  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && isLocalhost)) {
    throw new Error('VITE_PUBLIC_SITE_URL must use HTTPS, except for localhost development.');
  }
  if (
    url.pathname !== '/' ||
    url.search !== '' ||
    url.hash !== '' ||
    url.username !== '' ||
    url.password !== ''
  ) {
    throw new Error(
      'VITE_PUBLIC_SITE_URL must be an origin without credentials, path, query, or hash.',
    );
  }
  return url.origin;
}

export function readCatalogValue(catalog, dottedKey) {
  return dottedKey.split('.').reduce((value, key) => value[key], catalog);
}

export function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function localizedUrlPath(locale, slug) {
  return slug === '' ? `/${locale}` : `/${locale}/${slug}`;
}

export function buildAlternateLinks(siteOrigin, slug, locales) {
  const localeLinks = locales.map(
    (locale) =>
      `<link rel="alternate" hreflang="${locale}" href="${siteOrigin}${localizedUrlPath(locale, slug)}" />`,
  );
  localeLinks.push(
    `<link rel="alternate" hreflang="x-default" href="${siteOrigin}${localizedUrlPath('en', slug)}" />`,
  );
  return localeLinks.join('\n    ');
}
