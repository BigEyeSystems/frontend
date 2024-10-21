<script setup>
import axios from "axios";
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import timeAndDate from "./UI/timeAndDate.vue";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useImpulse } from "../store/impulse.js";
import { storeToRefs } from "pinia";
import chipButton from "./UI/chipButton.vue";

const { t } = useI18n({ useScope: "global" });

const impulseStore = useImpulse();
const { selectedImpulse } = storeToRefs(impulseStore);
const { fetchImpulse, deleteSelectedImpulse } = impulseStore;

const changeInterval = ref(null);
const changePercent = ref(null);
const selectedInterval = ref(null);
const selectedPercent = ref(null);
const showImpulse = ref(false);
const impulseData = ref(null);
const showError = ref(false);
const openAddImpulse = ref(false);
const dataInterval = ref(null);
const dataPercent = ref(null);
const selected_id = ref(null);
const showHistory = ref(false);
const openEditImpulse = ref(false);
const loading = ref(false);

onMounted(async () => {
  await fetchImpulse();
  if (selectedImpulse.value?.conditions?.length > 0) {
    showImpulse.value = true;
    try {
      const response = await axios.get(
        `https://dsde1736.fornex.org/api/notify/get_impulse_history?impulse_id=${selectedImpulse.value?.impulses[0]?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      impulseData.value = response.data;
      showImpulse.value = true;
      if (selectedImpulse.value.conditions.length > 0) {
        const firstCondition = selectedImpulse.value.conditions[0];
        selected_id.value = firstCondition.id;
        dataInterval.value = firstCondition.time;
        dataPercent.value = firstCondition.percent;
        showHistory.value = true;
      }
    } catch (error) {
      console.log("Error fetching data: " + error);
    }
  } else {
    showImpulse.value = false;
  }
});

const selectInterval = (index, interval) => {
  console.log('clicked', index, interval)
  selectedInterval.value = index;
  changeInterval.value = interval;
};

const selectPercent = (index, percent) => {
  selectedPercent.value = index;
  changePercent.value = percent;
};
const showImpulseData = async () => {
  const intervalValue =
    changeInterval.value !== null ? Number(changeInterval.value) : 0;
  const percentValue =
    changePercent.value !== null ? Number(changePercent.value) : 0;

  if (isNaN(intervalValue) || isNaN(percentValue)) {
    console.error("Invalid interval or percentage value.");
    return;
  }

  if (changeInterval.value && changePercent.value) {
    loading.value = true;
    try {
      await axios.post(
        "https://dsde1736.fornex.org/api/notify/set_impulse",
        {
          interval: intervalValue,
          percentage: percentValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      changePercent.value = null;
      selectedInterval.value = null;
      selectedPercent.value = null;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await fetchImpulse();

      if (selectedImpulse.value?.status === 200) {
        try {
          const response = await axios.get(
            `https://dsde1736.fornex.org/api/notify/get_impulse_history?impulse_id=${selectedImpulse.value?.impulses[0]?.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          impulseData.value = response.data;
          showImpulse.value = true;
          loading.value = false;
          if (selectedImpulse.value.conditions.length > 0) {
            const firstCondition = selectedImpulse.value.conditions[0];
            selected_id.value = firstCondition.id;
            dataInterval.value = firstCondition.time;
            dataPercent.value = firstCondition.percent;
            showHistory.value = true;
          }
        } catch (error) {
          console.log("Error fetching data: " + error);
        }
      } else {
        console.log("Error fetching data: " + selectedImpulse.value?.status);
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    showError.value = true;
  }
};

const updateImpulse = async (id, time, percent) => {
  try {
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/notify/get_impulse_history?impulse_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    impulseData.value = response.data;
    dataInterval.value = time;
    dataPercent.value = percent;
    selected_id.value = id;
    showHistory.value = true;
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
};
const deleteImpulse = async (id) => {
  await deleteSelectedImpulse(id);
  await fetchImpulse();
  if (selectedImpulse.value.conditions.length > 0) {
    const firstCondition = selectedImpulse.value.conditions[0];
    selected_id.value = firstCondition.id;
    dataInterval.value = firstCondition.time;
    dataPercent.value = firstCondition.percent;
    showHistory.value = true;
  } else if (selectedImpulse.value.conditions.length === 0) {
    showImpulse.value = false;
    showHistory.value = false;
  }
};
const showEditImpulse = async () => {
  openEditImpulse.value = true;
};
const editImpulse = async (id, interval, percent) => {
  try {
    const response = await axios.patch(
      `https://dsde1736.fornex.org/api/notify/update_impulse?impulse_id=${id}`,
      {
        interval: interval,
        percentage: percent,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    changePercent.value = null;
    selectedInterval.value = null;
    selectedPercent.value = null;
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
  await fetchImpulse();
};
</script>

<template>
  <div class="text-xs">
    <div v-if="loading">
      <div class="w-full flex justify-center">
        <div class="shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-2 py-1">
              <div class="h-10 bg-slate-700 rounded"></div>
              <div class="h-8 bg-slate-700 rounded"></div>
              <div class="grid grid-cols-2 gap-16">
                <div class="h-4 bg-slate-700 rounded col-span-1"></div>
                <div class="h-4 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div class="flex-1 space-y-4 py-1">
                <div class="h-8 bg-slate-700 rounded"></div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="h-4 bg-slate-700 rounded col-span-2"></div>
                </div>
                <div class="grid grid-cols-3 gap-10">
                  <div class="h-3 bg-slate-700 rounded col-span-1"></div>
                  <div class="h-3 bg-slate-700 rounded col-span-2"></div>
                </div>
                <div class="h-8 bg-slate-700 rounded"></div>
                <div class="grid grid-cols-3 gap-10">
                  <div class="h-3 bg-slate-700 rounded col-span-1"></div>
                  <div class="h-3 bg-slate-700 rounded col-span-2"></div>
                </div>
                <div class="h-8 bg-slate-700 rounded"></div>
                <div class="grid grid-cols-3 gap-10">
                  <div class="h-3 bg-slate-700 rounded col-span-1"></div>
                  <div class="h-3 bg-slate-700 rounded col-span-2"></div>
                </div>
                <div class="h-8 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!showImpulse">
        <div class="mb-3">
          <p>{{ $t("impulsePrise.timeIntervalSelect") }}</p>
          <div class="flex gap-2 mt-3 px-1 mx-1.5">
            <chip-button v-for="(interval, index) in [1, 5, 15, 60]" :key="index" @click="selectInterval(index, interval)" :is-active="selectedInterval === index">
              {{ interval }} {{ $t("impulsePrise.min") }}
            </chip-button>
          </div>
          <p v-if="showError">{{ $t("impulsePrise.fillAllFields") }}</p>
        </div>
        <div>
          <p>{{ $t("impulsePrise.enterPrice") }}</p>
          <input v-model="changePercent"
            :class="{'input-error': changePercent && changePercent < 5}"
            class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
            type="number" min="5" placeholder="Search Here" />
          <p v-if="changePercent && changePercent < 5" class="text-sm text-red-600">{{ $t("impulsePrise.minimalPercent") }}</p>
          <div class="flex gap-2 my-3 mx-1.5">
            <chip-button v-for="(percent, index) in [5, 10, 15, 20]" :key="index" @click="selectPercent(index, percent)" :is-active="selectedPercent === index && changePercent === percent">
              {{ percent }}%
            </chip-button>
          </div>
        </div>
        <ButtonView :text="$t('impulsePrise.getInfo')" class="mt-4" @click="showImpulseData" />
      </div>

      <div v-if="showImpulse" class="text-xs rounded mb-2">
        <ButtonView :text="$t('impulsePrise.addTracking')" class="my-3" @click="openAddImpulse = true" />
        <div class="flex text-xs border rounded border-[#2F2F2F99] m-1.5 mx-2.5">
          <chip-button v-for="(condition, index) in selectedImpulse.conditions" :key="index" @click="updateImpulse(condition.id, condition.time, condition.percent)" :is-active="selected_id === condition.id">
            {{ condition.time }} {{ $t("impulsePrise.min") }} /
            {{ condition.percent }} %
          </chip-button>
        </div>
      </div>
      <div v-if="showImpulse" class="flex justify-between items-center my-4">
        <p class="text-lg font-semibold">
          {{ dataInterval }} {{ $t("impulsePrise.min") }}/{{ dataPercent }}%
        </p>
        <div class="flex gap-3">
          <button @click="showEditImpulse">
            <PhNotePencil :size="24" />
          </button>
          <button @click="deleteImpulse(selected_id)">
            <PhTrash :size="24" color="#ca3140" />
          </button>
        </div>
      </div>

    <div v-if="showHistory">
      <div class="mb-4">
        <p class="mb-3 text-sm font-semibold">
          {{ $t("fundingPage.history") }}
        </p>
        <div class="flex justify-between mb-4">
          <p class="text-xs">{{ $t("homePage.lastUpdate") }}:</p>
          <time-and-date />
        </div>
        <ticker :detail="impulseData?.impulses_history" />
      </div>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="openAddImpulse"
            class="modal h-[60vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <PhList :size="32" />
                <p class="text-lg font-bold">
                  {{ $t("impulsePrise.addInfo") }}
                </p>
              </div>
              <button @click="openAddImpulse = false">
                <PhX :size="21" />
              </button>
            </div>
            <div class="mb-3">
              <p>{{ $t("impulsePrise.timeIntervalSelect") }}</p>
              <div class="flex gap-2 mt-3">

                <chip-button v-for="(interval, index) in [1, 5, 15, 60]" :key="index" @click="selectInterval(index, interval)" :is-active="selectedInterval === index">
                  {{ interval }} {{ $t("impulsePrise.min") }}
                </chip-button>
              </div>
              <p v-if="showError" class="text-sm text-red-600">{{ $t("impulsePrise.fillAllFields") }}</p>
            </div>
            <div>
              <p>{{ $t("impulsePrise.enterPrice") }}</p>
              <input v-model="changePercent"
                :class="{'input-error': changePercent && changePercent < 5}"
                class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
                type="number" min="5" placeholder="Search Here" />
              <p v-if="changePercent && changePercent < 5" class="text-sm text-red-600">{{ $t("impulsePrise.minimalPercent") }}</p>
              <div class="flex gap-2 my-3 mx-1.5">
                <chip-button v-for="(percent, index) in [5, 10, 15, 20]" :key="index" @click="selectPercent(index, percent)" :is-active="selectedPercent === index">
                  {{ percent }}%
                </chip-button>
              </div>
            </div>
            <ButtonView :text="$t('impulsePrise.getInfo')" class="mt-4" @click="showImpulseData" />
          </div>
        </transition>
      </Teleport>
      <Teleport to="body">
        <transition name="modal">
          <div v-if="openEditImpulse"
            class="modal h-[60vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
            <div class="flex justify-between mb-3">
              <div class="flex gap-3 items-center">
                <PhList :size="32" />
                <p class="text-lg font-bold">
                  {{ $t("impulsePrise.editInfo") }}
                </p>
              </div>
              <button @click="openEditImpulse = false">
                <PhX :size="21" />
              </button>
            </div>
            <div class="mb-3">
              <p>{{ $t("impulsePrise.timeIntervalSelect") }}</p>
              <div class="flex gap-2 mt-3">
                <chip-button v-for="(interval, index) in [1, 5, 15, 60]" :key="index" :is-active="selectedInterval === index" @click="selectInterval(index, interval)">
                  {{ interval }} {{ $t("impulsePrise.min") }}
                </chip-button>
              </div>
              <p v-if="showError">{{ $t("impulsePrise.fillAllFields") }}</p>
            </div>
            <div>
              <p>{{ $t("impulsePrise.enterPrice") }}</p>
              <input v-model="changePercent"
                :class="{'input-error': changePercent && changePercent < 5}"
                class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
                type="number" min="5" placeholder="Search Here" />
              <p v-if="changePercent && changePercent < 5" class="text-sm text-red-600">{{ $t("impulsePrise.minimalPercent") }}</p>
              <div class="flex gap-2 my-3">
                <chip-button v-for="(percent, index) in [5, 10, 15, 20]" @click="selectPercent(index, percent)" :key="index" :is-active="selectedPercent === index">
                  {{ percent }}%
                </chip-button>
              </div>
            </div>
            <ButtonView :text="$t('impulsePrise.getInfo')" class="mt-4"
              @click="editImpulse(selected_id, changeInterval, changePercent)" />
          </div>
        </transition>
      </Teleport>
    </div>
  </div>
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
.input-error {
  border: 2px solid #da2828;
}

</style>
