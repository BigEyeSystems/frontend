<script setup>
import ButtonView from "../components/button.vue";
import chipButton from "@/components/UI/chipButton.vue";
import { useI18n } from "vue-i18n";
import { ref, onMounted, onBeforeMount, computed } from "vue";
const { t } = useI18n({ useScope: "global" });
import axios from "axios";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { GridComponent, TooltipComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  GridComponent,
  CanvasRenderer,
  LineChart,
  UniversalTransition,
  TooltipComponent,
]);
const tickerName = ref("");
const selectedActive = ref(null);
const selectedInterval = ref(null);
const changeInterval = ref(null);
const option = ref(null);
const dailyVolumeData = ref(null);
const dailyVolumeDate = ref(null);
const dateName = ref("");
const fileId = ref(null);
const isNotification = ref(false);

const selectInterval = (index, interval) => {
  selectedInterval.value = index;
  changeInterval.value = interval;
};

const extractDate = (datetimeStr) => {
  return datetimeStr.split("T")[0];
};

const toggleDailyAssetVolume = async () => {
  dateName.value = tickerName.value;
  if (!dateName.value.includes("USDT")) {
    dateName.value += "USDT";
  }
  try {
    const response = await axios.post(
      "https://dsde1736.fornex.org/api/data/analytics/volume_24hr?action=generate",
      {
        active_name: dateName.value,
        time_value: changeInterval.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dailyVolumeData.value = response.data.data;
    dailyVolumeDate.value = response.data;
    dailyVolumeData.value.time_interval =
      dailyVolumeData.value.time_interval.map((datetime) =>
        extractDate(datetime)
      );
    option.value = {
      tooltip: {
        trigger: "axis",
        formatter: (params) => {
          const rawDate = params[0].axisValue;
          const [year, month, day] = rawDate.split("-");
          const formattedDate = `${day}.${month}.${year}`;
          const value = params[0].data;
          const lineColor = params[0].color;
          const dateLabel = t("dailyVolume.date");
          const volumeLabel = t("dailyVolume.volume");
          return `${formattedDate} <br/>  <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${lineColor};margin-right:5px;"></span> ${volumeLabel}:  ${value}`;
        },
      },
      xAxis: {
        type: "category",
        data: dailyVolumeData.value.time_interval,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: "#FFFFFF",
          fontSize: 6,
        },
      },
      series: [
        {
          data: dailyVolumeData.value.volume_data,
          type: "line",
          encode: {
            x: "Year",
            y: "Income",
            itemName: "Year",
            tooltip: ["Income"],
          },
        },
      ],
    };
  } catch (error) {
    console.log(
      "Error fetching data: ",
      error.response ? error.response.data : error.message
    );
  }
  try {
    const response = await axios.post(
      "https://dsde1736.fornex.org/api/data/analytics/volume_24hr?action=send",
      {
        active_name: dateName.value,
        time_value: changeInterval.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fileId.value = response.data.file_id[0].file_id;
    fileId.value = String(fileId.value);
    console.log(typeof fileId.value);
  } catch (error) {
    console.log(
      "Error fetching data: ",
      error.response ? error.response.data : error.message
    );
  }
};

const formattedDate = computed(() => {
  if (!dailyVolumeDate.value || !dailyVolumeDate.value.last_update) {
    return "";
  }
  const lastUpdateDate = new Date(dailyVolumeDate.value.last_update);

  return `${lastUpdateDate.getDate()}.${
    lastUpdateDate.getMonth() + 1
  }.${lastUpdateDate.getFullYear()}`;
});
const downloadFile = async () => {
  try {
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/webhook/send_volume_24hr?file_id=${fileId.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    isNotification.value = true;
    setTimeout(() => {
      isNotification.value = false;
    }, 3000);
  } catch (error) {
    console.log(
      "Error fetching data: ",
      error.response ? error.response.data : error.message
    );
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
            <chipButton
              v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']"
              :key="index"
              :is-active="tickerName.trim().toUpperCase() === active"
              @click.prevent="tickerName = active"
              class="w-full py-2 rounded cursor-pointer text-center"
            >
              {{ active }}
            </chipButton>
          </div>
        </div>

        <div>
          <label>{{ $t("tickerTracking.alertsTimer") }}</label>
          <div class="flex gap-2 my-3">
            <chipButton
              v-for="(interval, index) in [5, 10, 20, 30]"
              :key="index"
              :is-active="selectedInterval === index"
              @click.prevent="selectInterval(index, interval)"
            >
              {{ interval }} {{ $t("tickerTracking.days") }}
            </chipButton>
          </div>
        </div>

        <div class="my-4">
          <ButtonView :text="$t('tickerTracking.addTracker')" type="submit" />
        </div>
      </form>
    </div>
    <div v-if="dailyVolumeData">
      <div class="flex justify-between mb-4">
        <p class="text-xs">{{ $t("homePage.lastUpdate") }}:</p>
        <div class="flex text-xs gap-1">
          <PhClock :size="16" /> 09:03 <PhCalendarDots :size="16" />
          {{ formattedDate }}
        </div>
      </div>
      <p class="mb-3">{{ $t("fundingPage.searchResult") }}</p>
      <div
        class="bg-[#17181C] p-2 rounded-xl cursor-pointer my-4 flex justify-between items-center active:opacity-80"
        @click="downloadFile"
      >
        <div class="flex gap-3 items-center">
          <div class="p-1 bg-[#797979] rounded">
            <PhFile :size="24" color="#fff" />
          </div>
          <p class="text-sm font-semibold">{{ changeInterval }}d_volume.csv</p>
        </div>
        <PhDownloadSimple :size="24" />
      </div>
      <div>
        <p>{{ $t("dailyVolume.forEntireTimeVolumeChanged") }}</p>
        <div v-if="dailyVolumeDate" class="flex mt-2">
          <div
            :class="[
              dailyVolumeDate.difference_percent > 0
                ? 'bg-[#33A721]'
                : 'bg-[#CA3140]',
            ]"
            class="flex p-1 rounded text-sm font-medium gap-1"
          >
            <p>
              <span v-if="dailyVolumeDate.difference_percent > 0">+</span
              >{{ Math.floor(dailyVolumeDate.difference_percent) }}%
            </p>
            <span
              v-if="dailyVolumeDate.difference_percent > 0"
              class="flex align-items-center"
            >
              <PhCaretUp :size="16" weight="fill" />
            </span>
            <span v-else class="flex align-items-center">
              <PhCaretDown :size="16" weight="fill" />
            </span>
          </div>
        </div>
        <div class="flex justify-center">
          <v-chart class="chart" :option="option" />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div
        v-if="isNotification"
        class="modal fixed inset-0 flex items-center justify-center z-50 px-4"
      >
        <transition name="modal">
          <div class="bg-[#222222b3] py-4 px-5 rounded-lg w-full">
            <div class="flex justify-end">
              <button
                @click="isNotification = false"
                class="bg-[#7474802e] p-2 rounded-full"
              >
                <PhX :size="21" />
              </button>
            </div>
            <p class="text-lg py-2 font-semibold text-center">
              {{ $t("gradationPage.fileSend") }}
            </p>
          </div>
        </transition>
      </div>
    </Teleport>
  </div>
</template>
<style scoped>
.chart {
  height: 360px;
  width: 100%;
}
</style>
