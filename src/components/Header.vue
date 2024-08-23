<script setup>
import { PhBell } from "@phosphor-icons/vue";
const props = defineProps({
    UserName: {
        type: String,
        required: true
    },
    lang:{
        type: String,
        required: true
    }
})
</script>
<template>
<div class="flex justify-between">
    <div>
        <p class="text-xs">Hello</p>
        <p class="text-lg font-semibold">
            {{ UserName }}
        </p>
    </div>
    <div class="flex justify-center items-center gap-3">
        <div class="text-xs font-semibold p-2 bg-[#7474802e] rounded-full">{{lang}}</div>
        <PhBell :size="24" />
    </div>
</div>
</template>
