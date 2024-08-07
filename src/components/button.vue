<script setup>
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
    <button @click="props.onClick" class="bg-[#7064F3] w-full p-3 rounded-2xl font-semibold">
        {{ text }}
    </button>
</template>
