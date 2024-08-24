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
    <div>
        <p>{{ title }}</p>
        <p>{{ text }}</p>
    </div>
</template>