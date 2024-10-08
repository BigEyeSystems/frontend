<script setup>
import trackingTicker from '@/components/trackingTicker.vue';
</script>
<template>
  <div class="overflow-auto h-full">
    <trackingTicker @close="$emit('close')" />
  </div>
</template>