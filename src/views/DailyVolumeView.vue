<script setup>
import ButtonView from "../components/button.vue";
import { useI18n } from "vue-i18n";
import { ref, onMounted, onBeforeMount } from "vue";
const { t } = useI18n({ useScope: "global" });
import axios from "axios";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  GridComponent,
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  UniversalTransition,
]);
const tickerName = ref("");
const selectedActive = ref(null);
const selectedInterval = ref(null);
const changeInterval = ref(null);
const option = ref(null);
option.value = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
    },
  ],
};
const selectInterval = (index, interval) => {
  selectedInterval.value = index;
  changeInterval.value = interval;
};

const selectActive = (index, active) => {
  selectedActive.value = index;
  tickerName.value = active;
};
const toggleDailyAssetVolume = async () => {
  try {
    const response = await axios.post(
      "https://dsde1736.fornex.org/api/user/add_ticker",
      {
        active_name: tickerName,
        time_value: selectedInterval,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
};
</script>
<template>
  <div class="text-xs">
    <div>
      <form @submit.prevent="toggleDailyAssetVolume">
        <div class="mb-3">
          <label for="tickerName">{{ $t("tickerTracking.assetName") }}</label>
          <input
            id="tickerName"
            v-model="tickerName"
            class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C] uppercase"
            type="text"
          />
        </div>

        <div class="mb-3">
          <div class="flex gap-2 mt-3">
            <p
              v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']"
              :key="index"
              :class="{
                'bg-[#92FBDB] text-black font-semibold':
                  selectedActive === index,
                'bg-[#17181C]': selectedActive !== index,
              }"
              @click="selectActive(index, active)"
              class="w-full py-2 rounded cursor-pointer text-center"
            >
              {{ active }}
            </p>
          </div>
        </div>

        <div>
          <label>{{ $t("tickerTracking.alertsTimer") }}</label>
          <div class="flex gap-2 my-3">
            <p
              v-for="(interval, index) in [5, 10, 20, 30]"
              :key="index"
              :class="{
                'bg-[#92FBDB] text-black font-semibold':
                  selectedInterval === index,
                'bg-[#17181C]': selectedInterval !== index,
              }"
              @click="selectInterval(index, interval)"
              class="w-full py-2 rounded text-center cursor-pointer"
            >
              {{ interval }} д
            </p>
          </div>
        </div>

        <div class="my-4">
          <ButtonView :text="$t('tickerTracking.addTracker')" type="submit" />
        </div>
      </form>
    </div>
    <div class="flex justify-between mb-4">
      <p class="text-xs">{{ $t("homePage.lastUpdate") }}:</p>
      <div class="flex text-xs gap-1">
        <PhClock :size="16" /> 12:03 <PhCalendarDots :size="16" /> 9.01.2024
      </div>
    </div>
    <p class="mb-3">{{ $t("fundingPage.searchResult") }}</p>
    <div
      class="bg-[#17181C] p-2 rounded-xl cursor-pointer my-4 flex justify-between items-center active:opacity-80"
    >
      <div class="flex gap-3 items-center">
        <div class="p-1 bg-[#797979] rounded">
          <PhFile :size="24" color="#fff" />
        </div>
        <p class="text-sm font-semibold">
          <!-- {{ gradationActiveData?.file_name }} -->
          30d_volume.csv
        </p>
      </div>
      <PhDownloadSimple :size="24" />
    </div>
    <div>
      <p>{{ $t("dailyVolume.forEntireTimeVolumeChanged") }}</p>
      <div class="flex justify-center">
        <v-chart class="chart" :option="option" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.chart {
  height: 360px;
  width: 380px;
}
</style>
