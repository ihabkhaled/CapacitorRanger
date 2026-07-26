import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { fireIonChange } from '../../../../tests/setup/ionic-events.helper';
import { AppSelect } from './select.component';

const OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'dark', label: 'Dark' },
] as const;

describe('AppSelect', () => {
  it('renders its label, value, and every option', () => {
    render(
      <AppSelect
        label="Theme"
        name="theme"
        value="system"
        options={OPTIONS}
        onValueChange={vi.fn()}
        testId="theme-select"
      />,
    );

    const select = screen.getByTestId('theme-select');
    expect(select).toHaveAttribute('label', 'Theme');
    expect(select).toHaveProperty('value', 'system');
    expect(select).toHaveTextContent('System');
    expect(select).toHaveTextContent('Dark');
  });

  it('reports a normalized Ionic selection', () => {
    const onValueChange = vi.fn();
    render(
      <AppSelect
        label="Theme"
        name="theme"
        value="system"
        options={OPTIONS}
        onValueChange={onValueChange}
        testId="theme-select"
      />,
    );

    fireIonChange(screen.getByTestId('theme-select'), 'dark');

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('dark');
  });
  it('forwards optional field state', () => {
    render(
      <AppSelect
        label="Theme"
        name="theme"
        value=""
        options={OPTIONS}
        onValueChange={vi.fn()}
        placeholder="Choose"
        errorMessage="Required"
        testId="theme-select"
      />,
    );

    const select = screen.getByTestId('theme-select');
    expect(select).toHaveAttribute('placeholder', 'Choose');
    expect(select).toHaveAttribute('error-text', 'Required');
    expect(select).toHaveClass('ion-invalid', 'ion-touched');
  });
});
