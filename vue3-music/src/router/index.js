import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('@/views/recommend.vue')
  },
  {
    path: '/singer',
    component: () => import('@/views/singer.vue'),
    children: [
      {
        path: ':mid',
        component: () => import('@/views/singer-detail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
