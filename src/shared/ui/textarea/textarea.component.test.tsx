import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { fireIonBlur, fireIonInput } from '../../../../tests/setup/ionic-events.helper';
import { AppTextarea } from './textarea.component';
import { extractTextareaValue } from './textarea.helper';

describe('extractTextareaValue', () => {
  it('normalizes nullish values and preserves text', () => {
    expect(extractTextareaValue(undefined)).toBe('');
    expect(extractTextareaValue(null)).toBe('');
    expect(extractTextareaValue('Launch notes')).toBe('Launch notes');
  });
});

describe('AppTextarea', () => {
  it('renders explicit state and reports input and blur events', () => {
    const onValueChange = vi.fn();
    const onBlur = vi.fn();
    render(
      <AppTextarea
        label="Message"
        name="message"
        value="Initial"
        rows={8}
        errorMessage="Message is required"
        onValueChange={onValueChange}
        onBlur={onBlur}
        testId="message"
      />,
    );

    const textarea = screen.getByTestId('message');
    expect(textarea).toHaveProperty('rows', 8);
    expect(textarea).toHaveProperty('errorText', 'Message is required');
    fireIonInput(textarea, 'Updated');
    fireIonBlur(textarea);

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('Updated');
    expect(onBlur).toHaveBeenCalledOnce();
  });

  it('uses default rows and omits optional error and blur state', () => {
    const onValueChange = vi.fn();
    render(
      <AppTextarea
        label="Message"
        name="message"
        value=""
        onValueChange={onValueChange}
        testId="message"
      />,
    );

    const textarea = screen.getByTestId('message');
    expect(textarea).toHaveProperty('rows', 5);
    expect(textarea).not.toHaveProperty('errorText', 'Message is required');
    fireIonBlur(textarea);
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
