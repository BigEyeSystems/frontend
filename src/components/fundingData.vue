<script setup>
import ButtonView from "./button.vue";
import { ref } from "vue";
import axios from "axios";
const showFundingData = ref(false);
const fundingData = ref(null);
const toggleFundingData = async () => {
    try {
        const response = await axios.get(
            "https://dsde1736.fornex.org/api/data/funding_data",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        showFundingData.value = !showFundingData.value;
        fundingData.value = response.data;
    }
    catch(error){
        console.log('Funding data ' + error );
    }
};
</script>
<template>
    <div class="text-xs">
        <ButtonView v-if="!showFundingData" :text="'Получить информацию'" @click="toggleFundingData" class="my-3" />
        <ButtonView v-else :text="'Обновить информацию'" class="my-3" />
        <div v-if="showFundingData">
            <p class="mb-3">Результат запроса</p>
            <div class="flex justify-between">
                <p class="text-xs">Последнее обновление:</p>
                <div class="flex text-xs gap-1">
                    <PhClock :size="16" /> 12:03
                    <PhCalendarDots :size="16" /> 9.01.2024
                </div>
            </div>
            {{ fundingData }}
        </div>
    </div>
</template>