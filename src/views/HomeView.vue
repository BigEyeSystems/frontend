<script setup>
import axios from "axios";
import { onMounted, onBeforeUnmount, ref } from "vue";
import LocalesView from './LocalesView.vue';
import menuItems from "../components/menuItem.vue";
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



const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;
const tgHashData = tg.initData;
console.log(tgHashData);
const data = ref(null);
let connection;
onMounted(() => {
  axios
    .post("https://dsde1736.fornex.org/api/user/login_user", {
      data_check_string: tgHashData,
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data) + " response");
      localStorage.setItem('token', response.data.token);
      isToken.value = localStorage.getItem('token')
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
    <Header :UserName="user?.username" :lang="'RU'" @changeLocale="toggleTeleportLocale" />
    <div class="flex-grow z-1 py-4">
      <div class="flex gap-4 my-4">
        <menuItems :title="$t('homePage.impulsePrise')" @click="toggleTeleport">
          <template #icon>
            <PhPulse :size="21" />
          </template>
        </menuItems>
        <menuItems :title="$t('homePage.notificationSettings')" @click="toggleNotification">
          <template #icon>
            <PhBell :size="21" />
          </template>
        </menuItems>
        <menuItems :title="$t('homePage.fundingRate')" @click="toggleFundingData">
          <template #icon>
            <PhPercent :size="21" />
          </template>
        </menuItems>
      </div>
      <div class="flex gap-4">
        <menuItems :title="$t('homePage.volumeGradation')" @click="toggleTeleportGradation">
          <template #icon>
            <PhChartBar :size="21" />
          </template>
        </menuItems>
        <menuItems :title="$t('homePage.growthGradation')" @click="toggleTeleportGradationGrowth">
          <template #icon>
            <PhChartLine :size="21" />
          </template>
        </menuItems>
        <menuItems :title="$t('homePage.tickerTracking')" @click="toggleTrackingTicker">
          <template #icon>
            <PhMagnifyingGlass :size="21" />
          </template>
        </menuItems>
      </div>
      <div class="my-4">
        <addPremium />
      </div>
      <p class="text-sm font-semibold">{{ $t('homePage.top24')}}</p>
      <div class="flex justify-between">
        <p class="text-xs">{{ $t('homePage.lastUpdate')}}:</p>
        <div class="flex text-xs gap-1">
          <PhClock :size="12" /> 12:03
          <PhCalendarDots :size="16" /> 9.01.2024
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
                <p class="font-bold text-sm">Отслеживание импульсов цены</p>
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
                <p class="font-bold text-sm">Градация активов по росту объёма</p>
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
                <p class="font-bold text-sm">Градация активов по росту цены</p>
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
                <p class="font-bold text-sm">Отслеживание актива</p>
              </div>
              <button @click="toggleTrackingTicker">
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
                <p class="font-bold text-sm">Ставки финансирования</p>
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
                <p class="font-bold text-sm">Уведомления</p>
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
                <p class="text-lg font-bold">Смена языка</p>
              </div>
              <button @click="openLocales = false">
                <PhX :size="21" />
              </button>
            </div>
            <LocalesView />
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