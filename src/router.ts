import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: "dashboard",
      component: () => import('./pages/dashboard.vue')
    },
    {
      path: '/video',
      name: "video",
      component: () => import('./components/video/videoDetector.vue')

    }
    

  ]
})

export default router