<script setup>
import { reactive } from 'vue';
import crown from '@/components/icons/crown.vue';
import footerMenu from "@/components/footer.vue";
import premiumPeriod from '@/components/premiumPeriod.vue';

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


const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;
</script>
<template>
  <div>
    <div class="flex mb-4 items-center gap-4">
      <div class="border border-[#ffefef29] rounded-full p-9">
      </div>
      <div>
        <p class="text-lg font-bold">{{ user?.username }} </p>
        <p>Nov 10 2024</p>
      </div>
    </div>
    <div class="bg-[#17181c] py-2 px-1 rounded-xl">
      <div class="p-1 py-4 flex gap-3 px-3">
        <div class="flex items-center">
          <crown/>
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
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4">
      <footerMenu class="w-[90vw]" />
    </footer>
  </div>
</template>
<style scoped>
th, td {
  padding: 8px 12px;
  text-align: left;
}
</style>