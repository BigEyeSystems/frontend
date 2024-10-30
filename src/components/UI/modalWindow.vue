<script setup>
import { ref } from "vue";
import addTracking from "./addTracking.vue";

const divHeight = ref(window.innerHeight * 0.6);
const isResizing = ref(false);

const startResize = (event) => {
  if (event.target.closest(".close-button")) return

  event.preventDefault();
  isResizing.value = true;

  let initialY = event.type.includes("mouse") ? event.clientY : event.touches[0].clientY;

  const resizeHandler = (e) => {
    if (!isResizing.value) return;

    const currentY = e.type.includes("mouse") ? e.clientY : e.touches[0].clientY;
    const deltaY = initialY - currentY;
    const newHeight = divHeight.value + deltaY;

    divHeight.value = Math.max(window.innerHeight * 0.6, newHeight);
    initialY = currentY;
  };

  const stopResize = () => {
    isResizing.value = false;
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

const emit = defineEmits(['closeModal', 'addImpulseTracking'])
const handleClose = () => {
  emit("closeModal"); 
};
const handleImpulseTracking = () => {
  emit("addImpulseTracking"); 
};
</script>

<template>
  <div
    ref="resizableDiv"
    :style="{ height: divHeight + 'px' }"
    class="absolute bottom-0 w-full bg-black border-t border-white rounded-t-3xl overflow-auto py-5 px-4"
  >
    <div
      class="flex justify-between mb-3 cursor-ns-resize"
      @mousedown="startResize"
      @touchstart="startResize"
    >
      <div class="flex gap-3 items-center">
        <PhList :size="32" />
        <p class="text-lg font-bold">
          {{ $t("impulsePrise.addInfo") }}
        </p>
      </div>
      <button @click="handleClose" class="p-2 close-button">
        <PhX :size="21" />
      </button>
    </div>
    <addTracking @add-impulse="handleImpulseTracking"/>
  </div>
</template>


<style scoped>
.resizable-div {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  user-select: none;
}
</style>
