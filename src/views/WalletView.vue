<script setup>
import { Button } from '@/shared/ui';
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 
const isBinded = ref(false);
const bindWallet = () => {
  isBinded.value = !isBinded.value;
}
</script>
<template>
  <div>
    <div class="flex mb-4 items-center justify-between w-1/2">
      <button class="flex text-sm text-[#B8B8B8] items-center" @click="$router.go(-1)">
        <PhCaretLeft :size="22" color="#B8B8B8" />{{ $t('back')}}
      </button>
      <div>
        <p class="text-lg font-semibold translate-x-2/4">{{ $t('walletPage.title')}}</p>
      </div>
    </div>
    <div>
      <div class="svg-background p-4 mt-4 rounded-xl">
        <div class="flex justify-between">
          <div class="flex flex-col justify-center">
            <p class="text-sm font-semibold">{{ $t('walletPage.tonWallet')}}</p>
            <p v-if="!isBinded" class="text-wrap text-sm text-[#B8B8B8]">{{ $t('walletPage.notLinked')}}</p>
            <p v-if="isBinded" class="text-wrap text-sm text-[#B8B8B8]">{{ $t('walletPage.link')}}</p>
          </div>
          <div>
            <img src="../components/icons/ton_logo.png" alt="ton" class="w-12" />
          </div>
        </div>
      </div>
      <Button v-if="!isBinded" :text="$t('walletPage.connectWallet')" class="mt-4" :on-click="bindWallet"/>
      <button v-if="isBinded" class="bg-[#17181C] w-full p-3 rounded-xl font-semibold flex  justify-center items-center gap-2 mt-4" @click="bindWallet">
        {{ $t('walletPage.untieWallet')}} 
    </button>
    </div>
  </div>
</template>
<style scoped>
.svg-background {
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="358" height="156" viewBox="0 0 358 156" fill="none"><g filter="url(%23filter0_f_593_24028)"><path d="M382 33.4369L382 112L-24 112L-24 33.4369C57.361 -39.9942 219.036 164.167 382 33.4369Z" fill="%2392FBDB" fill-opacity="0.4"/></g><defs><filter id="filter0_f_593_24028" x="-106.113" y="-65.113" width="570.226" height="259.226" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="41.0565" result="effect1_foregroundBlur_593_24028"/></filter></defs></svg>');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>