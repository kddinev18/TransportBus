import { createI18n } from 'vue-i18n';
import authRes from '../modules/authentication/i18n.js';

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
      auth: authRes.en
    },
    bg:
    {
      auth: authRes.bg
    }
  }
});

export default i18n;