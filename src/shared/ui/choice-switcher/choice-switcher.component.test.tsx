import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ChoiceSwitcher } from './choice-switcher.component';

describe('ChoiceSwitcher', () => {
  it('renders every choice and reports the selected value', async () => {
    const onChange = vi.fn();
    render(
      <ChoiceSwitcher
        label="Language"
        value="en"
        choices={[
          { value: 'en', label: 'English' },
          { value: 'ar', label: 'العربية' },
        ]}
        testId="language-switcher"
        onChange={onChange}
      />,
    );

    const switcher = screen.getByRole('combobox', { name: 'Language' });
    expect(switcher).toHaveValue('en');
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(switcher).toHaveAttribute('data-testid', 'language-switcher');

    await userEvent.selectOptions(switcher, 'ar');

    expect(onChange).toHaveBeenCalledExactlyOnceWith('ar');
  });
});
