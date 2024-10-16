<script setup>
import crown from "./icons/crown.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
</script>
<template>
  <div
    class="rounded-full p-1 py-4 flex justify-between items-center px-3 bg-gradient-to-tl from-[#FF77B2] via-[#5898FF] to-[#FF77B2]"
  >
    <div class="flex items-center gap-2">
      <crown />

      <div class="flex flex-col content-center">
        <p class="text-sm font-semibold">{{ $t("addPremium.title") }}</p>
        <p class="text-xs">{{ $t("addPremium.text") }}</p>
      </div>
    </div>

    <div class="flex flex-col justify-center">
      <PhCaretRight :size="24" />
    </div>
  </div>
</template>
