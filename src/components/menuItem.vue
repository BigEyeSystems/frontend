<template>
    <div class="rounded-2xl p-px bg-gradient-to-r from-zinc-500 from-0% via-black via-50% to-zinc-500 to-100% w-1/3">
        <div class="rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C]">
            <slot name="icon"></slot>
            <p class="whitespace-normal">{{ title }}</p>
        </div>
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
<style scoped>
.main {
    border-image: linear-gradient(90deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.21)) 1;
}
</style>