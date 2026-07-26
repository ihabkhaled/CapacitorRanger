const CACHE_PREFIX = 'capacitor-ranger-';
const CACHE_NAME = `${CACHE_PREFIX}v2`;
const LOCALES = [
  'en',
  'ar',
  'fr',
  'it',
  'de',
  'hi',
  'fa',
  'th',
  'ja',
  'zh',
  'es',
  'pt',
  'ko',
  'tr',
];
const OFFLINE_URLS = LOCALES.map((locale) => `/${locale}/offline`);
const PUBLIC_SLUGS = new Set(['', 'about', 'features', 'faq', 'contact', 'offline']);

function isPublicNavigation(request) {
  if (request.method !== 'GET' || request.mode !== 'navigate') return false;
  if (
    request.headers.get('purpose') === 'prefetch' ||
    request.headers.get('sec-purpose') === 'prefetch'
  ) {
    return false;
  }
  if (
    request.headers.get('rsc') !== null ||
    request.headers.get('x-middleware-prefetch') !== null
  ) {
    return false;
  }
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  const segments = url.pathname.split('/').filter(Boolean);
  if (segments.length < 1 || segments.length > 2) return false;
  return LOCALES.includes(segments[0]) && PUBLIC_SLUGS.has(segments[1] ?? '');
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['/en', ...OFFLINE_URLS])));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (!isPublicNavigation(event.request)) return;
  event.respondWith(
    fetch(event.request).catch(() => {
      const locale = new URL(event.request.url).pathname.split('/')[1];
      const fallback = LOCALES.includes(locale) ? `/${locale}/offline` : '/en/offline';
      return caches
        .match(fallback)
        .then((response) => response ?? caches.match('/en/offline'))
        .then(
          (response) =>
            response ??
            new Response('Offline', {
              status: 503,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            }),
        );
    }),
  );
});
