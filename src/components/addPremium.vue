<script setup>
import crown from "./icons/crown.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
</script>
<template>
  <div
    class="rounded-2xl p-px bg-gradient-to-r from-black from-0% via-black via-95% to-[#92FBDB] to-100%"
  >
    <div
      class="rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C] py-4 flex justify-between px-3"
    >
      <div class="flex items-center">
        <crown />
      </div>
      <div class="flex flex-col content-center text-xs">
        <p class="text-sm font-semibold">{{ $t("addPremium.title") }}</p>
        <p class="text-xs">{{ $t("addPremium.text") }}</p>
      </div>
      <div class="flex flex-col justify-center">
        <PhCaretRight :size="24" />
      </div>
    </div>
  </div>
</template>
