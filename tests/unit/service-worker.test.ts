import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

import { describe, expect, it, vi } from 'vitest';

interface WorkerRequest {
  readonly method: string;
  readonly mode: string;
  readonly url: string;
  readonly headers: { readonly get: (name: string) => string | null };
}

interface WorkerEvent {
  readonly request?: WorkerRequest;
  readonly respondWith?: ReturnType<typeof vi.fn>;
  readonly waitUntil?: ReturnType<typeof vi.fn>;
}

type WorkerHandler = (event: WorkerEvent) => void;

function request(path: string, headers: Readonly<Record<string, string>> = {}): WorkerRequest {
  return {
    method: 'GET',
    mode: 'navigate',
    url: `https://capacitorranger.app${path}`,
    headers: {
      get: (name) => headers[name.toLowerCase()] ?? null,
    },
  };
}

function loadWorker() {
  const handlers = new Map<string, WorkerHandler>();
  const deleteCache = vi.fn(() => Promise.resolve(true));
  const cacheKeys = vi.fn(() =>
    Promise.resolve(['capacitor-ranger-v0', 'capacitor-ranger-v1', 'another-app-v9']),
  );
  const context = {
    URL,
    Response,
    Promise,
    fetch: vi.fn(() => Promise.resolve(new Response('online'))),
    caches: {
      delete: deleteCache,
      keys: cacheKeys,
      match: vi.fn(() => Promise.resolve(new Response('offline'))),
      open: vi.fn(() => Promise.resolve({ addAll: vi.fn(() => Promise.resolve(undefined)) })),
    },
    self: {
      location: { origin: 'https://capacitorranger.app' },
      clients: { claim: vi.fn() },
      skipWaiting: vi.fn(),
      addEventListener: (name: string, handler: WorkerHandler) => {
        handlers.set(name, handler);
      },
    },
  };
  runInNewContext(readFileSync('public/service-worker.js', 'utf8'), context);
  return { handlers, deleteCache };
}

describe('production service worker', () => {
  it.each(['/en/login', '/ar/home', '/fr/settings', '/de/workbench', '/api/v1/health'])(
    'does not intercept private or API navigation %s',
    (path) => {
      const { handlers } = loadWorker();
      const respondWith = vi.fn();

      handlers.get('fetch')?.({ request: request(path), respondWith });

      expect(respondWith).not.toHaveBeenCalled();
    },
  );

  it.each(['/en', '/ar/about', '/fr/features', '/de/faq', '/ja/contact', '/ko/offline'])(
    'handles the public navigation %s',
    (path) => {
      const { handlers } = loadWorker();
      const respondWith = vi.fn();

      handlers.get('fetch')?.({ request: request(path), respondWith });

      expect(respondWith).toHaveBeenCalledOnce();
    },
  );

  it('ignores prefetch and RSC navigation requests', () => {
    const { handlers } = loadWorker();
    const prefetchRespond = vi.fn();
    const rscRespond = vi.fn();

    handlers.get('fetch')?.({
      request: request('/en/features', { purpose: 'prefetch' }),
      respondWith: prefetchRespond,
    });
    handlers.get('fetch')?.({
      request: request('/en/features', { rsc: '1' }),
      respondWith: rscRespond,
    });

    expect(prefetchRespond).not.toHaveBeenCalled();
    expect(rscRespond).not.toHaveBeenCalled();
  });

  it('deletes only stale app-owned caches during activation', async () => {
    const { handlers, deleteCache } = loadWorker();
    let activation: Promise<unknown> | undefined;

    handlers.get('activate')?.({
      waitUntil: vi.fn((promise: Promise<unknown>) => {
        activation = promise;
      }),
    });
    await activation;

    expect(deleteCache).toHaveBeenCalledTimes(2);
    expect(deleteCache).toHaveBeenCalledWith('capacitor-ranger-v0');
    expect(deleteCache).toHaveBeenCalledWith('capacitor-ranger-v1');
    expect(deleteCache).not.toHaveBeenCalledWith('another-app-v9');
  });
});
