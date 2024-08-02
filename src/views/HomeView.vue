<script setup>
import { Alert } from "vue-tg";
import menuItems from "../components/menuItem.vue";
import Header from "../components/Header.vue";
import addPremium from "@/components/addPremium.vue";
import { PhBell, PhPulse, PhMagnifyingGlass, PhPercent, PhChartBar, PhChartLine } from "@phosphor-icons/vue";
</script>

<template>
  <main>
    <Header UserName="John Doe" />
    <div class="flex gap-4 my-4">
      <menuItems title="Импульсы цены">
        <template #icon>
          <PhPulse :size="21" />
        </template>
      </menuItems>
      <menuItems title="Ваши уведомления">
        <template #icon>
          <PhBell :size="21" />
        </template>
      </menuItems>
      <menuItems title="Ставки финансирования">
        <template #icon>
          <PhPercent :size="21" />
        </template>
      </menuItems>
    </div>
    <div class="flex gap-4">
      <menuItems title="Градация  объёмов">
        <template #icon>
          <PhChartBar :size="21" />
        </template>
      </menuItems>
      <menuItems title="Рост активов">
        <template #icon>
          <PhChartLine :size="21" />
        </template>
      </menuItems>
      <menuItems title="Отслеживание актива">
        <template #icon>
          <PhMagnifyingGlass :size="21" />
        </template>
      </menuItems>
    </div>
    <div class="my-4">
      <addPremium/>
    </div>
    <p class="text-sm font-semibold">TOP 5 тикеры</p>
    <div class="flex justify-between">
      <p class="text-xs">Последнее обновление:</p>
      <div class="flex text-xs gap-1">
        <PhClock :size="16" /> 12:03 <PhCalendarDots :size="16" /> 9.01.2024
      </div> 
    </div>
    <Alert title="Welcome to smart trade!" message="Tade with us, success with us!" />
  </main>
</template>
