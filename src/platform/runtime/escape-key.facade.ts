export function subscribeToEscapeKey(onEscape: () => void): () => void {
  const listener = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      onEscape();
    }
  };
  document.addEventListener('keydown', listener);
  return () => {
    document.removeEventListener('keydown', listener);
  };
}
