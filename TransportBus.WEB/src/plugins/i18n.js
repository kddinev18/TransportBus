import { createI18n } from "vue-i18n";
import authRes from "../core/utils/resources.js";
import publicRes from "../modules/public/utils/resources.js";
import adminRes from "../modules/administrative/utils/resources.js";

const commonResourcesBg = {
  minutesShort: "мин",
  pickColor: "Избери цвят",
};

const commonResourcesEn = {
  minutesShort: "min",
  pickColor: "Pick color",
};

const i18n = createI18n({
  locale: "bg", // Default locale
  fallbackLocale: "en", // Fallback to 'en' if translation is missing
  messages: {
    en: {
      common: commonResourcesEn,
      auth: authRes.en,
      public: publicRes.en,
      administrative: adminRes.en
    },
    bg: {
      common: commonResourcesBg,
      auth: authRes.bg,
      public: publicRes.bg,
      administrative: adminRes.bg
    },
  },
});

export default i18n;
