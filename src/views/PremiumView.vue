<script setup>
import { reactive } from 'vue';
import crown from '@/components/icons/crown.vue';
import ButtonMenu from '../components/button.vue';
import premiumPeriod from '@/components/premiumPeriod.vue';
import router from '@/router';

const features = reactive([
  { name: 'Импульсы', basic: '+', premium: '+' },
  { name: 'ТОП тикеры', basic: '+', premium: '+' },
  { name: 'Рост объемов', basic: '-', premium: '+' },
  { name: 'Динамика цены и объемов', basic: '-', premium: '+' },
  { name: 'Ослеживание актива', basic: '-', premium: '+' },
  { name: 'Информация о тикере', basic: '-', premium: '+' },
  { name: 'Корреляция двух активов', basic: '-', premium: '+' },
  { name: 'Суточные объемы', basic: '-', premium: '+' },
  { name: 'Доступ к новым функциям', basic: '-', premium: '+' }
]);


</script>
<template>
  <div>
    <div class="flex mb-4 items-center justify-between w-1/2">
      <button class="flex text-sm text-[#B8B8B8] items-center" @click="$router.go(-1)"><PhCaretLeft :size="22" color="#B8B8B8" />Назад</button>
      <div>
        <p class="text-lg font-semibold translate-x-2/4">Premium</p>
      </div>
    </div>
    <div class="bg-[#17181c] py-2 px-1 rounded-xl mb-16">
      <div class="p-1 py-4 flex gap-3 px-3">
        <div class="flex items-center">
          <crown />
        </div>
        <div class="flex flex-col content-center text-xs">
          <p class="text-sm font-semibold">Еще больше плюсов с Premium</p>
          <p class="text-xs">Аналитика и дополнительные фунции</p>
        </div>
      </div>
      <div class="flex gap-3 overflow-x-scroll pb-4">
        <premiumPeriod :period="1" :cost="300"/>
        <premiumPeriod :period="3" :cost="280"/>
        <premiumPeriod :period="6" :cost="250"/>
      </div>
      <div>
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th>Название</th>
              <th>Basic</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in features" :key="index">
              <td>{{ item.name }}</td>
              <td style="text-align: center">{{ item.basic }}</td>
              <td style="text-align: center">{{ item.premium }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4 px-4">
      <button class="bg-gradient-to-r from-[#2DBDE8] to-[#0070A5] shadow-sm shadow-[#92fbdb80] w-full p-3 rounded-xl font-semibold btn flex  justify-center items-center gap-2 mt-4">
          Подключить
      </button>
    </footer>
  </div>
</template>
<style scoped>
th, td {
  padding: 8px 12px;
  text-align: left;
}
</style>