<script setup>
import axios from "axios";
import ButtonView from "./button.vue";
import ticker from "./ticker.vue";
import { ref } from "vue";
const changeInterval = ref(null)
const changePercent = ref(null);
const selectedInterval = ref(null);
const selectedPercent = ref(null);
const showImpulse = ref(false);

const toggleImpulse = () => {
  showImpulse.value = !showImpulse.value;

};

const selectInterval = (index, interval) => {
  selectedInterval.value = index;
  changeInterval.value = interval;
};

const selectPercent = (index, percent) => {
  selectedPercent.value = index;
  changePercent.value = percent;
};
const showImpulseData = () => {
  axios.post("https://0d5c-85-117-112-217.ngrok-free.app/notify/set_impulse", {interval: changeInterval, percentage: changePercent}, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbV9pZCI6NzM3MjcxMjI4LCJ1c2VybmFtZSI6ImRhZ2FtYTA3IiwidXNlcl9pZCI6MiwiZXhwIjoxNzI0NTEzNDgxfQ.se0hkcB6V9_e2ZO2X3lpukq_1wIAiqXsrHyYWlN5ZKg`
    }
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
</script>

<template>
  <div class="text-xs">
    <div v-if="!showImpulse">
      <div class="mb-3">
        <p>Выберете временной интервал (мин)</p>
        <div class="flex gap-2 mt-3">
          <button v-for="(interval, index) in [1, 5, 15, 60]" :key="index" :class="{
            'bg-[#92FBDB] text-black font-semibold': selectedInterval === index,
            'bg-[#17181C]': selectedInterval !== index
          }" @click="selectInterval(index, interval)" class="w-full py-2 rounded">
            {{ interval }}
          </button>
        </div>
      </div>
      <div>
        <p>Введите процент изменения цены:</p>
        <input v-model="changePercent"
          class="w-full my-3 p-3 rounded-lg border-transparent focus:outline-none bg-[#17181C] focus:bg-[#17181C]"
          type="text" placeholder="Search Here" />
        <div class="flex gap-2 my-3">
          <button v-for="(percent, index) in [5, 10, 15, 20]" :key="index" :class="{
            'bg-[#92FBDB] text-black font-semibold': selectedPercent === index,
            'bg-[#17181C]': selectedPercent !== index
          }" @click="selectPercent(index, percent)" class="w-full py-2 rounded">
            {{ percent }}%
          </button>
        </div>
      </div>
    </div>

    <ButtonView v-if="!showImpulse" :text="'Получить информацию'" :on-click="toggleImpulse" class="mt-4"
      @click="showImpulseData" />
    <div v-else>
      <ButtonView :text="'Добавить отслеживание (макс. 3)'" class="my-3" />
    </div>

    <div v-if="showImpulse">
      <p class="my-4">Выберите импульс для сохранения в историю</p>
      <div class="mb-4">
        <ticker />
      </div>
      <div class="mb-4">
        <ticker />
      </div>
      <div>
        <ticker />
      </div>
    </div>
  </div>
</template>
