import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/Index.vue'
import Tabbar from '@/views/Tabbar.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/Tabbar',
    name: 'Tabbar',
    component: Tabbar
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
