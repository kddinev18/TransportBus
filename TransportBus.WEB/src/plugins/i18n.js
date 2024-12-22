import { createI18n } from 'vue-i18n';
import authRes from '../core/utils/resources.js';
import publicRes from '../modules/public/utils/resources.js';

const commonResourcesBg = {
  minutesShort: 'мин',
}

const commonResourcesEn = {
  minutesShort: 'min',
}

const i18n = createI18n({
  locale: 'bg', // Default locale
  fallbackLocale: 'en', // Fallback to 'en' if translation is missing
  messages: {
    en:
    {
      validation: commonResourcesEn,
      auth: authRes.en,
      public: publicRes.en
    },
    bg:
    {
      common: commonResourcesBg,
      auth: authRes.bg,
      public: publicRes.bg
    }
  }
});

export default i18n;