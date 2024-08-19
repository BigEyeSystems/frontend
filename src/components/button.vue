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
    <button @click="props.onClick" class="bg-[#92FBDB] w-full p-3 rounded-xl font-semibold btn text-black flex  justify-center items-center gap-2">
        {{ text }}
        <slot name="icon"></slot>
    </button>
</template>

<style scoped>
.btn{
    box-shadow: 0px 2px 10px 0px rgba(146, 251, 219, 0.50);
}
</style>
