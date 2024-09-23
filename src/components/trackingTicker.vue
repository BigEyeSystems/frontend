<script setup>
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

import { useAssetTracking } from "../store/assetTracking.js";
import { storeToRefs } from "pinia";

const tickerStore = useAssetTracking();
const { deleteSelectedAsset } = tickerStore;

const tickerName = ref("");
const changeInterval = ref(null);
const settingStatus = ref(null);

const tickerData = ref(null);
const selected_id = ref(null);
const dataInterval = ref(null);
const tickerHistory = ref(null);
const selectedInterval = ref(null);
const selectedTicker = ref(null);
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

onMounted(async () => {
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
  if (tickerData.value?.conditions?.length > 0) {
    showTrackingTicker.value = true;
  }
});
const toggleTrackingTicker = async () => {
  const intervalValue =
    changeInterval.value !== null ? Number(changeInterval.value) : 0;

  if (isNaN(intervalValue)) {
    console.error("Invalid interval or percentage value.");
    return;
  }
  if (!tickerName.value.includes("USDT")) {
    tickerName.value += "USDT";
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
      settingStatus.value = response.data.status;
    })
    .catch((error) => {
      console.error(error);
    });
  if (settingStatus.value === "success") {
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
  }else{
    console.error("Failed to set ticker tracking.");
  }
  showTrackingTicker.value = true;
};
const updateTicker = async (id, time, ticker) => {
  try {
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/notify/get_ticker_tracking_history?tt_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    tickerHistory.value = response.data;
    dataInterval.value = time;
    selected_id.value = id;
    selectedTicker.value = ticker;
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
};
const deleteTicker = async (id) => {
  await deleteSelectedAsset(id);
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
};
</script>
<template>
  <div class="text-xs">
    <div v-if="!showTrackingTicker">
      <div class="mb-3">
        <p>{{ $t("tickerTracking.assetName") }}</p>
        <input
          v-model="tickerName"
          class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
          type="text"
        />
        <div class="flex gap-2 mt-3">
          <button
            v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']"
            :key="index"
            :class="{
              'bg-[#92FBDB] text-black font-semibold': selectedActive === index,
              'bg-[#17181C]': selectedActive !== index,
            }"
            @click="selectActive(index, active)"
            class="w-full py-2 rounded"
          >
            {{ active }}
          </button>
        </div>
      </div>
      <div>
        <p>{{ $t("tickerTracking.alertsTimer") }}</p>
        <div class="flex gap-2 my-3">
          <button
            v-for="(interval, index) in [5, 15, 30, 60]"
            :key="index"
            :class="{
              'bg-[#92FBDB] text-black font-semibold':
                selectedInterval === index,
              'bg-[#17181C]': selectedInterval !== index,
            }"
            @click="selectInterval(index, interval)"
            class="w-full py-2 rounded"
          >
            {{ interval }} {{ $t("impulsePrise.min") }}
          </button>
        </div>
      </div>
    </div>

    <ButtonView
      :text="$t('tickerTracking.addTracker')"
      :on-click="toggleTrackingTicker"
      class="my-4"
    />

    <div v-if="showTrackingTicker">
      <div class="flex text-xs border rounded border-[#2F2F2F99] mb-2">
        <button
          v-for="(condition, index) in tickerData.conditions"
          :key="index"
          :class="{
            'from-[#ffffff1f] to-[#ffffff12] bg-gradient-to-r rounded':
              selected_id === condition.id,
            'bg-transparent': selected_id !== condition.id,
          }"
          class="w-full focus:font-semibold focus:bg-gradient-to-r focus:from-[#ffffff1f] focus:to-[#ffffff12] py-1 px-2 focus:rounded"
          @click="updateTicker(condition.id, condition.time, condition.ticker)"
        >
          {{ condition.ticker }}
        </button>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-lg font-semibold">
          {{ selectedTicker }}
        </p>
        <div class="flex gap-3">
          <PhNotePencil :size="24" />
          <button @click="deleteTicker(selected_id)">
            <PhTrash :size="24" color="#ca3140" />
          </button>
        </div>
      </div>
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
