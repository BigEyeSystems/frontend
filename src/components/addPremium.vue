<script setup>
import crown from './icons/crown.vue';
import { PhCaretRight } from "@phosphor-icons/vue";
</script>
<template>
    <div class="rounded-2xl p-px bg-gradient-to-r from-zinc-700 from-0% via-black via-50% to-zinc-700 to-100%">
        <div class="rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C] py-4 flex justify-between">
            <div>
                <crown />
            </div>
            <div class="flex flex-col content-center text-xs">
                <p>Еще больше плюсов с Premium</p>
                <p>Аналитика и дополнительные фунции</p>
            </div>
            <div class="flex flex-col justify-center">
                <PhCaretRight :size="24" />
            </div>
        </div>
    </div>
</template>
