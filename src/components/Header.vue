<template>
<div class="flex justify-between">
    <div>
        <p class="text-xs">Hello</p>
        <p class="text-lg font-semibold">
            {{ UserName }}
        </p>
    </div>
    <div class="flex flex-col justify-center">
        <PhBell :size="24" />
    </div>
</div>
</template>
<script setup>
import { PhBell } from "@phosphor-icons/vue";
const props = defineProps({
    UserName: {
        type: String,
        required: true
    }
})
</script>