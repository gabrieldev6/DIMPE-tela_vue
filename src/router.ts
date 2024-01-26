import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/video',
      name: "video",
      component: () => import('./components/video/videoDetector.vue')

    },
    {
      path: '/analitico',
      name: "analitico",
      component: () => import('./pages/analitico.vue')
    
    }
      

  ]
})

export default router