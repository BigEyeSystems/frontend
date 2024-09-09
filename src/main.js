import './main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PhosphorIcons from "@phosphor-icons/vue"
import App from './App.vue'
import  {VueTelegramPlugin} from 'vue-tg'
import { createRouter, createWebHistory } from 'vue-router'
import '@fontsource/inter';
import { languages } from './i18n';
import { defaultLocale } from './i18n';
import { createI18n, useI18n } from 'vue-i18n'
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
});

const messages = Object.assign(languages);
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang'),
  fallbackLocale: 'en',
  messages
})

createApp(App, { 
  setup() {
    const {t} = useI18n()
    return {t}
  }
}).use(router).use(i18n).use(createPinia()).use(PhosphorIcons).use(VueTelegramPlugin).mount('#app')
