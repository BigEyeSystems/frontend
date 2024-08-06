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
        component: () => import('./views/HomeView.vue')
    }
]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PhosphorIcons)
app.use(VueTelegramPlugin)

app.mount('#app')
