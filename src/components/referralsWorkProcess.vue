<script setup>
import { PhBell } from "@phosphor-icons/vue";
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
})
</script>
<template>
    <div class="flex gap-2 items-center py-4 px-3 justify-start bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded-2xl">
        <slot name="icon"></slot>
        <div>
            <p class="text-sm font-semibold">{{ title }}</p>
            <p class="text-xs text-[#b8b8b8]">{{ text }}</p>
        </div>
    </div>
</template>