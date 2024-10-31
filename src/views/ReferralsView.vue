<script setup>
import crown from "../components/icons/crown.vue";
import ButtonView from "../components/button.vue";
import chipButton from "@/components/UI/chipButton.vue";
import footerMenu from "@/components/footer.vue";
import { ref } from "vue";
import referralsWorkProcess from "../components/referralsWorkProcess.vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: 'global' });
import modal from "@/components/UI/modal.vue";

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
  } catch{}
}

const isOpenModal = ref(false);
function openModal() {
  console.log('oppp');
  isOpenModal.value = true;
  copyReferral()
}
function closeModal(){
  isOpenModal.value = false
}
</script>

<template>
  <modal
  :open="isOpenModal"
    @close="closeModal"
  >
  <div class="flex flex-col items-center gap-2">
    <p class="text-lg font-semibold">{{ $t("referralsPage.copyLink") }}:</p>
    <p v-if="link" class="w-full p-2 bg-[#7474802E] rounded-xl mb-2">{{ link }}</p>
    <p v-else>{{ $t("shared.loading") }}...</p>
  </div>
  </modal>

  <div class="relative">
    <div class="flex gap-3">
      <div>
        <crown />
      </div>
      <p class="text-lg font-semibold">{{ $t('referralsPage.title') }}</p>
    </div>
    <div class="svg-background p-4 mt-4 rounded-xl">
      <div class="flex justify-between">
        <div>
          <p class="text-lg font-semibold">{{ $t('referralsPage.inviteFriends') }}</p>
          <p class="text-wrap text-xs">
            {{ $t('referralsPage.receiveBonus') }} <br />
            {{ $t('referralsPage.withdrawWallet') }}
          </p>
        </div>
        <div>
          <img src="../components/icons/ton_logo.png" alt="ton" class="w-20" />
        </div>
      </div>
      <ButtonView :text="$t('referralsPage.copyLink')" class="mt-4" @click="openModal">
        <template #icon>
          <PhCards :size="21" />
        </template>
      </ButtonView>
    </div>

    <div
      class="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded-xl my-4">
      <div class="flex gap-1">
        <p class="text-sm font-semibold text-[#b8b8b8]"> {{ $t('referralsPage.yourBalance') }}</p>
        <p class="text-sm font-semibold">0 TON</p>
      </div>
      <button class="text-sm font-semibold bg-[#92FBDB] text-black p-2 rounded-lg">
        {{ $t('referralsPage.withdraw') }}
      </button>
    </div>

    <div class="flex border border-solid border-[#2f2f2f99] rounded-lg mb-4 mx-1.5" style="padding: 1px">
      <chip-button :is-active="isrTansaction" @click="showTransaction" class="py-1 text-xs">
        {{ $t('referralsPage.transactions') }}
      </chip-button>
      <chip-button :is-active="isProcess" @click="showProcess" class="py-1 text-xs">
        {{ $t('referralsPage.howItWork') }}

      </chip-button>
      <!-- <button class="w-1/2 py-1 px-2 text-xs" @click="showProcess" :class="[
        isProcess
          ? 'font-semibold bg-gradient-to-r from-[#ffffff1f] to-[#ffffff12] rounded'
          : '',
      ]">
      </button> -->
    </div>

    <div v-if="isrTansaction" class="flex justify-center bg-[#17181C] py-7 rounded-2xl text-xs text-[#aeaeae] mb-24">
      <p>{{ $t('referralsPage.haveNotInvitedFriends') }}</p>
    </div>
    <div v-if="isProcess" class="flex flex-col gap-2 mb-24">
      <referralsWorkProcess :title="$t('referralsPage.copyLink')" :text="$t('referralsPage.clickButton')">
        <template #icon>
          <PhCards :size="24" />
        </template>
      </referralsWorkProcess>
      <referralsWorkProcess :title="$t('referralsPage.shareLink')" :text="$t('referralsPage.sendLink')">
        <template #icon>
          <PhWhatsappLogo :size="24" />
        </template>
      </referralsWorkProcess>
      <referralsWorkProcess :title="$t('referralsPage.purchaseSubscription')"
        :text="$t('referralsPage.inviteesubscription')">
        <template #icon>
          <PhUserPlus :size="24" />
        </template>
      </referralsWorkProcess>
      <referralsWorkProcess :title="$t('referralsPage.referralSystem')" :text="$t('referralsPage.connectTONWallet')">
        <template #icon>
          <PhConfetti :size="24" />
        </template>
      </referralsWorkProcess>
    </div>
    <Teleport to="body">
      <div v-if="isNotification" class="modal fixed inset-0 flex items-center justify-center z-50 px-4">
        <transition name="modal">
          <div class="bg-[#222222b3] py-4 px-5 rounded-lg w-full">
            <div class="flex justify-end">
              <button @click="isNotification = false" class="bg-[#7474802e] p-2 rounded-full">
                <PhX :size="21" />
              </button>
            </div>
            <p class="text-lg py-2 font-semibold text-center">
              {{ $t('referralsPage.linkCopy') }}
            </p>
          </div>
        </transition>
      </div>
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
