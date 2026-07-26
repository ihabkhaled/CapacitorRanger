import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { LOCALES, OG_LOCALES, PUBLIC_PAGES, RTL_LOCALES } from './static-site.constants.mjs';
import {
  buildAlternateLinks,
  escapeHtml,
  localizedUrlPath,
  readCatalogValue,
  resolveBuildSiteOrigin,
} from './static-site.helpers.mjs';

const DIST_DIRECTORY = 'dist';
const sourceHtml = await readFile(path.join(DIST_DIRECTORY, 'index.html'), 'utf8');
const siteOrigin = await resolveBuildSiteOrigin();

function buildStructuredData(locale, page, canonical, title, description) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteOrigin}/#website`,
        name: 'Capacitor Ranger',
        url: siteOrigin,
        inLanguage: locale,
      },
      {
        '@type': 'WebPage',
        name: title,
        description,
        url: canonical,
        inLanguage: locale,
        isPartOf: { '@id': `${siteOrigin}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: readCatalogValue(page.catalog, 'navigation.welcome'),
            item: `${siteOrigin}/${locale}`,
          },
          ...(page.slug === ''
            ? []
            : [{ '@type': 'ListItem', position: 2, name: title, item: canonical }]),
        ],
      },
    ],
  };
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function buildLocalizedHtml(template, locale, page, catalog) {
  const pathName = localizedUrlPath(locale, page.slug);
  const canonical = `${siteOrigin}${pathName}`;
  const title = readCatalogValue(catalog, page.titleKey);
  const description = readCatalogValue(catalog, page.descriptionKey);
  const intro = readCatalogValue(catalog, page.introKey);
  const ogAlternates = LOCALES.filter((candidate) => candidate !== locale)
    .map(
      (candidate) => `<meta property="og:locale:alternate" content="${OG_LOCALES[candidate]}" />`,
    )
    .join('\n    ');
  const metadata = `<meta name="description" content="${escapeHtml(description)}" />\n    <link rel="canonical" href="${canonical}" />\n    ${buildAlternateLinks(siteOrigin, page.slug, LOCALES)}\n    <meta property="og:type" content="website" />\n    <meta property="og:site_name" content="Capacitor Ranger" />\n    <meta property="og:locale" content="${OG_LOCALES[locale]}" />\n    ${ogAlternates}\n    <meta property="og:title" content="${escapeHtml(title)}" />\n    <meta property="og:description" content="${escapeHtml(description)}" />\n    <meta property="og:url" content="${canonical}" />\n    <meta name="twitter:card" content="summary" />\n    <meta name="twitter:title" content="${escapeHtml(title)}" />\n    <meta name="twitter:description" content="${escapeHtml(description)}" />\n    <script type="application/ld+json">${buildStructuredData(locale, { ...page, catalog }, canonical, title, description)}</script>`;
  const sections = page.sections
    .map(
      ([headingKey, bodyKey]) =>
        `<section><h2>${escapeHtml(readCatalogValue(catalog, headingKey))}</h2><p>${escapeHtml(readCatalogValue(catalog, bodyKey))}</p></section>`,
    )
    .join('');
  const trust =
    page.slug === ''
      ? `<section aria-label="${escapeHtml(readCatalogValue(catalog, 'welcome.trustLabel'))}"><h2>${escapeHtml(readCatalogValue(catalog, 'welcome.trustIntro'))}</h2><p>Ionic · React · Capacitor · TypeScript</p></section>`
      : '';
  return template
    .replace(
      '<html lang="en">',
      `<html lang="${locale}" dir="${RTL_LOCALES.has(locale) ? 'rtl' : 'ltr'}">`,
    )
    .replace(/<meta name="description"[^>]*>/u, metadata)
    .replace(/<title>[^<]*<\/title>/u, `<title>${escapeHtml(title)} | Capacitor Ranger</title>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root"><main class="static-entry"><p>${escapeHtml(readCatalogValue(catalog, 'welcome.eyebrow'))}</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(intro)}</p>${trust}${sections}</main></div>`,
    );
}

function buildOfflineHtml(template, locale, catalog) {
  const title = readCatalogValue(catalog, 'states.offlineTitle');
  const message = readCatalogValue(catalog, 'states.offlineMessage');
  const canonical = `${siteOrigin}/${locale}/offline`;
  return template
    .replace(
      '<html lang="en">',
      `<html lang="${locale}" dir="${RTL_LOCALES.has(locale) ? 'rtl' : 'ltr'}">`,
    )
    .replace(
      /<meta name="description"[^>]*>/u,
      `<meta name="description" content="${escapeHtml(message)}" /><meta name="robots" content="noindex,nofollow" /><link rel="canonical" href="${canonical}" />`,
    )
    .replace(/<title>[^<]*<\/title>/u, `<title>${escapeHtml(title)} | Capacitor Ranger</title>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root"><main class="static-entry"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p></main></div>`,
    );
}

const sitemapUrls = [];
for (const locale of LOCALES) {
  const catalog = JSON.parse(await readFile(`src/shared/i18n/locales/${locale}.json`, 'utf8'));
  for (const page of PUBLIC_PAGES) {
    const outputDirectory = path.join(DIST_DIRECTORY, locale, page.slug);
    await mkdir(outputDirectory, { recursive: true });
    await writeFile(
      path.join(outputDirectory, 'index.html'),
      buildLocalizedHtml(sourceHtml, locale, page, catalog),
      'utf8',
    );
    sitemapUrls.push(`${siteOrigin}${localizedUrlPath(locale, page.slug)}`);
  }
  const offlineDirectory = path.join(DIST_DIRECTORY, locale, 'offline');
  await mkdir(offlineDirectory, { recursive: true });
  await writeFile(
    path.join(offlineDirectory, 'index.html'),
    buildOfflineHtml(sourceHtml, locale, catalog),
    'utf8',
  );
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(DIST_DIRECTORY, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(
  path.join(DIST_DIRECTORY, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /home\nSitemap: ${siteOrigin}/sitemap.xml\n`,
  'utf8',
);
await rm(path.join(DIST_DIRECTORY, 'mockServiceWorker.js'), { force: true });
console.log(`Generated ${String(sitemapUrls.length)} localized public documents at ${siteOrigin}.`);
