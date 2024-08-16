<script setup>
import { ref } from "vue";
import { PhCrownSimple } from "@phosphor-icons/vue";

import footerMenu from "@/components/footer.vue";
import ButtonView from "../components/button.vue";
const selectedActive = ref(null);
const activeInfo = ref(null);
const selectActive = (index, active) => {
    selectedActive.value = index;
    activeInfo.value = active
};
const showAnalytics = ref(false);

const toggleAnalytics = () => {
    showAnalytics.value = !showAnalytics.value;
};
</script>
<template>
    <div class="flex flex-col min-h-screen">
        <div class="text-xs">
            <div class="flex gap-3">
                <crown/>
                <h1 class="text-lg font-semibold">Analytics</h1>
            </div>

            <div class="flex gap-2 my-4">
                <button class="bg-[#17181C] w-full py-2 rounded-xl">Информация о тикере</button>
                <button class="bg-[#17181C] w-full py-2 rounded-xl">Коррелятор активов</button>
                <button class="bg-[#17181C] w-full py-2 rounded-xl">Суточный объём актива</button>
            </div>
            <p>Введите торговую пару к USDT</p>
            <input class="w-full mt-4 mb-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]" type="text" placeholder="Search Here"/>
            <div class="flex gap-2">
                <button v-for="(active, index) in ['BNB', 'EDU', 'PEOPLE', 'ETHFI']" :key="index" :class="{
                    'bg-[#7064F3]': selectedActive === index,
                    'bg-[#17181C]': selectedActive !== index
                }" @click="selectActive(index, active)" class="w-full py-2 rounded">
                    {{ active }}
                </button>
            </div>
            <ButtonView v-if="!showAnalytics" :text="'Получить информацию'" :on-click="toggleAnalytics" class="mt-4" />
            <ButtonView v-else :text="'Обновить информацию'" :on-click="toggleAnalytics" class="mt-5" />
            <div v-if="showAnalytics">
                <div class="flex justify-between mt-3">
                    <p class="text-xs">Последнее обновление:</p>
                    <div class="flex text-xs gap-1">
                        <PhClock :size="16" /> 12:03
                        <PhCalendarDots :size="16" /> 9.01.2024
                    </div>
                </div>
                <h1>{{ activeInfo }}</h1>
            </div>

        </div>
        <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4">
            <footerMenu class="w-[90vw]" />
        </footer>
    </div>
</template>