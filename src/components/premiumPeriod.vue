<script setup>
const props = defineProps({
    period: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
})
</script>
<template>
    <div class="bg-gradient-to-r from-[#2dbde826] to-[#0070a526] px-3 py-2 rounded-xl">
        <div class="flex flex-col">
            <p class="text-lg font-semibold">{{ period }} месяц</p>
            <p class="text-xs text-[#b8b8b8] mb-1"> <span class="font-semibold text-white">{{ cost }}$</span>  в месяц</p>
            <p class="text-xs text-[#b8b8b8]">1500$ за 3 месяца</p>
            <button class="bg-gradient-to-r from-[#2DBDE8] to-[#0070A5] px-3 py-1 text-sm font-semibold rounded-lg mt-2">Подключить</button>
        </div>
    </div>
</template>