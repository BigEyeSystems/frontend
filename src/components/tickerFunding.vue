<template>
  <div class="rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C] p-3">
    <div class="flex text-xs justify-between border p-1 rounded border-[#2F2F2F99]">
      <button @click="sortByVolume" class="hover:font-semibold">
        По объему
      </button>
      <button @click="sortByFundingAsc" class="hover:font-semibold">
        По фандингу (+)
      </button>
      <button @click="sortByFundingDesc" class="hover:font-semibold">
        По фандингу (-)
      </button>
    </div>
    <div v-if="showFundingByVolume">
      <div v-for="(item, index) in data" :key="index" class="text-xs">
        <div class="flex justify-between">
          <p>{{ item.name }}</p>
          <p>{{ item.amount }}$</p>
        </div>
        <div class="flex justify-between pb-2">
          <p class="text-[#B8B8B8]">= {{ item.value }}$</p>
          <p class="text-[#B8B8B8]">
            5 мин назад:
            <span :style="{ color: item.change > 0 ? 'green' : 'red' }">
              {{ item.change }}%</span>
          </p>
        </div>
      </div>
    </div>
    <div v-else-if="showFundingFirstFive">
      <div v-if="fundingData && fundingData.top_tickers && fundingData.top_tickers.last_5">
        <div v-for="(item, index) in fundingData.top_tickers.last_5" :key="index" class="text-xs">
          <div class="flex justify-between">
            <p>{{ item.symbol }}</p>
            <p>{{ item.fundingRate }}$</p>
          </div>
          <div class="flex justify-between pb-2">
            <p class="text-[#B8B8B8]">= {{ item.fundingTime }}$</p>
            <p class="text-[#B8B8B8]">
              5 мин назад:
              <span :style="{ color: item.markPrice > 0 ? 'green' : 'red' }">
                {{ item.markPrice }}%</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
          Loading...
      </div>
    </div>
    <div v-else-if="showFundingLastFive">
      <div v-if="fundingData && fundingData.top_tickers && fundingData.top_tickers.first_5">
        <div v-for="(item, index) in fundingData.top_tickers.first_5" :key="index" class="text-xs">
          <div class="flex justify-between">
            <p>{{ item.symbol }}</p>
            <p>{{ item.fundingRate }}$</p>
          </div>
          <div class="flex justify-between pb-2">
            <p class="text-[#B8B8B8]">= {{ item.fundingTime }}$</p>
            <p class="text-[#B8B8B8]">
              5 мин назад:
              <span :style="{ color: item.markPrice > 0 ? 'green' : 'red' }">
                {{ item.markPrice }}%</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
          Loading...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
});
const fundingData = JSON.parse(props.detail);
const showFundingByVolume = ref(true);
const showFundingFirstFive = ref(false);
const showFundingLastFive = ref(false);
const data = [
  {
    name: "1000pepeusdt",
    amount: "-1.7243%",
    value: "0.0080104$ (+25.8%)",
    change: 2.3,
  },
  {
    name: "1000pepeusdt",
    amount: "-1.7243%",
    value: "0.0080104$ (+25.8%)",
    change: 2.3,
  },
  {
    name: "1000pepeusdt",
    amount: "-1.7243%",
    value: "0.0080104$ (+25.8%)",
    change: 2.3,
  },
  {
    name: "1000pepeusdt",
    amount: "-1.7243%",
    value: "0.0080104$ (+25.8%)",
    change: 2.3,
  },
  {
    name: "1000pepeusdt",
    amount: "-1.7243%",
    value: "0.0080104$ (+25.8%)",
    change: 2.3,
  },
],
  sortByVolume = () => {
    showFundingByVolume.value = true;
    showFundingFirstFive.value = false;
    showFundingLastFive.value = false;
  },
  sortByFundingAsc = () => {
    showFundingFirstFive.value = true;
    showFundingByVolume.value = false;
    showFundingLastFive.value = false;
    console.log(fundingData);
  },
  sortByFundingDesc = () => {
    showFundingLastFive.value = true;
    showFundingByVolume.value = false;
    showFundingFirstFive.value = false;
  };
</script>

<style scoped>
div {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}
</style>
