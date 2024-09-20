<script setup>
import axios from "axios";
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const changeInterval = ref(null);
const changePercent = ref(null);
const selectedInterval = ref(null);
const selectedPercent = ref(null);
const showImpulse = ref(false);
const impulseData = ref(null);
const selectedImpulse = ref(null);
const showError = ref(false);
const openAddImpulse = ref(false);
const dataInterval = ref(null);
const dataPercent = ref(null);

const selectInterval = (index, interval) => {
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
    axios
      .post(
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
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    try {
      const response = await axios.get(
        "https://dsde1736.fornex.org/api/notify/get_impulse",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      selectedImpulse.value = response.data;
    } catch (error) {
      console.log("Error fetching data: " + error);
    }
    try {
      const response = await axios.get(
        `https://dsde1736.fornex.org/api/notify/get_impulse_history?impulse_id=${selectedImpulse.value?.impulses[2]?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      impulseData.value = response.data;
      showImpulse.value = true;
    } catch (error) {
      console.log("Error fetching data: " + error);
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
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
};
const deleteImpulse = async (id) => {
  try {
    const response = await axios.delete(
      `https://dsde1736.fornex.org/api/notify/delete_impulse?impulse_id=${id}`,
      {
        impulse_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
};
</script>

<template>
  <div class="text-xs">
    <div v-if="!showImpulse">
      <div class="mb-3">
        <p>{{ $t("impulsePrise.timeIntervalSelect") }}</p>
        <div class="flex gap-2 mt-3">
          <button v-for="(interval, index) in [1, 5, 15, 60]" :key="index" :class="{
            'bg-[#92FBDB] text-black font-semibold':
              selectedInterval === index,
            'bg-[#17181C]': selectedInterval !== index,
          }" @click="selectInterval(index, interval)" class="w-full py-2 rounded">
            {{ interval }} {{ $t("impulsePrise.min") }}
          </button>
        </div>
        <p v-if="showError">Fill all fields</p>
      </div>
      <div>
        <p>{{ $t("impulsePrise.enterPrice") }}</p>
        <input v-model="changePercent"
          class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
          type="number" min="5" placeholder="Search Here" />
        <p v-if="changePercent && changePercent < 5">bigger than 5 </p>
        <div class="flex gap-2 my-3">
          <button v-for="(percent, index) in [5, 10, 15, 20]" :key="index" :class="{
            'bg-[#92FBDB] text-black font-semibold':
              selectedPercent === index,
            'bg-[#17181C]': selectedPercent !== index,
          }" @click="selectPercent(index, percent)" class="w-full py-2 rounded">
            {{ percent }}%
          </button>
        </div>
      </div>
    </div>
    <ButtonView v-if="!showImpulse" :text="$t('impulsePrise.getInfo')" class="mt-4" @click="showImpulseData" />
    <div v-else>
      <ButtonView :text="$t('impulsePrise.addTracking')" class="my-3" @click="openAddImpulse = true" />
    </div>
    <div v-if="selectedImpulse" class="flex text-xs border rounded border-[#2F2F2F99] mb-2">
      <button v-for="(condition, index) in selectedImpulse.conditions" class="w-full focus:font-semibold focus:bg-gradient-to-r focus:from-[#ffffff1f] focus:to-[#ffffff12] py-1 px-2 focus:rounded" @click="updateImpulse(condition.id, condition.time, condition.percent)">
        {{ condition.time }} {{ $t("impulsePrise.min") }} /{{ condition.percent }} %
      </button>
    </div>
    <div class="flex justify-between items-center my-4">
      <p class="text-lg font-semibold">
        {{ dataInterval }} {{ $t("impulsePrise.min") }}/{{ dataPercent }}%
      </p>
      <div class="flex gap-3">
        <PhNotePencil :size="24" />
        <PhTrash :size="24" color="#ca3140"/>
      </div>
    </div>
    {{ impulseData }}

    <div v-if="showImpulse">
      <div class="mb-4">
        <p class="mb-3 text-sm font-semibold">
          {{ $t("fundingPage.history") }}
        </p>
        <div class="flex justify-between mb-4">
          <p class="text-xs">{{ $t("homePage.lastUpdate") }}:</p>
          <div class="flex text-xs gap-1">
            <PhClock :size="16" /> 12:03
            <PhCalendarDots :size="16" /> 9.01.2024
          </div>
        </div>
        <ticker :detail="impulseData?.impulses_history" />
      </div>
    </div>
    <Teleport to="body">
      <transition name="modal">
        <div v-if="openAddImpulse"
          class="modal h-[60vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
          <div class="flex justify-between mb-3">
            <div class="flex gap-3 items-center">
              <PhList :size="32" />
              <p class="text-lg font-bold">Добавить информацию</p>
            </div>
            <button @click="openAddImpulse = false">
              <PhX :size="21" />
            </button>
          </div>
          <div class="mb-3">
            <p>{{ $t("impulsePrise.timeIntervalSelect") }}</p>
            <div class="flex gap-2 mt-3">
              <button v-for="(interval, index) in [1, 5, 15, 60]" :key="index" :class="{
                'bg-[#92FBDB] text-black font-semibold':
                  selectedInterval === index,
                'bg-[#17181C]': selectedInterval !== index,
              }" @click="selectInterval(index, interval)" class="w-full py-2 rounded">
                {{ interval }} {{ $t("impulsePrise.min") }}
              </button>
            </div>
            <p v-if="showError">Fill all fields</p>
          </div>
          <div>
            <p>{{ $t("impulsePrise.enterPrice") }}</p>
            <input v-model="changePercent"
              class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
              type="number" min="5" placeholder="Search Here" />
            <p v-if="changePercent && changePercent < 5">bigger than 5 </p>
            <div class="flex gap-2 my-3">
              <button v-for="(percent, index) in [5, 10, 15, 20]" :key="index" :class="{
                'bg-[#92FBDB] text-black font-semibold':
                  selectedPercent === index,
                'bg-[#17181C]': selectedPercent !== index,
              }" @click="selectPercent(index, percent)" class="w-full py-2 rounded">
                {{ percent }}%
              </button>
            </div>
          </div>
          <ButtonView :text="$t('impulsePrise.getInfo')" class="mt-4" @click="showImpulseData" />
        </div>
      </transition>
    </Teleport>
  </div>
</template>
<style scoped>
.setting-border {
  border-bottom: 0.5px solid #4B4B4B;
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