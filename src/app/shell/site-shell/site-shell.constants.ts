import { APP_PATHS } from '@/shared/config';
import { APP_LOCALE, THEME_MODE } from '@/shared/enums';
import { I18N_KEYS } from '@/shared/i18n';

export const SITE_PRIMARY_LINKS = [
  { path: APP_PATHS.welcome, labelKey: I18N_KEYS.navigation.welcome },
  { path: APP_PATHS.about, labelKey: I18N_KEYS.navigation.about },
  { path: APP_PATHS.features, labelKey: I18N_KEYS.navigation.features },
  { path: APP_PATHS.faq, labelKey: I18N_KEYS.navigation.faq },
  { path: APP_PATHS.contact, labelKey: I18N_KEYS.navigation.contact },
] as const;

export const SITE_PRODUCT_LINKS = [
  { path: APP_PATHS.login, labelKey: I18N_KEYS.navigation.login },
  { path: APP_PATHS.home, labelKey: I18N_KEYS.navigation.home },
  { path: APP_PATHS.settings, labelKey: I18N_KEYS.navigation.settings },
  { path: APP_PATHS.workbench, labelKey: I18N_KEYS.navigation.workbench },
] as const;

export const SITE_PRODUCT_SIDEBAR_PATHS = [
  APP_PATHS.home,
  APP_PATHS.settings,
  APP_PATHS.workbench,
] as const;

export const SITE_LOCALE_CHOICES = [
  { value: APP_LOCALE.English, labelKey: I18N_KEYS.languages.en },
  { value: APP_LOCALE.Arabic, labelKey: I18N_KEYS.languages.ar },
  { value: APP_LOCALE.French, labelKey: I18N_KEYS.languages.fr },
  { value: APP_LOCALE.Italian, labelKey: I18N_KEYS.languages.it },
  { value: APP_LOCALE.German, labelKey: I18N_KEYS.languages.de },
  { value: APP_LOCALE.Hindi, labelKey: I18N_KEYS.languages.hi },
  { value: APP_LOCALE.Persian, labelKey: I18N_KEYS.languages.fa },
  { value: APP_LOCALE.Thai, labelKey: I18N_KEYS.languages.th },
  { value: APP_LOCALE.Japanese, labelKey: I18N_KEYS.languages.ja },
  { value: APP_LOCALE.Chinese, labelKey: I18N_KEYS.languages.zh },
  { value: APP_LOCALE.Spanish, labelKey: I18N_KEYS.languages.es },
  { value: APP_LOCALE.Portuguese, labelKey: I18N_KEYS.languages.pt },
  { value: APP_LOCALE.Korean, labelKey: I18N_KEYS.languages.ko },
  { value: APP_LOCALE.Turkish, labelKey: I18N_KEYS.languages.tr },
] as const;

export const SITE_THEME_CHOICES = [
  { value: THEME_MODE.Light, labelKey: I18N_KEYS.shell.themeLight },
  { value: THEME_MODE.Dark, labelKey: I18N_KEYS.shell.themeDark },
  { value: THEME_MODE.System, labelKey: I18N_KEYS.shell.themeSystem },
] as const;

export const SITE_SIDEBAR_ID = 'site-sidebar-navigation';
