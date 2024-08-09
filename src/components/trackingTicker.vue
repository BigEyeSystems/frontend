<script setup>
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import { ref } from "vue";
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
          <button class="bg-[#17181C] w-full py-2 rounded">BNB</button>
          <button class="bg-[#17181C] w-full py-2 rounded">EDU</button>
          <button class="bg-[#17181C] w-full py-2 rounded">PEOPLE</button>
          <button class="bg-[#17181C] w-full py-2 rounded">ETHFI</button>
        </div>
      </div>
      <div>
        <p>Как часто вы хотите получать уведомления?</p>
        <div class="flex gap-2 my-3">
          <button class="bg-[#17181C] w-full py-2 rounded">5 мин</button>
          <button class="bg-[#17181C] w-full py-2 rounded">15 мин</button>
          <button class="bg-[#17181C] w-full py-2 rounded">30 мин</button>
          <button class="bg-[#17181C] w-full py-2 rounded">60 мин</button>
        </div>
      </div>
    </div>

    <ButtonView :text="'Добавить трекер'" :on-click="toggleTrackingTicker" class="my-4"/>
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
