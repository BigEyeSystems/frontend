<script setup>
import { ref } from "vue";
import addTracking from "./addTracking.vue";

const divHeight = ref(window.innerHeight * 0.6);

const startResize = (event) => {
  event.preventDefault();

  let initialY =
    event.type === "mousedown" ? event.clientY : event.touches[0].clientY;

  const resizeHandler = (e) => {
    const currentY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
    const deltaY = initialY - currentY;

    const newHeight = divHeight.value + deltaY;

    divHeight.value = Math.max(window.innerHeight * 0.6, newHeight);

    initialY = currentY;
  };

  const stopResize = () => {
    window.removeEventListener("mousemove", resizeHandler);
    window.removeEventListener("touchmove", resizeHandler);
    window.removeEventListener("mouseup", stopResize);
    window.removeEventListener("touchend", stopResize);
  };

  window.addEventListener("mousemove", resizeHandler);
  window.addEventListener("touchmove", resizeHandler);
  window.addEventListener("mouseup", stopResize);
  window.addEventListener("touchend", stopResize);
};

const emit = defineEmits(["closeModal"]);
</script>
<template>
  <div
    ref="resizableDiv"
    :style="{ height: divHeight + 'px' }"
    class="absolute bottom-0 w-full bg-black border-t border-white rounded-t-3xl overflow-auto cursor-ns-resize py-5 px-4"
    @mousedown="startResize"
    @touchstart="startResize"
  >
    <div class="flex justify-between mb-3">
      <div class="flex gap-3 items-center">
        <PhList :size="32" />
        <p class="text-lg font-bold">
          {{ $t("impulsePrise.addInfo") }}
        </p>
      </div>
      <button @click="$emit('closeWindow')">
        <PhX :size="21" />
      </button>
    </div>
    <addTracking @close-modal="closeWindow" />
  </div>
</template>

<style scoped>
.resizable-div {
  width: 100%;
  transition: height 0.3s ease;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  user-select: none;
}
</style>
