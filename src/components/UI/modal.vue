<template>
  <div
    v-if="open"
    class="fixed w-full h-screen z-50 overflow-hidden flex justify-center items-center top-0 left-0 text-white bg-black/75"
    @click="$emit('close')"
  >
  <div class="relative flex flex-col items-center gap-2 py-2 px-4 mx-4 text-center bg-[#222222e8] rounded-xl min-w-60 min-h-28" @click.stop>
       <slot name="close" :close="close">
         <div class="absolute right-2 top-2 rounded-full p-2 bg-[#7474802E]/25">
            <close-icon @click="close()" />
         </div>
       </slot>
       <div class="mt-1.5">
          <slot />
       </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import closeIcon from "../icons/close.vue";

const props = defineProps({
  open: { type: Boolean, default: false },
});
const emits = defineEmits({
  close() {
    null;
  },
  confirm() {
    null;
  },
});

function close() {
  emits("close");
}
function confirm() {
  emits("confirm");
}
function handleKeydown(e) {
  if (props.open && e.key === "Escape") {
    close();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => document.removeEventListener("keydown", handleKeydown));
</script>