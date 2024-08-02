<template>
<div class="flex justify-between">
    <div>
        <p>Hello</p>
        {{ UserName }}
    </div>
    <div>
        <bell/>
    </div>
</div>
</template>
<script setup>
import bell from './icons/bell.vue'
const props = defineProps({
    UserName: {
        type: String,
        required: true
    }
})
</script>