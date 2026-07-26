import { isNativeRuntime } from '../runtime/runtime.facade';
import { PWA_SERVICE_WORKER_PATH } from './service-worker.constants';

export async function registerPwaServiceWorker(isProduction: boolean): Promise<boolean> {
  if (!isProduction || isNativeRuntime() || !('serviceWorker' in navigator)) {
    return false;
  }
  try {
    await navigator.serviceWorker.register(PWA_SERVICE_WORKER_PATH);
    return true;
  } catch {
    return false;
  }
}
