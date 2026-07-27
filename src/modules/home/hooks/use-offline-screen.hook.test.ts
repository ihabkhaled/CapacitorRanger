import { renderHook } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';

import { initTestI18n } from '../../../../tests/setup/i18n-test.helper';
import { useOfflineScreen } from './use-offline-screen.hook';

beforeAll(async () => {
  await initTestI18n();
});

describe('useOfflineScreen', () => {
  it('returns translated offline copy', () => {
    const { result } = renderHook(() => useOfflineScreen());

    expect(result.current).toEqual({
      title: 'You are offline',
      message: 'Reconnect to load the latest data.',
    });
  });
});
