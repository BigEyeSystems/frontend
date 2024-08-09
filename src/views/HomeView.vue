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
  PhX
} from "@phosphor-icons/vue";
import footerMenu from "@/components/footer.vue";
import addPremium from "@/components/addPremium.vue";
import ticker from "@/components/ticker.vue";
import ImpulseView from "./ImpulseView.vue";
import GradationView from "./GradationView.vue";
import ActiveGrowthView from "./ActiveGrowthView.vue";
import trackingTickerView from "./trackingTickerView.vue";
const open = ref(false);
const openGradation = ref(false);
const openGradationGrowth = ref(false);
const openTrackingTicker = ref(false);


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
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header UserName="John Doe" />
    <div class="flex-grow z-1 p-4">
      <div class="flex gap-4 my-4">
        <menuItems title="Импульсы цены" @click="toggleTeleport">
          <template #icon>
            <PhPulse :size="21" />
          </template>
        </menuItems>
        <menuItems title="Ваши уведомления">
          <template #icon>
            <PhBell :size="21" />
          </template>
        </menuItems>
        <menuItems title="Ставки финансирования">
          <template #icon>
            <PhPercent :size="21" />
          </template>
        </menuItems>
      </div>
      <div class="flex gap-4">
        <menuItems title="Градация объёмов" @click = "toggleTeleportGradation">
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
      <div class="my-4">
        <div class="text-xs flex justify-between mb-2">
          <p>Последние импульсы</p>
          <p>смотреть все</p>
        </div>
        <div class="flex justify-between mb-3">
          <p class="text-xs">Последнее обновление:</p>
          <div class="flex text-xs gap-1">
            <PhCclock :size="16" /> 12:03 <PhCalendarDots :size="16" /> 9.01.2024
          </div>
        </div>
        <ticker />
      </div>
      <Teleport to="body">
        <div v-if="open"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between">
          <p>Отслеживание импульсов цены</p>
          <button @click="open=false"><PhX :size="21" /></button>
        </div>
          <ImpulseView />
        </div>
      </Teleport>
      <Teleport to="body">
        <div v-if="openGradation"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between">
          <p>Градация активов по росту объёма</p>
          <button @click="toggleTeleportGradation"><PhX :size="21" /></button>
        </div>
          <GradationView />
        </div>
      </Teleport>
      <Teleport to="body">
        <div v-if="openGradationGrowth"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between">
          <p>Градация активов по росту цены</p>
          <button @click="toggleTeleportGradationGrowth"><PhX :size="21" /></button>
        </div>
          <ActiveGrowthView />
        </div>
      </Teleport>
      <Teleport to="body">
        <div v-if="openTrackingTicker"
          class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto"
        >
        <div class="flex justify-between">
          <p>Отслеживание актива</p>
          <button @click="toggleTrackingTicker"><PhX :size="21" /></button>
        </div>
          <trackingTickerView />
        </div>
      </Teleport>
    </div>
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4">
      <footerMenu class="w-[85vw]" />
    </footer>
  </div>
</template>

<style></style>
