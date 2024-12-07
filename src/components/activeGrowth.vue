<script setup>
import ButtonView from "./button.vue";
import timeAndDate from "./UI/timeAndDate.vue";
import chipButton from "./UI/chipButton.vue";
import { ref } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });

const fileInterval = ref(30);
const selectedInterval = ref(null);
const selectInterval = (index, interval) => {
  selectedInterval.value = index;
  fileInterval.value = interval;
};
const gradationActiveData = ref(null);
const historyData = ref(null);
const showGradationGrowth = ref(false);
const isNotification = ref(false);

const toggleGradationGrowth = async () => {
  showGradationGrowth.value = true;
  try {
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/data/gradation_growth?interval=${fileInterval.value}&growth_type=Price`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    gradationActiveData.value = response.data;
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
  try {
    const responseHistory = await axios.get(
      "https://dsde1736.fornex.org/api/data/gradation_growth_history?growth_type=Price",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    historyData.value = responseHistory.data;
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
};
const downloadGradationGrowthFile = async (id) => {
  try {
    const response = await axios.get(
      `https://dsde1736.fornex.org/api/webhook/send_growth_data?file_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "text",
      }
    );
    isNotification.value = true;
    setTimeout(() => {
      isNotification.value = false;
    }, 3000);
  } catch (error) {
    console.log("Error downloading data: " + error);
  }
};
const formatTime = (time) => {
  return time.substring(0, 5);
}
const formattedDate = (date) => {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
</script>
<template>
  <div class="text-xs">
    <div v-if="!showGradationGrowth">
      <div class="mb-3">
        <p>{{ $t('gradationActiveGrowth.selectInterval') }}</p>
        <div class="flex gap-2 mt-3">
          <chip-button v-for="(interval, index) in [5, 30, 60, 4]" :key="index" :is-active="selectedInterval === index" @click="selectInterval(index, interval)">
            <p v-if="interval !== 4">{{ interval }} {{ $t('impulsePrise.min') }}</p>
            <p v-else>{{ interval }} {{ $t('gradationGrowth.hour') }}</p>
          </chip-button>
        </div>
      </div>
    </div>
    <ButtonView v-if="!showGradationGrowth" :text="$t('impulsePrise.getInfo')" :on-click="toggleGradationGrowth"
      class="my-3" />
    <div v-else>
      <div class="flex gap-2 mt-3">
        <chip-button v-for="(interval, index) in [5, 30, 60, 4]" :key="index" :is-active="selectedInterval === index" @click="selectInterval(index, interval)">
          <p v-if="interval !== 4">{{ interval }} {{ $t('impulsePrise.min') }}</p>
          <p v-else>{{ interval }} {{ $t('gradationGrowth.hour') }}</p>
        </chip-button>
      </div>
      <ButtonView :text="$t('fundingPage.updateInfo')" class="my-3" />
    </div>

    <div v-if="showGradationGrowth">
      <div v-if="gradationActiveData">
        <p class="mb-3">{{ $t('fundingPage.searchResult') }}</p>
        <div class="flex justify-between">
          <p class="text-xs">{{ $t('homePage.lastUpdate') }}:</p>
          <time-and-date />
        </div>
        <div class="bg-[#17181C] p-2 rounded-xl cursor-pointer my-4 flex justify-between items-center active:opacity-80"
          @click="downloadGradationGrowthFile(gradationActiveData?.file_id)">
          <div class="flex gap-3 items-center">
            <div class="p-1 bg-[#797979] rounded">
              <PhFile :size="24" color="#fff" />
            </div>
            <p class="text-sm font-semibold">
              {{ gradationActiveData?.file_name }}
            </p>
          </div>
          <PhDownloadSimple :size="24" />
        </div>
        <p class="mb-3 text-sm font-semibold">{{ $t('fundingPage.history') }}</p>
        <div v-if="historyData">
          <div v-for="(file, index) in historyData.data" :key="index">
            <div class="flex justify-between">
              <p class="text-[#B8B8B8] text-xs">{{ $t('fundingPage.dateCreated') }}</p>
              <div class="flex gap-1 text-xs items-center">
                <PhClock :size="12" />
                <p>{{ formatTime(file.time) }}</p>
                <PhCalendarDots :size="16" />
                <p>{{ formattedDate(file.date) }}</p>
              </div>
            </div>
            <div class="bg-[#17181C] p-2 rounded-xl cursor-pointer my-4 flex justify-between items-center"
              @click="downloadGradationGrowthFile(file.file_id)">
              <div class="flex gap-3 items-center">
                <div class="p-1 bg-[#797979] rounded">
                  <PhFile :size="24" color="#fff" />
                </div>
                <p class="text-sm font-semibold">
                  {{ file.file_name }}
                </p>
              </div>
              <PhDownloadSimple :size="24" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="w-full flex justify-center">
          <div class="shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-3 py-1">
                <div class="h-3 bg-slate-700 rounded"></div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="h-8 bg-slate-700 rounded col-span-1"></div>
                  <div class="h-8 bg-slate-700 rounded col-span-1"></div>
                  <div class="h-8 bg-slate-700 rounded col-span-1"></div>
                  <div class="h-8 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div class="h-8 bg-slate-700 rounded"></div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="h-4 bg-slate-700 rounded col-span-2"></div>
                </div>
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
    <Teleport to="body">
      <div v-if="isNotification" class="modal fixed inset-0 flex items-center justify-center z-50 px-4">
        <transition name="modal">
          <div
            class="bg-[#222222f2] pt-4 pb-6 px-5 rounded-lg w-full border-[#92FBDB] border-2"
          >
            <div class="flex justify-end">
              <button
                @click="isNotification = false"
                class="bg-[#7474802e] p-2 rounded-full"
              >
                <PhX :size="21" />
              </button>
            </div>
            <p class="text-lg py-2 font-semibold text-center">
              {{ $t("gradationPage.fileSend") }}
            </p>
          </div>
        </transition>
      </div>
    </Teleport>
  </div>

</template>
