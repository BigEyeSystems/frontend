<script setup>
import ButtonView from "./button.vue";
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
const dayData = ref(false);
const weekData = ref(true);
const monthData = ref(false);
const intervalIndex = ref(7);

const showFundingData = ref(false);
const historyData = ref(null);
const fundingData = ref(null);
const showWeeklyData = async () => {
  dayData.value = false;
  weekData.value = true;
  monthData.value = false;
  intervalIndex.value = 7;
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
};
const showMonthlyData = async () => {
  dayData.value = false;
  weekData.value = false;
  monthData.value = true;
  intervalIndex.value = 30;
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
};
const showDailyData = async () => {
  dayData.value = true;
  weekData.value = false;
  monthData.value = false;
  intervalIndex.value = 1;
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
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
});
const showDate = (timestamp) => {
  let dateObject = new Date(timestamp);
  let datePart = dateObject.toISOString().split("T")[0];
  let timePart = dateObject.toTimeString().split(" ")[0];
  return `${datePart} ${timePart}`;
};
</script>
<template>
  <div v-if="fundingData" class="text-xs">
    <ButtonView :text="'Обновить информацию'" class="my-3" />
    <div>
      <p class="mb-3">Результат запроса</p>
      <div class="flex justify-between">
        <p class="text-xs">Последнее обновление:</p>
        <div class="flex text-xs gap-1">
          <PhClock :size="16" /> 12:03 <PhCalendarDots :size="16" /> 9.01.2024
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button
          class="bg-[#17181C] p-2 w-full text-xs text-[#B8B8B8] rounded"
          :class="[dayData ? 'bg-[#92FBDB] text-black font-semibold' : '']"
          @click="showDailyData"
        >
          За день
        </button>
        <button
          class="bg-[#17181C] p-2 w-full text-xs text-[#B8B8B8] rounded"
          :class="[weekData ? 'bg-[#92FBDB] text-black font-semibold' : '']"
          @click="showWeeklyData"
        >
          За неделю
        </button>
        <button
          class="bg-[#17181C] p-2 w-full text-xs text-[#B8B8B8] rounded"
          :class="[monthData ? 'bg-[#92FBDB] text-black font-semibold' : '']"
          @click="showMonthlyData"
        >
          За месяц
        </button>
      </div>
      <div class="flex justify-center">
        <v-chart class="chart" :option="option" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2 items-center">
          <div
            class="px-3 bg-[#33A721] text-sm font-semibold h-4 flex items-center"
          >
            {{ fundingData?.positive_quantity }}
          </div>
          <p class="text-xs text-[#B8B8B8]">Кол-во положительных фандингов</p>
        </div>
        <div class="flex gap-2 items-center">
          <p
            class="px-3 bg-[#CA3140] text-sm font-semibold h-4 flex items-center"
          >
            {{ fundingData?.negative_quantity }}
          </p>
          <p class="text-xs text-[#B8B8B8]">Кол-во отрицательных фандингов</p>
        </div>
        <div class="flex gap-2 items-center">
          <p
            class="px-3 bg-white text-sm font-semibold h-4 flex items-center text-black"
          >
            {{ fundingData?.neutral_quantity }}
          </p>
          <p class="text-xs text-[#B8B8B8]">Кол-во нейтральных фандингов</p>
        </div>
      </div>
      <p class="my-4 text-sm font-semibold">История</p>
      <div v-for="(data, index) in historyData.data" :key="index">
        <div class="flex flex-col gap-6 my-4 bg-[#17181C] px-3 py-4 rounded-lg">
          <div class="flex justify-between">
            <p class="text-[#B8B8B8] text-xs">Дата создания</p>
            <p>{{ showDate(data.created) }}</p>
          </div>
          <div class="flex justify-between w-full">
            <p>Кол-во положительных фандингов:</p>
            <p>{{ data.positive_count }}</p>
          </div>
          <div class="flex justify-between w-full">
            <p>Кол-во отрицательных фандингов:</p>
            <p>{{ data.negative_count }}</p>
          </div>
          <div class="flex justify-between w-full">
            <p>Кол-во нейтральных фандингов:</p>
            <p>{{ data.neutral_count }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <data v-else>
    <div class="flex w-52 flex-col gap-4">
      <div class="skeleton h-32 w-full"></div>
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>
  </data>
</template>

<style scoped>
.chart {
  height: 350px;
  width: 350px;
}
</style>
