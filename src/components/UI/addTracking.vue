<script setup>
import { useI18n } from "vue-i18n";
import chipButton from "./chipButton.vue";
import ButtonView from "../button.vue";


const { t } = useI18n({ useScope: "global" });
const emit = defineEmits(['closeModal']);
const closeImpulseData = () => {
    console.log('close 1');

    emit('closeModal');
    console.log('close');
}

</script>
<template>

  <div class="mb-3">
    <p>{{ $t("impulsePrise.timeIntervalSelect") }}</p>
    <div class="flex gap-2 mt-3">
      <chip-button
        v-for="(interval, index) in [1, 5, 15, 60]"
        :key="index"
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
      >
        {{ percent }}%
      </chip-button>
    </div>
  </div>
  <ButtonView
    :text="$t('impulsePrise.getInfo')"
    class="mt-4"
  />
</template>
<style scoped></style>
