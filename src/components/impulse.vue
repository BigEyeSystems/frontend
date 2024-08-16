<script setup>
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import { ref } from "vue";

const selectedInterval = ref(null);
const selectedHistory = ref(null);
const showImpulse = ref(false);

const toggleImpulse = () => {
  showImpulse.value = !showImpulse.value;
};

const selectInterval = (index) => {
  selectedInterval.value = index;
};

const selectHistory = (index) => {
  selectedHistory.value = index;
};
</script>

<template>
  <div class="text-xs">
    <div v-if="!showImpulse">
      <div class="mb-3">
        <p>Выберете временной интервал (мин)</p>
        <div class="flex gap-2 mt-3">
          <button
            v-for="(interval, index) in [1, 5, 15, 60]"
            :key="index"
            :class="{
              'bg-[#92FBDB] text-black font-semibold': selectedInterval === index,
              'bg-[#17181C]': selectedInterval !== index
            }"
            @click="selectInterval(index)"
            class="w-full py-2 rounded"
          >
            {{ interval }}
          </button>
        </div>
      </div>
      <div>
        <p>История</p>
        <input class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]" type="text" />
        <div class="flex gap-2 my-3">
          <button
            v-for="(history, index) in [5, 10, 15, 20]"
            :key="index"
            :class="{
              'bg-[#92FBDB] text-black font-semibold': selectedHistory === index,
              'bg-[#17181C]': selectedHistory !== index
            }"
            @click="selectHistory(index)"
            class="w-full py-2 rounded"
          >
            {{ history }}%
          </button>
        </div>
      </div>
    </div>

    <ButtonView
      v-if="!showImpulse"
      :text="'Получить информацию'"
      :on-click="toggleImpulse"
      class="mt-4"
    />
    <div v-else>
      <ButtonView :text="'Добавить информацию'" class="my-3" />
    </div>

    <div v-if="showImpulse">
      <p class="my-4">Выберите импульс для сохранения в историю</p>
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
