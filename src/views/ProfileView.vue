<script setup>
import { ref } from "vue";
import crown from "@/components/icons/crown.vue";
import footerMenu from "@/components/footer.vue";
import profileButton from "@/components/profileButton.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const openPremium = () => {
  router.push("/profile/premium");
};
const options = { year: 'numeric', month: 'short', day: 'numeric' };
const currentDate = ref(new Date().toLocaleDateString('en-US', options));
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;
</script>
<template>
  <div>
    <div class="flex mb-4 items-center gap-4">
      <div class="border rounded-full p-2">
        <crown class="h-8 w-8"/>
      </div>
      <div>
        <p class="text-lg font-bold"> {{ user?.username }} </p>
        <p class="text-xs text-[#79869B] font-medium">{{ currentDate }}</p>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <button
        class="bg-gradient-to-r from-[#2dbde866] to-[#0070a566] w-full p-4 rounded-lg font-semibold flex justify-between items-center" @click="openPremium"
      >
        <div class="flex gap-3">
          <PhSketchLogo :size="24"/>
          <p class="text-sm">Premium</p>
        </div>
        <div class="flex flex-col justify-center">
          <PhCaretRight :size="24"/>
        </div>
      </button>
      <profileButton :text="'Кошелек'" @click="router.push('/profile/wallet')">
        <template #icon>
          <PhWallet :size="24" />
        </template>
      </profileButton>
      <profileButton :text="'Настройки'" @click="router.push('/profile/settings')">
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
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4 px-4">
      <footerMenu />
    </footer>
  </div>
</template>
