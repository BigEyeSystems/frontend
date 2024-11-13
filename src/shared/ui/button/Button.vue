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
    <button @click="props.onClick" class="btn bg-[#92FBDB] w-full p-3 rounded-xl font-semibold btn text-black flex  justify-center items-center gap-2 active:bg-gradient-to-r active:from-[#2DBDE8] active:to-[#0070A5]">
        {{ text }}
        <slot name="icon"></slot>
    </button>
</template>

<style scoped>
.btn {
    transition: all 0.3s ease; 
}
</style>
