<template>
  <input
    v-model="tickerName"
    class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C] uppercase"
    type="text"
  />
  <div class="flex gap-2 mt-3">
    <chip-button
      v-for="(token, index) in autocompleteSuggests"
      :key="index"
      :is-active="tickerName.trim().toUpperCase() === token.Symbol"
      @click="tickerName = token.Symbol"
    >
      {{ token.Symbol }}
    </chip-button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import chipButton from "../UI/chipButton.vue";
import { DataTickers } from "../shared/constants/autocompleteDict.json";

const tickerName = ref("");
const autocompleteSuggests = ref([{Symbol: 'BTC'}, {Symbol: 'ETH'}, {Symbol: 'TON'}, {Symbol: 'SOL'}]);

watch(tickerName, () => {
  const dataValues = Object.values(DataTickers);
  autocompleteSuggests.value = dataValues
    .filter(
      (tik) =>
        tik.Symbol.substr(0, tickerName.value.length).toUpperCase() ==
        tickerName.value.toUpperCase()
    )
    .splice(0, 4);

    if(tickerName.value.length < 1 || autocompleteSuggests.value.length < 1) autocompleteSuggests.value = [{Symbol: 'BTC'}, {Symbol: 'ETH'}, {Symbol: 'TON'}, {Symbol: 'SOL'}]    
});
</script>
