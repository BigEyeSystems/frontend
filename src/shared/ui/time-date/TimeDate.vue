<template>
  <div class="flex text-xs gap-1">
    <PhClock :size="16" /> {{ time }} <PhCalendarDots :size="16" /> {{ date }}
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  date: {
    type: Date,
    default: () => new Date(),
  },
});

const time = computed(() => {
  const date = props.date;
  const hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + date.getMinutes();
  }
  return `${hours}:${minutes}`;
});

const date = computed(() => {
  const currentDate = props.date;
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return `${day}.${month}.${year}`;
});
</script>
