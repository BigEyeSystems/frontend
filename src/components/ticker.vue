<script setup>
import { ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
const { t } = useI18n( {useScope: 'global'} ); 

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

const showDate = (timestamp) => {
  let dateObject = new Date(timestamp);
  let datePart = dateObject.toISOString().split("T")[0];
  let timePart = dateObject.toTimeString().split(" ")[0];
  return `${datePart} ${timePart}`;
};
</script>
<template>
  <div class="table-container text-xs rounded-[calc(1.5rem-10px)] p-1 bg-[#17181C] py-4">
    <table>
      <thead>
        <tr class="text-xs">
          <th>{{ $t('tickerTable.name')}}</th>
          <th>{{ $t('tickerTable.daily')}} %</th>
          <th>{{ $t('tickerTable.date')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.detail" :key="index">
          <td>
            {{ item.active_name }} <br/>
            <span :class="{ 'positive': item.percent > 0, 'negative': item.percent < 0 }">
              {{ item.percent?.toFixed(2) || 0 }}%
            </span>
          </td>
          <td>{{ item.day_percent?.toFixed(2) || 0 }}%</td>
          <td>{{ showDate(item.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



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