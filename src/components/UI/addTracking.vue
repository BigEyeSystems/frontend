<script setup>
import { useI18n } from "vue-i18n";
import chipButton from "./chipButton.vue";
import { Button } from '@/shared/ui';
import { ref } from "vue";
import axios from "axios";
const { t } = useI18n({ useScope: "global" });
const changeInterval = ref(null);
const changePercent = ref(null);
const selectedInterval = ref(null);
const selectedPercent = ref(null);

const selectInterval = (index, interval) => {
  selectedInterval.value = index;
  changeInterval.value = interval;
};
const selectPercent = (index, percent) => {
  selectedPercent.value = index;
  changePercent.value = percent;
};
const emit = defineEmits(["addImpulse"]);
const handleImpulseTracking = async () => {
  emit("addImpulse");
  const intervalValue =
    changeInterval.value !== null ? Number(changeInterval.value) : 0;
  const percentValue =
    changePercent.value !== null ? Number(changePercent.value) : 0;
  if (isNaN(intervalValue) || isNaN(percentValue)) {
    console.error("Invalid interval or percentage value.");
    return;
  }
  if (changeInterval.value && changePercent.value) {
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
    } catch (error) {
      console.log("Error fetching data: " + error);
    }
  }
};
</script>
<template>
  <div class="mb-3">
    <p>{{ $t("impulsePrise.timeIntervalSelect") }}</p>
    <div class="flex gap-2 mt-3">
      <chip-button
        v-for="(interval, index) in [1, 5, 15, 60]"
        :key="index"
        @click="selectInterval(index, interval)"
        :is-active="selectedInterval === index"
      >
        {{ interval }} {{ $t("impulsePrise.min") }}
      </chip-button>
    </div>
  </div>
  <div>
    <p>{{ $t("impulsePrise.enterPrice") }}</p>
    <input
      v-model="changePercent"
      :class="{ 'input-error': changePercent && changePercent < 5 }"
      class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
      type="number"
      min="5"
      placeholder="Search Here"
    />
    <p v-if="changePercent && changePercent < 5" class="text-sm text-red-600">
      {{ $t("impulsePrise.minimalPercent") }}
    </p>
    <div class="flex gap-2 my-3 mx-1.5">
      <chip-button
        v-for="(percent, index) in [5, 10, 15, 20]"
        :key="index"
        @click="selectPercent(index, percent)"
        :is-active="selectedPercent === index"
      >
        {{ percent }}%
      </chip-button>
    </div>
  </div>
  <Button
    :text="$t('impulsePrise.getInfo')"
    class="mt-4"
    @click="handleImpulseTracking"
  />
</template>
<style scoped></style>
