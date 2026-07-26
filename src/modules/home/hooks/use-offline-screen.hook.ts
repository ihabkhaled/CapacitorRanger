import { useAppTranslation } from '@/packages/i18n';
import { I18N_KEYS } from '@/shared/i18n';

export interface OfflineScreenView {
  readonly title: string;
  readonly message: string;
}

export function useOfflineScreen(): OfflineScreenView {
  const { t } = useAppTranslation();
  return {
    title: t(I18N_KEYS.states.offlineTitle),
    message: t(I18N_KEYS.states.offlineMessage),
  };
}
