import { createI18n } from 'vue-i18n';
import authRes from '../core/utils/resources.js';
import publicRes from '../modules/public/utils/resources.js';

const validationResourcesBg = {
  required: 'Полето е задължително',
}

const validationResourcesEn = {
  required: 'Field is required',
}

const i18n = createI18n({
  locale: 'bg', // Default locale
  fallbackLocale: 'en', // Fallback to 'en' if translation is missing
  messages: {
    en:
    {
      validation: validationResourcesEn,
      auth: authRes.en,
      public: publicRes.en
    },
    bg:
    {
      validation: validationResourcesBg,
      auth: authRes.bg,
      public: publicRes.bg
    }
  }
});

export default i18n;