<script setup>
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import { ref } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 

const tickerName = ref('');
const changeInterval = ref(null);

const tickerData = ref(null);
const selectedInterval = ref(null);
const selectInterval = (index, interval) => {
  selectedInterval.value = index;
  changeInterval.value = interval;
};

const selectedActive = ref(null);
const selectActive = (index, active) => {
    selectedActive.value = index;
    tickerName.value = active;
};
const showTrackingTicker = ref(false);
const toggleTrackingTicker = async () => {
  const intervalValue =
    changeInterval.value !== null ? Number(changeInterval.value) : 0;

  if (isNaN(intervalValue)) {
    console.error("Invalid interval or percentage value.");
    return;
  }

  axios
    .post(
      "https://dsde1736.fornex.org/api/notify/set_ticker_tracking",
      {
        ticker_name: tickerName.value,
        time_period: intervalValue,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    try {
    const response = await axios.get(
      "https://dsde1736.fornex.org/api/notify/get_ticker_tracking",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    tickerData.value = response.data;
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
  showTrackingTicker.value = true;
};
</script>
<template>
  <div class="text-xs">
    <div v-if="!showTrackingTicker">
      <div class="mb-3">
        <p>{{ $t('tickerTracking.assetName')}}</p>
        <input v-model="tickerName" class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]" type="text" />
        <div class="flex gap-2 mt-3">
          <button v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']" :key="index" :class="{
            'bg-[#92FBDB] text-black font-semibold': selectedActive === index,
            'bg-[#17181C]': selectedActive !== index
          }" @click="selectActive(index, active)" class="w-full py-2 rounded">
            {{ active }}
          </button>
        </div>
      </div>
      <div>
        <p>{{ $t('tickerTracking.alertsTimer')}}</p>
        <div class="flex gap-2 my-3">
          <button
            v-for="(interval, index) in [5, 15, 30, 60]"
            :key="index"
            :class="{
              'bg-[#92FBDB] text-black font-semibold': selectedInterval === index,
              'bg-[#17181C]': selectedInterval !== index
            }"
            @click="selectInterval(index, interval)"
            class="w-full py-2 rounded"
          >
            {{ interval }} {{ $t('impulsePrise.min')}} 
          </button>
        </div>
      </div>
    </div>

    <ButtonView :text="$t('tickerTracking.addTracker')" :on-click="toggleTrackingTicker" class="my-4" />
    {{tickerData}}
    <div v-if="showTrackingTicker">
      <!-- <div class="mb-4">
        <ticker />
      </div>
      <div class="mb-4">
        <ticker />
      </div>
      <div>
        <ticker />
      </div> -->
    </div>
  </div>
</template>
