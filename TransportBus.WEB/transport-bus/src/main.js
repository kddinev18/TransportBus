import '../public/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './plugins/i18n';
import router from './router'

loadFonts()

createApp(App)
  .use(i18n)
  .use(router)
  .use(vuetify)
  .mount('#app')
