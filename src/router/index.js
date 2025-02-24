import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GymsView from '../views/GymsView.vue'
import ReservasView from '@/views/ReservasView.vue'
import MapaView from '@/views/MapaView.vue'
import PagarView from '@/views/PagarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/gyms/:name',
      name: 'gyms',
      component: GymsView,
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: MapaView,
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: ReservasView,
    },
    {
      path: '/pagar',
      name: 'pagar',
      component: PagarView,
    },
  ],
})

export default router



