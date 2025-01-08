import { createMemoryHistory, createRouter } from 'vue-router'

import LogInView from './core/views/LogInView.vue'
import TransportMapView from './modules/public/views/TransportMapView.vue'
import AdministrativeMainView from './modules/administrative/views/AdministrativeMainView.vue'
import StopsAdministrativeView from './modules/administrative/views/StopsAdministrativeView.vue'
import RoutesAdministrativeView from './modules/administrative/views/RoutesAdministrativeView.vue'
import UsersAdministrativeView from './modules/administrative/views/UsersAdministrativeView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: TransportMapView, name: 'home'},
  { path: '/admin', component: AdministrativeMainView, name: 'admin', children:
    [
      { path: '/stops', component: StopsAdministrativeView, name: 'stops' },
      { path: '/routes', component: RoutesAdministrativeView, name: 'routes' },
      { path: '/users', component: UsersAdministrativeView, name: 'users' },
    ]
  },
  { path: '/logIn', component: LogInView, name: 'logIn' },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router