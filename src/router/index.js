import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Incidences from '@/views/Incidences.vue'
import asistencias from '@/views/asistencias.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/incidences', component: Incidences },
  { path: '/asistencias', component: asistencias },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
