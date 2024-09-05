<template>
  <div class="table-container text-xs rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C] py-4">
    {{ props.detail }}
    {{ tickerData }}
    <table>
      <thead>
        <tr class="text-xs">
          <th>Название</th>
          <th>суточный %</th>
          <th>ТОП</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tickerData" :key="index">
          <td>
            {{ item.active_name }}
            <span :class="{ 'positive': item.percent > 0, 'negative': item.percent < 0 }">
              {{ item.percent.toFixed(2) }}%
            </span>
          </td>
          <td>{{ item.day_percent.toFixed(2) }}%</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const tickerData = computed(() => {
  try {
    return JSON.parse(props.detail);
  } catch (e) {
    console.error("Failed to parse funding data:", e);
    return null;
  }
});

const data = ref([
  { name: 'COMBOUSDT', change: 13.78, date: 'Сегодня 12:03', changePercentage: 5.02 },
  { name: 'COMBOUSDT', change: 13.78, date: 'Сегодня 12:03', changePercentage: -5.02 },
  { name: 'COMBOUSDT', change: 13.78, date: 'Сегодня 12:03', changePercentage: 5.02 },
  { name: 'COMBOUSDT', change: 13.78, date: 'Сегодня 12:03', changePercentage: 5.02 },
  { name: 'COMBOUSDT', change: 13.78, date: 'Сегодня 12:03', changePercentage: -5.02 },
]);

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

th,
td {
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