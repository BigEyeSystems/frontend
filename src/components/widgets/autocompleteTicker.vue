<template>
  <input
    v-model="tickerName"
    @input="setSuggestions"
    @change="setSuggestions"
    @compositionstart="onCompositionStart"
    @compositionend="onCompositionEnd"
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
import { DataTickers } from "/autocomplete/tokens.json";

const emit = defineEmits({
  setValue() {
    return true;
  },
});

const tickerName = ref("");
const isComposing = ref(false)
const autocompleteSuggests = ref([
  { Symbol: "BTC" },
  { Symbol: "ETH" },
  { Symbol: "TON" },
  { Symbol: "SOL" },
]);

function onCompositionStart() {
  isComposing.value = true;
}
function onCompositionEnd() {
  isComposing.value = false;
  setSuggestions();
}

const dataValues = Object.values(DataTickers);
function setSuggestions() {
  autocompleteSuggests.value = dataValues
    .filter(
      (tik) =>
        tik.Symbol.substr(0, tickerName.value.length).toUpperCase() ==
        tickerName.value.toUpperCase()
    )
    .splice(0, 4);

  if (tickerName.value.length < 1 || autocompleteSuggests.value.length < 1)
    autocompleteSuggests.value = [
      { Symbol: "BTC" },
      { Symbol: "ETH" },
      { Symbol: "TON" },
      { Symbol: "SOL" },
    ];
  emit("setValue", tickerName.value);
};
</script>
