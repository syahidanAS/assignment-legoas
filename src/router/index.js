import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DaftarPiutang from '../views/DaftarPiutangView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home/daftar-piutang-unit',
      name: 'daftar-piutang-unit',
      component: DaftarPiutang
    },
  ]
})

export default router
