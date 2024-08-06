<script setup>
import ButtonView from "./button.vue";
import { PhX } from "@phosphor-icons/vue";
</script>
<template>
  <div class="text-xs">
    <div class="flex justify-between">
      <p>Отслеживание импульсов цены</p>
      <button @click="$router.push('/')"><PhX :size="21" /></button>
    </div>
    <div class="mb-3">
      <p>Выберете временной интервал (мин)</p>
      <div class="flex gap-2 mt-3">
        <button class="bg-[#17181C] w-full py-2 rounded">1</button>
        <button class="bg-[#17181C] w-full py-2 rounded">5</button>
        <button class="bg-[#17181C] w-full py-2 rounded">15</button>
        <button class="bg-[#17181C] w-full py-2 rounded">60</button>
      </div>
    </div>
    <div>
      <p>Введите процент изменения цены</p>
      <input class="w-full my-3 p-2 "type="text">
      <div class="flex gap-2 my-3">
        <button class="bg-[#17181C] w-full py-2 rounded">5%</button>
        <button class="bg-[#17181C] w-full py-2 rounded">10%</button>
        <button class="bg-[#17181C] w-full py-2 rounded">15%</button>
        <button class="bg-[#17181C] w-full py-2 rounded">20%</button>
      </div>
    </div>
    <ButtonView :text="'Получить информацию'"/>
  </div>
</template>
