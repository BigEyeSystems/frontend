<script setup>
import ButtonView from "./button.vue";

import { ref } from "vue";

const showGradationGrowth= ref(false);
const toggleGradationGrowth= () => {
  showGradationGrowth.value = !showGradationGrowth.value;
};
</script>
<template>
    <div class="text-xs">
        <div v-if="!showGradationGrowth">
            <div class="mb-3">
                <p>Выберите интервал</p>
                <div class="flex gap-2 mt-3">
                    <button class="bg-[#17181C] w-full py-2 rounded">5 мин</button>
                    <button class="bg-[#17181C] w-full py-2 rounded">30 мин</button>
                    <button class="bg-[#17181C] w-full py-2 rounded">60 мин</button>
                    <button class="bg-[#17181C] w-full py-2 rounded">4 часа</button>
                </div>
            </div>
        </div>
        <ButtonView :text="'Получить информацию'" :on-click="toggleGradationGrowth" class="my-3" />

    </div>
</template>