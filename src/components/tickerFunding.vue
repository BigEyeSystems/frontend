<template>
    <div class="rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C] p-3">
      <div class="flex text-xs justify-between border p-1 rounded border-[#2F2F2F99]">
        <button @click="sortByVolume" class="hover:font-semibold">По объему</button>
        <button @click="sortByFundingAsc" class="hover:font-semibold">По фандингу (+)</button>
        <button @click="sortByFundingDesc" class="hover:font-semibold">По фандингу (-)</button>
      </div>
      <div v-for="(item, index) in data" :key="index" class="text-xs">
        <div class="flex justify-between">
            <p>{{ item.name }}</p>
            <p>{{ item.amount }}$</p>
        </div>
        <div class="flex justify-between pb-2"> 
            <p class="text-[#B8B8B8]">= {{ item.value }}$ (изменения цены за сутки)</p>
            <p :style="{ color: item.change > 0 ? 'green' : 'red' }">{{ item.change }}%</p>
        </div>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: [
          { name: "1000pepeusdt", amount: "3 583 377 248.89", value: "2 342 344", change: 2.30 },
          { name: "1000pepeusdt", amount: "3 583 377 248.89", value: "2 342 344", change: 2.30 },
          { name: "1000pepeusdt", amount: "3 583 377 248.89", value: "2 342 344", change: 2.30 },
          { name: "1000pepeusdt", amount: "3 583 377 248.89", value: "2 342 344", change: 2.30 },
          { name: "1000pepeusdt", amount: "3 583 377 248.89", value: "2 342 344", change: 2.30 },
          { name: "1000pepeusdt", amount: "3 583 377 248.89", value: "2 342 344", change: 2.30 }
        ]
      }
    },
    methods: {
      sortByVolume() {
        // Implement sorting by volume logic here
      },
      sortByFundingAsc() {
        // Implement sorting by funding ascending logic here
      },
      sortByFundingDesc() {
        // Implement sorting by funding descending logic here
      }
    }
  }
  </script>
  
  <style scoped>
  div {
    margin-bottom: 10px;
  }
  button {
    margin-right: 10px;
  }
  </style>
  