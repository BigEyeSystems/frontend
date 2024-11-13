<script setup>
import axios from "axios";
import { onMounted, onBeforeUnmount, ref, watch, computed } from "vue";
import {
  ImpulsePrice,
  NotificationSettings,
  FundingRate,
  VolumeGradation,
  GrowthGradation,
  Tracking,
  Fibonacci,
  Divergence
} from "@/components/icons/home-page";
import { Button } from '@/shared/ui';
import LocalesView from "./LocalesView.vue";
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
import DailyVolumeView from "./DailyVolumeView.vue";
import crown from "../components/icons/crown.vue";
import pen from "@/components/icons/pen.vue";
import trashRed from "@/components/icons/trash-red.vue";
import chipButton from "@/components/UI/chipButton.vue"; 
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const openLocales = ref(false);
const toggleTeleportLocale = () => {
  openLocales.value = !openLocales.value;
};
const isToken = ref("");
const open = ref(false);
const openGradation = ref(false);
const openGradationGrowth = ref(false);
const openTrackingTicker = ref(false);
const openFundingData = ref(false);
const openNotification = ref(false);
const openImbalance = ref(false);

const lang = ref(localStorage.getItem("lang") === "ru" ? "RU" : "EN");
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;
const tgHashData = tg.initData;
console.log(tgHashData);
const data = ref(null);
let connection;

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

const fundingData = computed(() => {
  try {
    return JSON.parse(data.value);
  } catch (e) {
    console.error("Failed to parse funding data:", e);
    return null;
  }
});

const lastUpdate = computed(() => {
  const lastUpdateTime = new Date(
    fundingData.value?.top_tickers?.last_update_time
  );

  if (isNaN(lastUpdateTime)) return { time: null, date: null };

  const hours = lastUpdateTime.getHours() % 12 || 12;
  const minutes = lastUpdateTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const day = lastUpdateTime.getDate().toString().padStart(2, "0");
  const month = (lastUpdateTime.getMonth() + 1).toString().padStart(2, "0");
  const year = lastUpdateTime.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  return {
    time: formattedTime,
    date: formattedDate,
  };
});

onMounted(() => {
  lang.value = localStorage.getItem("lang") === "ru" ? "RU" : "EN";

  axios
    .post("https://dsde1736.fornex.org/api/user/login_user", {
      data_check_string: tgHashData,
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data) + " response");
      localStorage.setItem("token", response.data.token);
      isToken.value = localStorage.getItem("token");
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

// Все равно нужно будет оптимизировать логику открытия окон (такая куча переменных для каждой модалки - некрасиво)
const menuItems = computed(() => [
  [
    {
      title: t("homePage.impulsePrice"),
      openFunc: toggleTeleport,
      icon: ImpulsePrice,
    },
    {
      title: t("homePage.dailyVolume"),
      openFunc: toggleNotification,
      icon: Divergence,
    },
    {
      title: t("homePage.fundingRate"),
      openFunc: toggleFundingData,
      icon: FundingRate,
    },
    {
      title: t("homePage.volumeGradation"),
      openFunc: toggleTeleportGradation,
      icon: VolumeGradation,
    }
  ],
  [
    {
      title: t("homePage.growthGradation"),
      openFunc: toggleTeleportGradationGrowth,
      icon: GrowthGradation,
    },
    {
      title: t("homePage.tickerTracking"),
      openFunc: toggleTrackingTicker,
      icon: Tracking,
    },
    {
      title: t("homePage.fibonacci"),
      openFunc: () => {},
      icon: Fibonacci,
      closed: true
    },
    {
      title: t('homePage.divergence'),
      openFunc: () => {},
      icon: Divergence,
      closed: true
    }
  ],
  [
    {
      title: t('homePage.imbalance'),
      openFunc: () => openImbalance.value = !openImbalance.value,
      icon: VolumeGradation,
      closed: false
    },
    {
      title: t('homePage.correlation'),
      openFunc: () => {},
      icon: GrowthGradation,
      closed: true
    },
    {
      title: t('homePage.liquid'),
      openFunc: () => {},
      icon: Tracking,
      closed: true
    },
  ]
]);

const timeframes = computed(() => [
  `4 ${t("shared.timeframe_hours")}`, t("fundingPage.day"), t("fundingPage.week"), t("fundingPage.month")
])
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header
      :UserName="user?.username"
      :lang="$t('lang')"
      @changeLocale="toggleTeleportLocale"
    />
    <div class="flex-grow z-1 py-4">
      <div class="mb-4" @click="$router.push('/profile/premium')">
        <addPremium />
      </div>
      <div v-for="(row, index) in menuItems" :key="index" class="grid gap-2 h-[90px] my-3 rounded-2xl" :class="[`grid-cols-${row.length}`, index === menuItems.length - 1 ? 'bg-none' : 'bg-[#222428]']">
        <menuItem
          v-for="(item, index) in row"
          :key="index"
          :title="item.title"
          :icon-component="item.icon"
          :is-closed="item.closed"
          @click="item.openFunc"
        />
      </div>
      <div class="rounded-t-xl bg-[#222428] p-2">
        <div class="flex w-full bg-[#303339] rounded-full mt-1">
          <chip-button :is-active="true">
            {{ $t("homePage.top24") }}
          </chip-button>
          <chip-button :is-active="false" :is-locked="true">
            {{ $t("homePage.lastImpulses") }}
          </chip-button>
        </div>
        <p class="text-sm font-semibold"></p>
        <div v-if="fundingData" class="my-3 flex justify-between items-center">
          <p class="text-xs text-[#B8B8B8]">{{ $t("homePage.lastUpdate") }}:</p>
          <div class="flex text-xs gap-1">
            <div class="flex items-center border border-[#303339] p-1.5 rounded-full gap-1">
              <PhClock :size="16" />
              <span>{{ lastUpdate.time }}</span>
            </div>
            <div class="flex items-center border border-[#303339] p-1.5 rounded-full gap-1">
              <PhCalendarDots :size="16" />
              <span>{{ lastUpdate.date }}</span>
            </div>
          </div>
        </div>
        <div class="mb-16">
          <tickerFunding v-if="data" :detail="data" />
          <button class="bg-[#303339] w-full p-3 rounded-2xl">{{ $t('homePage.reload') }}</button>
        </div>
      </div>
      <Teleport to="body">
        <transition name="modal">
          <div
            v-if="open"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
          >
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">{{ $t("impulsePrise.title") }}</p>
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
          <div
            v-if="openGradation"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
          >
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">
                  {{ $t("gradationGrowth.title") }}
                </p>
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
          <div
            v-if="openImbalance"
            class="modal h-[90vh] rounded-t-3xl bg-black flex flex-col items-center fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
          >
            <div class="flex justify-between mb-3 w-full">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">
                  {{ $t("homePage.imbalance") }}
                </p>
              </div>
              <button @click="openImbalance = false">
                <PhX :size="21" />
              </button>
            </div>
            <div class="w-full flex justify-between mt-1">
              <p class="text-sm text-start self-start">{{$t('shared.selectAsset')}}</p>
              <p class="text-sm text-start self-start text-gray-500">(3 {{$t('shared.maximum')}})</p>
            </div>
            <div class="mt-2 grid grid-cols-4 gap-2 w-full z-50">
              <chip-button v-for="(asset, index) in ['SPX', 'XAG', 'XAU', 'EU', 'GBP', 'NQ', 'BTC', 'DJI']" :key="index" :is-active="index === 0">
                {{asset}}
              </chip-button>
            </div>
            <p class="text-sm text-start self-start mt-4">{{$t('shared.selectTimeframe')}}</p>
            <div class="mt-2 grid grid-cols-4 gap-2 w-full z-50">
              <chip-button v-for="(asset, index) in timeframes" :key="index" :is-active="index === 0">
                {{asset}}
              </chip-button>
            </div>
            <p class="text-sm text-start self-start mt-4">{{$t('imbalance.conditions')}}</p>
            <div class="mt-2 grid grid-cols-3 gap-2 w-full z-50">
              <chip-button v-for="(asset, index) in ['0.5 FVG', 'Fullfill FVG', 'FVG']" :key="index" :is-active="index === 0">
                {{asset}}
              </chip-button>
            </div>
            <Button :text="`${$t('shared.addAsset')} +`" class="my-4" />
            <p class="text-base text-start self-start">{{ $t("shared.trackedAssets") }}</p>
            <div class="w-full flex flex-col gap-4 mt-4 p-4 rounded-xl bg-[#17181C]">
              <div class="flex items-center justify-between w-full">
                <span>DJI</span>
                <div class="flex items-center gap-2">
                  <pen class="w-5 h-5" />
                  <trash-red class="w-5 h-5" />
                </div>
              </div>
              <div class="w-full text-xs rounded-lg p-4 bg-[#2A2B2F] flex items-center justify-between">
                <span class="text-[#B8B8B8]">
                  {{ $t("imbalance.timeframe") }}
                </span>
                <span class="font-medium">
                  4 {{ $t("shared.timeframe_hours") }}
                </span>
              </div>
              <div class="w-full text-xs rounded-lg p-4 bg-[#2A2B2F] flex items-center justify-between">
                <span class="text-[#B8B8B8]">
                  {{ $t("imbalance.imbalance_conditions") }}
                </span>
                <span class="font-medium">
                  {{ $t("imbalance.fullfill_svg") }}
                </span>
              </div>
            </div>
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div
            v-if="openGradationGrowth"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
          >
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">
                  {{ $t("gradationActiveGrowth.title") }}
                </p>
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
          <div
            v-if="openTrackingTicker"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
          >
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">
                  {{ $t("tickerTracking.title") }}
                </p>
              </div>
              <button @click="openTrackingTicker = false">
                <PhX :size="21" />
              </button>
            </div>
            <trackingTickerView @close="toggleTrackingTicker" />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div
            v-if="openFundingData"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
          >
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <crown />
                <p class="font-bold text-sm">{{ $t("fundingPage.title") }}</p>
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
          <div
            v-if="openNotification"
            class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
          >
            <div class="flex justify-between mb-3">
              <!-- Открытие компонента перенесёно в header на колокольчик -->

              <div class="flex gap-3 items-center">
                <PhChartBarHorizontal :size="32" />
                <p class="font-bold text-sm">
                  {{ $t("dailyVolume.dailyAssetVolume") }}
                </p>
              </div>
              <button @click="toggleNotification">
                <PhX :size="21" />
              </button>
            </div>
            <DailyVolumeView />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div
            v-if="openLocales"
            class="modal h-[60vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
          >
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <PhList :size="32" />
                <p class="text-lg font-bold">{{ $t("localeModal.title") }}</p>
              </div>
              <button @click="openLocales = false">
                <PhX :size="21" />
              </button>
            </div>
            <LocalesView @submit="toggleTeleportLocale" />
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
