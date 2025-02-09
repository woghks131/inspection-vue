import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import Main from '../views/MainView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
