<script setup>
import ButtonView from "./button.vue";
import { ref } from "vue";
import axios from "axios";

const selectedInterval = ref(null);
const selectInterval = (index) => {
  selectedInterval.value = index;
};

const historyData = ref(null);
const gradationData = ref(null); 
const showGradation = ref(false);

const toggleGradation = async () => {
    try {
        const response = await axios.get(
            "https://dsde1736.fornex.org/api/data/gradation_growth",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        gradationData.value = response.data;
        showGradation.value = true;
    } catch(error) {
        console.log('Error fetching data: ' + error );
    }
    try {
        const responseHistory = await axios.get(
            "https://dsde1736.fornex.org/api/data/gradation_growth_history?growth_type=Volume",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        historyData.value = responseHistory.data;
    } catch(error) {
        console.log('Error fetching data: ' + error );
    }
};

const downloadGradationGrowthFile = async (id) => {
    try {
        const response = await axios.get(
            `https://dsde1736.fornex.org/api/download-growth?file_id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                responseType: 'text',
            }
        );
    } catch(error) {
        console.log('Error downloading data: ' + error );
    }
};
</script>

<template>
    <div class="text-xs">
        <div v-if="!showGradation">
            <div class="mb-3">
                <p>выберите временной интервал за какое время вы хотите получить информацию</p>
                <div class="flex gap-2 mt-3">
                    <button v-for="(interval, index) in [5, 30, 60, 4]" :key="index" :class="{
                        'bg-[#92FBDB] text-black font-semibold': selectedInterval === index,
                        'bg-[#17181C]': selectedInterval !== index
                    }" @click="selectInterval(index)" class="w-full py-2 rounded">
                         <p v-if="interval !== 4">{{ interval }} мин</p>
                         <p v-else>{{ interval }} часа </p>
                    </button>
                </div>
            </div>
        </div>
        <ButtonView v-if="!showGradation" :text="'Получить информацию'" :on-click="toggleGradation" class="my-3" />
        <ButtonView v-else :text="'Обновить информацию'" class="my-3" />

        <div v-if="showGradation">
            <p class="mb-3 text-sm font-semibold">Результат запроса</p>
            <div class="flex justify-between">
                <p class="text-xs">Последнее обновление:</p>
                <div class="flex text-xs gap-1">
                    <PhClock :size="16" /> 12:03
                    <PhCalendarDots :size="16" /> 9.01.2024
                </div>
            </div>
            <div class="bg-[#17181C] p-2 rounded-xl cursor-pointer my-4 flex justify-between items-center" @click="downloadGradationGrowthFile(gradationData?.file_id)">
                <div class="flex gap-3 items-center">
                    <div class="p-1 bg-[#797979] rounded">
                        <PhFile :size="24" color="#fff"/>
                    </div>
                    <p class="text-sm font-semibold">
                      {{ gradationData?.file_name }}
                    </p>
                </div>
                <PhDownloadSimple :size="24" />
            </div>
            <p class="mb-3 text-sm font-semibold">История</p>
            <div v-if="historyData">
                {{ historyData.data }}
            </div>
            <div v-else>
                No data
            </div>
        </div>
    </div>
</template>