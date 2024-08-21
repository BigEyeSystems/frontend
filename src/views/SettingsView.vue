<script setup>
import { reactive } from 'vue';
import premiumPeriod from '@/components/premiumPeriod.vue';

</script>
<template>
    <div>
        <div class="flex mb-4 items-center justify-between w-1/2">
            <button class="flex text-sm text-[#B8B8B8] items-center" @click="$router.go(-1)">
                <PhCaretLeft :size="22" color="#B8B8B8" />Назад
            </button>
            <div>
                <p class="text-lg font-semibold translate-x-2/4">Настройки</p>
            </div>
        </div>
        <div>
            <div
                class="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded-xl my-4">
                <div class="flex flex-col gap-1">
                    <p class="text-sm font-semibold">Русский</p>
                    <p class="text-xs text-[#b8b8b8]">Язык</p>
                </div>
                <PhCaretRight :size="24" color="#b2b2b2" />
            </div>
            <div
                class="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded-xl my-4">
                <div class="flex gap-1">
                    <p class="text-sm">Уведомления от Smart Analytics</p>
                </div>
                <button class="text-sm font-semibold bg-[#92FBDB] text-black p-2 rounded-lg"></button>
            </div>
        </div>
    </div>
</template>