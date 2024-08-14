<script setup>
import { Alert } from "vue-tg";
import { ref } from "vue";
import menuItems from "../components/menuItem.vue";
import Header from "../components/Header.vue";
import tickerFunding from "@/components/tickerFunding.vue";
import {
  PhBell,
  PhPulse,
  PhMagnifyingGlass,
  PhPercent,
  PhChartBar,
  PhChartLine,
  PhClock,
  PhCalendarDots,
  PhX,
  PhCrownSimple
} from "@phosphor-icons/vue";
import footerMenu from "@/components/footer.vue";
import addPremium from "@/components/addPremium.vue";
import ImpulseView from "./ImpulseView.vue";
import GradationView from "./GradationView.vue";
import ActiveGrowthView from "./ActiveGrowthView.vue";
import trackingTickerView from "./trackingTickerView.vue";
import FundingDataView from "./FundingDataView.vue";
import NotificationView from "./NotificationView.vue";

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

console.log("Almaz is making test, dont be scared");
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header :UserName = "user?.username" />
    <div class="flex-grow z-1 p-4">
      <div class="flex gap-4 my-4">
        <menuItems title="Импульсы цены" @click="toggleTeleport">
          <template #icon>
            <PhPulse :size="21" />
          </template>
        </menuItems>
        <menuItems title="Ваши уведомления" @click="toggleNotification">
          <template #icon>
            <PhBell :size="21" />
          </template>
        </menuItems>
        <menuItems title="Ставки финансирования" @click="toggleFundingData">
          <template #icon>
            <PhPercent :size="21" />
          </template>
        </menuItems>
      </div>
      <div class="flex gap-4">
        <menuItems title="Градация объёмов" @click= "toggleTeleportGradation">
          <template #icon>
            <PhChartBar :size="21" />
          </template>
        </menuItems>
        <menuItems title="Рост активов" @click="toggleTeleportGradationGrowth">
          <template #icon>
            <PhChartLine :size="21" />
          </template>
        </menuItems>
        <menuItems title="Отслеживание актива" @click="toggleTrackingTicker">
          <template #icon>
            <PhMagnifyingGlass :size="21"/>
          </template>
        </menuItems>
      </div>
      <div class="my-4">
        <addPremium />
      </div>
      <p class="text-sm font-semibold">TOP 5 тикеры</p>
      <div class="flex justify-between">
        <p class="text-xs">Последнее обновление:</p>
        <div class="flex text-xs gap-1">
          <PhClock :size="16" /> 12:03 <PhCalendarDots :size="16" /> 9.01.2024
        </div>
      </div>
      <div class="my-4">
        <tickerFunding />
      </div>
      <Teleport to="body">
        <div v-if="open"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between mb-3">
          <div class="flex gap-3 items-center">
            <PhCrownSimple :size="32" color="#ffe500" weight="fill" />
            <p class="font-bold text-sm">Отслеживание импульсов цены</p>
          </div>

          <button @click="open=false"><PhX :size="21" /></button>
        </div>
          <ImpulseView />
        </div>
      </Teleport>
      <Teleport to="body">
        <div v-if="openGradation"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between mb-3">
          <div class="flex gap-3 items-center">
            <PhCrownSimple :size="32" color="#ffe500" weight="fill" />
            <p class="font-bold text-sm">Градация активов по росту объёма</p>
          </div>
          <button @click="toggleTeleportGradation"><PhX :size="21" /></button>
        </div>
          <GradationView />
        </div>
      </Teleport>
      <Teleport to="body">
        <div v-if="openGradationGrowth"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between mb-3">
          <div class="flex gap-3 items-center">
            <PhCrownSimple :size="32" color="#ffe500" weight="fill" />
            <p class="font-bold text-sm">Градация активов по росту цены</p>
          </div>
          <button @click="toggleTeleportGradationGrowth"><PhX :size="21" /></button>
        </div>
          <ActiveGrowthView />
        </div>
      </Teleport>
      <Teleport to="body">
        <div v-if="openTrackingTicker"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between mb-3">
          <div class="flex gap-3 items-center">
            <PhCrownSimple :size="32" color="#ffe500" weight="fill" />
            <p class="font-bold text-sm">Отслеживание актива</p>
          </div>
          <button @click="toggleTrackingTicker"><PhX :size="21" /></button>
        </div>
          <trackingTickerView />
        </div>
      </Teleport>
      <Teleport to="body">
        <div v-if="openFundingData"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between mb-3">
          <div class="flex gap-3 items-center">
            <PhCrownSimple :size="32" color="#ffe500" weight="fill" />
            <p class="font-bold text-sm">Ставки финансирования</p>
          </div>
          <button @click="toggleFundingData"><PhX :size="21" /></button>
        </div>
          <FundingDataView />
        </div>
      </Teleport>
      <Teleport to="body">
        <div v-if="openNotification"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between mb-3">
          <div class="flex gap-3 items-center">
            <PhBell :size="32"/>
            <p class="font-bold text-sm">Уведомления</p>
          </div>
          <button @click="toggleNotification"><PhX :size="21" /></button>
        </div>
          <NotificationView />
        </div>
      </Teleport>
    </div>
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4">
      <footerMenu class="w-[85vw]" />
    </footer>
  </div>
</template>

