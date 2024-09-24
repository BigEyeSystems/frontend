import('./main.css');

const createApp = () => import('vue').then(vue => vue.createApp);
const createPinia = () => import('pinia').then(pinia => pinia.createPinia);
const PhosphorIcons = () => import('@phosphor-icons/vue').then(module => module.default);
const App = () => import('./App.vue');
const VueTelegramPlugin = () => import('vue-tg').then(module => module.VueTelegramPlugin);
const createRouter = () => import('vue-router').then(router => router.createRouter);
const createWebHistory = () => import('vue-router').then(router => router.createWebHistory);
const fontSourceInter = () => import('@fontsource/inter');
const createI18n = () => import('vue-i18n').then(module => module.createI18n);
const useI18n = () => import('vue-i18n').then(module => module.useI18n);

const router = createRouter().then(router => router.createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/HomeView.vue'),
      name:  '/',
    },
    {
      path: '/analytics',
      component: () => import('./views/AnalyticsView.vue'),
      name: '/analytics'
    },
    {
      path: '/profile',
      component: () => import('./views/ProfileView.vue'),
      name: '/profile'
    },
    {
      path: '/profile/premium',
      component: () => import('./views/PremiumView.vue'),
      name: '/profile/premium'
    },
    {
      path: '/referrals',
      component: () => import('./views/ReferralsView.vue'),
      name:'/referrals'
    },
    {
      path: '/profile/settings',
      component: () => import('./views/SettingsView.vue'),
      name: '/profile/settings'
    },
    {
      path: '/profile/wallet',
      component: () => import('./views/WalletView.vue'),
      name: '/profile/wallet'
    },
  ]
}));

const messages = Object.assign(languages);
const i18n = createI18n().then(i18n => i18n.createI18n({
  legacy: false,
  locale: localStorage.getItem('lang'),
  fallbackLocale: 'en',
  messages
}));

createApp(App, { 
  setup() {
    const { t } = useI18n();
    return { t };
  }
}).then(app => {
  app.use(router).use(i18n).use(createPinia()).use(PhosphorIcons()).use(VueTelegramPlugin()).mount('#app');
});
