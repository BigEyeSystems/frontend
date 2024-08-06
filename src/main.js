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
      path: '/impulse',
      component:() => import('./views/ImpulseView.vue'),
      name: '/impulse',
    },
    {
      path: '/',
      component:() => import('./views/HomeView.vue'),
      name:  '/',
    }
]
})

createApp(App).use(router).use(createPinia()).use(PhosphorIcons).use(VueTelegramPlugin).mount('#app')
