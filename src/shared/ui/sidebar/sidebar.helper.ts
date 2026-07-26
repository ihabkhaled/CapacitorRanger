export function focusDrawerClose(isOpen: boolean, element: HTMLButtonElement | null): void {
  if (isOpen) {
    element?.focus();
  }
}

export function closeDrawerOnEscape(
  event: React.KeyboardEvent<HTMLElement>,
  onClose: () => void,
): void {
  if (event.key === 'Escape') {
    onClose();
  }
}
