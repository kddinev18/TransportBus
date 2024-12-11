import { createMemoryHistory, createRouter } from 'vue-router'

import LogInView from './core/views/LogInView.vue'
import TransportMapView from './modules/public/views/TransportMapView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: TransportMapView, name: 'home'},
  { path: '/logIn', component: LogInView, name: 'logIn' },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router