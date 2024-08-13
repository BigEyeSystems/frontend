<script setup>
import { PhCaretRight } from "@phosphor-icons/vue";

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    onClick: {
        type: Function,
        required: true
    }
})
</script>

<template>
    <button @click="props.onClick"
        class="bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] w-full p-3 rounded-2xl font-semibold flex justify-between items-center">
        <div class="flex gap-3">
            <slot name="icon"></slot>
            <p class="text-sm">{{ text }}</p>
        </div>
        <div class="flex flex-col justify-center">
            <PhCaretRight :size="24" />
        </div>
    </button>
</template>
