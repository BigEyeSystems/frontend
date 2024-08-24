<script setup>
import { reactive } from 'vue';
import crown from '@/components/icons/crown.vue';
import ButtonMenu from '../components/button.vue';
import premiumPeriod from '@/components/premiumPeriod.vue';
import router from '@/router';
import check from '@/components/icons/check.vue';
import checkPremium from '@/components/icons/checkPremium.vue';
import infinity from '@/components/icons/infinity.vue';
import close from '@/components/icons/close.vue';
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
              <th style="text-align: center;">Basic</th>
              <th style="text-align: center;">Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td class="text-xs font-semibold">Импульсы</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">актив</p></td>
              <td style="text-align: center;"><p class="text-sm">3</p><p class="text-xs">актива</p></td>
            </tr>
            <tr >
              <td class="text-xs font-semibold">Ослеживание актива</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">актив</p></td>
              <td style="text-align: center;"><p class="text-sm">3</p><p class="text-xs">актива</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Ставки финансирования</td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><check/></div></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><checkPremium/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Информация о тикере</td>
              <td style="text-align: center; align-items: center;"><p class="text-sm">5</p><p class="text-xs">запросов</p></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><infinity/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Корреляция двух активов</td>
              <td style="text-align: center; align-items: center;"><p class="text-sm">5</p><p class="text-xs">запросов</p></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><infinity/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">История торговых объемов</td>
              <td style="text-align: center;"><p class="text-sm">10</p><p class="text-xs">дней</p></td>
              <td style="text-align: center;"><p class="text-sm">40</p><p class="text-xs">дней</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Доступ к новым функциям</td>
              <td><div class="flex justify-center"><close/></div></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><checkPremium/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Имбалансы (FVG)</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">актив</p></td>
              <td style="text-align: center;"><p class="text-sm">5</p><p class="text-xs">актив</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Снятие ключевых ликвидностей</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">вида</p></td>
              <td style="text-align: center;"><p class="text-sm">4</p><p class="text-xs">вида</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Градация роста объемов</td>
              <td style="text-align: center;"><p class="text-sm">2</p><p class="text-xs">таймфрейма</p></td>
              <td style="text-align: center;"><p class="text-sm">4</p><p class="text-xs">таймфрейма</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">ТОП тикеры</td>
              <td><div class="flex justify-center"><check/></div></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><checkPremium/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Уведомления по Фибоначчи</td>
              <td><div class="flex justify-center"><close/></div></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><checkPremium/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Торговые рекомендации</td>
              <td style="text-align: center; align-items: center;"><p class="text-sm">2</p><p class="text-xs">в месяц</p></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><infinity/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">RSI (Дивергенции конвергенции)</td>
              <td style="text-align: center;"><p class="text-sm">3</p><p class="text-xs">актива</p></td>
              <td style="text-align: center;"><p class="text-sm">6</p><p class="text-xs">активов</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">Касание трендовых</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">таймфреймов</p></td>
              <td style="text-align: center;"><p class="text-sm">5</p><p class="text-xs">таймфреймов</p></td>
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
