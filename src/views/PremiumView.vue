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
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 
</script>
<template>
  <div>
    <div class="flex mb-4 items-center justify-between w-1/2">
      <button class="flex text-sm text-[#B8B8B8] items-center" @click="$router.go(-1)"><PhCaretLeft :size="22" color="#B8B8B8" />{{ $t('back')}}</button>
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
          <p class="text-sm font-semibold">{{ $t('addPremium.title')}}</p>
          <p class="text-xs">{{ $t('addPremium.text')}}</p>
        </div>
      </div>
      <div class="flex gap-3 overflow-x-scroll pb-4">
        <premiumPeriod :period="1" :cost="45" :totalCost="135" />
        <premiumPeriod :period="3" :cost="40" :totalCost="120" />
        <premiumPeriod :period="6" :cost="35" :totalCost="210" />
      </div>
      <div>
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th>{{ $t('premiumPage.name')}}</th>
              <th style="text-align: center;">Basic</th>
              <th style="text-align: center;">Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td class="text-xs font-semibold">{{ $t('premiumPage.impulses')}}</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">{{ $t('premiumPage.asset')}}</p></td>
              <td style="text-align: center;"><p class="text-sm">3</p><p class="text-xs">{{ $t('premiumPage.assets')}}</p></td>
            </tr>
            <tr >
              <td class="text-xs font-semibold">{{ $t('premiumPage.assetTracking')}}</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">{{ $t('premiumPage.asset')}}</p></td>
              <td style="text-align: center;"><p class="text-sm">3</p><p class="text-xs">{{ $t('premiumPage.assets')}}</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.fundingRate')}}</td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><check/></div></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><checkPremium/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.informationTicker')}}</td>
              <td style="text-align: center; align-items: center;"><p class="text-sm">5</p><p class="text-xs">{{ $t('premiumPage.requests')}}</p></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><infinity/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.correlation')}}</td>
              <td style="text-align: center; align-items: center;"><p class="text-sm">5</p><p class="text-xs">{{ $t('premiumPage.requests')}}</p></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><infinity/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.tradingHistory')}}</td>
              <td style="text-align: center;"><p class="text-sm">10</p><p class="text-xs">{{ $t('premiumPage.days')}}</p></td>
              <td style="text-align: center;"><p class="text-sm">40</p><p class="text-xs">{{ $t('premiumPage.days')}}</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.accessNewFeatures')}}</td>
              <td><div class="flex justify-center"><close/></div></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><checkPremium/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.imbalance')}}</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">{{ $t('premiumPage.asset')}}</p></td>
              <td style="text-align: center;"><p class="text-sm">5</p><p class="text-xs">{{ $t('premiumPage.asset')}}</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.liqudities')}}</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">{{ $t('premiumPage.view')}}</p></td>
              <td style="text-align: center;"><p class="text-sm">4</p><p class="text-xs">{{ $t('premiumPage.views')}}</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.gradationVolume')}}</td>
              <td style="text-align: center;"><p class="text-sm">2</p><p class="text-xs">{{ $t('premiumPage.timeFrame')}}</p></td>
              <td style="text-align: center;"><p class="text-sm">4</p><p class="text-xs">{{ $t('premiumPage.timeFrame')}}</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.topTickers')}}</td>
              <td><div class="flex justify-center"><check/></div></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><checkPremium/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.fibonacci')}}</td>
              <td><div class="flex justify-center"><close/></div></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><checkPremium/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.tradingRecommendations')}}</td>
              <td style="text-align: center; align-items: center;"><p class="text-sm">2</p><p class="text-xs">{{ $t('premiumPage.monthPer')}}</p></td>
              <td style="text-align: center; align-items: center;"><div class="flex justify-center"><infinity/></div></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.RSI')}}</td>
              <td style="text-align: center;"><p class="text-sm">3</p><p class="text-xs">{{ $t('premiumPage.assets')}}</p></td>
              <td style="text-align: center;"><p class="text-sm">6</p><p class="text-xs">{{ $t('premiumPage.assets')}}</p></td>
            </tr>
            <tr>
              <td class="text-xs font-semibold">{{ $t('premiumPage.touchingTrend')}}</td>
              <td style="text-align: center;"><p class="text-sm">1</p><p class="text-xs">{{ $t('premiumPage.timeFrame')}}</p></td>
              <td style="text-align: center;"><p class="text-sm">5</p><p class="text-xs">{{ $t('premiumPage.timeFrame')}}</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <footer class="fixed bottom-0 left-0 w-full mt-48 mb-4 px-4">
      <button class="bg-gradient-to-r from-[#2DBDE8] to-[#0070A5] shadow-sm shadow-[#92fbdb80] w-full p-3 rounded-xl font-semibold btn flex  justify-center items-center gap-2 mt-4">
        {{ $t('premiumPage.connect')}}
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
