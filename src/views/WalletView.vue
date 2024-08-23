<script setup></script>
<template>
  <div>
    <div class="flex mb-4 items-center justify-between w-1/2">
      <button
        class="flex text-sm text-[#B8B8B8] items-center"
        @click="$router.go(-1)"
      >
        <PhCaretLeft :size="22" color="#B8B8B8" />Назад
      </button>
      <div>
        <p class="text-lg font-semibold translate-x-2/4">Кошелек</p>
      </div>
    </div>
  </div>
</template>
