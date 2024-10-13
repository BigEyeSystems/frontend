<template>
  <button
    class="w-full py-2 rounded font-medium text-xs"
    :class="
      isActive
        ? 'border border-[#92FBDB] text-white font-semibold shadow-sm scale-110 animate-pulse shadow-[#d2fefa] transition-all duration-300 ease-in-out relative overflow-hidden'
        : 'bg-[#17181C]'
    "
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
   isActive: {
      type: Boolean,
      default: false
   }
})
</script>

<style>
.animate-pulse {
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.85;
  }
  50% {
    background-color: #0d1513;
    opacity: 1;
  }
  100% {
    opacity: 0.85;
  }
}
</style>
