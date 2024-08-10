<script setup>
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import { ref } from "vue";
const showImpulse = ref(false);
const toggleImpulse = () => {
  showImpulse.value = !showImpulse.value;
};
</script>
<template>
  <div class="text-xs">
    <div v-if="!showImpulse">
      <div class="mb-3">
        <p>Выберете временной интервал (мин)</p>
        <div class="flex gap-2 mt-3">
          <button class="bg-[#17181C] w-full py-2 rounded">1</button>
          <button class="bg-[#17181C] w-full py-2 rounded">5</button>
          <button class="bg-[#17181C] w-full py-2 rounded">15</button>
          <button class="bg-[#17181C] w-full py-2 rounded">60</button>
        </div>
      </div>
      <div>
        <p>История</p>
        <input class="w-full my-3 p-2" type="text" />
        <div class="flex gap-2 my-3">
          <button class="bg-[#17181C] w-full py-2 rounded">5%</button>
          <button class="bg-[#17181C] w-full py-2 rounded">10%</button>
          <button class="bg-[#17181C] w-full py-2 rounded">15%</button>
          <button class="bg-[#17181C] w-full py-2 rounded">20%</button>
        </div>
      </div>
    </div>

    <ButtonView v-if="!showImpulse" :text="'Получить информацию'" :on-click="toggleImpulse" class="mt-4"/>
    <div v-else>
      <ButtonView  :text="'Добавить информацию'" class="my-3" />
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
