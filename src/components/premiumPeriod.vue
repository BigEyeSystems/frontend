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
    <div class="bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] p-2 rounded-xl">
        <div class="flex flex-col gap-2">
            <p class="text-lg font-semibold">{{ period }} месяц</p>
            <p class="text-xs text-[#b8b8b8]"> <span class="font-semibold text-white">{{ cost }}$</span>  в месяц</p>
            <p class="text-xs text-[#b8b8b8]">1500$ за 3 месяца</p>
            <button class="bg-[#ffe500] text-black px-3 py-1 text-sm font-semibold rounded-lg">Подключить</button>
        </div>
    </div>
</template>