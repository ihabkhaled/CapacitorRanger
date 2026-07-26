import type { AppCardTone } from './card.types';

export const CARD_TONE_CLASS: Record<AppCardTone, string> = {
  default: 'app-card',
  accent: 'app-card app-card--accent',
  muted: 'app-card app-card--muted',
};
