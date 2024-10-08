<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (Telegram?.WebApp) {
    Telegram.WebApp.ready(() => {
      if (Telegram.WebApp.isExpanded === false) {
        Telegram.WebApp.expand();
      }
    });
  }
});
</script>

<template>
    <RouterView />
</template>
<style scoped>
</style>
