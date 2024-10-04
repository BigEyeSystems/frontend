<script setup>
import axios from "axios";
import { onMounted, onBeforeUnmount, ref, watch, computed } from "vue";
import LocalesView from './LocalesView.vue';
import menuItem from "../components/menuItem.vue";
import Header from "../components/Header.vue";
import tickerFunding from "@/components/tickerFunding.vue";
import footerMenu from "@/components/footer.vue";
import addPremium from "@/components/addPremium.vue";
import ImpulseView from "./ImpulseView.vue";
import GradationView from "./GradationView.vue";
import ActiveGrowthView from "./ActiveGrowthView.vue";
import trackingTickerView from "./trackingTickerView.vue";
import FundingDataView from "./FundingDataView.vue";
import NotificationView from "./NotificationView.vue";
import crown from "../components/icons/crown.vue";
import notification from "../components/icons/Notification.vue"
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 

const openLocales = ref(false);
const toggleTeleportLocale = () => {
  openLocales.value = !openLocales.value;
};
const isToken = ref('');
const open = ref(false);
const openGradation = ref(false);
const openGradationGrowth = ref(false);
const openTrackingTicker = ref(false);
const openFundingData = ref(false);
const openNotification = ref(false);


const toggleTeleport = () => {
  open.value = !open.value;
};
const toggleTeleportGradation = () => {
  openGradation.value = !openGradation.value;
};
const toggleTeleportGradationGrowth = () => {
  openGradationGrowth.value = !openGradationGrowth.value;
};
const toggleTrackingTicker = () => {
  openTrackingTicker.value = !openTrackingTicker.value;
};
const toggleFundingData = () => {
  openFundingData.value = !openFundingData.value;
};
const toggleNotification = () => {
  openNotification.value = !openNotification.value;
};

const lang = ref(localStorage.getItem('lang') === 'ru' ? 'RU' : 'EN')
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;
const tgHashData = tg.initData;
console.log(tgHashData);
const data = ref(null);
let connection;



const fundingData = computed(() => {
  try {
    return JSON.parse(data.value);
  } catch (e) {
    console.error("Failed to parse funding data:", e);
    return null;
  }
});


const lastUpdate = computed(() => {
  const lastUpdateTime = new Date(fundingData.value?.top_tickers?.last_update_time);
  
  if (isNaN(lastUpdateTime)) return { time: null, date: null };

  const hours = lastUpdateTime.getHours() % 12 || 12; 
  const minutes = lastUpdateTime.getMinutes().toString().padStart(2, '0'); 
  const formattedTime = `${hours}:${minutes}`;

  const day = lastUpdateTime.getDate().toString().padStart(2, '0');
  const month = (lastUpdateTime.getMonth() + 1).toString().padStart(2, '0'); 
  const year = lastUpdateTime.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  return {
    time: formattedTime,
    date: formattedDate
  };
});



onMounted(() => {
  lang.value = localStorage.getItem('lang') === 'ru' ? 'RU' : 'EN';

  axios
    .post("https://dsde1736.fornex.org/api/user/login_user", {
      data_check_string: tgHashData,
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data) + " response");
      localStorage.setItem('token', response.data.token);
      isToken.value = localStorage.getItem('token');
    })
    .catch(function (error) {
      console.error("There was an error!", error);
    });

  connection = new WebSocket(
    "wss://dsde1736.fornex.org/ws/top_5_fundings/12311233"
  );
  connection.onopen = function (event) {
    console.log(event);
    console.log("Connected!");
  };
  connection.onmessage = function (e) {
    data.value = e.data;
  };
});
onBeforeUnmount(() => {
  if (connection) {
    connection.close(1000, "Closing connection");
    console.log("WebSocket connection closed");
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header :UserName="user?.username" :lang="$t('lang')" @changeLocale="toggleTeleportLocale" />
    <div class="flex-grow z-1 py-4">
      <div class="flex gap-4 my-4">
        <menuItem :title="$t('homePage.impulsePrise')" @click="toggleTeleport">
          <template #icon>
            <PhPulse :size="24" />
          </template>
        </menuItem>
        <menuItem :title="$t('homePage.notificationSettings')" @click="toggleNotification">
          <template #icon>
            <notification />
          </template>
        </menuItem>
        <menuItem :title="$t('homePage.fundingRate')" @click="toggleFundingData">
          <template #icon>
            <PhPercent :size="24" />
          </template>
        </menuItem>
      </div>
      <div class="flex gap-4">
        <menuItem :title="$t('homePage.volumeGradation')" @click="toggleTeleportGradation">
          <template #icon>
            <PhChartBar :size="24" />
          </template>
        </menuItem>
        <menuItem :title="$t('homePage.growthGradation')" @click="toggleTeleportGradationGrowth">
          <template #icon>
            <PhChartLine :size="24" />
          </template>
        </menuItem>
        <menuItem :title="$t('homePage.tickerTracking')" @click="toggleTrackingTicker">
          <template #icon>
            <PhMagnifyingGlass :size="24" />
          </template>
        </menuItem>
      </div>
      <div class="my-4" @click="$router.push('/profile/premium')">
        <addPremium />
      </div>
      <p class="text-sm font-semibold">{{ $t('homePage.top24')}}</p>
      <div v-if="fundingData" class="flex justify-between">
        <p class="text-xs">{{ $t('homePage.lastUpdate')}}:</p>
        <div class="flex text-xs gap-1">
          <PhClock :size="16" /> {{lastUpdate.time}}
          <PhCalendarDots :size="16" /> {{lastUpdate.date}}
        </div>
      </div>
      <div class="my-4 mb-20">
        <tickerFunding v-if="data" :detail="data" />
      </div>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="open" class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">{{ $t('impulsePrise.title')}}</p>
              </div>

              <button @click="open = false">
                <PhX :size="21" />
              </button>
            </div>
            <ImpulseView />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="openGradation"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">{{ $t('gradationGrowth.title')}}</p>
              </div>
              <button @click="toggleTeleportGradation">
                <PhX :size="21" />
              </button>
            </div>
            <GradationView />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="openGradationGrowth"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">{{ $t('gradationActiveGrowth.title')}}</p>
              </div>
              <button @click="toggleTeleportGradationGrowth">
                <PhX :size="21" />
              </button>
            </div>
            <ActiveGrowthView />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="openTrackingTicker"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">{{ $t('tickerTracking.title')}}</p>
              </div>
              <button @click="openTrackingTicker = false">
                <PhX :size="21" />
              </button>
            </div>
            <trackingTickerView />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="openFundingData"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">{{ $t('fundingPage.title')}}</p>
              </div>
              <button @click="toggleFundingData">
                <PhX :size="21" />
              </button>
            </div>
            <FundingDataView />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="openNotification"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <PhBell :size="32" />
                <p class="font-bold text-sm">{{ $t('notifications')}}</p>
              </div>
              <button @click="toggleNotification">
                <PhX :size="21" />
              </button>
            </div>
            <NotificationView />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="openLocales"
            class="modal h-[60vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <PhList :size="32" />
                <p class="text-lg font-bold">{{ $t('localeModal.title')}}</p>
              </div>
              <button @click="openLocales = false">
                <PhX :size="21" />
              </button>
            </div>
            <LocalesView @submit="toggleTeleportLocale"/>
          </div>
        </transition>
      </Teleport>
    </div>
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4 px-4">
      <footerMenu />
    </footer>
  </div>
</template>
<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: transform 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateY(100%);
}

.modal-enter-to,
.modal-leave-from {
  transform: translateY(0);
}
</style>