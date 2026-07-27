import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TEST_IDS } from '@/shared/config';

import { useOfflineScreen } from '../hooks/use-offline-screen.hook';
import { OfflineContainer } from './offline.container';

vi.mock('../hooks/use-offline-screen.hook', () => ({ useOfflineScreen: vi.fn() }));

describe('OfflineContainer', () => {
  it('renders the prepared offline state inside the shared page shell', () => {
    vi.mocked(useOfflineScreen).mockReturnValue({
      title: 'Offline',
      message: 'Reconnect to continue.',
    });

    render(<OfflineContainer />);

    expect(screen.getByTestId(TEST_IDS.offlinePage)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Offline' })).toBeInTheDocument();
    expect(screen.getByText('Reconnect to continue.')).toBeInTheDocument();
  });
});
