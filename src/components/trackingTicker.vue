<script setup>
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import { ref } from "vue";
const selectedInterval = ref(null);
const selectInterval = (index) => {
  selectedInterval.value = index;
};

const selectedActive = ref(null);
const selectActive = (index) => {
    selectedActive.value = index;
};
const showTrackingTicker = ref(false);
const toggleTrackingTicker = () => {
  showTrackingTicker.value = !showTrackingTicker.value;
};
</script>
<template>
  <div class="text-xs">
    <div v-if="!showTrackingTicker">
      <div class="mb-3">
        <p>Введите название актива</p>
        <input class="w-full my-3 p-2" type="text" />
        <div class="flex gap-2 mt-3">
          <button v-for="(active, index) in ['BNB', 'EDU', 'PEOPLE', 'ETHFI']" :key="index" :class="{
            'bg-[#7064F3]': selectedActive === index,
            'bg-[#17181C]': selectedActive !== index
          }" @click="selectActive(index)" class="w-full py-2 rounded">
            {{ active }}
          </button>
        </div>
      </div>
      <div>
        <p>Как часто вы хотите получать уведомления?</p>
        <div class="flex gap-2 my-3">
          <button
            v-for="(interval, index) in [5, 15, 30, 60]"
            :key="index"
            :class="{
              'bg-[#7064F3]': selectedInterval === index,
              'bg-[#17181C]': selectedInterval !== index
            }"
            @click="selectInterval(index)"
            class="w-full py-2 rounded"
          >
            {{ interval }} мин 
          </button>
        </div>
      </div>
    </div>

    <ButtonView :text="'Добавить трекер'" :on-click="toggleTrackingTicker" class="my-4" />
    <div v-if="showTrackingTicker">
      <div class="mb-4">
        <ticker />
      </div>
      <div class="mb-4">
        <ticker />
      </div>
      <div>
        <ticker />
      </div>
    </div>
  </div>
</template>
