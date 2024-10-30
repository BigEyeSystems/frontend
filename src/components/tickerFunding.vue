<script setup>
import { ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 
import chipButton from './UI/chipButton.vue';

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
};

const sortByFundingDesc = () => {
  showFundingLastFive.value = true;
  showFundingByVolume.value = false;
  showFundingFirstFive.value = false;
};
</script>



<template>
    <div class="flex text-[10px] justify-between rounded-full bg-[#303339] mb-2">
      <chip-button @click="sortByFundingAsc" :is-active="showFundingFirstFive">
        {{ $t('top24.byFunding')}} (+)
      </chip-button>
      <chip-button @click="sortByVolume" :is-active="showFundingByVolume">
        {{ $t('top24.byVolume')}}
      </chip-button>
      <chip-button @click="sortByFundingDesc" :is-active="showFundingLastFive">
        {{ $t('top24.byFunding')}} (-)
      </chip-button>
    </div>
    <div v-if="showFundingByVolume">
      <div v-if="fundingData && fundingData.top_tickers_by_volume && fundingData.top_tickers_by_volume.first_5">
        <div v-for="(item, index) in revesedByVolume" :key="index" class="flex justify-between items-center py-1 text-xs mb-2">
          <div class="flex flex-col justify-between">
            <p>{{ item.symbol }}</p>
            <p class="text-xs text-[#757575]">= {{ item.lastPrice }} $(<span>{{ parseFloat(item.priceChangePercent).toFixed(2) }}%</span>)</p>
          </div>
          <div class="flex justify-between pb-2">
            <p>{{ item.quoteVolumeFormatted }}$</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="showFundingLastFive">
      <div v-if="fundingData && fundingData.top_tickers && fundingData.top_tickers.last_5">
        <div v-for="(item, index) in fundingData.top_tickers.last_5" :key="index" class="flex justify-between items-center py-1 text-xs mb-2">
          <div class="flex flex-col justify-between">
            <p>{{ item.symbol }}</p>
            <p class="text-[#757575]">= {{ item.markPrice }}$</p>
          </div>
          <div class="flex justify-between pb-2">
            <p>{{ parseFloat(item.lastFundingRate).toFixed(4) }}%</p>
          </div>
        </div>
      </div>
      <div v-else>
          Loading...
      </div>
    </div>
    <div v-else-if="showFundingFirstFive">
      <div v-if="fundingData && fundingData.top_tickers && fundingData.top_tickers.first_5">
        <div v-for="(item, index) in reversedFirstFive" :key="index" class="flex justify-between items-center py-1 text-xs mb-2">
          <div class="flex flex-col justify-between">
            <p>{{ item.symbol }}</p>
            <p class="text-[#757575]">= {{ item.markPrice }}$
              <span>
                ({{ parseFloat(item['60_min_value']).toFixed(4) }}%)</span>
            </p>
          </div>
          <div class="flex justify-between pb-2">
            <p>{{ parseFloat(item.lastFundingRate).toFixed(4) }}%</p>
          </div>
        </div>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
</template>


