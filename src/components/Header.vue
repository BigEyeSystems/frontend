<script setup>
import NotificationView from "@/views/NotificationView.vue";
import { PhBell } from "@phosphor-icons/vue";
import { ref } from "vue";
const emit = defineEmits(['changeLocale'])
const props = defineProps({
    UserName: {
        type: String,
        required: true
    },
    lang:{
        type: String,
        required: true
    }
})

const showNotificationsComponent = ref(false)
</script>
<template>
<div class="flex justify-between text-[#CAE8DF]">
    <div>
        <p class="text-xs">Hello,</p>
        <p class="text-lg font-semibold">
            {{ UserName || 'guest' }}
        </p>
    </div>
    <div class="flex justify-center items-center gap-3">
        <div class="text-xs font-semibold p-2 bg-[#7474802e] rounded-full cursor-pointer" @click="$emit('changeLocale')">{{lang}}</div>
        <PhBell :size="24" @click="showNotificationsComponent = !showNotificationsComponent" />
    </div>
</div>

<Teleport to="body">
    <transition name="modal">
      <div v-if="showNotificationsComponent"
        class="modal h-[90vh] rounded-t-3xl bg-black fixed bottom-0 w-full py-5 px-4 overflow-auto border-t border-white">
        <div class="flex justify-between mb-3">
          <div class="flex gap-3 items-center">
            <PhBell :size="32" />
            <p class="font-bold text-sm">{{ $t('notifications')}}</p>
          </div>
          <button @click="showNotificationsComponent = !showNotificationsComponent">
            <PhX :size="21" />
          </button>
        </div>
        <NotificationView />
      </div>
    </transition>
  </Teleport>
</template>

<style>
.setting-border {
    border-bottom: 0.5px solid #4B4B4B;
}

.modal-enter-active,
.modal-leave-active {
    transition: transform 0.3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
    transform: translateY(100%);
}

.modal-enter-to,
.modal-leave-from {
    transform: translateY(0);
}
</style>