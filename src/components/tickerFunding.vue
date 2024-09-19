<script setup>
import { ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 

const props = defineProps({
  detail: {
    type: String,
    required: true
  }
});

const fundingData = computed(() => {
  try {
    return JSON.parse(props.detail);
  } catch (e) {
    console.error("Failed to parse funding data:", e);
    return null;
  }
});

const revesedByVolume = computed(() => {
  return fundingData.value.top_tickers_by_volume.first_5.reverse();
});
const reversedFirstFive = computed(() => {
  return fundingData.value.top_tickers.first_5.reverse();
});

const showFundingByVolume = ref(true);
const showFundingFirstFive = ref(false);
const showFundingLastFive = ref(false);

const sortByVolume = () => {
  showFundingByVolume.value = true;
  showFundingFirstFive.value = false;
  showFundingLastFive.value = false;
};

const sortByFundingAsc = () => {
  showFundingFirstFive.value = true;
  showFundingByVolume.value = false;
  showFundingLastFive.value = false;
  console.log(fundingData.value);
};

const sortByFundingDesc = () => {
  showFundingLastFive.value = true;
  showFundingByVolume.value = false;
  showFundingFirstFive.value = false;
};
</script>



<template>
  <div class="rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C] p-3">
    <div class="flex text-xs justify-between border rounded border-[#2F2F2F99] mb-2" style="padding: 1px;">
      <button @click="sortByFundingAsc" class="focus:font-semibold focus:bg-gradient-to-r focus:from-[#ffffff1f] focus:to-[#ffffff12] py-1 px-2 focus:rounded" :class="[ showFundingFirstFive ? 'font-semibold bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded' : '']">
        {{ $t('top24.byFunding')}} (+)
      </button>
      <button @click="sortByVolume" class="focus:font-semibold focus:bg-gradient-to-r focus:from-[#ffffff1f] focus:to-[#ffffff12] py-1 px-2 focus:rounded" :class="[ showFundingByVolume ? 'font-semibold bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded' : '']">
        {{ $t('top24.byVolume')}}
      </button>
      <button @click="sortByFundingDesc" class="focus:font-semibold focus:bg-gradient-to-r focus:from-[#ffffff1f] focus:to-[#ffffff12] py-1 px-2 focus:rounded" :class="[ showFundingLastFive ? 'font-semibold bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded' : '']">
        {{ $t('top24.byFunding')}} (-)
      </button>
    </div>
    <div v-if="showFundingByVolume">
      <div v-if="fundingData && fundingData.top_tickers_by_volume && fundingData.top_tickers_by_volume.first_5">
        <div v-for="(item, index) in revesedByVolume" :key="index" class="text-xs mb-2">
          <div class="flex justify-between">
            <p>{{ item.symbol }}</p>
            <p>{{ item.quoteVolumeFormatted }}$</p>
          </div>
          <div class="flex justify-between pb-2">
            <p class="text-[#B8B8B8]">= {{ item.lastPrice }}$(<span :style="{ color: item.priceChangePercent > 0 ? 'green' : 'red' }">{{ parseFloat(item.priceChangePercent).toFixed(2) }}%</span>)</p>
            <p class="text-[#B8B8B8]">
              {{ $t('top24.5min')}} {{ item['5_min_value'] }}$
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="showFundingLastFive">
      <div v-if="fundingData && fundingData.top_tickers && fundingData.top_tickers.last_5">
        <div v-for="(item, index) in fundingData.top_tickers.last_5" :key="index" class="text-xs mb-2">
          <div class="flex justify-between">
            <p>{{ item.symbol }}</p>
            <p>{{ parseFloat(item.lastFundingRate).toFixed(4) }}%</p>
          </div>
          <div class="flex justify-between pb-2">
            <p class="text-[#B8B8B8]">= {{ item.markPrice }}$</p>
            <p class="text-[#B8B8B8]">
              {{ $t('top24.5min')}}
              <span :style="{ color: item['5_min_value'] > 0 ? 'green' : 'red' }">
                {{ parseFloat(item['5_min_value']).toFixed(4) }}%</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
          Loading...
      </div>
    </div>
    <div v-else-if="showFundingFirstFive">
      <div v-if="fundingData && fundingData.top_tickers && fundingData.top_tickers.first_5">
        <div v-for="(item, index) in reversedFirstFive" :key="index" class="text-xs mb-2">
          <div class="flex justify-between">
            <p>{{ item.symbol }}</p>
            <p>{{ parseFloat(item.lastFundingRate).toFixed(4) }}%</p>
          </div>
          <div class="flex justify-between pb-2">
            <p class="text-[#B8B8B8]">= {{ item.markPrice }}$</p>
            <p class="text-[#B8B8B8]">
              {{ $t('top24.5min')}}
              <span :style="{ color: item['5_min_value'] > 0 ? 'green' : 'red' }">
                {{ parseFloat(item['5_min_value']).toFixed(4) }}%</span>
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


