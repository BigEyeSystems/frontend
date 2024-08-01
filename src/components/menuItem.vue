<template>
    <div class="border w-1/3 p-2">
        <slot name="icon"></slot>
        <p>{{ title }}</p>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>