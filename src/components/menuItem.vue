<template>
    <div class="rounded-2xl p-px bg-gradient-to-r from-zinc-700 from-0% via-zinc-600 via-50% to-zinc-700 to-100% w-1/3 hover:opacity-80 shadow-md hover:scale-105 hover:shadow-[#d2fefa] transition-all duration-300 ease-in-out cursor-pointer">
        <div class="rounded-[calc(1.5rem-10px)] p-1 px-2 bg-[#17181C] h-20 flex flex-col gap-2 justify-center ">
            <slot name="icon"></slot>
            <p class="whitespace-normal text-xs font-semibold">{{ title }}</p>
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