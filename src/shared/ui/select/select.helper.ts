export function extractIonSelectValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}
