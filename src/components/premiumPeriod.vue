<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 
const props = defineProps({
    period: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    }
})
</script>
<template>
    <div class="bg-gradient-to-r from-[#2dbde826] to-[#0070a526] px-3 py-2 rounded-xl">
        <div class="flex flex-col">
            <p class="text-lg font-semibold">{{ period }} {{ $t('premiumPage.month')}}</p>
            <p class="text-xs text-[#b8b8b8] mb-1 whitespace-nowrap"> <span class="font-semibold text-white">{{ cost }}$</span> {{ $t('premiumPage.perMonth')}}</p>
            <p class="text-xs text-[#b8b8b8] whitespace-nowrap">{{totalCost}}$ {{ $t('premiumPage.for')}} 3 {{ $t('premiumPage.months')}}</p>
            <button class="bg-gradient-to-r from-[#2DBDE8] to-[#0070A5] px-3 py-1 text-sm font-semibold rounded-lg mt-2">{{ $t('premiumPage.connect')}}</button>
        </div>
    </div>
</template>