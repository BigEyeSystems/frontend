<script setup>
import ButtonView from "./button.vue";
import axios from "axios";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from 'echarts/features';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  GridComponent,
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  UniversalTransition
]);
const dayData = ref(false);
const weekData = ref(false);
const monthData = ref(false);
const option = ref({
    xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    },
    {
      data: [100, 250, 140, 210, 190, 240, 120],
      type: 'line'
    },
    {
      data: [100, 120, 230, 210, 150, 195, 155],
      type: 'line'
    },
  ]
});
const showFundingData = ref(false);
const fundingData = ref(null);
const showWeeklyData = () => {
  dayData.value = false;
  weekData.value = true;
  monthData.value = false;
};
const showMonthlyData = () => {
  dayData.value = false;
  weekData.value = false;
  monthData.value = true;
};
const showDailyData = () => {
  dayData.value = true;
  weekData.value = false;
  monthData.value = false;
};
const toggleFundingData = async () => {
    // try {
    //     const response = await axios.get(
    //         "https://dsde1736.fornex.org/api/data/funding_data",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         }
    //     );
    //     fundingData.value = response.data;
    //     showFundingData.value = !showFundingData.value;
    // }
    // catch(error){
    //     console.log('Funding data ' + error );
    // }
    showFundingData.value = true;
};
</script>
<template>
    <div class="text-xs">
        <ButtonView v-if="!showFundingData" :text="'Получить информацию'" @click="toggleFundingData" class="my-3" />
        <ButtonView v-else :text="'Обновить информацию'" class="my-3" />
        <div v-if="showFundingData">
            <p class="mb-3">Результат запроса</p>
            <div class="flex justify-between">
                <p class="text-xs">Последнее обновление:</p>
                <div class="flex text-xs gap-1">
                    <PhClock :size="16" /> 12:03
                    <PhCalendarDots :size="16" /> 9.01.2024
                </div>
            </div>
            <div class="flex gap-2 mt-4">
              <button class="bg-[#17181C] p-2 w-full text-xs text-[#B8B8B8]" :class="[dayData ? 'bg-[#92FBDB] text-black font-semibold' : '']" @click="showDailyData">За день</button>
              <button class="bg-[#17181C] p-2 w-full text-xs text-[#B8B8B8]" :class="[weekData ? 'bg-[#92FBDB] text-black font-semibold' : '']" @click="showWeeklyData">За неделю</button>
              <button class="bg-[#17181C] p-2 w-full text-xs text-[#B8B8B8]" :class="[monthData ? 'bg-[#92FBDB] text-black font-semibold' : '']" @click="showMonthlyData">За месяц</button>
            </div>
            <div class="flex justify-center">
                <v-chart class="chart" :option="option" />
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex gap-2 items-center">
                <div class="px-3 bg-[#33A721] text-sm font-semibold h-4 flex items-center">{{ fundingData?.positive_quantity }}</div>
                <p class="text-xs text-[#B8B8B8]">Кол-во положительных фандингов</p>
              </div>
              <div class="flex gap-2 items-center">
                <p class="px-3 bg-[#CA3140] text-sm font-semibold h-4 flex items-center">{{ fundingData?.negative_quantity }}</p>
                <p class="text-xs text-[#B8B8B8]">Кол-во отрицательных фандингов</p>
              </div>
              <div class="flex gap-2 items-center">
                <p class="px-3 bg-white text-sm font-semibold h-4 flex items-center text-black">{{ fundingData?.neutral_quantity }}</p>
                <p class="text-xs text-[#B8B8B8]">Кол-во нейтральных фандингов</p>
              </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.chart {
  height: 350px;
  width: 350px;
}
</style>