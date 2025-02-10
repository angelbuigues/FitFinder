import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GymsView from '../views/GymsView.vue'
import ReservasView from '@/views/ReservasView.vue'

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
      path: '/reservas',
      name: 'reservas',
      component: ReservasView,
    }
  ],
})

export default router



