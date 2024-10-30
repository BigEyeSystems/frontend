<script setup>
import autocompleteTicker from "./widgets/autocompleteTicker.vue";
import arrowUp from "./icons/arrowUp.vue";
import arrowDown from "./icons/arrow-down.vue";
import timeAndDate from "./UI/timeAndDate.vue";
import ButtonView from "./button.vue";
import chipButton from "./UI/chipButton.vue";
import { ref, onMounted, onBeforeMount, shallowRef, watch } from "vue";
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
const openAddTracker = ref(false);
const openEditTicker = ref(false);
const loading = ref(true);
const tickerData = ref(null);
const selected_id = ref(null);
const dataInterval = ref(null);
const tickerHistory = ref(null);
const selectedInterval = ref(null);
const selectedTicker = ref(null);
const isToggling = ref(false);
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

onBeforeMount(async () => {
  try {
    loading.value = true;
    const response = await axios.get(
      "https://dsde1736.fornex.org/api/notify/get_ticker_tracking",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    tickerData.value = response.data;
    if (tickerData.value?.conditions?.length > 0) {
      const firstCondition = tickerData.value.conditions[0];
      selected_id.value = firstCondition.id;
      dataInterval.value = firstCondition.time;
      selectedTicker.value = firstCondition.ticker;
      showTrackingTicker.value = true;
      openAddTracker.value = false;
      tickerName.value = "";
      changeInterval.value = null
      selectedInterval.value = null
    } else {
      showTrackingTicker.value = false;
    }
  } catch (error) {
    console.log("Error fetching data: " + error);
  } finally {
    loading.value = false;
  }
});

const toggleTrackingTicker = async () => {
  if (isToggling.value) return;
  isToggling.value = true;

  if (tickerName.value.trim().length < 1) {
    isToggling.value = false;
    return;
  }

  try {
    const intervalValue = changeInterval.value !== null ? Number(changeInterval.value) : 0;
    if (isNaN(intervalValue) || intervalValue <= 0) {
      console.error("Invalid interval value.");
      isToggling.value = false;
      return;
    }

    if (!tickerName.value.includes("USDT")) {
      tickerName.value += "USDT";
    }

    const setTickerResponse = await axios.post(
      "https://dsde1736.fornex.org/api/notify/set_ticker_tracking",
      {
        ticker_name: tickerName.value.toUpperCase(),
        time_period: intervalValue,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    settingStatus.value = setTickerResponse.data;

    if (settingStatus.value?.Success === 200) {
      const tickerDataResponse = await axios.get(
        "https://dsde1736.fornex.org/api/notify/get_ticker_tracking",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      tickerData.value = tickerDataResponse.data;
      showTrackingTicker.value = true;
      if (tickerData.value.conditions.length > 0) {
        const firstCondition = tickerData.value.conditions[0];
        selected_id.value = firstCondition.id;
        dataInterval.value = firstCondition.time;
        selectedTicker.value = firstCondition.ticker;
      }
    } else {
      console.error("Failed to set ticker tracking.");
    }
  } catch (error) {
    console.error("Error occurred: ", error);
  } finally {
    isToggling.value = false;
    openAddTracker.value = false;
  }
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
    changeInterval.value = null;
    tickerName.value = "";
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
    if (tickerData.value.conditions.length > 0) {
      const firstCondition = tickerData.value.conditions[0];
      selected_id.value = firstCondition.id;
      dataInterval.value = firstCondition.time;
      selectedTicker.value = firstCondition.ticker;
    } else if (tickerData.value.conditions.length === 0) {
      showTrackingTicker.value = false;
    }
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
};
const showAddTracker = () => {
  openAddTracker.value = true;
};
const editTracker = () => {
  openEditTicker.value = true;
};
const saveChanges = async (id, ticker, time) => {
  try {
    if (!ticker.includes("USDT")) {
      ticker += "USDT";
    }

    const response = await axios.patch(
      `https://dsde1736.fornex.org/api/notify/update_ticker_tracking?tt_id=${id}`,
      {
        ticker_name: ticker,
        time_period: time,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    changeInterval.value = null;
    tickerName.value = "";
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
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

const emit = defineEmits(["close"]);

const tickerHistoryData = ref(null)

const localDateWithOffset = (date) => {
  const utcDate = new Date(date);
  utcDate.setHours(utcDate.getHours() + 5);
  return utcDate;
};

async function getTickerTrackingHistory(){
  try {
    const { data } = await axios.get(`https://dsde1736.fornex.org/api/notify/get_ticker_tracking_history?tt_id=${selected_id.value}`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    tickerHistoryData.value = data.ticker_tracking_history
  } catch (error) {
    console.error('err in axi:', error);
  }
}

watch(selected_id, () => {
  getTickerTrackingHistory()
})
</script>
<template>
  <div class="text-xs">
    <div v-if="openAddTracker">
      <div class="mb-3">
        <p>{{ $t("tickerTracking.assetName") }}</p>
      
        <autocompleteTicker @set-value="(val) => tickerName = val" />
      
      </div>
      <div>
        <p>{{ $t("tickerTracking.alertsTimer") }}</p>
        <div class="flex gap-2 my-3 mx-1.5">
          <chip-button v-for="(interval, index) in [5, 15, 30, 60]" :key="index" @click="selectInterval(index, interval)" :is-active="selectedInterval === index">
            {{ interval }} {{ $t("impulsePrise.min") }}
          </chip-button>
        </div>
      </div>
      <div class="my-4">
        <ButtonView
          @click="toggleTrackingTicker"
          :text="$t('tickerTracking.addTracker')"
          type="submit"
          class="p-4"
        />
      </div>
    </div>

    <div v-if="!showTrackingTicker">
      <form @submit.prevent="toggleTrackingTicker">
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
            <chip-button v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']" :key="index" :is-active="tickerName.trim().toUpperCase() === active" @click="selectActive(index, active)">
              {{ active }}
            </chip-button>
          </div>
        </div>

        <div>
          <label>{{ $t("tickerTracking.alertsTimer") }}</label>
          <div class="flex gap-2 my-3 mx-1.5">
            <chip-button v-for="(interval, index) in [5, 15, 30, 60]" :key="index" :is-active="selectedInterval === index" @click="selectInterval(index, interval)">
              {{ interval }} {{ $t("impulsePrise.min") }}
            </chip-button>
          </div>
        </div>

        <div class="my-4">
          <ButtonView
            :text="$t('tickerTracking.addTracker')"
            type="submit"
          />
        </div>
      </form>
    </div>

    <div v-if="showTrackingTicker">
      <ButtonView
        @click="openAddTracker = !openAddTracker"
        :text="
          openAddTracker
            ? $t('tickerTracking.closeModalTracker')
            : $t('tickerTracking.addTracker')
        "
        class="my-4"
        :class="
          openAddTracker ? 'bg-black text-white border border-[#92FBDB]' : ''
        "
        type="submit"
      />
      <div class="flex text-xs border rounded border-[#2F2F2F99] mb-2 mx-2">
        <chip-button v-for="(condition, index) in tickerData.conditions" @click="updateTicker(condition.id, condition.time, condition.ticker)" :key="index" :is-active="selected_id === condition.id">
          {{ condition.ticker }}
        </chip-button>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-lg font-semibold">
          {{ selectedTicker }}
        </p>
        <div class="flex gap-3">
          <button @click="editTracker">
            <PhNotePencil :size="24" />
          </button>
          <button @click="deleteTicker(selected_id)">
            <PhTrash :size="24" color="#ca3140" />
          </button>
        </div>
      </div>

      <div v-for="(history, index) in tickerHistoryData" :key="index" class="mt-5">
        <div class="flex justify-between">
          <p class="text-xs">{{ $t('homePage.lastUpdate') }}:</p>
          <time-and-date :date="localDateWithOffset(history.date)" />
        </div>
        <!-- Доделать i18n, разобраться с интервалом времени -->
        <div class="w-full h-auto flex flex-col items-center mt-4 p-2 bg-[#17181C] rounded-xl">
          <div class="flex w-full justify-between items-center">
            <h3 class="text-base font-semibold">{{ selectedTicker }}</h3>
            <div class="flex text-[#B8B8B8] text-xs gap-1">
              <PhClock :size="16" />
              <!-- <span>15 {{ $t('tickerTracking.minutes') }}</span> -->
            </div>
          </div>
          <div class="flex w-full justify-between items-baseline text-xs mt-2 pb-4 border-b border-[#4B4B4B]">
            <span class="text-[#B8B8B8]">{{ $t("tickerTracking.currentPrice") }}:</span>
            <div class="flex flex-col items-end gap-1 text-sm">
              <span class="my-1.5">{{ history.params.current_price }}$</span>
              <div class="flex items-center w-auto gap-2">
                <!-- <span>за 15 мин</span> -->
                <div v-if="history.params.price_change >= 0" class="flex items-center text-sm p-1 bg-[#33A721] rounded-xl">
                  <span>+ {{ history.params.price_change }}%</span>
                  <arrowUp />
                </div>
                <div v-else class="flex items-center text-sm p-1 bg-[#CA3140] rounded-xl">
                  <span>{{ history.params.price_change }}%</span>
                  <arrowDown />
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full justify-between items-baseline text-xs py-4 border-b border-[#4B4B4B]">
            <span class="text-[#B8B8B8]">{{ $t("tickerTracking.currentVolume") }}:</span>
            <div class="flex flex-col items-end gap-1 text-sm">
              <span class="my-1.5">{{ history.params.current_volume }}$</span>
              <div class="flex items-center w-auto gap-2">
                <!-- <span>за 15 мин</span> -->
                <div v-if="history.params.volume_change >= 0" class="flex items-center text-sm p-1 bg-[#33A721] rounded-xl">
                  <span>+ {{ history.params.volume_change }}%</span>
                  <arrowUp />
                </div>
                <div v-else class="flex items-center text-sm p-1 bg-[#CA3140] rounded-xl">
                  <span>{{ history.params.volume_change }}%</span>
                  <arrowDown />
                </div>
              </div>
            </div>
          </div>
          <div class="flex w-full justify-between items-baseline text-xs py-4 border-b border-[#4B4B4B]">
            <span class="text-[#B8B8B8]">{{ $t("tickerTracking.topBy") }} %:</span>
            <span class="my-1.5">{{ history.params.top_place }} {{ $t("tickerTracking.place") }}</span>
          </div>
          <div class="flex w-full justify-between items-baseline text-xs pt-4">
            <span class="text-[#B8B8B8]">{{ $t("tickerTracking.financingRate") }}:</span>
            <div class="flex flex-col items-end gap-1 text-sm">
              <span>{{ history.params.current_funding_rate }}%</span>
              <span>{{ history.params.funding_rate_change }}%</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="openEditTicker"
          class="modal h-[90vh] text-xs rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
        >
          <div class="flex justify-between mb-3">
            <div class="flex gap-3 items-center">
              <PhList :size="32" />
              <p class="text-sm font-bold">
                {{ $t("impulsePrise.editInfo") }} - {{ selectedTicker }}
              </p>
            </div>
            <button @click="openEditTicker = false">
              <PhX :size="21" />
            </button>
          </div>
          <div class="mb-3">
            <p>{{ $t("tickerTracking.assetName") }}</p>
            
            <autocompleteTicker @set-value="(val) => tickerName = val" />

          </div>
          <div>
            <p>{{ $t("tickerTracking.alertsTimer") }}</p>
            <div class="flex gap-2 my-3 mx-1.5">
              <chip-button v-for="(interval, index) in [5, 15, 30, 60]" :key="index" @click="selectInterval(index, interval)" :is-active="selectedInterval === index">
                {{ interval }} {{ $t("impulsePrise.min") }}
              </chip-button>
            </div>
          </div>
          <ButtonView
            :text="$t('tickerTracking.addTracker')"
            @click="saveChanges(selected_id, tickerName, changeInterval)"
            class="my-4"
          />
        </div>
      </transition>
    </Teleport>
  </div>
</template>
<style scoped>
.setting-border {
  border-bottom: 0.5px solid #4b4b4b;
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateY(100%);
}

.modal-enter-to,
.modal-leave-from {
  transform: translateY(0);
}
</style>
