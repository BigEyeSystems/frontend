<script setup></script>
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
    <div>
        <div class="p-1 py-4 flex gap-3 px-3">
            <div>
                <PhCrownSimple :size="32" color="#ffe500" weight="fill" />
            </div>
            <div class="flex flex-col content-center text-xs">
                <p>Еще больше плюсов с Premium</p>
                <p>Аналитика и дополнительные фунции</p>
            </div>
        </div>
    </div>
  </div>
</template>
