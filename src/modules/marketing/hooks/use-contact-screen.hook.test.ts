import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { initTestI18n } from '../../../../tests/setup/i18n-test.helper';
import { useContactScreen } from './use-contact-screen.hook';

beforeAll(async () => {
  await initTestI18n();
});

function submitEvent(): React.SyntheticEvent<HTMLFormElement> {
  return {
    preventDefault: vi.fn(),
    persist: vi.fn(),
  } as unknown as React.SyntheticEvent<HTMLFormElement>;
}

describe('useContactScreen', () => {
  it('translates schema errors after an invalid submission', async () => {
    const { result } = renderHook(() => useContactScreen());

    act(() => {
      result.current.form.onSubmit(submitEvent());
    });

    await waitFor(() => {
      expect(result.current.form.name.errorMessage).toBe(
        'Enter at least 2 characters for your name.',
      );
    });
    expect(result.current.form.email.errorMessage).toBe('Enter a valid email address.');
    expect(result.current.form.message.errorMessage).toBe(
      'Tell us a little more in at least 10 characters.',
    );
    expect(result.current.form.mailHref).toBeUndefined();
    expect(result.current.form.readyMessage).toBeUndefined();
  });

  it('prepares a local mail draft after a valid submission', async () => {
    const { result } = renderHook(() => useContactScreen());

    act(() => {
      result.current.form.name.onChange('Ranger Team');
      result.current.form.email.onChange('team@example.com');
      result.current.form.message.onChange('We need help preparing a launch.');
      result.current.form.onSubmit(submitEvent());
    });

    await waitFor(() => {
      expect(result.current.form.mailHref).toContain(
        'mailto:hello@capacitorranger.app?subject=Ranger+Team',
      );
    });
    expect(result.current.form.readyMessage).toBe(
      'Your message is ready. Review it in your mail application before sending.',
    );
  });
});
