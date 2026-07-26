import type { TranslationResources } from '@/packages/i18n';
import { APP_LOCALE } from '@/shared/enums';

import arCatalog from '@/shared/i18n/locales/ar.json';
import deCatalog from '@/shared/i18n/locales/de.json';
import enCatalog from '@/shared/i18n/locales/en.json';
import esCatalog from '@/shared/i18n/locales/es.json';
import faCatalog from '@/shared/i18n/locales/fa.json';
import frCatalog from '@/shared/i18n/locales/fr.json';
import hiCatalog from '@/shared/i18n/locales/hi.json';
import itCatalog from '@/shared/i18n/locales/it.json';
import jaCatalog from '@/shared/i18n/locales/ja.json';
import koCatalog from '@/shared/i18n/locales/ko.json';
import ptCatalog from '@/shared/i18n/locales/pt.json';
import thCatalog from '@/shared/i18n/locales/th.json';
import trCatalog from '@/shared/i18n/locales/tr.json';
import zhCatalog from '@/shared/i18n/locales/zh.json';

/** Bundle the canonical catalogs into i18next resources. */
export function buildI18nResources(): TranslationResources {
  return {
    [APP_LOCALE.English]: { translation: enCatalog },
    [APP_LOCALE.Arabic]: { translation: arCatalog },
    [APP_LOCALE.French]: { translation: frCatalog },
    [APP_LOCALE.Italian]: { translation: itCatalog },
    [APP_LOCALE.German]: { translation: deCatalog },
    [APP_LOCALE.Hindi]: { translation: hiCatalog },
    [APP_LOCALE.Persian]: { translation: faCatalog },
    [APP_LOCALE.Thai]: { translation: thCatalog },
    [APP_LOCALE.Japanese]: { translation: jaCatalog },
    [APP_LOCALE.Chinese]: { translation: zhCatalog },
    [APP_LOCALE.Spanish]: { translation: esCatalog },
    [APP_LOCALE.Portuguese]: { translation: ptCatalog },
    [APP_LOCALE.Korean]: { translation: koCatalog },
    [APP_LOCALE.Turkish]: { translation: trCatalog },
  };
}
