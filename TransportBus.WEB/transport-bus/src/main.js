import '../public/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './plugins/i18n';
import router from './router'

loadFonts()

console.log(process.env.VUE_APP_GOOGLE_MAPS_API_KEY);

createApp(App)
  .use(i18n)
  .use(router)
  .use(vuetify)
  .mount('#app')
