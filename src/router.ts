import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/login.vue'

const router = createRouter({
  
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login

    },
    {
      path: '/newAccount',
      name: "newAccount",
      component: () => import('./pages/newAccount.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('./pages/perfil.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./pages/dashboard.vue'),
      children: [
        {
          path: '/analitico',
          name: "analitico",
          component: () => import('./pages/analitico.vue')
        
        },
        {
          path: '/video',
          name: "video",
          component: () => import('./components/video/videoDetector.vue')
    
        },
      ]

    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('./pages/notFound.vue')
    }

      

  ]
})


export default router