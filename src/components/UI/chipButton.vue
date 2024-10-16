<template>
  <button
    class="w-full py-3 text-xs rounded-full"
    :class="
      isActive
        ? 'bg-[#92FBDB] font-semibold text-black animate-pulse transition-all duration-300 ease-in-out relative overflow-hidden'
        : 'font-normal text-gray-400'
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
    background-color: #92FBDB;
  }
  50% {
    background-color: #82e4c7;
    opacity: 1;
  }
  100% {
    background-color: #92FBDB;
  }
}
</style>
