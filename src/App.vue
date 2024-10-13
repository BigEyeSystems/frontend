<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.Telegram.WebApp.expand()
})
</script>

<template>
    <RouterView />
</template>
<style scoped>
</style>
