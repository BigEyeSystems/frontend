<script setup>
import { ref } from "vue";
import footerMenu from "@/components/footer.vue";
import ButtonView from "../components/button.vue";
import crown from "../components/icons/crown.vue";
import chipButton from "@/components/UI/chipButton.vue";

const selectedActive = ref("");
const activeInfo = ref(null);
const showAnalytics = ref(false);

const toggleAnalytics = () => {
  showAnalytics.value = !showAnalytics.value;
};
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <!-- <div class="flex mb-4 items-center justify-between w-1/2">
      <button
        class="flex text-sm text-[#B8B8B8] items-center"
        @click="$router.go(-1)"
      >
        <PhCaretLeft :size="22" color="#B8B8B8" />{{ $t("back") }}
      </button>
      <div>
        <p class="text-lg font-semibold translate-x-2/4">
          {{ $t("analytics.title") }}
        </p>
      </div>
    </div> -->
    <div class="text-xs">
      <div class="flex gap-3">
        <crown />
        <h1 class="text-lg font-semibold">{{ $t("analytics.title") }}</h1>
      </div>

      <div class="flex gap-2 my-4">
        <button class="bg-[#17181C] w-full py-2 rounded-xl px-4">
          {{ $t("analytics.assetInfo") }}
        </button>
        <button class="bg-[#17181C] w-full py-2 rounded-xl px-4">
          {{ $t("analytics.correlation") }}
        </button>
      </div>
      <p>{{ $t("tickerTracking.assetName") }}</p>
      <input
        v-model="selectedActive"
        class="w-full mt-4 mb-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
        type="text"
        :placeholder="$t('analytics.searchHere')"
      />
      <div class="flex gap-2">
        <chip-button
          v-for="(active, index) in ['BTC', 'ETH', 'TON', 'SOL']"
          :key="index"
          :is-active="selectedActive.trim().toUpperCase() === active"
          @click="selectedActive = active"
        >
          {{ active }}
        </chip-button>
      </div>
      <ButtonView
        v-if="!showAnalytics"
        :text="$t('impulsePrise.getInfo')"
        :on-click="toggleAnalytics"
        class="mt-4"
      />
      <ButtonView
        v-else
        :text="$t('fundingPage.updateInfo')"
        :on-click="toggleAnalytics"
        class="mt-5"
      />
      <div v-if="showAnalytics">
        <div class="flex justify-between mt-3">
          <p class="text-xs">Последнее обновление:</p>
          <div class="flex text-xs gap-1">
            <PhClock :size="16" /> 12:03 <PhCalendarDots :size="16" /> 9.01.2024
          </div>
        </div>
        <h1>{{ activeInfo }}</h1>
      </div>
    </div>
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4 px-4">
      <footerMenu />
    </footer>
  </div>
</template>
