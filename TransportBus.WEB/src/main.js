import '../public/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia';
import i18n from './plugins/i18n';
import router from './router';
import { SnackbarService } from "vue3-snackbar";
import "vue3-snackbar/styles";

loadFonts()
const pinia = createPinia();

createApp(App)
  .use(i18n)
  .use(router)
  .use(pinia)
  .use(SnackbarService)
  .use(vuetify)
  .mount('#app')
