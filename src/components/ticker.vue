<template>
    <div class="table-container text-xs rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C] py-4">
      <table>
        <thead >
          <tr class="text-xs">
            <th>Название</th>
            <th>суточный %</th>
            <th>ТОП</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>
              {{ item.name }}
              <span :class="{'positive': item.changePercentage > 0, 'negative': item.changePercentage < 0}">
                {{ item.changePercentage.toFixed(2) }}%
              </span>
            </td>
            <td>{{ item.change.toFixed(2) }}%</td>
            <td>{{ item.top }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const data = ref([
        { name: 'COMBOUSDT', change: 13.78, top: 1, date: 'Сегодня 12:03', changePercentage: 5.02 },
        { name: 'COMBOUSDT', change: 13.78, top: 1, date: 'Сегодня 12:03', changePercentage: -5.02 },
        { name: 'COMBOUSDT', change: 13.78, top: 1, date: 'Сегодня 12:03', changePercentage: 5.02 },
        { name: 'COMBOUSDT', change: 13.78, top: 1, date: 'Сегодня 12:03', changePercentage: 5.02 },
        { name: 'COMBOUSDT', change: 13.78, top: 1, date: 'Сегодня 12:03', changePercentage: -5.02 },
      ]);
  
      return {
        data
      };
    }
  };
  </script>
  
  <style scoped>
  .table-container {
    width: 100%;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
  }
  
  .positive {
    color: green;
  }
  
  .negative {
    color: red;
  }
  </style>
  