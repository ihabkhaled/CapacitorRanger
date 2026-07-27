import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type * as RuntimeModule from '../runtime/runtime.facade';
import { isNativeRuntime } from '../runtime/runtime.facade';
import { PWA_SERVICE_WORKER_PATH } from './service-worker.constants';
import { registerPwaServiceWorker } from './service-worker.facade';

vi.mock('../runtime/runtime.facade', async (importOriginal) => ({
  ...(await importOriginal<typeof RuntimeModule>()),
  isNativeRuntime: vi.fn(),
}));

const originalServiceWorker = Object.getOwnPropertyDescriptor(navigator, 'serviceWorker');

function installServiceWorker(register: () => Promise<unknown>): void {
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: { register },
  });
}

beforeEach(() => {
  vi.mocked(isNativeRuntime).mockReturnValue(false);
});

afterEach(() => {
  vi.clearAllMocks();
  if (originalServiceWorker === undefined) {
    Reflect.deleteProperty(navigator, 'serviceWorker');
  } else {
    Object.defineProperty(navigator, 'serviceWorker', originalServiceWorker);
  }
});

describe('registerPwaServiceWorker', () => {
  it('skips non-production, native, and unsupported runtimes', async () => {
    installServiceWorker(vi.fn());
    await expect(registerPwaServiceWorker(false)).resolves.toBe(false);

    vi.mocked(isNativeRuntime).mockReturnValue(true);
    await expect(registerPwaServiceWorker(true)).resolves.toBe(false);

    vi.mocked(isNativeRuntime).mockReturnValue(false);
    Reflect.deleteProperty(navigator, 'serviceWorker');
    await expect(registerPwaServiceWorker(true)).resolves.toBe(false);
  });

  it('registers the production web worker', async () => {
    const register = vi.fn().mockResolvedValue({});
    installServiceWorker(register);

    await expect(registerPwaServiceWorker(true)).resolves.toBe(true);
    expect(register).toHaveBeenCalledExactlyOnceWith(PWA_SERVICE_WORKER_PATH);
  });

  it('reports a registration failure without rejecting startup', async () => {
    installServiceWorker(vi.fn().mockRejectedValue(new Error('blocked')));

    await expect(registerPwaServiceWorker(true)).resolves.toBe(false);
  });
});
