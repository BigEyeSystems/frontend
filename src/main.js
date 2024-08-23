import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PhosphorIcons from "@phosphor-icons/vue"
import App from './App.vue'
import  {VueTelegramPlugin} from 'vue-tg'
import { createRouter, createWebHistory } from 'vue-router'
import '@fontsource/inter';
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
    },
    {
      path: '/profile',
      component:() => import('./views/ProfileView.vue'),
      name: '/profile'
    },
    {
      path: '/profile/premium',
      component:() => import('./views/PremiumView.vue'),
      name: '/profile/premium'
    },
    {
      path: '/referrals',
      component:() => import('./views/ReferralsView.vue'),
      name:'/referrals'
    },
    {
      path: '/profile/settings',
      component:() => import('./views/SettingsView.vue'),
      name: '/profile/settings'
    },
    {
      path: '/profile/wallet',
      component:() => import('./views/WalletView.vue'),
      name: '/profile/wallet'
    },

]
})

createApp(App).use(router).use(createPinia()).use(PhosphorIcons).use(VueTelegramPlugin).mount('#app')
