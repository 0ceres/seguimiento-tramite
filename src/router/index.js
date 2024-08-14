import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TipoTramiteView from '@/views/tipoTramite/TipoTramiteView.vue'
import TramiteView from '@/views/tramite/TramiteView.vue'
import TramiteTrazaView from '@/views/tramiteTraza/TramiteTrazaView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tipoTramite',
    name: 'tipoTramite',
    component: TipoTramiteView
  },
  {
    path: '/tramite',
    name: 'tramite',
    component: TramiteView
  },
  {
    path: '/tramite/:id/trazas',
    name: 'tramiteTrazas',
    component: TramiteTrazaView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
