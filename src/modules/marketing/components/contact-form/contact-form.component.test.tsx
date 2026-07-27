import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { buildContactScreenView, buildFieldBinding } from '@/tests/factories/marketing.factory';

import { fireIonBlur, fireIonInput } from '../../../../../tests/setup/ionic-events.helper';
import { ContactForm } from './contact-form.component';
import { CONTACT_FORM_TEST_IDS } from './contact-form.constants';

describe('ContactForm', () => {
  it('renders the ready state and connects every field and submission callback', () => {
    const onNameChange = vi.fn();
    const onNameBlur = vi.fn();
    const onEmailChange = vi.fn();
    const onMessageChange = vi.fn();
    const onSubmit = vi.fn((event: React.SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
    });
    const base = buildContactScreenView().form;
    render(
      <ContactForm
        {...base}
        readyMessage="Draft ready"
        mailHref="mailto:hello@example.com"
        name={buildFieldBinding('name', { onChange: onNameChange, onBlur: onNameBlur })}
        email={buildFieldBinding('email', { onChange: onEmailChange })}
        message={buildFieldBinding('message', { onChange: onMessageChange })}
        onSubmit={onSubmit}
      />,
    );

    const name = screen.getByTestId(CONTACT_FORM_TEST_IDS.name);
    const email = screen.getByTestId(CONTACT_FORM_TEST_IDS.email);
    const message = screen.getByTestId(CONTACT_FORM_TEST_IDS.message);
    fireIonInput(name, 'Ranger');
    fireIonBlur(name);
    fireIonInput(email, 'ranger@example.com');
    fireIonInput(message, 'A detailed launch request.');
    fireEvent.submit(screen.getByTestId(CONTACT_FORM_TEST_IDS.form));

    expect(onNameChange).toHaveBeenCalledWith('Ranger');
    expect(onNameBlur).toHaveBeenCalledOnce();
    expect(onEmailChange).toHaveBeenCalledWith('ranger@example.com');
    expect(onMessageChange).toHaveBeenCalledWith('A detailed launch request.');
    expect(onSubmit).toHaveBeenCalledOnce();
    expect(screen.getByRole('status')).toHaveTextContent('Draft ready');
    expect(screen.getByText('Open email')).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  it('omits draft actions before a valid submission', () => {
    render(<ContactForm {...buildContactScreenView().form} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByText('Open email')).not.toBeInTheDocument();
  });
});
