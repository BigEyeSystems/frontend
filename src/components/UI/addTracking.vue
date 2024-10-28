<script setup>
import { useI18n } from "vue-i18n";
import chipButton from "./chipButton.vue";
import ButtonView from "../button.vue";
import { ref } from "vue";

const { t } = useI18n({ useScope: "global" });
const emit = defineEmits(["closeModal"]);

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
      class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
      type="number"
      min="5"
      placeholder="Search Here"
    />
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
  <ButtonView :text="$t('impulsePrise.getInfo')" class="mt-4" />
</template>
<style scoped></style>
