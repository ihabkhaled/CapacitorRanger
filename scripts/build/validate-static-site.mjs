import { access, readFile, stat } from 'node:fs/promises';

import { LOCALES, PUBLIC_PAGES } from './static-site.constants.mjs';
import { localizedUrlPath, resolveBuildSiteOrigin } from './static-site.helpers.mjs';

const siteOrigin = await resolveBuildSiteOrigin();
const sourceHtml = await readFile('dist/index.html', 'utf8');
const assetPattern = /\/assets\/[^ ]+/gu;
const sourceAssets = [...sourceHtml.matchAll(assetPattern)].map((match) => match[0]).sort();
const expectedAlternateCount = LOCALES.length + 1;
let documentCount = 0;
for (const locale of LOCALES) {
  for (const page of PUBLIC_PAGES) {
    const html = await readFile(`dist${localizedUrlPath(locale, page.slug)}/index.html`, 'utf8');
    const canonical = `${siteOrigin}${localizedUrlPath(locale, page.slug)}`;
    if (!html.includes(`<link rel="canonical" href="${canonical}" />`))
      throw new Error(`Missing self canonical: ${canonical}`);
    if ((html.match(/hreflang=/gu) ?? []).length !== expectedAlternateCount)
      throw new Error(`Alternate parity failed: ${canonical}`);
    if (
      !html.includes('type="application/ld+json"') ||
      !html.includes('<main class="static-entry">')
    )
      throw new Error(`Static content or JSON-LD missing: ${canonical}`);
    if (!html.includes('/assets/'))
      throw new Error(`Root-relative Vite asset links missing: ${canonical}`);
    const pageAssets = [...html.matchAll(assetPattern)].map((match) => match[0]).sort();
    if (JSON.stringify(pageAssets) !== JSON.stringify(sourceAssets))
      throw new Error(`Vite asset graph changed: ${canonical}`);
    documentCount += 1;
  }
}
await access('dist/manifest.webmanifest');
await access('dist/pwa-192.png');
await access('dist/pwa-512.png');
await access('dist/service-worker.js');
await access('dist/sitemap.xml');
await access('dist/robots.txt');
try {
  await stat('dist/mockServiceWorker.js');
  throw new Error('Production dist contains mockServiceWorker.js');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
console.log(`Static site validation passed: ${String(documentCount)} localized documents.`);
