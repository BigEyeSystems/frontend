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
const toggleFundingData = async () => {
    try {
        const response = await axios.get(
            "https://dsde1736.fornex.org/api/data/funding_data",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        showFundingData.value = !showFundingData.value;
        fundingData.value = response.data;
    }
    catch(error){
        console.log('Funding data ' + error );
    }
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
            <!-- {{ fundingData }} -->
            <div class="flex justify-center">
                <v-chart class="chart" :option="option" />
            </div>
            <div class="flex">
              <div class="flex gap-2 items-center">
                <div class="px-3 bg-[#33A721] text-sm font-semibold h-7">{{ fundingData?.positive_quantity }}</div>
                <p class="text-xs text-[#B8B8B8]">Кол-во положительных фандингов</p>
              </div>
              <div class="flex gap-2 items-center">
                <p class="px-3 bg-[#CA3140] text-sm font-semibold h-7">{{ fundingData?.negative_quantity }}</p>
                <p class="text-xs text-[#B8B8B8]">Кол-во отрицательных фандингов</p>
              </div>
              <div class="flex gap-2 items-center">
                <p class="px-3 bg-white text-sm font-semibold h-7">{{ fundingData?.neutral_quantity }}</p>
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