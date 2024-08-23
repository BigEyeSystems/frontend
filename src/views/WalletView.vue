<script setup>
import ButtonView from "../components/button.vue";
</script>
<template>
  <div>
    <div class="flex mb-4 items-center justify-between w-1/2">
      <button class="flex text-sm text-[#B8B8B8] items-center" @click="$router.go(-1)">
        <PhCaretLeft :size="22" color="#B8B8B8" />Назад
      </button>
      <div>
        <p class="text-lg font-semibold translate-x-2/4">Кошелек</p>
      </div>
    </div>
    <div>
      <div class="svg-background p-4 mt-4 rounded-xl">
        <div class="flex justify-between">
          <div class="flex flex-col justify-center">
            <p class="text-sm font-semibold">Кошелек TON</p>
            <p class="text-wrap text-sm text-[#B8B8B8]">Не привязан</p>
          </div>
          <div>
            <img src="../components/icons/ton_logo.png" alt="ton" class="w-12" />
          </div>
        </div>
      </div>
      <ButtonView :text="'Подключить кошелек'" class="mt-4"/>
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