<script setup>
import ButtonView from "./button.vue";
import timeAndDate from "./UI/timeAndDate.vue";
import chipButton from "./UI/chipButton.vue";
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
import { ref, provide, onMounted } from "vue";
import { Skeleton } from "ant-design-vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });

use([
  GridComponent,
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  UniversalTransition,
]);
const option = ref(null);
const dayData = ref(true);
const weekData = ref(false);
const monthData = ref(false);
const intervalIndex = ref(7);
const isLoading = ref(false);
const showFundingData = ref(false);
const historyData = ref(null);
const fundingData = ref(null);
const reversedData = ref(null);
const showWeeklyData = async () => {
  dayData.value = false;
  weekData.value = true;
  monthData.value = false;
  intervalIndex.value = 7;
  try {
    isLoading.value = true;
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/data/funding_data?interval=${intervalIndex.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fundingData.value = response.data;
    showFundingData.value = true;
    option.value = {
      xAxis: {
        type: "category",
        data: fundingData.value.graph_data.time_interval,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: fundingData.value.graph_data.positive,
          type: "line",
        },
        {
          data: fundingData.value.graph_data.negative,
          type: "line",
        },
        {
          data: fundingData.value.graph_data.neutral,
          type: "line",
        },
      ],
    };
  } catch (error) {
    console.log("Funding data " + error);
  } finally {
    isLoading.value = false;
  }
};
const showMonthlyData = async () => {
  dayData.value = false;
  weekData.value = false;
  monthData.value = true;
  intervalIndex.value = 30;
  try {
    isLoading.value = true;
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/data/funding_data?interval=${intervalIndex.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fundingData.value = response.data;
    showFundingData.value = true;
    option.value = {
      xAxis: {
        type: "category",
        data: fundingData.value.graph_data.time_interval,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: fundingData.value.graph_data.positive,
          type: "line",
        },
        {
          data: fundingData.value.graph_data.negative,
          type: "line",
        },
        {
          data: fundingData.value.graph_data.neutral,
          type: "line",
        },
      ],
    };
  } catch (error) {
    console.log("Funding data " + error);
  } finally {
    isLoading.value = false;
  }
};
const showDailyData = async () => {
  dayData.value = true;
  weekData.value = false;
  monthData.value = false;
  intervalIndex.value = 1;
  try {
    isLoading.value = true;
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/data/funding_data?interval=${intervalIndex.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fundingData.value = response.data;
    showFundingData.value = true;
    option.value = {
      xAxis: {
        type: "category",
        data: fundingData.value.graph_data.time_interval,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: fundingData.value.graph_data.positive,
          type: "line",
        },
        {
          data: fundingData.value.graph_data.negative,
          type: "line",
        },
        {
          data: fundingData.value.graph_data.neutral,
          type: "line",
        },
      ],
    };
  } catch (error) {
    console.log("Funding data " + error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(async () => {
  try {
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/data/funding_data?interval=${intervalIndex.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fundingData.value = response.data;
    showFundingData.value = true;
    option.value = {
      xAxis: {
        type: "category",
        data: fundingData.value.graph_data.time_interval,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: fundingData.value.graph_data.positive,
          type: "line",
        },
        {
          data: fundingData.value.graph_data.negative,
          type: "line",
        },
        {
          data: fundingData.value.graph_data.neutral,
          type: "line",
        },
      ],
    };
  } catch (error) {
    console.log("Funding data " + error);
  }
  try {
    const responseHistory = await axios.get(
      "https://dsde1736.fornex.org/api/data/funding_data_history",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    historyData.value = responseHistory.data;
    reversedData.value = historyData.value.data.reverse();
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
});
const showDate = (timestamp) => {
  let dateObject = new Date(timestamp);
  let datePart = dateObject.toISOString().split("T")[0];
  let formattedDatePart = datePart.split("-").reverse().join(".");
  let timePart = dateObject.toTimeString().split(" ")[0].slice(0, 5);

  return {
    time: timePart,
    date: formattedDatePart
  };
};

</script>
<template>
  <div v-if="fundingData" class="text-xs">
    <ButtonView :text="$t('fundingPage.updateInfo')" class="my-3" />
    <div>
      <p class="mb-3">{{ $t('fundingPage.searchResult') }}</p>
      <div class="flex justify-between">
        <p class="text-xs">{{ $t('homePage.lastUpdate') }}:</p>
        <time-and-date />
      </div>
      <div class="flex gap-2 my-4 mx-1.5">
        <chip-button :is-active="dayData" @click="showDailyData">
          {{ $t('fundingPage.day') }}
        </chip-button>
        <chip-button :is-active="weekData" @click="showWeeklyData">
          {{ $t('fundingPage.week') }}
        </chip-button>
        <chip-button :is-active="monthData" @click="showMonthlyData">
          {{ $t('fundingPage.month') }}
        </chip-button>
      </div>
      <!-- <div v-if="fundingData && !isLoading" class="flex justify-center">
        <v-chart class="chart" :option="option" />
      </div> -->
      <div v-if="isLoading">
        <div class="w-full flex justify-center">
          <div class="shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-6 py-1">
                <div class="h-48 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2 items-center">
          <div class="px-3 bg-[#33A721] text-sm font-semibold h-5 flex items-center">
            {{ fundingData?.positive_quantity }}
          </div>
          <p class="text-xs text-[#B8B8B8]">{{ $t('fundingPage.positiveAmount') }}</p>
        </div>
        <div class="flex gap-2 items-center">
          <p class="px-3 bg-[#CA3140] text-sm font-semibold h-5 flex items-center">
            {{ fundingData?.negative_quantity }}
          </p>
          <p class="text-xs text-[#B8B8B8]">{{ $t('fundingPage.negativeAmount') }}</p>
        </div>
        <div class="flex gap-2 items-center">
          <p class="px-3 bg-white text-sm font-semibold h-5 flex items-center text-black">
            {{ fundingData?.neutral_quantity }}
          </p>
          <p class="text-xs text-[#B8B8B8]">{{ $t('fundingPage.neutralAmount') }}</p>
        </div>
      </div>
      <p class="my-4 text-sm font-semibold">{{ $t('fundingPage.history') }}</p>
      <div v-for="(data, index) in historyData.data" :key="index">

        <div class="flex justify-between">
          <p class="text-[#B8B8B8] text-xs">{{ $t('fundingPage.dateCreated') }}</p>
          <div class="flex items-center gap-1">
            <PhClock :size="16" />
            <p>{{ showDate(data.created).time }}</p>
            <PhCalendarDots :size="16" />
            <p>{{ showDate(data.created).date }}</p>
          </div>
        </div>
        <div class="flex flex-col gap-6 my-4 bg-[#17181C] px-3 py-4 rounded-lg">
          <div class="flex justify-between w-full">
            <p>{{ $t('fundingPage.positiveAmount') }}</p>
            <p>{{ data.positive_count }}</p>
          </div>
          <div class="flex justify-between w-full">
            <p>{{ $t('fundingPage.neutralAmount') }}</p>
            <p>{{ data.negative_count }}</p>
          </div>
          <div class="flex justify-between w-full">
            <p>{{ $t('fundingPage.neutralAmount') }}</p>
            <p>{{ data.neutral_count }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="w-full flex justify-center">
      <div class="shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-44 bg-slate-700 rounded"></div>
            <div class="grid grid-cols-4 gap-4">
              <div class="h-8 bg-slate-700 rounded col-span-1"></div>
              <div class="h-8 bg-slate-700 rounded col-span-1"></div>
              <div class="h-8 bg-slate-700 rounded col-span-1"></div>
              <div class="h-8 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div class="h-8 bg-slate-700 rounded"></div>
            <div class="grid grid-cols-4 gap-4">
              <div class="h-4 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div class="h-8 bg-slate-700 rounded"></div>
            <div class="grid grid-cols-4 gap-4">
              <div class="h-4 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div class="grid grid-cols-3 gap-10">
              <div class="h-3 bg-slate-700 rounded col-span-1"></div>
              <div class="h-3 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div class="h-8 bg-slate-700 rounded"></div>
            <div class="grid grid-cols-3 gap-10">
              <div class="h-3 bg-slate-700 rounded col-span-1"></div>
              <div class="h-3 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div class="h-8 bg-slate-700 rounded"></div>
            <div class="grid grid-cols-3 gap-10">
              <div class="h-3 bg-slate-700 rounded col-span-1"></div>
              <div class="h-3 bg-slate-700 rounded col-span-2"></div>
            </div>
            <div class="h-8 bg-slate-700 rounded"></div>
          </div>
        </div>
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
