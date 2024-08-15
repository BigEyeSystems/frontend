<script setup>
import ButtonView from "./button.vue";
import { ref } from "vue";

const selectedInterval = ref(null);
const selectInterval = (index) => {
  selectedInterval.value = index;
};

const showGradationGrowth = ref(false);
const toggleGradationGrowth = () => {
    showGradationGrowth.value = !showGradationGrowth.value;
};
</script>
<template>
    <div class="text-xs">
        <div v-if="!showGradationGrowth">
            <div class="mb-3">
                <p>Выберите интервал</p>
                <div class="flex gap-2 mt-3">
                    <button v-for="(interval, index) in [5, 30, 60, 4]" :key="index" :class="{
                        'bg-[#7064F3]': selectedInterval === index,
                        'bg-[#17181C]': selectedInterval !== index
                    }" @click="selectInterval(index)" class="w-full py-2 rounded">
                        <p v-if="interval !== 4">{{ interval }} мин</p>
                        <p v-else>{{ interval }} часа </p>
                    </button>
                </div>
            </div>
        </div>
        <ButtonView v-if="!showGradationGrowth" :text="'Получить информацию'" :on-click="toggleGradationGrowth"
            class="my-3" />
        <ButtonView v-else :text="'Обновить информацию'" class="my-3" />

        <div v-if="showGradationGrowth">
            <p class="mb-3">Результат запроса</p>
            <div class="flex justify-between">
                <p class="text-xs">Последнее обновление:</p>
                <div class="flex text-xs gap-1">
                    <PhClock :size="16" /> 12:03
                    <PhCalendarDots :size="16" /> 9.01.2024
                </div>
            </div>
        </div>
    </div>
</template>