<script setup>
import footerMenu from "@/components/footer.vue";
import profileButton from "@/components/profileButton.vue";
import {
  PhWallet,
  PhGear,
  PhHeadset,
  PhInfo,
  PhCrownSimple,
} from "@phosphor-icons/vue";
import { useRouter } from "vue-router";
const router = useRouter();
const openPremium = () => {
  router.push("/premium");
};
</script>
<template>
  <div>
    <div class="flex mb-4 items-center gap-2">
      <div class="border rounded-full p-1">
        <PhCrownSimple :size="46" color="#ffe500" weight="fill" />
      </div>
      <div>
        <p class="text-lg font-bold">John Doe</p>
        <p>Nov 10 2024</p>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <button
        class="bg-gradient-to-r from-[#ffffff1f] from-10% via-[#ffffff12] via-20% to-[#ffe500] to-90% w-full p-3 rounded-2xl font-semibold flex justify-between items-center" @click="openPremium"
      >
        <div class="flex gap-3">
          <PhCrownSimple :size="24" color="#fff" />
          <p class="text-sm">Premium</p>
        </div>
        <div class="flex flex-col justify-center">
          <PhCaretRight :size="24" color="#0c0c0c"/>
        </div>
      </button>
      <profileButton :text="'Кошелек'">
        <template #icon>
          <PhWallet :size="24" />
        </template>
      </profileButton>
      <profileButton :text="'Настройки'">
        <template #icon>
          <PhGear :size="24" />
        </template>
      </profileButton>
      <profileButton :text="'Cлужба поддержки'">
        <template #icon>
          <PhHeadset :size="24" />
        </template>
      </profileButton>
      <profileButton :text="'Самые задаваемы вопросы'">
        <template #icon>
          <PhInfo :size="24" />
        </template>
      </profileButton>
    </div>
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4">
      <footerMenu class="w-[85vw]" />
    </footer>
  </div>
</template>
