import { createMemoryHistory, createRouter } from 'vue-router'

import LogInView from './modules/authentication/views/LogInView.vue'

const routes = [
  { path: '/about', component: LogInView, name: 'about' },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router