<script setup>
import ButtonView from "./button.vue";
import { ref, onMounted, onBeforeMount } from "vue";
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
    loading.value = true; // Set loading to true when starting data fetch
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
  try {
    const intervalValue =
      changeInterval.value !== null ? Number(changeInterval.value) : 0;

    if (isNaN(intervalValue) || intervalValue <= 0) {
      console.error("Invalid interval value.");
      return;
    }

    if (!tickerName.value.includes("USDT")) {
      tickerName.value += "USDT";
    }

    const setTickerResponse = await axios.post(
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

      const tickerHistoryResponse = await axios.get(
        `https://dsde1736.fornex.org/api/notify/get_ticker_tracking_history?tt_id=${tickerData.value?.conditions[0]?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      tickerHistory.value = tickerHistoryResponse.data;
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
</script>
<template>
  <div class="text-xs">
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
            <p
              v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']"
              :key="index"
              :class="{
                'bg-[#92FBDB] text-black font-semibold':
                  selectedActive === index,
                'bg-[#17181C]': selectedActive !== index,
              }"
              @click="selectActive(index, active)"
              class="w-full py-2 rounded cursor-pointer text-center"
            >
              {{ active }}
            </p>
          </div>
        </div>

        <div>
          <label>{{ $t("tickerTracking.alertsTimer") }}</label>
          <div class="flex gap-2 my-3">
            <p
              v-for="(interval, index) in [5, 15, 30, 60]"
              :key="index"
              :class="{
                'bg-[#92FBDB] text-black font-semibold':
                  selectedInterval === index,
                'bg-[#17181C]': selectedInterval !== index,
              }"
              @click="selectInterval(index, interval)"
              class="w-full py-2 rounded text-center cursor-pointer"
            >
              {{ interval }} {{ $t("impulsePrise.min") }}
            </p>
          </div>
        </div>

        <div class="my-4">
          <ButtonView :text="$t('tickerTracking.addTracker')" type="submit" />
        </div>
      </form>
    </div>

    <div v-if="showTrackingTicker">
      <ButtonView
        :text="$t('tickerTracking.addTracker')"
        :on-click="showAddTracker"
        class="my-4"
      />
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
          <button @click="editTracker">
            <PhNotePencil :size="24" />
          </button>
          <button @click="deleteTicker(selected_id)">
            <PhTrash :size="24" color="#ca3140" />
          </button>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="openAddTracker"
          class="modal h-[60vh] text-xs rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
        >
          <form @submit.prevent="toggleTrackingTicker">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <PhList :size="32" />
                <p class="text-lg font-bold">
                  {{ $t("tickerTracking.addTracker") }}
                </p>
              </div>
              <button type="button" @click="openAddTracker = false">
                <PhX :size="21" />
              </button>
            </div>

            <div class="mb-3">
              <p>{{ $t("tickerTracking.assetName") }}</p>
              <input
                v-model="tickerName"
                class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C] uppercase"
                type="text"
                @keyup.enter="toggleTrackingTicker"
              />

              <div class="flex gap-2 mt-3">
                <button
                  v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']"
                  :key="index"
                  :class="{
                    'bg-[#92FBDB] text-black font-semibold':
                      selectedActive === index,
                    'bg-[#17181C]': selectedActive !== index,
                  }"
                  @click="selectActive(index, active)"
                  type="button"
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
                  type="button"
                  class="w-full py-2 rounded"
                >
                  {{ interval }} {{ $t("impulsePrise.min") }}
                </button>
              </div>
            </div>

            <ButtonView
              :text="$t('tickerTracking.addTracker')"
              class="my-4"
              type="submit"
            />
          </form>
        </div>
      </transition>
    </Teleport>

    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="openEditTicker"
          class="modal h-[60vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white"
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
            <input
              v-model="tickerName"
              class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C] uppercase"
              type="text"
            />
            <div class="flex gap-2 mt-3">
              <button
                v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']"
                :key="index"
                :class="{
                  'bg-[#92FBDB] text-black font-semibold':
                    selectedActive === index,
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
