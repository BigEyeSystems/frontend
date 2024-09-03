<script setup>
import crown from "../components/icons/crown.vue";
import ButtonView from "../components/button.vue";
import footerMenu from "@/components/footer.vue";
import { ref } from "vue";
import referralsWorkProcess from "../components/referralsWorkProcess.vue";
import axios from "axios";

const isrTansaction = ref(true);
const isProcess = ref(false);
const link = ref("");
const isNotification = ref(false);

const showTransaction = () => {
  isrTansaction.value = true;
  isProcess.value = false;
};

const showProcess = () => {
  isProcess.value = true;
  isrTansaction.value = false;
};

const copyReferral = async () => {
  try {
    const response = await axios.get(
      "https://dsde1736.fornex.org/api/user/get_referral_link",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    link.value = response.data.link;
    try {
      await navigator.clipboard.writeText(link.value);
      isNotification.value = true;
      console.log("Referral link copied to clipboard!");
    } catch (clipboardError) {
      const textArea = document.createElement("textarea");
      textArea.value = link.value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      isNotification.value = true;
      console.log("Referral link copied to clipboard using fallback method!");
    }
  } catch (error) {
    console.error("Failed to copy referral link:", error);
    console.log("Failed to copy referral link");
  }
};
</script>

<template>
  <div class="relative">
    <div class="flex gap-3">
      <div>
        <crown />
      </div>
      <p class="text-lg font-semibold">Referrals</p>
    </div>
    <div class="svg-background p-4 mt-4 rounded-xl">
      <div class="flex justify-between">
        <div>
          <p class="text-lg font-semibold">Пригласите друзей!</p>
          <p class="text-wrap text-xs">
            Вы получите бонус который <br />
            сможете вывести в TON кошелек
          </p>
        </div>
        <div>
          <img src="../components/icons/ton_logo.png" alt="ton" class="w-20" />
        </div>
      </div>
      <ButtonView
        :text="'Скопировать ссылку'"
        class="mt-4"
        @click="copyReferral"
      >
        <template #icon>
          <PhCards :size="21" />
        </template>
      </ButtonView>
    </div>

    <div
      class="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded-xl my-4"
    >
      <div class="flex gap-1">
        <p class="text-sm font-semibold text-[#b8b8b8]">Ваш баланс:</p>
        <p class="text-sm font-semibold">0 TON</p>
      </div>
      <button
        class="text-sm font-semibold bg-[#92FBDB] text-black p-2 rounded-lg"
      >
        Вывести
      </button>
    </div>

    <div
      class="flex border border-solid border-[#2f2f2f99] rounded-lg mb-4"
      style="padding: 1px"
    >
      <button
        class="w-1/2 py-1 px-2 text-xs"
        @click="showTransaction"
        :class="[
          isrTansaction
            ? 'font-semibold bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded'
            : '',
        ]"
      >
        Транзакции
      </button>
      <button
        class="w-1/2 py-1 px-2 text-xs"
        @click="showProcess"
        :class="[
          isProcess
            ? 'font-semibold bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded'
            : '',
        ]"
      >
        Как это работает?
      </button>
    </div>

    <div
      v-if="isrTansaction"
      class="flex justify-center bg-[#17181C] py-7 rounded-2xl text-xs text-[#aeaeae] mb-24"
    >
      <p>Вы еще не пригласили друзей</p>
    </div>
    <div v-if="isProcess" class="flex flex-col gap-2 mb-24">
      <referralsWorkProcess
        :title="'Скопировать ссылку'"
        :text="'Нажмите кнопку в баннере'"
      >
        <template #icon>
          <PhCards :size="24" />
        </template>
      </referralsWorkProcess>
      <referralsWorkProcess
        :title="'Поделиться ссылкой'"
        :text="'Отправьте ссылку в удобном мессенджере'"
      >
        <template #icon>
          <PhWhatsappLogo :size="24" />
        </template>
      </referralsWorkProcess>
      <referralsWorkProcess
        :title="'Покупка подписки'"
        :text="'Приглашенный должен приобрести подписку'"
      >
        <template #icon>
          <PhUserPlus :size="24" />
        </template>
      </referralsWorkProcess>
      <referralsWorkProcess
        :title="'Реферальная система'"
        :text="'Подключите кошелек тон, и выведите деньги'"
      >
        <template #icon>
          <PhConfetti :size="24" />
        </template>
      </referralsWorkProcess>
    </div>
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="isNotification"
          class="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div class="bg-white p-4 rounded-lg">
            <p>Ссылка скопирована в буфер обмена</p>
          </div>
        </div>
      </transition>
    </Teleport>

    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4 px-4">
      <footerMenu />
    </footer>
  </div>
</template>
<style scoped>
.svg-background {
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="358" height="156" viewBox="0 0 358 156" fill="none"><g filter="url(%23filter0_f_593_24028)"><path d="M382 33.4369L382 112L-24 112L-24 33.4369C57.361 -39.9942 219.036 164.167 382 33.4369Z" fill="%2392FBDB" fill-opacity="0.4"/></g><defs><filter id="filter0_f_593_24028" x="-106.113" y="-65.113" width="570.226" height="259.226" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="41.0565" result="effect1_foregroundBlur_593_24028"/></filter></defs></svg>');
  background-repeat: no-repeat;
  background-size: cover;
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
