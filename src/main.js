import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PhosphorIcons from "@phosphor-icons/vue"
import App from './App.vue'
import  {VueTelegramPlugin} from 'vue-tg'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component:() => import('./views/HomeView.vue'),
      name:  '/',
    },
    {
      path: '/analytics',
      component:() => import('./views/AnalyticsView.vue'),
      name: '/analytics'
    }
]
})

createApp(App).use(router).use(createPinia()).use(PhosphorIcons).use(VueTelegramPlugin).mount('#app')
