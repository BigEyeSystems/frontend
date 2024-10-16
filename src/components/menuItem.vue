<template>
  <div
    class="relative w-full h-full flex flex-col bg-[#222428] rounded-2xl p-2 justify-between items-center"
    :class="isClosed ? 'opacity-70' : 'hover:opacity-80 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out cursor-pointer'"
  >
    <div v-if="isClosed" class="absolute top-2 right-1.5">
        <Lock />
    </div>
    <div :class="imageSizeStyle" class="bg-[#303339] rounded-full p-3">
      <component :is="iconComponent" class="w-full h-full" />
    </div>
    <p class="text-[10px] h-[24px] text-center">
      {{ title }}
    </p>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { Lock } from "@/components/icons/home-page";

const props = defineProps({
  title: { type: String, required: true },
  iconComponent: { type: Object, required: false },
  iconSize: { type: Number, default: 6 },
  isClosed: { type: Boolean, default: false },
});

const imageSizeStyle = computed(
  () => `w-${props.iconSize} h-${props.iconSize}`
);
</script>

<style scoped>
.main {
  border-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.21)
    )
    1;
}
</style>
